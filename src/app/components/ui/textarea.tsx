import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={`min-h-32 w-full resize-y rounded-md border border-border bg-background px-3 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-foreground disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
