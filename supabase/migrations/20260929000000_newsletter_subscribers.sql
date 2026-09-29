create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  confirm_token uuid not null default gen_random_uuid(),
  confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint newsletter_email_format check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and length(email) <= 254)
);

create unique index newsletter_subscribers_email_key on public.newsletter_subscribers (lower(email));

-- RLS on with no policies: the table is only reachable through the functions below.
alter table public.newsletter_subscribers enable row level security;

create or replace function public.subscribe_newsletter(p_email text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.newsletter_subscribers (email) values (lower(trim(p_email)))
  on conflict (lower(email)) do nothing;
end;
$$;

create or replace function public.confirm_newsletter(p_token uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare updated int;
begin
  update public.newsletter_subscribers
     set confirmed_at = coalesce(confirmed_at, now())
   where confirm_token = p_token;
  get diagnostics updated = row_count;
  return updated > 0;
end;
$$;

revoke all on function public.subscribe_newsletter(text) from public;
revoke all on function public.confirm_newsletter(uuid) from public;
grant execute on function public.subscribe_newsletter(text) to anon, authenticated;
grant execute on function public.confirm_newsletter(uuid) to anon, authenticated;
