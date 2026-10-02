import { Suspense } from "react";
import BlogList from "@/components/BlogList";

// Statically prerendered: the category filter is read client-side from the URL.
export default function BlogPage() {
  return (
    <Suspense fallback={null}>
      <BlogList />
    </Suspense>
  );
}
