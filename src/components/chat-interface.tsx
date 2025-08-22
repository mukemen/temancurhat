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

type ConversationStage = 'opening' | 'initial_response' | 'digging_deeper' | 'validation' | 'empathy' | 'options' | 'support'

interface ChatInterfaceProps {
  onBack?: () => void
}

const openingMessages = [
  "Hai 👋 Aku di sini buat dengerin kamu. Lagi pengen curhat apa hari ini?",
  "Aku siap nemenin kamu. Gak usah sungkan, ceritain aja apa yang lagi kamu rasain ya 😊", 
  "Semua cerita kamu penting. Mau mulai dari hal kecil atau besar, aku dengerin kok 💙"
]

const mockResponses = {
  cinta: [
    "Waduh, urusan hati emang ribet ya... Aku paham banget perasaan kamu. Mau cerita lebih detail? Aku siap dengerin 💕",
    "Cinta tuh kadang bikin kita naik turun kayak roller coaster ya. Gimana sih perasaan kamu sekarang? Boleh curhatin semua kok",
    "Aku ngerti banget kalau lagi patah hati tuh sakit banget. Yuk cerita aja, siapa tau abis cerita jadi agak mendingan 🤗",
    "Masalah cinta emang ga ada yang mudah ya. Tapi kamu ga sendiri kok, aku di sini buat dengerin semua keluh kesah kamu"
  ],
  keluarga: [
    "Keluarga tuh kadang yang paling dekat tapi paling bikin kesel ya 😅 Mau cerita apa yang lagi terjadi?", 
    "Aku tahu drama keluarga tuh berat banget di hati. Kamu ga sendirian kok yang ngalamin gini, banyak yang sama kayak kamu",
    "Wah, keluarga emang kompleks banget ya hubungannya. Yuk cerita detail, mungkin kita bisa pikirin bareng gimana ngatasinya",
    "Rumah harusnya tempat yang paling nyaman, tapi kadang malah jadi tempat yang bikin capek ya... Cerita aja deh"
  ],
  pekerjaan: [
    "Duh, kerjaan emang bisa bikin stress parah ya. Apalagi kalau bos atau rekan kerja yang bikin ribet 😤",
    "Burnout tuh nyata banget loh. Kerja terus menerus tanpa break emang bikin lelah jiwa raga. Gimana kondisi kamu?",
    "Masalah karir emang bikin overthinking mulu ya. Tenang, aku siap dengerin semua uneg-uneg kamu tentang kerjaan",
    "Kantor drama atau deadline yang kejar-kejaran? Apapun itu, yuk cerita biar agak lega"
  ],
  sekolah: [
    "Sekolah/kuliah emang tekanannya gede banget ya sekarang. Tugas numpuk, ujian, belum lagi drama sosial 😮‍💨",
    "Academic pressure tuh real banget! Kamu ga sendirian yang ngerasa kewalahan sama semua tuntutan ini",
    "Harusnya masa sekolah/kuliah tuh fun ya, tapi kok malah bikin stress gini. Apa sih yang paling bikin kamu berat?",
    "Dari PR yang ga ada habisnya sampe masalah sama temen sekelas, emang capek ya. Yuk cerita semua"
  ],
  pertemanan: [
    "Masalah sama temen tuh kadang lebih sakit daripada putus sama pacar loh 😔 Mau cerita kenapa?",
    "Drama pertemanan emang exhausting banget. Yuk cerita, siapa tau kita bisa mikirin bareng gimana handle situasinya",
    "Temen yang toxic atau yang ga supportive emang bikin capek mental ya. Aku siap dengerin cerita kamu",
    "Persahabatan yang rumit emang bikin bingung ya. Kadang ga tau harus gimana. Cerita aja dulu yuk"
  ],
  umum: [
    "Apapun yang lagi ada di pikiran kamu, cerita aja ya. Aku di sini buat dengerin tanpa judge 🤗",
    "Kadang kita emang cuma butuh tempat buat cerita ya, tanpa perlu saran atau solusi. Aku siap dengerin",
    "Hidup emang kadang berat, kadang ringan ya. Mau cerita hal kecil atau besar, semuanya penting kok buat aku 💙",
    "Yuk sharing aja apa yang lagi bikin kamu kepikiran. Gak ada yang salah kok dengan perasaan kamu"
  ]
}

