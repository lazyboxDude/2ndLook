"use client";

import { useTransition } from "react";
import { toggleFollow } from "@/app/mein-feed/actions";

export default function FollowButton({
  brandId,
  brandName,
  following,
}: {
  brandId: string;
  brandName: string;
  following: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => toggleFollow(brandId, !following))}
      aria-pressed={following}
      className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-60 ${
        following
          ? "bg-foreground text-bg"
          : "border border-placeholder bg-white text-foreground"
      }`}
    >
      {following ? brandName : `+ ${brandName}`}
    </button>
  );
}
