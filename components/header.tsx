import { Sparkles, Bell } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/30">
      <div className="max-w-md mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl gradient-primary shadow-lg shadow-primary/25">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-gradient-to-r from-accent to-orange-400 animate-pulse shadow-sm"></div>
            </div>
            <div>
              <h1 className="text-2xl font-black leading-tight bg-gradient-to-r from-slate-900 via-primary to-accent bg-clip-text text-transparent dark:from-white dark:via-primary dark:to-accent">
                인천시 정보
              </h1>
              <p className="text-sm text-muted-foreground font-semibold tracking-wide">시험 · 일자리 한눈에</p>
            </div>
          </div>
          <div className="relative">
            <div className="h-10 w-10 rounded-2xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
