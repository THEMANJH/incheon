import { Sparkles, Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/30">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-2xl gradient-primary shadow-lg shadow-primary/25">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-accent to-orange-400 animate-pulse shadow-sm"></div>
            </div>
            <div>
              <h1 className="text-lg font-black leading-tight bg-gradient-to-r from-slate-900 via-primary to-accent bg-clip-text text-transparent dark:from-white dark:via-primary dark:to-accent">
                인천시 정보
              </h1>
              <p className="text-xs text-muted-foreground font-semibold tracking-wide">시험 · 일자리 한눈에</p>
            </div>
          </div>
          <div className="relative">
            <div className="h-8 w-8 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors">
              <Bell className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="공고명, 부서명으로 검색..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-9 text-sm bg-muted/30 border-muted focus:bg-background transition-colors"
          />
        </div>
      </div>
    </header>
  )
}
