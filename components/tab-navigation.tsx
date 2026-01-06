"use client"

import { useState } from "react"
import { ExamSection } from "./exam-section"
import { JobSection } from "./job-section"
import { GraduationCap, Briefcase } from "lucide-react"
import { motion } from "framer-motion"

interface TabNavigationProps {
  searchQuery: string
}

export function TabNavigation({ searchQuery }: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState<"exam" | "job">("exam")

  return (
    <>
      <div className="sticky top-[105px] z-40 glass-effect border-b border-border/30">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="relative flex gap-1 p-1 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-inner">
            <motion.div
              className="absolute top-1 bottom-1 rounded-xl bg-white dark:bg-slate-900 shadow-lg border border-white/20"
              initial={false}
              animate={{
                left: activeTab === "exam" ? "4px" : "50%",
                right: activeTab === "exam" ? "50%" : "4px",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
            <button
              onClick={() => setActiveTab("exam")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeTab === "exam" 
                  ? "text-blue-600 dark:text-blue-400" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <GraduationCap className={`h-4 w-4 transition-transform ${activeTab === "exam" ? "scale-110" : ""}`} />
              시험정보
            </button>
            <button
              onClick={() => setActiveTab("job")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeTab === "job" 
                  ? "text-emerald-600 dark:text-emerald-400" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Briefcase className={`h-4 w-4 transition-transform ${activeTab === "job" ? "scale-110" : ""}`} />
              일자리정보
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-3">
        {activeTab === "exam" ? <ExamSection searchQuery={searchQuery} /> : <JobSection searchQuery={searchQuery} />}
      </div>
    </>
  )
}
