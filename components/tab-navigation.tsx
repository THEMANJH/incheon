"use client"

import { useState } from "react"
import { ExamSection } from "./exam-section"
import { JobSection } from "./job-section"
import { GraduationCap, Briefcase } from "lucide-react"
import { motion } from "framer-motion"

export function TabNavigation() {
  const [activeTab, setActiveTab] = useState<"exam" | "job">("exam")

  return (
    <>
      <div className="sticky top-[89px] z-40 glass-effect border-b border-border/30">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="relative flex gap-1 p-1.5 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-3xl shadow-inner">
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-2xl bg-white dark:bg-slate-900 shadow-lg border border-white/20"
              initial={false}
              animate={{
                left: activeTab === "exam" ? "6px" : "50%",
                right: activeTab === "exam" ? "50%" : "6px",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
            <button
              onClick={() => setActiveTab("exam")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                activeTab === "exam" 
                  ? "text-blue-600 dark:text-blue-400" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <GraduationCap className={`h-5 w-5 transition-transform ${activeTab === "exam" ? "scale-110" : ""}`} />
              시험정보
            </button>
            <button
              onClick={() => setActiveTab("job")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                activeTab === "job" 
                  ? "text-emerald-600 dark:text-emerald-400" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Briefcase className={`h-5 w-5 transition-transform ${activeTab === "job" ? "scale-110" : ""}`} />
              일자리정보
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">{activeTab === "exam" ? <ExamSection /> : <JobSection />}</div>
    </>
  )
}
