---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. Trang chính chạy được với Home, Giới thiệu, Kỹ năng, Liên hệ**
  Becomes usable: Mở `localhost:3000` thấy trang một trang cuộn theo bố cục Bianca, màu và font Skill Pack guide (bản sáng): navbar có link tới từng phần, Hero (chữ tạm), About, Skills, Contact (email + GitHub hoạt động), footer. `npm run build` tạo ra thư mục `out/`.
  Why now: Dựng khung Next.js + Tailwind + xuất trang tĩnh ngay từ đầu, vì đây là rủi ro kỹ thuật lớn nhất (spec ghi Tailwind qua PostCSS với Next 16.4 chưa kiểm chứng). Các bước sau đều cần chỗ để gắn vào.
  PRD ref: `prd.md > The Core Journey` (bước 1–2, 6), `prd.md > Home, About, Skills`, `prd.md > Contact`, `prd.md > Look and Feel`
  Spec ref: `spec.md > Stack`, `spec.md > Look and Feel`, `spec.md > Components > Navbar`, `spec.md > Components > Home Sections`, `spec.md > File Structure`
  Build: Tạo `package.json`, `next.config.ts` (`output: "export"`, `images.unoptimized`, `trailingSlash`), Tailwind 4 qua PostCSS, `app/globals.css` với token sáng/tối, font Geist, `app/layout.tsx`, `content/en.ts`, `content/types.ts`, Navbar (chưa có nút EN/VI và ☀/🌙), Hero/About/Skills/Contact/Footer, `components/ui/`. Cập nhật `.gitignore` (node_modules, .next, out, .cache).
  Verify (mechanical): `npm run build` thành công và có `out/index.html`; HTML chứa đủ id `home about skills contact`, link `mailto:thkien85@gmail.com` và GitHub có `target="_blank"`; CSS build ra có biến `--primary`.
  Learner check: Chạy `npm run dev`, mở http://localhost:3000, lướt hết trang, bấm "Contact" xem có cuộn xuống không, bấm Email và GitHub.
  Commit: `Scaffold Next.js site with home, about, skills and contact sections`

- [x] **2. Bấm thẻ dự án, xem 10 workflow bung/thu tại chỗ**
  Becomes usable: Phần Projects có thẻ `n8n-form-crm-automations` ("10 workflows · 63 tests"). Bấm thẻ mở `/projects/n8n-form-crm-automations/` với tổng quan, nguyên tắc kỹ thuật, link repo, 10 thẻ workflow 01→10; bấm một thẻ thì bung ra trigger, các bước, highlights, result (nếu có), link GitHub; bấm lại thì thu. Chưa có ảnh.
  Why now: Đây là phần cốt lõi (The Unique Kernel): khách thấy ngay 10 workflow production-ready. Làm sớm để bạn đọc lại nội dung và góp ý trong khi còn thời gian sửa.
  PRD ref: `prd.md > Project List`, `prd.md > Project Detail`, `prd.md > Workflow Detail`, `prd.md > The Core Journey` (bước 3–5)
  Spec ref: `spec.md > Data Model`, `spec.md > Components > ProjectCard`, `spec.md > Components > Project Page`, `spec.md > Components > WorkflowCard`
  Build: Đọc README của 10 thư mục `projects/NN-*` trong repo n8n, viết `content/projects/n8n-form-crm-automations.ts` (EN) và `index.ts`; làm `Projects.tsx`, `ProjectCard.tsx`, `app/projects/[slug]/page.tsx` (`generateStaticParams`, `dynamicParams = false`), `WorkflowCard.tsx` (`<button aria-expanded>`, phần bung chỉ tạo khi mở).
  Verify (mechanical): `npm run build` tạo `out/projects/n8n-form-crm-automations/index.html`; HTML đó có đủ 10 tên workflow đúng thứ tự và link repo; trang chính có link tới trang dự án và chữ "10 workflows" + "63 tests".
  Learner check: Mở trang, bấm thẻ dự án, bấm vài workflow cho bung ra rồi thu lại. Đọc nội dung workflow 02 và 05: đúng chưa, có thuyết phục khách Upwork không?
  Commit: `Add project page with expandable workflow cards`

