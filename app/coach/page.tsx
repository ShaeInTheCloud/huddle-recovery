import type { Metadata } from "next";
import { Suspense } from "react";
import CoachLink from "@/components/CoachLink";

export const metadata: Metadata = {
  title: "Huddle Recovery for coaches",
  description: "Send a family the free Night-One Kit after an injury.",
};

export default function CoachPage() {
  return (
    <Suspense fallback={null}>
      <CoachLink />
    </Suspense>
  );
}
