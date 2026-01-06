"use client"

import { Header } from "@/components/header"
import { TabNavigation } from "@/components/tab-navigation"
import { Suspense, useState } from "react"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="pb-16">
        <Suspense fallback={<div className="p-4 text-xs">로딩 중...</div>}>
          <TabNavigation searchQuery={searchQuery} />
        </Suspense>
      </main>
    </div>
  )
}
