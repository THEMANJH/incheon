"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, ChevronRight, BookOpen, Building2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
  // 실제 API 필드
  cn?: string
  wrterDeptNm?: string
}

interface ExamSectionProps {
  searchQuery: string
}

export function ExamSection({ searchQuery }: ExamSectionProps) {
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

  // 검색 필터링
  const filteredExams = exams.filter(exam => 
    exam.RECRTITLE.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (exam.wrterDeptNm && exam.wrterDeptNm.toLowerCase().includes(searchQuery.toLowerCase()))
  )

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

  if (filteredExams.length === 0) {
    return (
      <Card className="p-6 text-center border-0 shadow-sm bg-gradient-to-br from-card to-muted/20">
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">
            {searchQuery ? "검색 결과가 없습니다" : "현재 등록된 시험정보가 없습니다"}
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-2">
      {filteredExams.map((exam) => (
        <Card
          key={exam.RECRNO}
          className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-white via-white to-blue-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-900/20 hover:scale-[1.02] hover:-translate-y-1"
        >
          <div className="relative p-6 space-y-5">
            {/* 배경 장식 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-[100px]"></div>
            
            <div className="relative space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="h-7 w-7 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/25 mt-0.5">
                  <BookOpen className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm leading-tight text-balance group-hover:text-blue-600 transition-colors">{exam.RECRTITLE}</h3>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {exam.REQEDUFORM && (
                  <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 border-0 font-medium rounded-lg px-3 py-1 text-xs">
                    {exam.REQEDUFORM}
                  </Badge>
                )}
                {exam.REQCAREER && (
                  <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 border-0 font-medium rounded-lg px-3 py-1 text-xs">
                    {exam.REQCAREER}
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              {exam.DISTNM && (
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <div className="h-5 w-5 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <MapPin className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="font-medium">{exam.DISTNM}</span>
                </div>
              )}
              {exam.RECRSTDATE && exam.RECRENDDATE && (
                <div className="flex items-center gap-2.5">
                  <div className="h-5 w-5 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <Calendar className="h-3 w-3 text-rose-600 dark:text-rose-400" />
                  </div>
                  <span className="font-semibold text-foreground text-xs">
                    {exam.RECRSTDATE} ~ {exam.RECRENDDATE}
                  </span>
                </div>
              )}
              {exam.REGISTDT && (
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <div className="h-5 w-5 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Clock className="h-3 w-3 text-slate-600 dark:text-slate-400" />
                  </div>
                  <span className="font-medium">등록일: {exam.REGISTDT}</span>
                </div>
              )}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold rounded-xl h-10 text-sm group-hover:scale-105">
                  자세히 보기
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-left text-base font-bold">{exam.RECRTITLE}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-sm">
                  {exam.wrterDeptNm && (
                    <div>
                      <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        작성부서
                      </h4>
                      <p className="text-muted-foreground">{exam.wrterDeptNm}</p>
                    </div>
                  )}
                  
                  {exam.cn && exam.cn !== "N" && (
                    <div>
                      <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        시험 내용
                      </h4>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{exam.cn}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <h4 className="font-semibold text-primary mb-1">지역</h4>
                      <p className="text-muted-foreground">{exam.DISTNM}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">등록일</h4>
                      <p className="text-muted-foreground">{exam.REGISTDT}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button 
                      onClick={() => window.open("https://www.incheon.go.kr/IC010205", "_blank")}
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                    >
                      인천시 시험정보 페이지로 이동
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      ))}
    </div>
  )
}
