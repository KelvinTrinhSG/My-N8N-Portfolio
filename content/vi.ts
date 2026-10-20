// Vietnamese UI text. Same shape as en.ts — TypeScript flags any missing key.
import type { Dict } from "./en";

export const vi: Dict = {
  meta: {
    title: "Kelvin Trinh — AI Agent & n8n Automation",
    description:
      "Automation n8n và AI agent sẵn sàng cho production: có test, idempotent, tích hợp HubSpot, Google Sheets, Calendly và email.",
  },
  nav: {
    name: "Kelvin Trinh",
    links: {
      home: "Trang chủ",
      about: "Giới thiệu",
      skills: "Kỹ năng",
      projects: "Dự án",
      contact: "Liên hệ",
    },
    language: "Ngôn ngữ",
    toLight: "Chuyển sang giao diện sáng",
    toDark: "Chuyển sang giao diện tối",
  },
  hero: {
    greeting: "Xin chào, tôi là",
    name: "Kelvin Trinh",
    role: "AI Agent & n8n Automation",
    intro:
      "Tôi xây dựng automation không làm mất lead: có test, bảo mật, và kết nối với chính những công cụ đội của bạn đang dùng.",
    viewProjects: "Xem dự án",
    contact: "Liên hệ",
    avatarAlt: "Ảnh chân dung Kelvin Trinh",
  },
  about: {
    title: "Giới thiệu",
    subtitle: "Vì sao automation của tôi sẵn sàng cho production",
    body: [
      "Nhiều workflow chạy tốt khi demo nhưng hỏng khi dùng thật. Tôi thiết kế automation n8n cho môi trường thật: mỗi workflow đều có unit test, ghi dữ liệu idempotent để chạy lại không bao giờ tạo bản trùng, và trả lời webhook ngay để không bị timeout.",
      "Khi có AI tham gia, kết quả của AI được kiểm tra trước khi chạm vào CRM. Lỗi được đưa vào hàng đợi dead-letter để thử lại, thay vì âm thầm biến mất.",
    ],
    points: [
      { value: "63", label: "unit test" },
      { value: "10", label: "workflow đã chạy thật" },
      { value: "5+", label: "tích hợp" },
    ],
  },
  skills: {
    title: "Kỹ năng & Tích hợp",
    subtitle: "Các công cụ tôi kết nối thành workflow đáng tin cậy",
    items: [
      { name: "n8n", note: "Tự động hóa workflow" },
      { name: "HubSpot", note: "CRM" },
      { name: "Google Sheets", note: "Dữ liệu & báo cáo" },
      { name: "Calendly", note: "Đặt lịch" },
      { name: "OpenAI", note: "AI agent & trích xuất" },
      { name: "Gmail / SMTP", note: "Email" },
      { name: "JavaScript / Node.js", note: "Code node" },
      { name: "Testing", note: "Unit test & chạy thật" },
    ],
  },
  projects: {
    title: "Dự án",
    subtitle: "Vấn đề thật, giải quyết bằng automation chuẩn production",
  },
  project: {
    back: "Quay lại danh sách dự án",
    principles: "Nguyên tắc kỹ thuật",
    viewRepo: "Xem trên GitHub",
    workflows: "Workflow",
    workflowsHint: "Bấm vào một workflow để xem cách nó hoạt động và bằng chứng từ lần chạy thật.",
    ctaTitle: "Đội của bạn cần automation như thế này?",
    contact: "Liên hệ với tôi",
  },
  workflow: {
    trigger: "Trigger",
    howItWorks: "Cách hoạt động",
    highlights: "Điểm nổi bật kỹ thuật",
    result: "Kết quả",
    proof: "Bằng chứng chạy thật",
    viewOnGitHub: "Xem trên GitHub",
  },
  lightbox: {
    open: "Xem lớn",
    close: "Đóng",
    prev: "Ảnh trước",
    next: "Ảnh sau",
  },
  contact: {
    title: "Liên hệ",
    subtitle: "Bạn đang cần một workflow? Hãy trao đổi với tôi.",
    email: "Email",
    emailAddress: "thkien85@gmail.com",
    github: "GitHub",
    githubHandle: "KelvinTrinhSG",
  },
  footer: {
    rights: "Xây dựng bằng Next.js.",
  },
};
