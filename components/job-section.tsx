"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Clock, ChevronRight, DollarSign, Briefcase, Users, FileText, GraduationCap, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { getJobData } from "@/app/actions"

interface JobData {
  ENTRPS_NM: string
  RECRIT_TITL: string
  RECRIT_DEPT: string
  NCCS_RCEPT_DT: string
  NCCS_RCEPT_MTHD: string
  WAGE: string
  WORK_PARD: string
  WORK_LOC: string
  REGISTR_DE: string
  // 추가 상세 정보
  dtyCn?: string
  rcritNmpr?: string
  careerCnd?: string
  acdmcr?: string
  formalMth?: string
  presentnPapers?: string
  etcReferMatter?: string
}

export function JobSection() {
  const [jobs, setJobs] = useState<JobData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const result = await getJobData()

      if (result.success) {
        setJobs(result.data)
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
            <Briefcase className="h-6 w-6 text-destructive" />
          </div>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={fetchJobs} size="sm" className="mt-2 gradient-primary text-white border-0 shadow-md">
            다시 시도
          </Button>
        </div>
      </Card>
    )
  }

  if (jobs.length === 0) {
    return (
      <Card className="p-8 text-center border-0 shadow-sm bg-gradient-to-br from-card to-muted/20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <Briefcase className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">현재 등록된 일자리정보가 없습니다</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {jobs.map((job, index) => (
        <Card
          key={index}
          className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-white via-white to-slate-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/50 hover:scale-[1.02] hover:-translate-y-1"
        >
          <div className="relative p-6 space-y-5">
            {/* 배경 장식 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-[100px]"></div>
            
            <div className="relative space-y-3">
              {job.ENTRPS_NM && (
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-xl gradient-primary flex items-center justify-center shadow-md shadow-primary/25">
                    <Building2 className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{job.ENTRPS_NM}</span>
                </div>
              )}
              
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm leading-tight text-balance group-hover:text-primary transition-colors">{job.RECRIT_TITL}</h3>
                {job.RECRIT_DEPT && <p className="text-xs text-muted-foreground font-medium leading-relaxed">{job.RECRIT_DEPT}</p>}
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              {job.WORK_LOC && (
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <div className="h-5 w-5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <MapPin className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="font-medium">{job.WORK_LOC}</span>
                </div>
              )}
              {job.WAGE && (
                <div className="flex items-center gap-2.5">
                  <div className="h-5 w-5 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <DollarSign className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="font-semibold text-foreground text-xs">{job.WAGE}</span>
                </div>
              )}
              {job.NCCS_RCEPT_DT && (
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <div className="h-5 w-5 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Clock className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-medium">접수기간: {job.NCCS_RCEPT_DT}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {job.WORK_PARD && (
                <Badge className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-300 border-0 font-medium rounded-lg px-3 py-1 text-xs">
                  {job.WORK_PARD}
                </Badge>
              )}
              {job.NCCS_RCEPT_MTHD && (
                <Badge className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 font-medium rounded-lg px-3 py-1 text-xs">
                  {job.NCCS_RCEPT_MTHD}
                </Badge>
              )}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full gap-2 bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 dark:from-white dark:to-slate-100 dark:hover:from-slate-100 dark:hover:to-white text-white dark:text-slate-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold rounded-xl h-10 text-sm group-hover:scale-105">
                  자세히 보기
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-left text-base font-bold">{job.RECRIT_TITL}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-sm">
                  {job.dtyCn && (
                    <div>
                      <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        직무내용
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">{job.dtyCn}</p>
                    </div>
                  )}
                  
                  {job.rcritNmpr && (
                    <div>
                      <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        모집인원
                      </h4>
                      <p className="text-muted-foreground">{job.rcritNmpr}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {job.careerCnd && (
                      <div>
                        <h4 className="font-semibold text-primary mb-1">경력조건</h4>
                        <p className="text-muted-foreground text-xs">{job.careerCnd}</p>
                      </div>
                    )}
                    {job.acdmcr && (
                      <div>
                        <h4 className="font-semibold text-primary mb-1">학력</h4>
                        <p className="text-muted-foreground text-xs">{job.acdmcr}</p>
                      </div>
                    )}
                  </div>

                  {job.formalMth && (
                    <div>
                      <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        전형방법
                      </h4>
                      <p className="text-muted-foreground">{job.formalMth}</p>
                    </div>
                  )}

                  {job.presentnPapers && (
                    <div>
                      <h4 className="font-semibold text-primary mb-2">제출서류</h4>
                      <p className="text-muted-foreground">{job.presentnPapers}</p>
                    </div>
                  )}

                  {job.etcReferMatter && (
                    <div>
                      <h4 className="font-semibold text-primary mb-2">기타참고사항</h4>
                      <p className="text-muted-foreground leading-relaxed">{job.etcReferMatter}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <Button 
                      onClick={() => window.open("https://www.incheon.go.kr/IC010204", "_blank")}
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                    >
                      인천시 채용정보 페이지로 이동
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
