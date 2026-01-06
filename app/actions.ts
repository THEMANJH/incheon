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
    const url = `https://api.odcloud.kr/api/apnmOrganRecrtInfoInqireService/v1/getApnmOrganRecrtInfoInqire?page=1&perPage=20`
    
    console.log("[DEBUG] Exam API 호출 시작")
    console.log("[DEBUG] URL:", url)
    console.log("[DEBUG] API Key:", apiKey)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Infuser ${apiKey}`,
        'Content-Type': 'application/json',
      },
      cache: "no-store",
    })

    console.log("[DEBUG] Response status:", response.status)
    console.log("[DEBUG] Response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorBody = await response.text()
      console.log("[DEBUG] Error response body:", errorBody)
      throw new Error(`API 호출 실패: ${response.status} - ${errorBody}`)
    }

    const data = await response.json()
    console.log("[DEBUG] Success response:", data)
    
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
    const url = `https://api.odcloud.kr/api/apnmOrganJobOfferInfoInqireService/v1/getApnmOrganJobOfferInfoInqire?page=1&perPage=20`
    
    console.log("[DEBUG] Job API 호출 시작")
    console.log("[DEBUG] URL:", url)
    console.log("[DEBUG] API Key:", apiKey)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Infuser ${apiKey}`,
        'Content-Type': 'application/json',
      },
      cache: "no-store",
    })

    console.log("[DEBUG] Response status:", response.status)
    console.log("[DEBUG] Response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorBody = await response.text()
      console.log("[DEBUG] Error response body:", errorBody)
      throw new Error(`API 호출 실패: ${response.status} - ${errorBody}`)
    }

    const data = await response.json()
    console.log("[DEBUG] Success response:", data)
    
    return { success: true, data: data.data as JobData[] }
  } catch (error) {
    console.log("[v0] Job API Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "오류가 발생했습니다",
    }
  }
}