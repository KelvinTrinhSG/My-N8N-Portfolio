// Project content. English is taken from each workflow's README in the repo;
// Vietnamese is a translation for the learner to review (missing `vi` falls back to `en`).
import type { L, Project, Screenshot } from "@/content/types";

const l = (en: string, vi: string): L => ({ en, vi });
const shot = (file: string, en: string, vi: string, kind: Screenshot["kind"]): Screenshot => ({
  file,
  label: l(en, vi),
  kind,
});

export const n8nFormCrmAutomations: Project = {
  slug: "n8n-form-crm-automations",
  repo: "https://github.com/KelvinTrinhSG/n8n-form-crm-automations",
  name: l("n8n Automations: Forms → CRM → Sheets → Email", "n8n Automation: Form → CRM → Sheets → Email"),
  summary: l(
    "Ten production-grade n8n workflows that move leads from forms, inboxes and bookings into HubSpot without losing or duplicating a single one.",
    "Mười workflow n8n chuẩn production, đưa lead từ form, hộp thư và lịch hẹn vào HubSpot mà không làm mất hay trùng một lead nào.",
  ),
  overview: l(
    "One everyday business system: website forms and inboxes feeding a HubSpot CRM, a Google Sheet for reporting, and email alerts to the team. Each workflow solves a problem small B2B teams actually have: duplicate contacts, bot submissions, leads lost when an API fails, leads nobody called back. Every workflow has been run live against HubSpot, Google Sheets and Gmail, and the bugs those runs surfaced are fixed and documented.",
    "Một hệ thống quen thuộc của doanh nghiệp: form trên website và hộp thư đổ về HubSpot CRM, một Google Sheet để báo cáo, và email thông báo cho đội. Mỗi workflow giải quyết một vấn đề mà các đội B2B nhỏ thực sự gặp: contact bị trùng, bot gửi form, lead bị mất khi API lỗi, lead không ai gọi lại. Mọi workflow đều đã chạy thật với HubSpot, Google Sheets và Gmail; các lỗi phát hiện trong lúc chạy đã được sửa và ghi lại.",
  ),
  stats: [
    { value: "10", label: l("workflows", "workflow") },
    { value: "63", label: l("tests", "test") },
    { value: "10/10", label: l("run live", "đã chạy thật") },
  ],
  principles: [
    l(
      "Idempotent writes: upsert by key, so retries and double submits never create duplicates.",
      "Ghi dữ liệu idempotent: upsert theo khóa, nên chạy lại hay bấm gửi hai lần cũng không tạo bản trùng.",
    ),
    l(
      "Respond fast, work after: webhooks answer 202 before slow CRM calls, so callers never time out.",
      "Trả lời trước, xử lý sau: webhook trả 202 trước khi gọi CRM, nên bên gửi không bao giờ bị timeout.",
    ),
    l(
      "Never lose data: failures go to retry queues and review tabs, every reject has a written reason.",
      "Không bao giờ mất dữ liệu: lỗi đi vào hàng đợi thử lại và tab cần xem lại; mỗi lần từ chối đều ghi rõ lý do.",
    ),
    l(
      "AI suggests, code decides: model output is validated before it reaches the CRM.",
      "AI gợi ý, code quyết định: kết quả của AI được kiểm tra trước khi vào CRM.",
    ),
    l(
      "Code in files, not JSON: Code-node JavaScript is unit-tested without n8n.",
      "Code nằm trong file, không nằm trong JSON: JavaScript của Code node được unit test mà không cần n8n.",
    ),
  ],
  tags: ["n8n", "HubSpot", "Google Sheets", "OpenAI", "Calendly", "Email"],
  cover: "01-hubspot-contact",
  workflows: [
    {
      id: "01",
      folder: "01-form-to-crm-sheets-email",
      name: l("Form → HubSpot → Sheets → Email", "Form → HubSpot → Sheets → Email"),
      problem: l(
        "Turns every website form submission into a clean CRM contact, a sheet row and a sales email, within seconds and without duplicates.",
        "Biến mỗi lần gửi form trên website thành một contact sạch trong CRM, một dòng trong sheet và một email cho đội sales, chỉ trong vài giây và không trùng.",
      ),
      tags: ["Webhook", "HubSpot", "Google Sheets", "Email"],
      trigger: l(
        "Webhook: the website form POSTs each submission (Webflow, WordPress, Typeform, Jotform…).",
        "Webhook: form trên website gửi POST mỗi lần có người điền (Webflow, WordPress, Typeform, Jotform…).",
      ),
      steps: [
        l(
          "Clean and validate: field aliases, email typo fixes (gmial.com), names re-cased, phone to E.164.",
          "Làm sạch và kiểm tra: nhận nhiều tên trường, sửa lỗi gõ email (gmial.com), chuẩn hóa chữ hoa tên, số điện thoại về E.164.",
        ),
        l(
          "Answer 400 with errors or 202 right away, so the visitor never waits for HubSpot.",
          "Trả 400 kèm lỗi hoặc 202 ngay lập tức, nên khách không phải chờ HubSpot.",
        ),
        l(
          "Search HubSpot by email, then update or create with explicit data rules.",
          "Tìm trong HubSpot theo email, rồi cập nhật hoặc tạo mới theo quy tắc dữ liệu rõ ràng.",
        ),
        l(
          "Upsert the Leads sheet and email the sales team what changed.",
          "Upsert vào sheet Leads và email cho đội sales những gì đã thay đổi.",
        ),
      ],
      highlights: [
        l(
          "Never overwrites CRM data with a blank; lifecycle stage only moves forward.",
          "Không bao giờ ghi đè dữ liệu CRM bằng ô trống; lifecycle stage chỉ tiến lên, không lùi.",
        ),
        l(
          "Race-safe create via HubSpot batch upsert keyed on email.",
          "Tạo contact an toàn khi hai request đến cùng lúc, nhờ batch upsert của HubSpot theo email.",
        ),
        l(
          "After 3 retries, failed syncs go to a queue instead of being lost.",
          "Sau 3 lần thử lại, bản ghi lỗi được đưa vào hàng đợi thay vì bị mất.",
        ),
        l(
          "Sheets writes use RAW mode, so a visitor's =HYPERLINK() is never executed.",
          "Ghi vào Sheets ở chế độ RAW, nên công thức =HYPERLINK() do khách nhập không bao giờ được chạy.",
        ),
      ],
      result: l("~10 h/month saved (est. 100 leads × 6 min)", "Tiết kiệm ~10 giờ/tháng (ước tính 100 lead × 6 phút)"),
      screenshots: [
        shot("01-hubspot-contact", "HubSpot contact", "Contact trong HubSpot", "result"),
        shot("01-sheet-leads", "Leads sheet", "Sheet Leads", "result"),
        shot("01-email-new-lead", "New lead email", "Email lead mới", "result"),
        shot("01-execution-create", "New contact run", "Lần chạy tạo contact mới", "execution"),
        shot("01-execution-update", "Returning contact run", "Lần chạy với contact cũ", "execution"),
        shot("01-execution-duplicate", "Duplicate stopped", "Chặn bản trùng", "execution"),
      ],
    },
    {
      id: "02",
      folder: "02-secure-webhook-gateway",
      name: l("Secure Webhook Gateway", "Cổng webhook bảo mật"),
      problem: l(
        "Stops bots, double submits and forged requests before they pollute the CRM.",
        "Chặn bot, form gửi trùng và request giả mạo trước khi chúng làm bẩn CRM.",
      ),
      tags: ["Webhook", "HMAC", "Security", "Google Sheets"],
      trigger: l(
        "Webhook with raw body, placed in front of the lead pipeline.",
        "Webhook giữ nguyên raw body, đặt trước luồng xử lý lead.",
      ),
      steps: [
        l(
          "Verify the HMAC-SHA256 signature with a 5-minute replay window.",
          "Kiểm tra chữ ký HMAC-SHA256, chỉ chấp nhận request trong vòng 5 phút để chống gửi lại.",
        ),
        l("Rate-limit each IP (5 requests / 10 min).", "Giới hạn tần suất theo IP (5 request / 10 phút)."),
        l(
          "Score spam: honeypot, or two weak signals such as a disposable email and too many links.",
          "Chấm điểm spam: honeypot, hoặc hai dấu hiệu yếu như email dùng một lần và quá nhiều link.",
        ),
        l(
          "Drop duplicates, then forward clean leads to workflow 01.",
          "Loại bản trùng, rồi chuyển lead sạch sang workflow 01.",
        ),
      ],
      highlights: [
        l(
          "Timing-safe signature check that fails closed if the secret is missing.",
          "So sánh chữ ký an toàn trước tấn công đo thời gian, và từ chối tất cả nếu thiếu secret.",
        ),
        l(
          "Spam gets a silent 200, so bot authors learn nothing.",
          "Spam nhận về 200 bình thường, nên người viết bot không biết mình bị phát hiện.",
        ),
        l(
          "Live run found a race between overlapping executions; fixed with a second duplicate guard in 01.",
          "Lần chạy thật phát hiện lỗi khi hai lần chạy chồng nhau; đã sửa bằng lớp chặn trùng thứ hai ở 01.",
        ),
      ],
      result: l("14/14 live test requests handled correctly", "14/14 request thử thật được xử lý đúng"),
      screenshots: [
        shot("02-live-test-run", "14/14 live tests passed", "14/14 test thật đạt", "result"),
        shot("02-sheet-spam-log", "Spam Log tab", "Tab Spam Log", "result"),
        shot("02-execution-accepted", "Signed lead accepted", "Lead có chữ ký được nhận", "execution"),
        shot("02-execution-duplicate", "Duplicate blocked", "Chặn bản trùng", "execution"),
        shot("02-execution-spam", "Spam logged", "Ghi nhận spam", "execution"),
        shot("02-execution-rate-limited", "Rate-limited", "Bị giới hạn tần suất", "execution"),
        shot("02-execution-rejected", "Forged request rejected", "Từ chối request giả mạo", "execution"),
      ],
    },
    {
      id: "03",
      folder: "03-crm-retry-queue",
      name: l("CRM Retry Queue", "Hàng đợi thử lại CRM"),
      problem: l(
        "Leads are no longer lost when HubSpot is down, rate-limits you or a token expires.",
        "Lead không còn bị mất khi HubSpot sập, giới hạn tần suất hay token hết hạn.",
      ),
      tags: ["Schedule", "HubSpot", "Google Sheets", "Email"],
      trigger: l("Schedule: every 15 minutes.", "Lịch chạy: mỗi 15 phút."),
      steps: [
        l(
          "Read the Failed Syncs queue and pick up to 50 rows that are due.",
          "Đọc hàng đợi Failed Syncs và lấy tối đa 50 dòng đã tới hạn.",
        ),
        l("Upsert each lead to HubSpot by email.", "Upsert từng lead vào HubSpot theo email."),
        l(
          "Classify failures as permanent, auth or temporary and schedule the next retry.",
          "Phân loại lỗi: vĩnh viễn, xác thực hay tạm thời, rồi hẹn lần thử tiếp theo.",
        ),
        l("Email ops when a human is needed.", "Email cho đội vận hành khi cần người xử lý."),
      ],
      highlights: [
        l(
          "Dead-letter queue pattern with exponential backoff + jitter (15 min → 6 h cap).",
          "Mô hình dead-letter queue với exponential backoff + jitter (15 phút → tối đa 6 giờ).",
        ),
        l(
          "A 400 is marked dead at once; an expired token alerts ops on the first failure.",
          "Lỗi 400 bị đánh dấu dead ngay; token hết hạn thì báo đội vận hành từ lần lỗi đầu tiên.",
        ),
        l(
          "Idempotent retries: upsert by email, so a lost response never creates a duplicate.",
          "Thử lại idempotent: upsert theo email, nên mất phản hồi cũng không tạo bản trùng.",
        ),
      ],
      screenshots: [
        shot("03-sheet-failed-syncs", "Failed Syncs queue", "Hàng đợi Failed Syncs", "result"),
        shot("03-email-ops", "Escalation email", "Email báo đội vận hành", "result"),
        shot("03-execution-resolved", "Retry resolved", "Thử lại thành công", "execution"),
        shot("03-execution-dead", "Marked dead + escalated", "Đánh dấu dead + báo lên", "execution"),
      ],
    },
    {
      id: "04",
      folder: "04-lead-routing-round-robin",
      name: l("Lead Routing (Round Robin)", "Phân lead (Round Robin)"),
      problem: l(
        "Assigns every new lead to the right rep in seconds, fairly, with rules the sales manager edits in a sheet.",
        "Giao mỗi lead mới cho đúng nhân viên sales trong vài giây, công bằng, theo quy tắc mà quản lý sales tự sửa trong sheet.",
      ),
      tags: ["Webhook", "HubSpot", "Google Sheets", "Email"],
      trigger: l(
        "Webhook: called after workflow 01 (or from HubSpot, Zapier, anything that can POST).",
        "Webhook: được gọi sau workflow 01 (hoặc từ HubSpot, Zapier, bất cứ thứ gì gửi được POST).",
      ),
      steps: [
        l(
          "Read the Sales Reps tab: territories, segments, out-of-office dates.",
          "Đọc tab Sales Reps: khu vực, phân khúc, ngày nghỉ phép.",
        ),
        l(
          "Keep an existing owner; otherwise filter by segment, territory and availability.",
          "Giữ người phụ trách cũ; nếu chưa có thì lọc theo phân khúc, khu vực và ai đang làm việc.",
        ),
        l(
          "Round robin inside the remaining pool and set the owner in HubSpot.",
          "Chia vòng tròn trong nhóm còn lại và gán người phụ trách trong HubSpot.",
        ),
        l("Log the decision and email the assigned rep.", "Ghi lại quyết định và email cho người được giao."),
      ],
      highlights: [
        l("Routing rules are data in a sheet, not code.", "Quy tắc phân lead là dữ liệu trong sheet, không phải code."),
        l("Existing customers keep their account manager.", "Khách hàng cũ giữ nguyên người phụ trách."),
        l(
          "Audit trail: every assignment records the rule that produced it.",
          "Có nhật ký: mỗi lần giao lead đều ghi quy tắc nào đã quyết định.",
        ),
        l(
          "No match never drops the lead: the manager gets an 'Unassigned lead' email.",
          "Không ai phù hợp thì lead vẫn không bị bỏ: quản lý nhận email 'Lead chưa được giao'.",
        ),
      ],
      result: l("~6 h/month of manager time saved (est.)", "Tiết kiệm ~6 giờ/tháng của quản lý (ước tính)"),
      screenshots: [
        shot("04-sheet-assignments", "Assignments audit trail", "Nhật ký giao lead", "result"),
        shot("04-email-rep", "Email to the rep", "Email cho nhân viên sales", "result"),
        shot("04-execution-new-lead", "New lead assigned", "Giao lead mới", "execution"),
        shot("04-execution-owner-kept", "Existing owner kept", "Giữ người phụ trách cũ", "execution"),
      ],
    },
    {
      id: "05",
      folder: "05-speed-to-lead-sla",
      name: l("Speed-to-Lead SLA", "SLA phản hồi lead"),
      problem: l(
        "Alerts the team when a lead waits too long for a first reply, counted in business hours.",
        "Báo cho đội khi một lead chờ quá lâu chưa được phản hồi, tính theo giờ làm việc.",
      ),
      tags: ["Schedule", "HubSpot", "Google Sheets", "Email"],
      trigger: l(
        "Schedule: every 15 minutes during business hours (Mon–Fri 9–18).",
        "Lịch chạy: mỗi 15 phút trong giờ làm việc (T2–T6, 9–18h).",
      ),
      steps: [
        l(
          "Compute business minutes since each lead arrived (weekends, holidays, DST handled).",
          "Tính số phút làm việc kể từ khi lead đến (đã xử lý cuối tuần, ngày lễ, giờ mùa hè).",
        ),
        l(
          "Check HubSpot for logged activity before alerting anyone.",
          "Kiểm tra HubSpot xem đã có ai liên hệ chưa, trước khi báo bất kỳ ai.",
        ),
        l(
          "Remind the owner after 1 business hour, escalate to the manager after 4.",
          "Nhắc người phụ trách sau 1 giờ làm việc, báo lên quản lý sau 4 giờ.",
        ),
        l("Group alerts per recipient and record what was sent.", "Gom cảnh báo theo người nhận và ghi lại những gì đã gửi."),
      ],
      highlights: [
        l(
          "The CRM is the source of truth: leads already contacted are never nagged about.",
          "CRM là nguồn sự thật: lead đã được liên hệ thì không bị nhắc nữa.",
        ),
        l(
          "One email per recipient with a table, each level sent once.",
          "Mỗi người nhận một email dạng bảng, mỗi mức cảnh báo chỉ gửi một lần.",
        ),
        l(
          "Live run caught reminders going to an inactive rep; now escalated to the manager.",
          "Lần chạy thật phát hiện lời nhắc gửi tới nhân viên đã nghỉ; nay được chuyển lên quản lý.",
        ),
      ],
      result: l("~5 h/month saved (est.)", "Tiết kiệm ~5 giờ/tháng (ước tính)"),
      screenshots: [
        shot("05-sheet-leads-sla", "SLA levels in Leads", "Mức SLA trong Leads", "result"),
        shot("05-email-reminder", "Reminder to owner", "Nhắc người phụ trách", "result"),
        shot("05-email-breach", "Escalation to manager", "Báo lên quản lý", "result"),
        shot("05-execution-alerts", "Alerts sent", "Đã gửi cảnh báo", "execution"),
        shot("05-execution-no-repeat", "No repeat alert", "Không nhắc lặp lại", "execution"),
      ],
    },
    {
      id: "06",
      folder: "06-crm-to-sheets-incremental-sync",
      name: l("HubSpot → Sheets Incremental Sync", "Đồng bộ tăng dần HubSpot → Sheets"),
      problem: l(
        "Keeps a reporting sheet in sync with HubSpot every hour, fetching only what changed.",
        "Giữ sheet báo cáo khớp với HubSpot mỗi giờ, chỉ lấy những gì đã thay đổi.",
      ),
      tags: ["Schedule", "HubSpot", "Google Sheets", "Pagination"],
      trigger: l("Schedule: every hour.", "Lịch chạy: mỗi giờ."),
      steps: [
        l(
          "Read the cursor (newest lastmodifieddate synced so far).",
          "Đọc con trỏ (lastmodifieddate mới nhất đã đồng bộ).",
        ),
        l(
          "Search HubSpot for contacts changed since the cursor, 100 per page, following pagination.",
          "Tìm trong HubSpot các contact thay đổi kể từ con trỏ, 100 contact mỗi trang, đi qua từng trang.",
        ),
        l(
          "Dedupe across pages and translate internal values to readable labels.",
          "Loại trùng giữa các trang và đổi giá trị nội bộ thành nhãn dễ đọc.",
        ),
        l(
          "Upsert the sheet, then move the cursor only after the write succeeded.",
          "Upsert vào sheet, và chỉ dời con trỏ khi đã ghi thành công.",
        ),
      ],
      highlights: [
        l(
          "Cursor-based incremental sync: no full export, no wasted API quota.",
          "Đồng bộ tăng dần theo con trỏ: không xuất toàn bộ, không phí quota API.",
        ),
        l(
          "GTE boundary + upsert by ID: nothing skipped, nothing duplicated.",
          "Mốc GTE + upsert theo ID: không bỏ sót, không trùng.",
        ),
        l(
          "Live run: 2 pages (100 + 51), 151 distinct contacts, no overlap.",
          "Chạy thật: 2 trang (100 + 51), 151 contact khác nhau, không chồng lặp.",
        ),
      ],
      result: l("~2 h/month saved (est.)", "Tiết kiệm ~2 giờ/tháng (ước tính)"),
      screenshots: [
        shot("06-sheet-crm-contacts", "CRM Contacts sheet", "Sheet CRM Contacts", "result"),
        shot("06-sheet-sync-state", "Sync cursor", "Con trỏ đồng bộ", "result"),
        shot("06-execution-pagination", "2 pages → 151 rows", "2 trang → 151 dòng", "execution"),
        shot("06-execution-incremental", "Only changed contacts", "Chỉ contact đã thay đổi", "execution"),
      ],
    },
    {
      id: "07",
      folder: "07-bulk-csv-import-dedupe",
      name: l("Bulk CSV Import + Dedupe", "Nhập CSV hàng loạt + loại trùng"),
      problem: l(
        "Imports messy event lead lists into HubSpot without duplicates, and tells the uploader exactly which rows failed.",
        "Nhập danh sách lead lộn xộn từ sự kiện vào HubSpot mà không trùng, và báo cho người tải lên chính xác dòng nào bị lỗi.",
      ),
      tags: ["Form", "CSV", "HubSpot", "Email"],
      trigger: l(
        "Internal n8n form: upload a CSV with a source name and your email.",
        "Form nội bộ của n8n: tải lên file CSV kèm tên nguồn và email của bạn.",
      ),
      steps: [
        l("Parse the CSV and match headers through aliases.", "Đọc CSV và nhận diện tiêu đề cột theo nhiều tên gọi."),
        l(
          "Reject bad rows with a reason and merge duplicates inside the file.",
          "Từ chối dòng lỗi kèm lý do và gộp các dòng trùng trong file.",
        ),
        l(
          "Batch upsert to HubSpot, 100 per request, one request per second.",
          "Upsert hàng loạt vào HubSpot, 100 dòng mỗi request, mỗi giây một request.",
        ),
        l("Email a report and log every problem row.", "Gửi email báo cáo và ghi lại mọi dòng có vấn đề."),
      ],
      highlights: [
        l(
          "Dedupe before HubSpot: one duplicate in a batch would otherwise reject 99 good rows.",
          "Loại trùng trước khi gửi HubSpot: chỉ một bản trùng trong batch là HubSpot từ chối luôn 99 dòng tốt.",
        ),
        l(
          "Handles 207 Multi-Status partial failures per record.",
          "Xử lý lỗi từng phần (207 Multi-Status) cho từng bản ghi.",
        ),
        l(
          "Live run: 155 lines → 150 created, 2 merged, 2 rejected with row numbers.",
          "Chạy thật: 155 dòng → tạo 150, gộp 2, từ chối 2 kèm số dòng.",
        ),
      ],
      result: l("~3–6 h/month saved (est.)", "Tiết kiệm ~3–6 giờ/tháng (ước tính)"),
      screenshots: [
        shot("07-email-report", "Import report email", "Email báo cáo nhập", "result"),
        shot("07-sheet-import-rejects", "Rejected rows", "Các dòng bị từ chối", "result"),
        shot("07-execution-import", "155 rows → 2 batches", "155 dòng → 2 batch", "execution"),
      ],
    },
    {
      id: "08",
      folder: "08-inbox-ai-to-crm",
      name: l("Inbox → AI → CRM", "Hộp thư → AI → CRM"),
      problem: l(
        "Finds the real sales inquiries in a shared inbox and puts them in HubSpot, with AI kept on a short leash.",
        "Tìm ra những yêu cầu mua hàng thật trong hộp thư chung và đưa vào HubSpot, với AI được kiểm soát chặt.",
      ),
      tags: ["IMAP", "OpenAI", "HubSpot", "Google Sheets"],
      trigger: l("IMAP: new unseen email in the shared inbox.", "IMAP: email mới chưa đọc trong hộp thư chung."),
      steps: [
        l(
          "Rules drop noise first (auto-replies, newsletters, handled threads) at no AI cost.",
          "Quy tắc lọc nhiễu trước (trả lời tự động, bản tin, luồng đã xử lý), không tốn chi phí AI.",
        ),
        l(
          "OpenAI (JSON mode) classifies intent and extracts name, company and need.",
          "OpenAI (JSON mode) phân loại ý định và trích xuất tên, công ty, nhu cầu.",
        ),
        l("Code validates the AI output before trusting it.", "Code kiểm tra kết quả của AI trước khi tin dùng."),
        l(
          "Inquiries become a HubSpot contact + note; everything else goes to a review tab.",
          "Yêu cầu thật thành contact + ghi chú trong HubSpot; còn lại vào tab cần xem lại.",
        ),
      ],
      highlights: [
        l(
          "Prompt-injection defence: email passed as data; the injection attempt was routed to review in the live run.",
          "Chống prompt injection: email chỉ được coi là dữ liệu; khi chạy thật, email tấn công đã bị chuyển sang xem lại.",
        ),
        l(
          "AI suggests, code decides: allowed intents, confidence ≥ 0.6, sender identity from the header only.",
          "AI gợi ý, code quyết định: chỉ nhận ý định hợp lệ, độ tin cậy ≥ 0.6, danh tính người gửi chỉ lấy từ header.",
        ),
        l("Around $0.001 per email.", "Khoảng $0.001 mỗi email."),
      ],
      result: l("~7 h/month saved (est.)", "Tiết kiệm ~7 giờ/tháng (ước tính)"),
      screenshots: [
        shot("08-hubspot-contact", "HubSpot contact + notes", "Contact + ghi chú trong HubSpot", "result"),
        shot("08-sheet-email-triage", "Email Triage tab", "Tab Email Triage", "result"),
        shot("08-execution-batch", "6 emails in one poll", "6 email trong một lần quét", "execution"),
        shot("08-execution-campaign-reply", "Campaign reply → CRM", "Trả lời chiến dịch → CRM", "execution"),
        shot("08-execution-thread-skip", "Handled thread skipped", "Bỏ qua luồng đã xử lý", "execution"),
      ],
    },
    {
      id: "09",
      folder: "09-meeting-booked-to-deal",
      name: l("Calendly Booking → HubSpot Deal", "Lịch hẹn Calendly → Deal HubSpot"),
      problem: l(
        "Turns every booked demo into a HubSpot deal, and keeps it right when the meeting is moved or canceled.",
        "Biến mỗi lịch demo được đặt thành một deal trong HubSpot, và giữ đúng khi cuộc hẹn bị dời hoặc hủy.",
      ),
      tags: ["Webhook", "Calendly", "HubSpot", "Email"],
      trigger: l(
        "Webhook: Calendly invitee.created / invitee.canceled (signed).",
        "Webhook: Calendly invitee.created / invitee.canceled (có chữ ký).",
      ),
      steps: [
        l(
          "Verify Calendly's signature and check whether this booking was already processed.",
          "Kiểm tra chữ ký của Calendly và xem lịch hẹn này đã được xử lý chưa.",
        ),
        l(
          "Upsert the contact and create a deal associated with it.",
          "Upsert contact và tạo deal gắn với contact đó.",
        ),
        l(
          "Reschedule reuses the same deal; cancellation closes it with the reason.",
          "Dời lịch thì dùng lại deal cũ; hủy lịch thì đóng deal kèm lý do.",
        ),
        l("Log to the Meetings sheet and email the host.", "Ghi vào sheet Meetings và email cho người chủ trì."),
      ],
      highlights: [
        l(
          "Idempotent against webhook retries: one booking = one deal.",
          "Idempotent khi webhook gửi lại: một lịch hẹn = một deal.",
        ),
        l(
          "Handles Calendly's reschedule = cancel + create pair correctly.",
          "Xử lý đúng cặp hủy + tạo mà Calendly gửi khi dời lịch.",
        ),
        l(
          "Live run caught a duplicate email on a retried reschedule; fixed and re-verified.",
          "Lần chạy thật phát hiện email bị gửi trùng khi dời lịch bị gửi lại; đã sửa và kiểm tra lại.",
        ),
      ],
      result: l("~4 h/month saved (est.)", "Tiết kiệm ~4 giờ/tháng (ước tính)"),
      screenshots: [
        shot("09-hubspot-deal", "HubSpot deal", "Deal trong HubSpot", "result"),
        shot("09-sheet-meetings", "Meetings sheet", "Sheet Meetings", "result"),
        shot("09-email-host-inbox", "Host inbox", "Hộp thư người chủ trì", "result"),
        shot("09-execution-booked", "New booking", "Lịch hẹn mới", "execution"),
        shot("09-execution-canceled", "Cancellation", "Hủy lịch", "execution"),
        shot("09-execution-retry-bug", "Retry bug (before fix)", "Lỗi khi gửi lại (trước khi sửa)", "execution"),
        shot("09-execution-retry-fixed", "Retry stopped (after fix)", "Chặn gửi lại (sau khi sửa)", "execution"),
      ],
    },
    {
      id: "10",
      folder: "10-error-handler-health-report",
      name: l("Error Handler + Daily Health Report", "Xử lý lỗi + Báo cáo sức khỏe hằng ngày"),
      problem: l(
        "Catches every failure in minutes with a likely fix, without flooding the inbox.",
        "Phát hiện mọi lỗi trong vài phút kèm cách sửa khả dĩ, mà không làm ngập hộp thư.",
      ),
      tags: ["Error Trigger", "n8n API", "Google Sheets", "Email"],
      trigger: l(
        "10a: n8n Error Trigger for workflows 01–09. 10b: schedule, every day at 8:00.",
        "10a: Error Trigger của n8n cho workflow 01–09. 10b: lịch chạy, 8:00 mỗi ngày.",
      ),
      steps: [
        l(
          "Classify the error (auth, quota, rate limit, service down, bad data, code bug).",
          "Phân loại lỗi (xác thực, hết quota, giới hạn tần suất, dịch vụ sập, dữ liệu sai, lỗi code).",
        ),
        l("Log every error to the Error Log tab.", "Ghi mọi lỗi vào tab Error Log."),
        l(
          "Email ops at most once per 30 minutes per workflow + node + category.",
          "Email cho đội vận hành tối đa một lần mỗi 30 phút cho mỗi cặp workflow + node + loại lỗi.",
        ),
        l(
          "Every morning, send a traffic-light health report from the n8n API.",
          "Mỗi sáng gửi báo cáo sức khỏe dạng đèn giao thông từ n8n API.",
        ),
      ],
      highlights: [
        l(
          "Alert suppression: ten failures in an outage = one email, not ten.",
          "Gom cảnh báo: mười lỗi trong một sự cố = một email, không phải mười.",
        ),
        l("Plain-English likely fix in every alert.", "Mỗi cảnh báo đều kèm cách sửa khả dĩ, viết dễ hiểu."),
        l(
          "The daily report doubles as a heartbeat: a missing email means n8n is down.",
          "Báo cáo hằng ngày cũng là tín hiệu sống: không nhận được email nghĩa là n8n đang sập.",
        ),
      ],
      result: l("~3 h/month saved (est.)", "Tiết kiệm ~3 giờ/tháng (ước tính)"),
      screenshots: [
        shot("10a-sheet-error-log", "Error Log tab", "Tab Error Log", "result"),
        shot("10a-email-alert", "Alert email", "Email cảnh báo", "result"),
        shot("10a-email-after-window", "Alert after window", "Cảnh báo sau khoảng chờ", "result"),
        shot("10b-email-health", "Daily health email", "Email sức khỏe hằng ngày", "result"),
        shot("10a-execution-alert", "First failure emailed", "Lỗi đầu tiên được email", "execution"),
        shot("10a-execution-suppressed", "Repeat suppressed", "Lỗi lặp lại được gom", "execution"),
        shot("10b-execution-report", "Health report run", "Lần chạy báo cáo sức khỏe", "execution"),
      ],
    },
  ],
};
