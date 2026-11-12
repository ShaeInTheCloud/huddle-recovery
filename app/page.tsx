import { Suspense } from "react";
import FamilyKit from "@/components/FamilyKit";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <FamilyKit />
    </Suspense>
  );
}
