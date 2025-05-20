"use client";
import { useUser } from "@clerk/nextjs";
import EditorPanel from "./_components/EditorPanel";
import OutputPanel from "./_components/OutputPanel";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();
  if (!user) {
    router.push("/sign-in");
    return null;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <EditorPanel />
      <OutputPanel />
    </div>
  );
}
