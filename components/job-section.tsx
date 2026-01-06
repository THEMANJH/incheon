"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Clock, ChevronRight, DollarSign, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
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
            
            <div className="relative space-y-4">
              {job.ENTRPS_NM && (
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-2xl gradient-primary flex items-center justify-center shadow-md shadow-primary/25">
                    <Building2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{job.ENTRPS_NM}</span>
                </div>
              )}
              
              <div className="space-y-2">
                <h3 className="font-black text-lg leading-tight text-balance group-hover:text-primary transition-colors">{job.RECRIT_TITL}</h3>
                {job.RECRIT_DEPT && <p className="text-sm text-muted-foreground font-medium leading-relaxed">{job.RECRIT_DEPT}</p>}
              </div>
            </div>

            <div className="space-y-3 text-sm">
              {job.WORK_LOC && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="h-6 w-6 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="font-medium">{job.WORK_LOC}</span>
                </div>
              )}
              {job.WAGE && (
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <DollarSign className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="font-bold text-foreground text-base">{job.WAGE}</span>
                </div>
              )}
              {job.NCCS_RCEPT_DT && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="h-6 w-6 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-medium">접수기간: {job.NCCS_RCEPT_DT}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {job.WORK_PARD && (
                <Badge className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-300 border-0 font-semibold rounded-xl px-4 py-1.5">
                  {job.WORK_PARD}
                </Badge>
              )}
              {job.NCCS_RCEPT_MTHD && (
                <Badge className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 font-semibold rounded-xl px-4 py-1.5">
                  {job.NCCS_RCEPT_MTHD}
                </Badge>
              )}
            </div>

            <Button className="w-full gap-3 bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 dark:from-white dark:to-slate-100 dark:hover:from-slate-100 dark:hover:to-white text-white dark:text-slate-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-bold rounded-2xl h-12 text-base group-hover:scale-105">
              자세히 보기
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
