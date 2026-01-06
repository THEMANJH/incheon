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
  // 실제 API 필드
  cn?: string // 내용
  wrterDeptNm?: string // 작성부서
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
  // 추가 상세 정보
  dtyCn?: string // 직무내용
  rcritNmpr?: string // 모집인원
  careerCnd?: string // 경력조건
  acdmcr?: string // 학력
  formalMth?: string // 전형방법
  presentnPapers?: string // 제출서류
  etcReferMatter?: string // 기타참고사항
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
    
    // 간단한 XML 파싱 (정규식 사용)
    const itemMatches = xmlText.match(/<item>(.*?)<\/item>/gs) || []
    
    const examData: ExamData[] = itemMatches.map((itemXml, index) => {
      const getTagValue = (tag: string) => {
        const match = itemXml.match(new RegExp(`<${tag}>(.*?)<\/${tag}>`, 's'))
        return match ? match[1].trim() : ""
      }
      
      return {
        RECRNO: getTagValue("listNum") || `${index + 1}`,
        RECRTITLE: getTagValue("sj") || "",
        REQCAREER: "정보 없음",
        REQEDUFORM: "정보 없음", 
        RECRSTDATE: "정보 없음",
        RECRENDDATE: "정보 없음",
        DISTCODE: "28",
        DISTNM: "인천광역시",
        RECRMTHCD: "공개경쟁",
        REGISTDT: getTagValue("writngDe") || "",
        // 실제 API 필드
        cn: getTagValue("cn") || "",
        wrterDeptNm: getTagValue("wrterDeptNm") || "",
      }
    })
    
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
    
    // 간단한 XML 파싱 (정규식 사용)
    const itemMatches = xmlText.match(/<item>(.*?)<\/item>/gs) || []
    
    const jobData: JobData[] = itemMatches.map((itemXml) => {
      const getTagValue = (tag: string) => {
        const match = itemXml.match(new RegExp(`<${tag}>(.*?)<\/${tag}>`, 's'))
        return match ? match[1].trim() : ""
      }
      
      const rceptBegin = getTagValue("rceptBeginDte")
      const rceptEnd = getTagValue("rceptEndDte")
      const rceptPeriod = rceptBegin && rceptEnd ? `${rceptBegin} ~ ${rceptEnd}` : (rceptBegin || rceptEnd || "정보 없음")
      
      return {
        ENTRPS_NM: "인천광역시",
        RECRIT_TITL: getTagValue("sj") || "",
        RECRIT_DEPT: getTagValue("rcritJssfc") || "",
        NCCS_RCEPT_DT: rceptPeriod,
        NCCS_RCEPT_MTHD: getTagValue("rceptMth") || "",
        WAGE: getTagValue("wageCnd") || "",
        WORK_PARD: getTagValue("emplymStle") || "",
        WORK_LOC: "인천광역시",
        REGISTR_DE: getTagValue("writngDe") || "",
        // 추가 상세 정보
        dtyCn: getTagValue("dtyCn") || "",
        rcritNmpr: getTagValue("rcritNmpr") || "",
        careerCnd: getTagValue("careerCnd") || "",
        acdmcr: getTagValue("acdmcr") || "",
        formalMth: getTagValue("formalMth") || "",
        presentnPapers: getTagValue("presentnPapers") || "",
        etcReferMatter: getTagValue("etcReferMatter") || "",
      }
    })
    
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