export function ChatInterface({ onBack }: ChatInterfaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [conversationStage, setConversationStage] = useState<ConversationStage>('opening')
  const [userMessageCount, setUserMessageCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setConversationStage('opening')
    setUserMessageCount(0)
    const randomOpeningMessage = openingMessages[Math.floor(Math.random() * openingMessages.length)]
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: randomOpeningMessage,
      isUser: false,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([welcomeMessage])
  }

  const getContextualResponse = (stage: ConversationStage, category: string) => {
    const stageResponses = {
      initial_response: [
        "Aku paham banget perasaan kamu... ceritain aja pelan-pelan ya, aku dengerin 😊",
        "Terima kasih udah mau sharing sama aku. Yuk cerita lebih detail, aku siap dengerin semua",
        "Aku ngerti ini pasti gak gampang buat kamu. Take your time ya, cerita seadanya aja dulu"
      ],
      digging_deeper: [
        "Kalau boleh tahu, apa yang bikin kamu merasa seperti itu? Aku pengen ngerti lebih banyak supaya bisa nemenin kamu lebih baik.",
        "Hmm, kedengarannya berat banget ya. Bisa cerita gimana awal mulanya sampai kamu ngerasain kayak gini?",
        "Aku penasaran nih, udah berapa lama kamu ngerasain hal ini? Dan apa yang bikin kamu paling kesel atau sedih?"
      ],
      validation: [
        "Terima kasih udah cerita jujur. Aku tahu itu gak selalu gampang. Kamu hebat karena mau terbuka 🙏",
        "Wow, kamu berani banget ya bisa cerita hal sepersonal ini. Aku appreciate banget keberanian kamu",
        "Thanks for trusting me ya. Aku ngehargain banget kepercayaan kamu buat sharing hal ini sama aku"
      ],
      empathy: [
        "Perasaan kamu wajar banget. Siapapun di posisi kamu pasti bisa ngerasain hal yang sama. Kamu gak sendirian kok 💙",
        "Aku paham banget kenapa kamu bisa ngerasa kayak gini. Reaksi kamu itu normal banget, dan valid kok",
        "Honestly, kalau aku di posisi kamu mungkin bakal ngerasain hal yang sama. Kamu udah handle ini dengan baik banget"
      ],
      options: [
        "Mau aku kasih kamu beberapa saran ringan supaya hati kamu agak lega? Atau kamu lebih pengen aku sekadar dengerin aja?",
        "Gimana kalau kita coba pikirin bareng-bareng hal kecil yang bisa kamu lakuin? Atau kamu prefer aku cuma nemenin aja?",
        "Aku bisa bantu kamu brainstorming kalau mau, atau kalau kamu butuh tempat curhat aja juga gapapa. Terserah kamu!"
      ],
      support: [
        "Apapun pilihan kamu, aku tetap ada di sini buat nemenin. Kamu kuat, dan setiap langkah kecil itu berarti. Semangat ya 🌸",
        "Remember ya, kamu udah survive sampai hari ini, berarti kamu strong banget. Aku bangga sama kamu 💪",
        "Kamu amazing banget loh udah bisa handle semua ini. Jangan lupa kasih appreciation sama diri kamu sendiri ya 🤗"
      ]
    }

    if (stage === 'opening') {
      const responses = mockResponses[category as keyof typeof mockResponses] || mockResponses.umum
      return responses[Math.floor(Math.random() * responses.length)]
    }

    const responses = stageResponses[stage] || stageResponses.support
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const getNextStage = (currentStage: ConversationStage, messageCount: number): ConversationStage => {
    switch (currentStage) {
      case 'opening':
        return 'initial_response'
      case 'initial_response':
        return messageCount >= 2 ? 'digging_deeper' : 'initial_response'
      case 'digging_deeper':
        return 'validation'
      case 'validation':
        return 'empathy'
      case 'empathy':
        return messageCount >= 4 ? 'options' : 'empathy'
      case 'options':
        return 'support'
      case 'support':
        return Math.random() > 0.6 ? 'options' : 'support'
      default:
        return 'support'
    }
  }

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return

    const newUserMessageCount = userMessageCount + 1
    setUserMessageCount(newUserMessageCount)

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setCurrentMessage("")
    setIsTyping(true)

    // Determine next conversation stage
    const nextStage = getNextStage(conversationStage, newUserMessageCount)
    
    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getContextualResponse(nextStage, selectedCategory || 'umum'),
        isUser: false,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiResponse])
      setConversationStage(nextStage)
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