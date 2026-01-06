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
    console.log("[v0] Exam API 호출 시작")

    // 임시로 목 데이터 사용 (API 엔드포인트 확인 후 실제 API로 변경 예정)
    const mockExamData: ExamData[] = [
      {
        RECRNO: "2026-001",
        RECRTITLE: "인천광역시 9급 공무원 채용",
        REQCAREER: "무관",
        REQEDUFORM: "고졸 이상",
        RECRSTDATE: "2026-01-15",
        RECRENDDATE: "2026-01-31",
        DISTCODE: "28",
        DISTNM: "인천광역시",
        RECRMTHCD: "공개경쟁",
        REGISTDT: "2026-01-06",
      },
      {
        RECRNO: "2026-002",
        RECRTITLE: "인천시교육청 교육행정직 채용",
        REQCAREER: "무관",
        REQEDUFORM: "대졸 이상",
        RECRSTDATE: "2026-01-20",
        RECRENDDATE: "2026-02-10",
        DISTCODE: "28",
        DISTNM: "인천광역시",
        RECRMTHCD: "공개경쟁",
        REGISTDT: "2026-01-06",
      },
      {
        RECRNO: "2026-003",
        RECRTITLE: "인천교통공사 신입사원 채용",
        REQCAREER: "경력무관",
        REQEDUFORM: "대졸 이상",
        RECRSTDATE: "2026-02-01",
        RECRENDDATE: "2026-02-20",
        DISTCODE: "28",
        DISTNM: "인천광역시",
        RECRMTHCD: "공개채용",
        REGISTDT: "2026-01-06",
      },
    ]

    return { success: true, data: mockExamData }

    /* 실제 API 호출 코드 (API 엔드포인트 확인 후 활성화)
    const apiKey = "94c3405204d94d179f2de91347d312"
    
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
    */
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
    console.log("[v0] Job API 호출 시작")

    // 임시로 목 데이터 사용 (API 엔드포인트 확인 후 실제 API로 변경 예정)
    const mockJobData: JobData[] = [
      {
        ENTRPS_NM: "인천광역시청",
        RECRIT_TITL: "디지털 전환 담당 인턴",
        RECRIT_DEPT: "정보통신과",
        NCCS_RCEPT_DT: "2026-01-31",
        NCCS_RCEPT_MTHD: "온라인 접수",
        WAGE: "월 220만원",
        WORK_PARD: "주 5일",
        WORK_LOC: "인천광역시 남동구",
        REGISTR_DE: "2026-01-06",
      },
      {
        ENTRPS_NM: "인천경제산업정보테크노파크",
        RECRIT_TITL: "AI 개발자 정규직",
        RECRIT_DEPT: "기술개발팀",
        NCCS_RCEPT_DT: "2026-02-15",
        NCCS_RCEPT_MTHD: "이메일 접수",
        WAGE: "연봉 4500만원",
        WORK_PARD: "주 5일",
        WORK_LOC: "인천광역시 연수구",
        REGISTR_DE: "2026-01-05",
      },
      {
        ENTRPS_NM: "인천항만공사",
        RECRIT_TITL: "물류 관리 계약직",
        RECRIT_DEPT: "물류운영팀",
        NCCS_RCEPT_DT: "2026-01-25",
        NCCS_RCEPT_MTHD: "방문 접수",
        WAGE: "월 280만원",
        WORK_PARD: "주 5일",
        WORK_LOC: "인천광역시 중구",
        REGISTR_DE: "2026-01-04",
      },
      {
        ENTRPS_NM: "인천국제공항공사",
        RECRIT_TITL: "고객서비스 담당자",
        RECRIT_DEPT: "고객서비스팀",
        NCCS_RCEPT_DT: "2026-02-10",
        NCCS_RCEPT_MTHD: "온라인 접수",
        WAGE: "월 250만원",
        WORK_PARD: "주 5일 (교대근무)",
        WORK_LOC: "인천국제공항",
        REGISTR_DE: "2026-01-03",
      },
    ]

    return { success: true, data: mockJobData }

    /* 실제 API 호출 코드 (API 엔드포인트 확인 후 활성화)
    const apiKey = "cbca6867b6d44fff809f043962d0b5"
    
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
    console.log("[v0] Job API 응답:", data)
    
    return { success: true, data: data.data as JobData[] }
    */
  } catch (error) {
    console.log("[v0] Job API Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "오류가 발생했습니다",
    }
  }
}