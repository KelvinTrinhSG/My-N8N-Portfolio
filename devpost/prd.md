---
doc: prd
status: approved
---

# AI Agent & n8n Portfolio — Product Requirements

Trang portfolio cá nhân, song ngữ Anh/Việt, có chế độ sáng/tối. Trang giới thiệu các dự án n8n automation và AI Agent để khách Upwork và nhà tuyển dụng kiểm tra nhanh kinh nghiệm rồi liên hệ.
Source: `scope.md > Who It's For`, `scope.md > The Unique Kernel`.

## The Core Journey
Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`.

1. Khách mở trang và thấy phần mở đầu (Home): tên, chức danh "AI Agent & n8n Automation", một câu giới thiệu, nút **Xem dự án** và **Liên hệ**. Trang hiện tiếng Anh mặc định.
2. Khách lướt xuống qua phần Giới thiệu và phần Kỹ năng / Tích hợp (n8n, HubSpot, Google Sheets, Calendly, OpenAI, Email…).
3. Khách tới phần **Dự án** và thấy thẻ dự án `n8n-form-crm-automations` với số liệu nổi bật: **10 workflow · 63 test · production-ready**.
4. Khách bấm vào thẻ, trang chi tiết dự án mở ra. Trang này có tổng quan dự án và danh sách 10 workflow dạng thẻ gọn.
5. Khách bấm vào một workflow. Thẻ đó **bung ra ngay tại chỗ** và hiện chi tiết (xem *Workflow Detail*).
6. Khách thấy thuyết phục và bấm **Liên hệ**, có thể từ phần Liên hệ trên trang chính hoặc từ nút Liên hệ ở cuối trang dự án. Việc liên hệ là mở email hoặc vào GitHub.

Thành công: khách đi hết luồng trên trong khoảng 1 phút mà không bị lạc, và thao tác cuối cùng là bấm Liên hệ.

## Screens and Layout
Source: `scope.md > Inspiration & Identity`, `scope.md > The POC Boundary`.

- **Trang chính (một trang cuộn, bố cục Bianca):** thanh điều hướng → Home → Giới thiệu → Kỹ năng/Tích hợp → Dự án → Liên hệ → chân trang.
  - Thanh điều hướng có link tới từng phần, nút chuyển ngôn ngữ **EN / VI** và nút chuyển **sáng / tối**. Trên điện thoại, các link gom vào một menu.
- **Trang chi tiết dự án:** nút quay lại phần Dự án, phần tổng quan dự án, danh sách workflow, nút Liên hệ ở cuối. Trang này dùng chung thanh điều hướng, nút ngôn ngữ và nút giao diện với trang chính.

Chỉ có hai bề mặt này. Trang chính và trang chi tiết dự án đều phải dùng tốt trên điện thoại và máy tính.

## Look and Feel
Source: `scope.md > Inspiration & Identity`.

- **Bố cục:** theo template Bianca: các phần xếp dọc, thẻ dự án, phần Liên hệ ở cuối.
- **Theme, font, màu:** theo Devpost Learn Skill Pack guide (https://github.com/KelvinTrinhSG/Devpost-Learn-Skill-Pack---How-To-Use), có cả bản sáng và bản tối. `4-spec` sẽ lấy font và mã màu cụ thể từ repo đó.
- **Cảm giác:** chuyên nghiệp, đáng tin cậy, kỹ thuật vững. Khách lướt là đọc được: chữ rõ, số liệu nổi bật, tag tích hợp dễ nhận ra.

## Features and Behavior

### Language Toggle (EN / VI)
- Toàn bộ nội dung trên cả hai trang có đủ hai bản, kể cả nội dung dự án và workflow.
- Lần đầu vào trang hiện **tiếng Anh**, vì khách Upwork chủ yếu đọc tiếng Anh.
- Bấm EN/VI thì nội dung đổi ngay, trang không tải lại và vẫn giữ vị trí đang xem.
- Lựa chọn được nhớ: khi quay lại trang hoặc chuyển giữa trang chính và trang dự án, ngôn ngữ vẫn như lần trước.
  - [ ] Mở trang lần đầu thì thấy tiếng Anh.
  - [ ] Bấm VI thì mọi chữ trên trang thành tiếng Việt, kể cả chi tiết workflow đang bung.
  - [ ] Tải lại trang thì vẫn là ngôn ngữ đã chọn.

### Light / Dark Theme
- Lần đầu vào trang, giao diện theo cài đặt sáng/tối của máy khách.
- Bấm nút thì đổi ngay, và lựa chọn được nhớ như ngôn ngữ.
  - [ ] Bấm nút thì cả trang đổi sáng ↔ tối, chữ vẫn đọc rõ ở cả hai chế độ.
  - [ ] Tải lại hoặc sang trang dự án thì vẫn giữ chế độ đã chọn.

### Home, About, Skills
- **Home:** ảnh đại diện, tên, chức danh, một câu giới thiệu, nút "View projects" (cuộn tới Dự án) và "Contact" (cuộn tới Liên hệ).
- **Giới thiệu:** đoạn ngắn nói vì sao automation của bạn là production-ready, tức là phần cốt lõi trong `scope.md > The Unique Kernel`.
- **Kỹ năng / Tích hợp:** danh sách công cụ, mỗi công cụ một mục nhỏ có tên: n8n, HubSpot, Google Sheets, Calendly, OpenAI, Gmail/SMTP, JavaScript/Node.js, testing.
  - [ ] Bấm "View projects" thì trang cuộn tới phần Dự án.

### Project List
Source: `scope.md > The Core Loop`.
- Mỗi repo hiện thành một thẻ gồm tên dự án, mô tả một câu, số liệu nổi bật (số workflow, số test) và các tag tích hợp chính.
- Bản này chỉ có một thẻ: `n8n-form-crm-automations`.
  - [ ] Thẻ hiện "10 workflows · 63 tests".
  - [ ] Bấm thẻ thì mở trang chi tiết dự án.

### Project Detail
- **Tổng quan:** tên dự án, mô tả 2–3 câu, số liệu (10 workflow, 63 unit test, đã chạy thật với HubSpot/Sheets/Gmail), các nguyên tắc kỹ thuật chung (ghi dữ liệu idempotent, webhook trả lời nhanh, không âm thầm làm mất dữ liệu, kiểm tra đầu ra của AI trước khi ghi vào CRM), và link **Xem trên GitHub** tới repo.
- **Danh sách workflow:** 10 thẻ gọn xếp theo thứ tự 01 → 10.
- **Cuối trang:** nút Liên hệ.
  - [ ] Trang hiện đủ 10 workflow theo đúng thứ tự.
  - [ ] Link GitHub mở repo trong tab mới.

### Workflow Detail
*(Claude chọn theo yêu cầu của learner, có thể đổi lúc review.)*

Mục tiêu: khách Upwork đọc lướt vẫn thấy được ngay workflow này giải quyết vấn đề gì và vì sao đáng tin.

**Thẻ gọn (luôn hiện, đọc lướt trong 3 giây):**
- Số thứ tự và tên workflow (ví dụ "05 · Speed-to-Lead SLA")
- Một câu nói vấn đề được giải quyết (ví dụ "Alerts the team when a lead waits too long for a reply")
- Tag tích hợp (HubSpot, Email…)

**Khi bung ra (bấm vào thẻ):**
- **Trigger:** cái gì khởi động workflow (webhook, lịch chạy, email mới…)
- **How it works:** 3–4 bước ngắn
- **Production highlights:** 2–4 gạch đầu dòng kỹ thuật. Đây là phần tạo niềm tin nhất, ví dụ "HMAC-SHA256 signing", "dead-letter queue + exponential backoff", "prompt-injection defence".
- **Result:** lợi ích cụ thể nếu có (ví dụ "~10 h/month saved"). Workflow nào không có số liệu thì bỏ mục này.
- **Live run proof:** ảnh chụp lần chạy thật (xem *Workflow Screenshots*)
- Link **View on GitHub** tới đúng thư mục của workflow đó

**Cách mở:** bung ra ngay trong trang dự án, không mở popup và không sang trang riêng. Khách giữ được ngữ cảnh, so sánh được các workflow, và bấm lại thì thẻ thu gọn. Có thể bung nhiều thẻ cùng lúc.
  - [ ] Bấm thẻ thì chi tiết bung ra bên dưới tên, bấm lần nữa thì thu lại.
  - [ ] Mỗi workflow có đủ: tên, vấn đề, tag, trigger, các bước, highlights, link GitHub.
  - [ ] Đọc được thoải mái trên màn hình điện thoại.

### Workflow Screenshots
Source: `scope.md > The Unique Kernel` ("mỗi dự án cho thấy *cách* bạn giải quyết vấn đề thật, không chỉ ảnh chụp workflow"). *(Learner yêu cầu tối ưu hiển thị ảnh. Cách hiển thị do Claude đề xuất.)*

Repo có **52 ảnh** trong `docs/screenshots/`, mỗi workflow 2–7 ảnh, mỗi ảnh khoảng 40–540 KB, tổng cộng khoảng 10 MB. Ảnh là bằng chứng workflow đã chạy thật, nên phải hiện được, nhưng không được làm trang chậm.

- **Thứ tự:** kết quả thấy được trong công cụ thật đứng trước, gồm HubSpot, Google Sheets, Email. Sau đó mới tới ảnh execution trong n8n. Lý do là khách quan tâm kết quả trước rồi mới tới cách chạy.
- **Ảnh nhỏ (thumbnail):** trong phần bung của mỗi workflow có một hàng ảnh nhỏ. Mỗi ảnh có nhãn ngắn song ngữ, ví dụ "HubSpot contact", "Duplicate blocked", "Rate-limited". Trên điện thoại, hàng ảnh vuốt ngang được.
- **Tải nhẹ:**
  - Ảnh của một workflow chỉ tải khi khách bung workflow đó, không tải lúc mở trang.
  - Ảnh nhỏ là bản thu nhỏ và nén nhẹ. Bản đầy đủ chỉ tải khi khách bấm phóng to.
  - Chỗ của ảnh được giữ sẵn, nên ảnh hiện ra không làm nội dung bị đẩy nhảy.
- **Xem lớn (lightbox):**
  - Bấm ảnh nhỏ thì ảnh mở to giữa màn hình trên nền tối, kèm nhãn và bộ đếm "3 / 6".
  - Có nút trước/sau. Trên máy tính dùng được phím ← →, trên điện thoại vuốt được.
  - Đóng bằng nút ✕, phím Esc hoặc bấm ra ngoài ảnh.
  - Ảnh chữ nhỏ (execution, sheet) hiện vừa màn hình và đọc được.
- **Ảnh bìa dự án:** thẻ dự án ở trang chính có một ảnh bìa. Mặc định là `01-hubspot-contact`, learner có thể đổi.
- **Ảnh đại diện:** ảnh của learner (đã lưu tại `assets/avatar-original.png`, 2 MB, tông tím/xanh neon) hiện ở Home. Ảnh được thu nhỏ và nén cho web, nên hiện nhanh, nét trên cả điện thoại lẫn màn hình lớn, và hợp với cả nền sáng lẫn nền tối.
  - [ ] Mở trang chính thì không tải ảnh workflow nào. Ảnh đại diện và ảnh bìa hiện nhanh.
  - [ ] Bung workflow 02 thì thấy 7 ảnh nhỏ có nhãn, và nội dung không bị nhảy khi ảnh hiện ra.
  - [ ] Bấm một ảnh thì ảnh mở to, có nút trước/sau, Esc hoặc ✕ đóng được, vuốt được trên điện thoại.
  - [ ] Đọc được chữ trong ảnh execution khi xem lớn trên laptop.

### Contact
Source: `scope.md > The POC Boundary`.
- Phần Liên hệ có hai lựa chọn:
  - **Email:** `thkien85@gmail.com`. Bấm thì mở ứng dụng email với địa chỉ đã điền sẵn. Địa chỉ email cũng hiện thành chữ để khách tự chép.
  - **GitHub:** https://github.com/KelvinTrinhSG, mở trong tab mới.
- Không có form liên hệ.
  - [ ] Bấm Email thì ứng dụng email mở ra với địa chỉ đúng.
  - [ ] Bấm GitHub thì trang hồ sơ GitHub mở trong tab mới.

### Adding Projects Later
Source: `scope.md > The POC Boundary`, `scope.md > Later`.
- Nội dung dự án và workflow (cả hai ngôn ngữ) được giữ tách khỏi giao diện. Muốn thêm một repo mới thì chỉ cần thêm nội dung của nó, giao diện tự hiện thêm một thẻ dự án và một trang chi tiết.
  - [ ] Thêm một dự án thử vào phần nội dung thì thấy thẻ mới xuất hiện mà không phải sửa giao diện. (Kiểm tra lúc build, sau đó xóa dự án thử.)

## States and Boundaries
- **Lần đầu vào trang:** hiện tiếng Anh, sáng/tối theo máy khách, chưa thẻ workflow nào bung.
- **Quay lại trang:** vẫn giữ ngôn ngữ và chế độ sáng/tối đã chọn. Ngoài hai lựa chọn này, trang không lưu gì khác.
- **Workflow thiếu số liệu "Result":** bỏ hẳn mục đó, không để ô trống.
- **Ảnh không tải được:** ô ảnh hiện nhãn kèm link "View on GitHub", không hiện biểu tượng ảnh vỡ.
- **Workflow có ít ảnh:** hàng ảnh chỉ hiện số ảnh đang có. Workflow 10 gồm cả ảnh `10a` và `10b`.
- **Thiếu bản dịch cho một đoạn:** hiện bản tiếng Anh, không để trống.
- **Mở thẳng link trang dự án không tồn tại:** hiện thông báo ngắn "Project not found" kèm nút quay về phần Dự án.

## Product Decisions
- **Liên hệ:** email và GitHub, không dùng form. *(Learner chọn GitHub.)*
- **Song ngữ Anh/Việt** có ngay trong bản này, tiếng Anh mặc định. *(Learner chọn song ngữ. Mặc định tiếng Anh vì khách Upwork chủ yếu đọc tiếng Anh.)*
- **Sáng và tối** đều có trong bản này. *(Learner chọn.)*
- **Một repo = một dự án lớn**, các workflow nằm bên trong. *(Từ scope.)*
- **Nhập nội dung thủ công**, không lấy dữ liệu từ GitHub API. *(Từ scope, learner đã xác nhận.)*
- **Assumption (Claude chọn, learner đã cho phép):** chi tiết workflow gồm thẻ gọn + phần bung ra như trên, mở ngay trong trang dự án. Lý do là khách đọc lướt, nên nên hiện vấn đề và highlights trước, và họ không phải rời trang.
- **Hiển thị ảnh chạy thật trong chi tiết workflow** và tối ưu để trang vẫn nhanh. *(Learner yêu cầu. Trước đó mục này nằm trong phần để sau.)*
- **Ảnh đại diện ở Home:** dùng ảnh learner cung cấp. *(Learner cung cấp.)*
- **Assumption:** cách hiển thị ảnh (thứ tự kết quả trước, tải khi bung, lightbox, ảnh bìa `01-hubspot-contact`) do Claude đề xuất.
- **Assumption:** chi tiết dự án nằm trên một trang riêng, còn trang chính là một trang cuộn.

## What We're Building
- Trang chính một trang cuộn: Home, Giới thiệu, Kỹ năng/Tích hợp, Dự án, Liên hệ.
- Trang chi tiết cho dự án `n8n-form-crm-automations` với 10 workflow, mỗi workflow bung ra xem chi tiết.
- Ảnh chạy thật (52 ảnh) trong từng workflow: ảnh nhỏ, tải khi bung, xem lớn bằng lightbox. Ảnh bìa dự án và ảnh đại diện đã tối ưu.
- Nút EN/VI và nút sáng/tối, đều được nhớ giữa các lần vào trang.
- Liên hệ qua email và GitHub.
- Nội dung tách khỏi giao diện để dễ thêm dự án.
- Dùng tốt trên điện thoại và máy tính.

## Deferred From the POC
- **Các repo khác:** thêm khi learner cung cấp (`scope.md > Later`).
- **Đưa lên mạng (GitHub Pages / Netlify):** không bắt buộc cho hackathon.
- **Âm thanh bật/tắt** như trong Skill Pack guide: không giúp gì cho việc thuyết phục khách.

## Possible Later Enhancements
- Link hồ sơ Upwork / LinkedIn khi learner muốn.
- Lọc dự án theo tích hợp (HubSpot, OpenAI…) khi đã có nhiều dự án.

## Non-Goals
- **Lấy dữ liệu tự động từ GitHub API:** scope đã cắt.
- **Form liên hệ:** cần nơi nhận và xử lý tin nhắn, trong khi email đã đủ.
- **Blog, trang quản trị, đăng nhập:** ngoài mục tiêu cho khách xem dự án rồi liên hệ.

## Open Questions
- **Tên hiển thị, chức danh và câu giới thiệu ở Home/Giới thiệu:** có thể dùng chữ tạm, learner sửa lúc build.