- [x] **3. Ảnh chạy thật: ảnh đại diện, ảnh bìa, hàng ảnh nhỏ trong từng workflow**
  Becomes usable: Home có ảnh đại diện tròn viền tím; thẻ dự án có ảnh bìa; bung workflow thì thấy hàng ảnh nhỏ có nhãn (kết quả trước, execution sau), vuốt ngang được, không làm nội dung nhảy. Ảnh hỏng thì hiện ô chữ + link GitHub.
  Why now: Ảnh là bằng chứng chạy thật của kernel, và script tải 52 ảnh từ GitHub + sharp là rủi ro thứ hai. Cần có trước lightbox.
  PRD ref: `prd.md > Workflow Screenshots`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Components > Image Script`, `spec.md > Components > ScreenshotStrip`, `spec.md > External Services and Dependencies`, `spec.md > Important Failure Modes`
  Build: `scripts/images.mjs` (+ `npm run images`), chạy để tạo `public/avatar-*.webp`, `public/shots/.../*-sm.webp`/`*-lg.webp` và `*.images.json`; gán `screenshots` (nhãn, kind) cho 10 workflow; `ScreenshotStrip.tsx` với `width`/`height`, `loading="lazy"`, `onError`; ảnh đại diện trong Hero, ảnh bìa trong ProjectCard.
  Verify (mechanical): Script chạy xong, in dung lượng trước/sau; đếm đủ 52 file `-sm` và 52 file `-lg`; tổng dung lượng ảnh nhỏ hợp lý; `npm run build` thành công; HTML trang dự án ban đầu không chứa `-sm.webp` nào (ảnh chỉ có khi bung).
  Learner check: Mở trang chính xem ảnh đại diện và ảnh bìa. Vào trang dự án, bung workflow 02: thấy 7 ảnh nhỏ có nhãn, nội dung không nhảy.
  Commit: `Add image pipeline and screenshot strips`

- [x] **4. Xem ảnh lớn bằng lightbox**
  Becomes usable: Bấm ảnh nhỏ thì ảnh lớn mở giữa màn hình trên nền tối, có nhãn và "3 / 6", nút ‹ ›, phím ← →, vuốt trên điện thoại; đóng bằng ✕, Esc hoặc bấm nền.
  Why now: Hoàn thành phần ảnh; ảnh execution chữ nhỏ chỉ đọc được khi xem lớn.
  PRD ref: `prd.md > Workflow Screenshots` (Xem lớn)
  Spec ref: `spec.md > Components > Lightbox`
  Build: `components/Lightbox.tsx` tự viết (khóa cuộn, focus vào ✕ rồi trả focus về ảnh nhỏ, tải trước ảnh kế), nối với `ScreenshotStrip`.
  Verify (mechanical): `npm run build` + kiểm tra kiểu TypeScript không lỗi; chạy bản build, mở trang dự án bằng trình duyệt không giao diện (nếu có) hoặc kiểm tra code xử lý đủ Esc/←/→/vuốt/bấm nền.
  Learner check: Bung workflow 02, bấm ảnh thứ 3, chuyển ảnh bằng nút và phím ←/→, đóng bằng Esc, bằng ✕, bằng bấm nền. Đọc thử chữ trong một ảnh execution.
  Commit: `Add screenshot lightbox`

- [x] **5. EN/VI và sáng/tối, nhớ lựa chọn**
  Becomes usable: Navbar có nút `EN | VI` và ☀/🌙. Bấm VI thì mọi chữ (kể cả 10 workflow và nhãn ảnh) thành tiếng Việt, không tải lại trang. Lần đầu sáng/tối theo máy, không nháy trắng. Tải lại hoặc chuyển trang vẫn giữ lựa chọn.
  Why now: Cần toàn bộ nội dung EN đã ổn định (slice 2–4) trước khi dịch, để không phải dịch hai lần.
  PRD ref: `prd.md > Language Toggle (EN / VI)`, `prd.md > Light / Dark Theme`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Components > Providers (ngôn ngữ + sáng/tối)`, `spec.md > Components > Theme Init Script`, `spec.md > Data Model`
  Build: `lib/storage.ts` (try/catch), `lib/providers.tsx` (`t`, `pick`), `lib/theme-script.ts` trong `<head>`, `content/vi.ts`, thêm bản VI cho dự án/workflow/nhãn ảnh, nút trong Navbar, quầng sáng ảnh đại diện khi tối.
  Verify (mechanical): `npm run build` thành công; `vi.ts` có đủ key như `en.ts` (TypeScript bắt lỗi); mọi trường workflow có `vi`; `out/index.html` có script theme trong `<head>`.
  Learner check: Bấm VI, bung một workflow, xem đã tiếng Việt chưa và đọc lại bản dịch. Bấm 🌙, tải lại trang, sang trang dự án: vẫn VI và vẫn tối.
  Commit: `Add EN/VI language toggle and light/dark theme`

- [x] **6. Điện thoại, trang 404, kiểm tra nội dung, sẵn sàng thêm dự án**
  Becomes usable: Trên điện thoại có menu ☰, mọi phần đọc tốt. Đường dẫn sai hiện "Project not found" + nút về Projects. `npm run check` báo lỗi nội dung thiếu/ảnh thiếu. Thêm một dự án thử thì tự có thẻ mới. Có README hướng dẫn chạy và thêm dự án.
  Why now: Hoàn thiện các trạng thái biên và lưới an toàn sau khi tính năng chính đã đủ; chuẩn bị cho final review.
  PRD ref: `prd.md > Screens and Layout`, `prd.md > States and Boundaries`, `prd.md > Adding Projects Later`
  Spec ref: `spec.md > Components > Navbar`, `spec.md > Components > Not Found Page`, `spec.md > Components > Content Check Script`, `spec.md > Where It Runs and How Someone Tries It`
  Build: Menu ☰ trong Navbar, `app/not-found.tsx`, `app/icon.svg`, `scripts/check-content.mjs` (+ `npm run check`), rà responsive, `README.md`. Thử thêm dự án giả rồi xóa.
  Verify (mechanical): `npm run check` pass; làm hỏng tạm một tên ảnh thì `npm run check` báo lỗi và thoát mã khác 0; `out/404.html` tồn tại; dự án thử tạo ra thẻ thứ hai và trang `out/projects/<slug>/` rồi xóa đi; `npm run build` thành công.
  Learner check: Mở trang trên điện thoại (hoặc thu nhỏ cửa sổ / DevTools mobile), dùng menu ☰, bung một workflow, vuốt hàng ảnh. Mở `/projects/abc/` xem trang 404.
  Commit: `Add mobile menu, not-found page, content check and README`

## Hands-on Checkpoints

- [x] Early usable behavior explored — sau slice 2: thử trang dự án và đọc nội dung 10 workflow (learner: "quá tuyệt", không cần sửa; chữ tạm ở Hero/About để hỏi lại ở final review)
- [x] Final kick-the-tires exploration and feedback completed — learner dùng thử trên dev server: "OK hết rồi"

## Final Review

Kết quả: không cần sửa. Learner giữ nguyên chữ tạm (tên "Kelvin Trinh", chức danh, câu giới thiệu, đoạn About). Kiểm tra cuối: `npm run build`, `npm run lint`, `npm run check` sạch; kiểm tra trên Chrome (máy tính + 375px) cho slice 2–6 đều đạt. Theo yêu cầu của learner, đã commit bộ skill Devpost + `AGENTS.md` và push `main` lên `KelvinTrinhSG/My-N8N-Portfolio`.

- [x] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [x] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Tuyến code 3 điểm dừng (bấm mở workflow 02) được gửi cho learner, gắn với mục tiêu "dễ thêm dự án mới"; learner trả lời "quá tuyệt rồi, tiếp" và không báo là đã mở từng điểm — ghi nhận là recap/tuyến tham khảo, không phải thực hành có hướng dẫn đã hoàn tất. Bằng chứng cho phần takeaway: thử thêm `demo-project` (thẻ + trang tự xuất hiện) và `npm run check` bắt 3 lỗi cố ý (slice 6).
Route and stops: Tuyến tham khảo — `content/projects/n8n-form-crm-automations.ts` (`id: "02"`), `components/WorkflowCard.tsx` (`{open && (`), `components/ScreenshotStrip.tsx` (`loading="lazy"`, `<Lightbox`).
Edit outcome: Đã đề xuất (đổi nhãn ảnh "Spam logged"); learner không làm — không có thay đổi.
Reflection: Đề xuất ở lời bàn giao, tùy chọn.
Activity mode: recap (dev server đang chạy; learner chọn đi tiếp). App map: `devpost/app-map.html` tại commit `fc73257`, kiểm tra hiển thị trên Chrome, không gọi mạng ngoài (chỉ có request do Kaspersky chèn vào).

## Revisions

- Repo GitHub là `KelvinTrinhSG/My-N8N-Portfolio`, đã gắn làm remote `origin` (chưa push) — learner chốt tên repo ngay lúc bắt đầu build, sớm hơn dự kiến ở `6-ship`.
- Ảnh nhỏ dùng khung cố định 16:10 (cắt từ trên xuống) thay vì giữ tỉ lệ riêng từng ảnh — hàng ảnh đều nhau và chắc chắn không nhảy layout; kích thước trong `*.images.json` vẫn dùng cho thuộc tính `width`/`height` và lightbox.
- Ảnh `01-execution-duplicate` xếp vào workflow 01 (README của repo hiển thị nó ở mục 02) — tên file thuộc 01, và nhờ vậy workflow 02 có đúng 7 ảnh như PRD.
- Đổi sáng/tối ghi `data-theme` ngay trong `setTheme` thay vì trong effect của `Providers` — effect chạy lúc hydrate sẽ ghi đè theme tối bằng giá trị mặc định trong một khung hình (nháy trắng).
- Ảnh bìa thẻ dự án có phương án dự phòng (nền gradient) khi ảnh lỗi — lúc thử thêm dự án mới chưa có ảnh, thẻ hiện biểu tượng ảnh vỡ.
- `npm run check` chạy với `--disable-warning=MODULE_TYPELESS_PACKAGE_JSON` — Node 24 đọc thẳng file `.ts` nội dung và cảnh báo về kiểu module; tắt riêng cảnh báo này thay vì đổi `"type"` của cả dự án.
- Tailwind 4 qua `@tailwindcss/postcss` chạy được với Next 16.4 (điểm "chưa kiểm chứng" trong spec) — không cần cấu hình loader Turbopack như Skill Pack guide.
- Đưa lên Vercel bằng CLI (`vercel deploy --prod`) tại https://my-n8n-portfolio.vercel.app thay vì import repo trên vercel.com/new như spec; `vercel git connect` thất bại vì tài khoản Vercel chưa có quyền với GitHub `KelvinTrinhSG`, nên push lên `main` chưa tự deploy lại. Bộ kiểm tra trình duyệt slice 2/4/5/6 đều đạt trên bản online.
