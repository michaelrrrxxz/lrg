import { Label } from "@/components/ui/label"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useState } from "react"

type Props = {
  title: string
  code: string
}

export default function GeneratedCodePreview({ title, code }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!code) return null

  return (
    <div className="mt-6">
      <Label className="text-lg font-semibold">{title}</Label>
      <div className="relative mt-2 border rounded-lg overflow-hidden shadow-sm">
        <Button
          onClick={handleCopy}
          className="absolute top-2 right-2 z-10 h-8 px-3 text-xs"
          variant="secondary"
        >
          {copied ? "Copied!" : <Copy size={16} />}
        </Button>
        <SyntaxHighlighter
          language="php"
          style={vscDarkPlus}
          customStyle={{
            padding: "1rem",
            fontSize: "0.9rem",
            background: "#1e1e1e",
            margin: 0,
          }}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
