"use server"

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

export async function getExamData() {
  try {
    const apiKey = "94c3405204d94d179f2de91347d312"

    console.log("[v0] Exam API 호출 시작")

    const response = await fetch(
      `https://api.odcloud.kr/api/apnmOrganRecrtInfoInqireService/v1/getApnmOrganRecrtInfoInqire?page=1&perPage=20&serviceKey=${apiKey}`,
      {
        cache: "no-store",
      },
    )

    if (!response.ok) {
      const errorBody = await response.text()
      console.log("[v0] Exam API Error:", errorBody)
      throw new Error("데이터를 불러오는데 실패했습니다")
    }

    const data = await response.json()
    console.log("[v0] Exam API 응답:", data)
    
    return { success: true, data: data.data as ExamData[] }
  } catch (error) {
    console.log("[v0] Exam API Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "오류가 발생했습니다",
    }
  }
}

export async function getJobData() {
  try {
    const apiKey = "cbca6867b6d44fff809f043962d0b5"

    console.log("Job API 호출 시작")

    const response = await fetch(
      `https://api.odcloud.kr/api/apnmOrganJobOfferInfoInqireService/v1/getApnmOrganJobOfferInfoInqire?page=1&perPage=20&serviceKey=${apiKey}`,
      {
        cache: "no-store",
      },
    )

    if (!response.ok) {
      const errorBody = await response.text()
      console.log("[v0] Job API Error:", errorBody)
      throw new Error("데이터를 불러오는데 실패했습니다")
    }

    const data = await response.json()
    console.log(" Job API 응답:", data)
    
    return { success: true, data: data.data as JobData[] }
  } catch (error) {
    console.log("[v0] Job API Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "오류가 발생했습니다",
    }
  }
}
