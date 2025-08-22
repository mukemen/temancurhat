import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatBubble } from "@/components/ui/chat-bubble"
import { CategorySelector } from "@/components/category-selector"
import { Send, ArrowLeft, Phone } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: string
  category?: string
}

interface ChatInterfaceProps {
  onBack?: () => void
}

const mockResponses = {
  cinta: [
    "Wah, masalah cinta memang berat ya. Aku di sini untuk mendengarkan ceritamu. Mau cerita lebih detail?",
    "Perasaan kamu valid banget. Cinta emang bikin naik turun seperti roller coaster. Gimana perasaanmu sekarang?",
    "Aku paham kalau lagi patah hati itu sakit banget. Yuk cerita, siapa tau bisa sedikit lega setelah bercerita."
  ],
  keluarga: [
    "Keluarga memang kompleks ya. Kadang yang paling dekat malah yang bikin kita paling kesal. Mau cerita apa yang terjadi?", 
    "Aku tahu konflik keluarga itu berat banget. Kamu ga sendiri kok, banyak orang yang ngalamin hal serupa.",
    "Family drama emang exhausting. Yuk cerita detail, mungkin kita bisa cari jalan keluarnya bareng-bareng."
  ],
  pekerjaan: [
    "Kerja emang stress banget kadang. Apalagi kalau ada drama sama rekan kerja atau deadline yang kejar-kejaran.",
    "Burnout itu real banget. Mau cerita apa yang bikin kamu capek di kantor?",
    "Masalah karir memang bikin overthinking ya. Aku siap mendengarkan semua keluh kesahmu."
  ],
  sekolah: [
    "Sekolah/kuliah emang pressure-nya gede banget ya. Tugas numpuk, ujian, plus drama sama temen.",
    "Academic pressure itu nyata banget. Kamu ga sendirian yang ngerasa kewalahan sama semua ini.",
    "Masa sekolah/kuliah harusnya fun, tapi kadang malah bikin stress. Mau cerita apa yang lagi bikin berat?"
  ],
  pertemanan: [
    "Masalah sama teman emang sakit hati banget. Apalagi kalau sama orang yang kita anggap dekat.",
    "Friendship drama itu exhausting. Yuk cerita, mungkin kita bisa brainstorm gimana handle situasinya.",
    "Temen yang toxic emang bikin capek mental. Aku siap dengerin semua cerita kamu."
  ],
  umum: [
    "Hai! Aku di sini buat dengerin cerita kamu. Apapun itu, feel free to share ya.",
    "Kadang kita cuma butuh seseorang yang mau dengerin tanpa judge. Aku siap mendengarkan.",
    "Yuk cerita apa aja yang lagi ada di pikiran kamu. No judgment here! 💙"
  ]
}

export function ChatInterface({ onBack }: ChatInterfaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: "Halo! Aku Teman Curhat kamu. Aku di sini untuk mendengarkan apapun yang ingin kamu ceritakan. Semua yang kamu bagikan akan tetap aman dan tanpa judgment. 😊",
      isUser: false,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([welcomeMessage])
  }

  const getRandomResponse = (category: string) => {
    const responses = mockResponses[category as keyof typeof mockResponses] || mockResponses.umum
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setCurrentMessage("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getRandomResponse(selectedCategory || 'umum'),
        isUser: false,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!selectedCategory) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center gap-2 justify-center">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <span>Teman Curhat</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CategorySelector onSelectCategory={handleCategorySelect} />
          
          <Alert className="mt-6 border-destructive/20 bg-destructive/5">
            <Phone className="w-4 h-4 text-destructive" />
            <AlertDescription className="text-sm">
              <strong>Butuh bantuan darurat?</strong><br />
              Hotline Kesehatan Mental: <strong>119 ext 8</strong><br />
              Atau hubungi <strong>081-111-500-454</strong> (Into The Light Indonesia)
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setSelectedCategory("")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <span>Teman Curhat</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          
          {isTyping && (
            <ChatBubble
              message="Sedang mengetik..."
              isUser={false}
            >
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </ChatBubble>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ketik pesan kamu di sini..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isTyping}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}