"use client";

import EditorPanel from "./EditorPanel";
import OutputPanel from "./OutputPanel";

export default function DashboardContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <EditorPanel />
      <OutputPanel />
    </div>
  );
} 