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
    const url = `http://www.incheon.go.kr/dp/openapi/data?apicode=12&key=${apiKey}&page=1`
    
    console.log("[DEBUG] Exam API 호출 시작")
    console.log("[DEBUG] URL:", url)
    
    const response = await fetch(url, {
      method: 'GET',
      cache: "no-store",
    })

    console.log("[DEBUG] Response status:", response.status)

    if (!response.ok) {
      const errorBody = await response.text()
      console.log("[DEBUG] Error response body:", errorBody)
      throw new Error(`API 호출 실패: ${response.status} - ${errorBody}`)
    }

    const xmlText = await response.text()
    console.log("[DEBUG] XML Response:", xmlText)
    
    // XML을 파싱해서 JSON으로 변환
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, "text/xml")
    const items = xmlDoc.getElementsByTagName("item")
    
    const examData: ExamData[] = Array.from(items).map((item, index) => ({
      RECRNO: item.getElementsByTagName("listNum")[0]?.textContent || `${index + 1}`,
      RECRTITLE: item.getElementsByTagName("sj")[0]?.textContent || "",
      REQCAREER: "정보 없음",
      REQEDUFORM: "정보 없음", 
      RECRSTDATE: "정보 없음",
      RECRENDDATE: "정보 없음",
      DISTCODE: "28",
      DISTNM: "인천광역시",
      RECRMTHCD: "공개경쟁",
      REGISTDT: item.getElementsByTagName("wrterDe")[0]?.textContent || "",
    }))
    
    console.log("[DEBUG] Parsed exam data:", examData)
    return { success: true, data: examData }
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
    const url = `http://www.incheon.go.kr/dp/openapi/data?apicode=13&key=${apiKey}&page=1`
    
    console.log("[DEBUG] Job API 호출 시작")
    console.log("[DEBUG] URL:", url)
    
    const response = await fetch(url, {
      method: 'GET',
      cache: "no-store",
    })

    console.log("[DEBUG] Response status:", response.status)

    if (!response.ok) {
      const errorBody = await response.text()
      console.log("[DEBUG] Error response body:", errorBody)
      throw new Error(`API 호출 실패: ${response.status} - ${errorBody}`)
    }

    const xmlText = await response.text()
    console.log("[DEBUG] XML Response:", xmlText)
    
    // XML을 파싱해서 JSON으로 변환
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, "text/xml")
    const items = xmlDoc.getElementsByTagName("item")
    
    const jobData: JobData[] = Array.from(items).map((item) => ({
      ENTRPS_NM: "인천광역시", // XML에 기업명 필드가 없어서 기본값
      RECRIT_TITL: item.getElementsByTagName("sj")[0]?.textContent || "",
      RECRIT_DEPT: item.getElementsByTagName("rcritJssfc")[0]?.textContent || "",
      NCCS_RCEPT_DT: `${item.getElementsByTagName("rceptBeginDte")[0]?.textContent || ""} ~ ${item.getElementsByTagName("rceptEndDte")[0]?.textContent || ""}`,
      NCCS_RCEPT_MTHD: item.getElementsByTagName("rceptMth")[0]?.textContent || "",
      WAGE: item.getElementsByTagName("wageCnd")[0]?.textContent || "",
      WORK_PARD: item.getElementsByTagName("emplymStle")[0]?.textContent || "",
      WORK_LOC: "인천광역시", // XML에 근무지 필드가 없어서 기본값
      REGISTR_DE: item.getElementsByTagName("writngDe")[0]?.textContent || "",
    }))
    
    console.log("[DEBUG] Parsed job data:", jobData)
    return { success: true, data: jobData }
  } catch (error) {
    console.log("[v0] Job API Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "오류가 발생했습니다",
    }
  }
}