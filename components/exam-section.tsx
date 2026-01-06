"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, ChevronRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getExamData } from "@/app/actions"

interface ExamData {
  RECRNO: string
  RECRTITLE: string
  REQCAREER: string
  REQEDUFORM: string
  RECRSTDATE: string
  RECRENDDATE: string
  DISTCODE: string
  DISTNM: string
  RECRMTHCD: string
  REGISTDT: string
}

export function ExamSection() {
  const [exams, setExams] = useState<ExamData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async () => {
    try {
      setLoading(true)
      const result = await getExamData()

      if (result.success) {
        setExams(result.data)
      } else {
        setError(result.error || "오류가 발생했습니다")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-5 border-0 shadow-sm bg-gradient-to-br from-card to-muted/20">
            <div className="animate-pulse space-y-3">
              <div className="h-6 w-3/4 rounded-lg bg-muted"></div>
              <div className="h-4 w-1/2 rounded-lg bg-muted"></div>
              <div className="h-4 w-2/3 rounded-lg bg-muted"></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-8 text-center border-0 shadow-sm bg-gradient-to-br from-card to-muted/20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-destructive" />
          </div>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={fetchExams} size="sm" className="mt-2 gradient-primary text-white border-0 shadow-md">
            다시 시도
          </Button>
        </div>
      </Card>
    )
  }

  if (exams.length === 0) {
    return (
      <Card className="p-8 text-center border-0 shadow-sm bg-gradient-to-br from-card to-muted/20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">현재 등록된 시험정보가 없습니다</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {exams.map((exam) => (
        <Card
          key={exam.RECRNO}
          className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-white via-white to-blue-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-900/20 hover:scale-[1.02] hover:-translate-y-1"
        >
          <div className="relative p-6 space-y-5">
            {/* 배경 장식 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-[100px]"></div>
            
            <div className="relative space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/25 mt-1">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-lg leading-tight text-balance group-hover:text-blue-600 transition-colors">{exam.RECRTITLE}</h3>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {exam.REQEDUFORM && (
                  <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 border-0 font-semibold rounded-xl px-4 py-1.5">
                    {exam.REQEDUFORM}
                  </Badge>
                )}
                {exam.REQCAREER && (
                  <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 border-0 font-semibold rounded-xl px-4 py-1.5">
                    {exam.REQCAREER}
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-3 text-sm">
              {exam.DISTNM && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="h-6 w-6 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <MapPin className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="font-medium">{exam.DISTNM}</span>
                </div>
              )}
              {exam.RECRSTDATE && exam.RECRENDDATE && (
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <Calendar className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />
                  </div>
                  <span className="font-bold text-foreground">
                    {exam.RECRSTDATE} ~ {exam.RECRENDDATE}
                  </span>
                </div>
              )}
              {exam.REGISTDT && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="h-6 w-6 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Clock className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <span className="font-medium">등록일: {exam.REGISTDT}</span>
                </div>
              )}
            </div>

            <Button className="w-full gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-bold rounded-2xl h-12 text-base group-hover:scale-105">
              자세히 보기
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
