import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ChatBubbleProps {
  message: string
  isUser?: boolean
  timestamp?: string
  className?: string
  children?: ReactNode
}

export function ChatBubble({ 
  message, 
  isUser = false, 
  timestamp,
  className,
  children 
}: ChatBubbleProps) {
  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start",
      className
    )}>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3 shadow-gentle transition-gentle",
        isUser 
          ? "bg-gradient-warm text-primary-foreground rounded-br-sm" 
          : "bg-card text-card-foreground rounded-bl-sm border border-border"
      )}>
        <p className="text-sm leading-relaxed">{message}</p>
        {children}
        {timestamp && (
          <p className="text-xs mt-2 opacity-70">{timestamp}</p>
        )}
      </div>
    </div>
  )
}