import { Suspense } from "react";
import FeedView from "@/components/FeedView";

// Statically prerendered: the filters are read client-side from the URL, so the
// Worker doesn't have to server-render every /feed request.
export default function FeedPage() {
  return (
    <Suspense fallback={null}>
      <FeedView />
    </Suspense>
  );
}
