"use client";
import React from "react";
import { useState } from "react";

const EditorPanel = () => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { language, theme, fontSize, editor, setFontSize, setEditor } =
    useCodeEditorStore();
  return <div>EditorPanel</div>;
};

export default EditorPanel;
