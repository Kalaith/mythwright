import { useState } from "react";
import { Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label?: string;
}
export function CopyButton({
  text,
  label = "Copy to clipboard",
}: CopyButtonProps) {
  const [message, setMessage] = useState("");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setMessage("Copied.");
    } catch {
      setMessage("Clipboard unavailable. Select and copy the text manually.");
    }
  };
  return (
    <div className="mw-copy">
      <button className="mw-primary" onClick={copy}>
        <Copy size={16} />
        {label}
      </button>
      <span role="status">{message}</span>
    </div>
  );
}
