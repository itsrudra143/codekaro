"use client";

import {
  getExecutionResult,
  useCodeEditorStore,
} from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Loader2, Play, KeyboardIcon } from "lucide-react";
import { api } from "../../../../convex/_generated/api";

function RunButton() {
  const { user } = useUser();
  const {
    runCode,
    language,
    isRunning,
    showInputField,
    toggleInputField,
    userInput,
  } = useCodeEditorStore();
  const saveExecution = useMutation(api.codeExecutions.saveExecution);

  const handleRun = async () => {
    await runCode();
    const result = getExecutionResult();

    if (user && result) {
      await saveExecution({
        language,
        code: result.code,
        output: result.output || undefined,
        error: result.error || undefined,
      });
    }
  };

  // Determine if we have user input
  const hasUserInput = userInput.trim().length > 0;

  return (
    <div className="flex items-center gap-2">
      <motion.button
        onClick={handleRun}
        disabled={isRunning}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          group relative inline-flex items-center gap-2.5 px-5 py-2.5
          disabled:cursor-not-allowed
          focus:outline-none
        `}
      >
        {/* bg wit gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />

        <div className="relative flex items-center gap-2.5">
          {isRunning ? (
            <>
              <div className="relative">
                <Loader2 className="w-4 h-4 animate-spin text-white/70" />
                <div className="absolute inset-0 blur animate-pulse" />
              </div>
              <span className="text-sm font-medium text-white/90">
                Executing...
              </span>
            </>
          ) : (
            <>
              <div className="relative flex items-center justify-center w-4 h-4">
                <Play className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
              </div>
              <span className="text-sm font-medium text-white/90 group-hover:text-white">
                Run Code
                {hasUserInput && showInputField && (
                  <span className="ml-1 text-xs opacity-80">(with input)</span>
                )}
              </span>
            </>
          )}
        </div>
      </motion.button>

      <motion.button
        onClick={toggleInputField}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center justify-center w-10 h-10 rounded-xl ${
          hasUserInput
            ? "bg-blue-600/20 ring-blue-500/30"
            : "bg-[#1e1e2e] ring-gray-800/50"
        } hover:ring-gray-700/50 transition-all ring-1`}
        title={
          showInputField
            ? "Hide input field"
            : "Show input field for user input"
        }
      >
        <KeyboardIcon
          className={`w-4 h-4 ${hasUserInput ? "text-blue-400" : "text-gray-400"}`}
        />
        {/* {hasUserInput && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
        )} */}
      </motion.button>
    </div>
  );
}
export default RunButton;
