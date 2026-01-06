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
    
    // 여러 가능한 엔드포인트 시도
    const possibleUrls = [
      "https://api.odcloud.kr/api/exam/v1/list",
      "https://api.odcloud.kr/api/recruitment/v1/exam",
      "https://www.incheon.go.kr/api/exam",
      "https://openapi.incheon.go.kr/exam",
    ]
    
    for (const url of possibleUrls) {
      try {
        console.log(`[DEBUG] 시도 중인 URL: ${url}`)
        
        const response = await fetch(`${url}?page=1&perPage=20`, {
          method: 'GET',
          headers: {
            'Authorization': `Infuser ${apiKey}`,
            'Content-Type': 'application/json',
          },
          cache: "no-store",
        })

        console.log(`[DEBUG] ${url} - Status:`, response.status)
        
        if (response.ok) {
          const data = await response.json()
          console.log(`[DEBUG] 성공! ${url} - Response:`, data)
          return { success: true, data: data.data as ExamData[] }
        } else {
          const errorBody = await response.text()
          console.log(`[DEBUG] ${url} - Error:`, errorBody)
        }
      } catch (error) {
        console.log(`[DEBUG] ${url} - Exception:`, error)
      }
    }
    
    throw new Error("모든 엔드포인트에서 실패했습니다")
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