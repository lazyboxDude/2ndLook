-- The token must never reach the browser (anyone could confirm any address),
-- so subscribing becomes server-only: callable with the service role key only.
alter table public.newsletter_subscribers
  add column last_sent_at timestamptz not null default now();

drop function public.subscribe_newsletter(text);

-- Returns the confirm token when a confirmation mail should be sent, else null
-- (already confirmed, or a mail went out less than 10 minutes ago).
create function public.subscribe_newsletter(p_email text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare token uuid;
begin
  insert into public.newsletter_subscribers as s (email) values (lower(trim(p_email)))
  on conflict (lower(email)) do update
    set last_sent_at = now()
    where s.confirmed_at is null and s.last_sent_at < now() - interval '10 minutes'
  returning s.confirm_token into token;
  return token;
end;
$$;

revoke all on function public.subscribe_newsletter(text) from public, anon, authenticated;
grant execute on function public.subscribe_newsletter(text) to service_role;
