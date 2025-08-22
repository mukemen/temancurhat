import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatInterface } from "@/components/chat-interface"
import { Heart, Shield, Clock, MessageCircle } from "lucide-react"
import heroImage from "@/assets/hero-comfort.jpg"

const Index = () => {
  const [showChat, setShowChat] = useState(false)

  if (showChat) {
    return (
      <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-4">
        <ChatInterface onBack={() => setShowChat(false)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Teman Curhat
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  AI companion yang siap mendengarkan ceritamu kapan saja. 
                  Aman, nyaman, dan tanpa judgment.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => setShowChat(true)}
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 shadow-warm"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Mulai Curhat Sekarang
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Ilustrasi dukungan emosional dan persahabatan"
                className="rounded-2xl shadow-warm w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Mengapa Pilih Teman Curhat?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Kami hadir untuk memberikan ruang aman bagi perasaan dan ceritamu
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:shadow-gentle transition-gentle">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>100% Anonim & Aman</CardTitle>
                <CardDescription>
                  Tidak perlu login atau registrasi. Semua percakapan bersifat privat dan aman.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-border/50 hover:shadow-gentle transition-gentle">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-calm/20 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-calm-foreground" />
                </div>
                <CardTitle>24/7 Siap Mendengar</CardTitle>
                <CardDescription>
                  Kapan saja kamu butuh teman bicara, kami siap mendengarkan ceritamu.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-border/50 hover:shadow-gentle transition-gentle">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-warm/30 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-warm-foreground" />
                </div>
                <CardTitle>Tanpa Judgment</CardTitle>
                <CardDescription>
                  Cerita apapun tanpa takut dihakimi. Kami hadir dengan empati dan pengertian.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Siap untuk Berbagi Cerita?
            </h2>
            <p className="text-xl text-muted-foreground">
              Jangan biarkan beban di hati terus menumpuk. 
              Yuk, mulai curhat dan rasakan lega setelahnya.
            </p>
            <Button 
              onClick={() => setShowChat(true)}
              size="lg" 
              className="shadow-warm"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Mulai Curhat Gratis
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Dibuat dengan ❤️ untuk semua yang butuh teman mendengarkan
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Jika kamu memiliki pikiran untuk menyakiti diri sendiri, segera hubungi profesional kesehatan mental
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Index;
