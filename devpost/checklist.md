---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [ ] **1. Trang chính chạy được với Home, Giới thiệu, Kỹ năng, Liên hệ**
  Becomes usable: Mở `localhost:3000` thấy trang một trang cuộn theo bố cục Bianca, màu và font Skill Pack guide (bản sáng): navbar có link tới từng phần, Hero (chữ tạm), About, Skills, Contact (email + GitHub hoạt động), footer. `npm run build` tạo ra thư mục `out/`.
  Why now: Dựng khung Next.js + Tailwind + xuất trang tĩnh ngay từ đầu, vì đây là rủi ro kỹ thuật lớn nhất (spec ghi Tailwind qua PostCSS với Next 16.4 chưa kiểm chứng). Các bước sau đều cần chỗ để gắn vào.
  PRD ref: `prd.md > The Core Journey` (bước 1–2, 6), `prd.md > Home, About, Skills`, `prd.md > Contact`, `prd.md > Look and Feel`
  Spec ref: `spec.md > Stack`, `spec.md > Look and Feel`, `spec.md > Components > Navbar`, `spec.md > Components > Home Sections`, `spec.md > File Structure`
  Build: Tạo `package.json`, `next.config.ts` (`output: "export"`, `images.unoptimized`, `trailingSlash`), Tailwind 4 qua PostCSS, `app/globals.css` với token sáng/tối, font Geist, `app/layout.tsx`, `content/en.ts`, `content/types.ts`, Navbar (chưa có nút EN/VI và ☀/🌙), Hero/About/Skills/Contact/Footer, `components/ui/`. Cập nhật `.gitignore` (node_modules, .next, out, .cache).
  Verify (mechanical): `npm run build` thành công và có `out/index.html`; HTML chứa đủ id `home about skills contact`, link `mailto:thkien85@gmail.com` và GitHub có `target="_blank"`; CSS build ra có biến `--primary`.
  Learner check: Chạy `npm run dev`, mở http://localhost:3000, lướt hết trang, bấm "Contact" xem có cuộn xuống không, bấm Email và GitHub.
  Commit: `Scaffold Next.js site with home, about, skills and contact sections`

- [ ] **2. Bấm thẻ dự án, xem 10 workflow bung/thu tại chỗ**
  Becomes usable: Phần Projects có thẻ `n8n-form-crm-automations` ("10 workflows · 63 tests"). Bấm thẻ mở `/projects/n8n-form-crm-automations/` với tổng quan, nguyên tắc kỹ thuật, link repo, 10 thẻ workflow 01→10; bấm một thẻ thì bung ra trigger, các bước, highlights, result (nếu có), link GitHub; bấm lại thì thu. Chưa có ảnh.
  Why now: Đây là phần cốt lõi (The Unique Kernel): khách thấy ngay 10 workflow production-ready. Làm sớm để bạn đọc lại nội dung và góp ý trong khi còn thời gian sửa.
  PRD ref: `prd.md > Project List`, `prd.md > Project Detail`, `prd.md > Workflow Detail`, `prd.md > The Core Journey` (bước 3–5)
  Spec ref: `spec.md > Data Model`, `spec.md > Components > ProjectCard`, `spec.md > Components > Project Page`, `spec.md > Components > WorkflowCard`
  Build: Đọc README của 10 thư mục `projects/NN-*` trong repo n8n, viết `content/projects/n8n-form-crm-automations.ts` (EN) và `index.ts`; làm `Projects.tsx`, `ProjectCard.tsx`, `app/projects/[slug]/page.tsx` (`generateStaticParams`, `dynamicParams = false`), `WorkflowCard.tsx` (`<button aria-expanded>`, phần bung chỉ tạo khi mở).
  Verify (mechanical): `npm run build` tạo `out/projects/n8n-form-crm-automations/index.html`; HTML đó có đủ 10 tên workflow đúng thứ tự và link repo; trang chính có link tới trang dự án và chữ "10 workflows" + "63 tests".
  Learner check: Mở trang, bấm thẻ dự án, bấm vài workflow cho bung ra rồi thu lại. Đọc nội dung workflow 02 và 05: đúng chưa, có thuyết phục khách Upwork không?
  Commit: `Add project page with expandable workflow cards`

