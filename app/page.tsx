import { Header } from "@/components/header"
import { TabNavigation } from "@/components/tab-navigation"
import { Suspense } from "react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20">
        <Suspense fallback={<div className="p-4">로딩 중...</div>}>
          <TabNavigation />
        </Suspense>
      </main>
    </div>
  )
}
