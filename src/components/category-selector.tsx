import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Briefcase, GraduationCap, Home, MessageCircle } from "lucide-react"

interface CategorySelectorProps {
  onSelectCategory: (category: string) => void
}

const categories = [
  {
    id: "cinta",
    name: "Cinta & Hubungan",
    icon: Heart,
    description: "Masalah percintaan, hubungan, atau patah hati"
  },
  {
    id: "keluarga", 
    name: "Keluarga",
    icon: Home,
    description: "Konflik keluarga, orang tua, atau masalah rumah tangga"
  },
  {
    id: "pekerjaan",
    name: "Pekerjaan",
    icon: Briefcase, 
    description: "Stress kerja, karir, atau masalah dengan rekan kerja"
  },
  {
    id: "sekolah",
    name: "Sekolah & Kuliah", 
    icon: GraduationCap,
    description: "Akademik, teman, atau tekanan belajar"
  },
  {
    id: "pertemanan",
    name: "Pertemanan",
    icon: Users,
    description: "Masalah dengan teman atau kesulitan bergaul"
  },
  {
    id: "umum",
    name: "Curhat Umum",
    icon: MessageCircle,
    description: "Cerita apapun yang ingin kamu bagikan"
  }
]

export function CategorySelector({ onSelectCategory }: CategorySelectorProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2 text-foreground">
          Mau curhat tentang apa hari ini?
        </h2>
        <p className="text-muted-foreground text-sm">
          Pilih kategori yang paling sesuai dengan perasaanmu
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Card 
              key={category.id}
              className="cursor-pointer hover:shadow-gentle transition-gentle border-border/50 hover:border-primary/20"
              onClick={() => onSelectCategory(category.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-warm/20">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1 text-card-foreground">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}