- [ ] **3. Ảnh chạy thật: ảnh đại diện, ảnh bìa, hàng ảnh nhỏ trong từng workflow**
  Becomes usable: Home có ảnh đại diện tròn viền tím; thẻ dự án có ảnh bìa; bung workflow thì thấy hàng ảnh nhỏ có nhãn (kết quả trước, execution sau), vuốt ngang được, không làm nội dung nhảy. Ảnh hỏng thì hiện ô chữ + link GitHub.
  Why now: Ảnh là bằng chứng chạy thật của kernel, và script tải 52 ảnh từ GitHub + sharp là rủi ro thứ hai. Cần có trước lightbox.
  PRD ref: `prd.md > Workflow Screenshots`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Components > Image Script`, `spec.md > Components > ScreenshotStrip`, `spec.md > External Services and Dependencies`, `spec.md > Important Failure Modes`
  Build: `scripts/images.mjs` (+ `npm run images`), chạy để tạo `public/avatar-*.webp`, `public/shots/.../*-sm.webp`/`*-lg.webp` và `*.images.json`; gán `screenshots` (nhãn, kind) cho 10 workflow; `ScreenshotStrip.tsx` với `width`/`height`, `loading="lazy"`, `onError`; ảnh đại diện trong Hero, ảnh bìa trong ProjectCard.
  Verify (mechanical): Script chạy xong, in dung lượng trước/sau; đếm đủ 52 file `-sm` và 52 file `-lg`; tổng dung lượng ảnh nhỏ hợp lý; `npm run build` thành công; HTML trang dự án ban đầu không chứa `-sm.webp` nào (ảnh chỉ có khi bung).
  Learner check: Mở trang chính xem ảnh đại diện và ảnh bìa. Vào trang dự án, bung workflow 02: thấy 7 ảnh nhỏ có nhãn, nội dung không nhảy.
  Commit: `Add image pipeline and screenshot strips`

- [ ] **4. Xem ảnh lớn bằng lightbox**
  Becomes usable: Bấm ảnh nhỏ thì ảnh lớn mở giữa màn hình trên nền tối, có nhãn và "3 / 6", nút ‹ ›, phím ← →, vuốt trên điện thoại; đóng bằng ✕, Esc hoặc bấm nền.
  Why now: Hoàn thành phần ảnh; ảnh execution chữ nhỏ chỉ đọc được khi xem lớn.
  PRD ref: `prd.md > Workflow Screenshots` (Xem lớn)
  Spec ref: `spec.md > Components > Lightbox`
  Build: `components/Lightbox.tsx` tự viết (khóa cuộn, focus vào ✕ rồi trả focus về ảnh nhỏ, tải trước ảnh kế), nối với `ScreenshotStrip`.
  Verify (mechanical): `npm run build` + kiểm tra kiểu TypeScript không lỗi; chạy bản build, mở trang dự án bằng trình duyệt không giao diện (nếu có) hoặc kiểm tra code xử lý đủ Esc/←/→/vuốt/bấm nền.
  Learner check: Bung workflow 02, bấm ảnh thứ 3, chuyển ảnh bằng nút và phím ←/→, đóng bằng Esc, bằng ✕, bằng bấm nền. Đọc thử chữ trong một ảnh execution.
  Commit: `Add screenshot lightbox`

- [ ] **5. EN/VI và sáng/tối, nhớ lựa chọn**
  Becomes usable: Navbar có nút `EN | VI` và ☀/🌙. Bấm VI thì mọi chữ (kể cả 10 workflow và nhãn ảnh) thành tiếng Việt, không tải lại trang. Lần đầu sáng/tối theo máy, không nháy trắng. Tải lại hoặc chuyển trang vẫn giữ lựa chọn.
  Why now: Cần toàn bộ nội dung EN đã ổn định (slice 2–4) trước khi dịch, để không phải dịch hai lần.
  PRD ref: `prd.md > Language Toggle (EN / VI)`, `prd.md > Light / Dark Theme`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Components > Providers (ngôn ngữ + sáng/tối)`, `spec.md > Components > Theme Init Script`, `spec.md > Data Model`
  Build: `lib/storage.ts` (try/catch), `lib/providers.tsx` (`t`, `pick`), `lib/theme-script.ts` trong `<head>`, `content/vi.ts`, thêm bản VI cho dự án/workflow/nhãn ảnh, nút trong Navbar, quầng sáng ảnh đại diện khi tối.
  Verify (mechanical): `npm run build` thành công; `vi.ts` có đủ key như `en.ts` (TypeScript bắt lỗi); mọi trường workflow có `vi`; `out/index.html` có script theme trong `<head>`.
  Learner check: Bấm VI, bung một workflow, xem đã tiếng Việt chưa và đọc lại bản dịch. Bấm 🌙, tải lại trang, sang trang dự án: vẫn VI và vẫn tối.
  Commit: `Add EN/VI language toggle and light/dark theme`

- [ ] **6. Điện thoại, trang 404, kiểm tra nội dung, sẵn sàng thêm dự án**
  Becomes usable: Trên điện thoại có menu ☰, mọi phần đọc tốt. Đường dẫn sai hiện "Project not found" + nút về Projects. `npm run check` báo lỗi nội dung thiếu/ảnh thiếu. Thêm một dự án thử thì tự có thẻ mới. Có README hướng dẫn chạy và thêm dự án.
  Why now: Hoàn thiện các trạng thái biên và lưới an toàn sau khi tính năng chính đã đủ; chuẩn bị cho final review.
  PRD ref: `prd.md > Screens and Layout`, `prd.md > States and Boundaries`, `prd.md > Adding Projects Later`
  Spec ref: `spec.md > Components > Navbar`, `spec.md > Components > Not Found Page`, `spec.md > Components > Content Check Script`, `spec.md > Where It Runs and How Someone Tries It`
  Build: Menu ☰ trong Navbar, `app/not-found.tsx`, `app/icon.svg`, `scripts/check-content.mjs` (+ `npm run check`), rà responsive, `README.md`. Thử thêm dự án giả rồi xóa.
  Verify (mechanical): `npm run check` pass; làm hỏng tạm một tên ảnh thì `npm run check` báo lỗi và thoát mã khác 0; `out/404.html` tồn tại; dự án thử tạo ra thẻ thứ hai và trang `out/projects/<slug>/` rồi xóa đi; `npm run build` thành công.
  Learner check: Mở trang trên điện thoại (hoặc thu nhỏ cửa sổ / DevTools mobile), dùng menu ☰, bung một workflow, vuốt hàng ảnh. Mở `/projects/abc/` xem trang 404.
  Commit: `Add mobile menu, not-found page, content check and README`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — sau slice 2: thử trang dự án và đọc nội dung 10 workflow
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [what actually happened; real document/test/code references; unfinished work if interrupted]
Route and stops: [actual paths and symbols; guided stops completed, or reference-only route]
Edit outcome: [tried/kept/reverted/declined/not applicable; verification if changed]
Reflection: [offered/answered/declined/already covered — personal answer belongs only in the ignored profile]
Activity mode: [live app and editor, explicit static fallback, focused alternative, prior practice, or recap]

## Revisions

- Repo GitHub là `KelvinTrinhSG/My-N8N-Portfolio`, đã gắn làm remote `origin` (chưa push) — learner chốt tên repo ngay lúc bắt đầu build, sớm hơn dự kiến ở `6-ship`.
