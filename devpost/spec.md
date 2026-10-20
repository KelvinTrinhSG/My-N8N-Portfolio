---
doc: spec
status: approved
---

# AI Agent & n8n Portfolio — Technical Spec

Implements `prd.md` (approved). Scope: `scope.md > The POC Boundary`.

## How This Works, In Plain Language

Trang web được làm bằng **Next.js**, giống Skill Pack guide. Next.js là một bộ khung có sẵn nhiều quyết định, dùng để làm trang web bằng React. Khi chạy lệnh **build**, Next.js biến toàn bộ code thành một thư mục `out/` chỉ gồm file HTML, CSS, JS và ảnh. Vì vậy trang **không cần server**: Vercel chỉ việc phát các file đó cho khách.

Trang có bốn phần:

1. **Nội dung**: chữ của từng phần trang (EN và VI), thông tin dự án và 10 workflow. Tất cả nằm trong thư mục `content/`, tách khỏi giao diện. Muốn thêm repo mới thì thêm một file nội dung, không phải sửa giao diện.
2. **Giao diện**: các khối như thanh điều hướng, Home, thẻ dự án, thẻ workflow, lightbox xem ảnh. Mỗi khối là một **component**, tức một mảnh giao diện dùng lại được, nằm trong `components/`.
3. **Ảnh**: một **script** (chương trình nhỏ chạy bằng một lệnh) tải 52 ảnh từ repo n8n về máy và nén mỗi ảnh thành hai cỡ WebP: ảnh nhỏ và ảnh lớn. Script cũng nén ảnh đại diện. Ảnh đã nén nằm trong `public/` và được đưa lên GitHub cùng code. Script chỉ chạy khi có ảnh mới, không chạy mỗi lần build.
4. **Ghi nhớ lựa chọn**: ngôn ngữ và sáng/tối được lưu vào **localStorage**, giống một mẩu giấy nhớ trình duyệt giữ riêng cho trang này. Lần sau khách quay lại, trang đọc mẩu giấy đó.

Vì sao chọn cách này: bạn chọn Next.js để làm giống Skill Pack guide, và cái giá chấp nhận là phải cài đặt, có bước build. Phần còn lại giữ thật đơn giản: không server, không database, không gọi API khi khách xem trang.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.

1. **Khách mở trang** → Vercel gửi file `index.html` đã build sẵn. Trước khi trang hiện ra, một đoạn script nhỏ trong `<head>` đọc giấy nhớ: nếu khách đã chọn tối thì bật tối, nếu chưa chọn thì theo cài đặt của máy. Nhờ vậy trang không bị nháy trắng. Sau đó `Providers` đọc ngôn ngữ đã lưu, mặc định là EN.
2. **Lướt xuống** → các section `Hero`, `About`, `Skills` lấy chữ từ `content/en.ts` hoặc `content/vi.ts`, theo ngôn ngữ đang chọn.
3. **Phần Dự án** → `ProjectCard` đọc danh sách dự án trong `content/projects/index.ts` và hiện ảnh bìa (ảnh nhỏ của `01-hubspot-contact`), số workflow và số test.
4. **Bấm thẻ** → chuyển sang `/projects/n8n-form-crm-automations/`. Trang này cũng đã được build sẵn thành HTML. Nó hiện tổng quan và 10 `WorkflowCard` ở trạng thái gọn.
5. **Bấm một workflow** → thẻ bung ra. Lúc này các thẻ `<img>` của ảnh nhỏ mới được tạo, nên trình duyệt mới bắt đầu tải ảnh. Mỗi ảnh có sẵn chiều rộng/cao nên nội dung không nhảy. Bấm ảnh nhỏ thì mở `Lightbox`, lúc đó mới tải ảnh lớn.
6. **Bấm Liên hệ** → link `mailto:thkien85@gmail.com` mở ứng dụng email, hoặc link GitHub mở tab mới.

Đổi ngôn ngữ hay sáng/tối ở bất kỳ bước nào thì `Providers` cập nhật ngay và ghi vào giấy nhớ. Trang không tải lại.

## Stack

| Phần | Lựa chọn | Tài liệu |
|---|---|---|
| Bộ khung | **Next.js 16.4.2** (App Router), xuất trang tĩnh bằng `output: "export"` | https://nextjs.org/docs/app/guides/static-exports |
| Giao diện | **React 19.3.0**, **TypeScript 5** | https://react.dev |
| Style | **Tailwind CSS 4** (`@tailwindcss/postcss`), cùng các biến màu CSS lấy từ Skill Pack guide | https://tailwindcss.com/docs/installation/framework-guides/nextjs |
| Font | **Geist** và **Geist Mono** qua `next/font/google`, subset `latin` + `vietnamese` | https://nextjs.org/docs/app/getting-started/fonts |
| Nén ảnh | **sharp 0.35** (devDependency, chỉ dùng trong script) | https://sharp.pixelplumbing.com |
| Hosting | **Vercel** (gói Hobby miễn phí) | https://vercel.com/docs/frameworks/full-stack/nextjs |

- **Next.js:** learner chọn, để giống Skill Pack guide. Cái giá đã chấp nhận: phải `npm install`, có bước build, và thông báo lỗi khó đọc hơn HTML thuần. Phiên bản giống Skill Pack guide; ngày 2026-10-20 đã kiểm tra bằng `npm view` thì đây là bản mới nhất.
- **Ảnh nén sẵn bằng script:** learner đồng ý theo gợi ý.
- **Vercel:** learner chọn để đưa trang lên mạng.
- **Chưa kiểm chứng:** Skill Pack guide nạp Tailwind qua loader `@tailwindcss/turbopack`. Spec này dùng cách chuẩn trong tài liệu Tailwind là `@tailwindcss/postcss`. Nếu cách chuẩn không chạy với Next 16.4 thì chép cấu hình của Skill Pack guide. Phải kiểm tra ở bước build đầu tiên.
- **Không dùng `next/image`:** khi xuất trang tĩnh, `next/image` không tự nén ảnh, mà ảnh đã được script nén rồi. Dùng thẻ `<img>` thường, có `width`/`height`, `loading="lazy"` và `decoding="async"`.

## Where It Runs and How Someone Tries It

- **Cần có:** Node 24 (máy đã có v24.15.0) và npm 11. Không cần API key.
- **Chạy trên máy:**
  ```
  npm install
  npm run dev        # mở http://localhost:3000
  ```
- **Xem bản build giống hệt bản online:**
  ```
  npm run build      # tạo thư mục out/
  npx serve out      # mở địa chỉ mà lệnh in ra
  ```
- **Video demo (~1 phút):** mở `/` → lướt tới Projects → bấm `n8n-form-crm-automations` → bấm workflow 02 → bấm một ảnh, xem lightbox → đóng → bấm Contact. Có thể bấm VI và nút tối trong lúc quay để khoe hai tính năng này.
- **Hackathon bắt buộc:** video demo và repo GitHub công khai. Bản online trên Vercel là thêm, không thay được hai thứ này.
- **Đưa lên Vercel (learner chọn):**
  1. Đẩy code lên một repo GitHub công khai. Tên repo sẽ chọn ở `6-ship`.
  2. Vào https://vercel.com/new, chọn Import repo đó. Vercel tự nhận ra Next.js. Build command là `npm run build`, không cần biến môi trường.
  3. Từ đó, mỗi lần đẩy code lên nhánh `main`, Vercel tự build lại. Link có dạng `<tên>.vercel.app`.

## Look and Feel
Carries `prd.md > Look and Feel` and `scope.md > Inspiration & Identity`.

- **Bố cục (Bianca):** thanh header cố định ở trên, Home có ảnh đại diện lớn, các section xếp dọc và cách đều nhau, tiêu đề section ở giữa, thẻ bo góc, chân trang đơn giản. Trên điện thoại, menu thành nút ☰. Chỉ lấy bố cục của Bianca, **không** lấy font Poppins/Syne và màu xanh lá của nó.
- **Màu (chép nguyên token của Skill Pack guide trong `app/globals.css`):**
  - Sáng (ấm): `--bg #FAFAF8`, `--bg-alt #F3F0E9`, `--surface #FFFFFF`, `--surface-2 #F1EEE7`, `--border #E3DFD6`, `--text #171717`, `--text-muted #55524B`
  - Tối: `--bg #0A0A0F`, `--bg-alt #0D0D12`, `--surface #131313`, `--surface-2 #1B1B1B`, `--border #262626`, `--text #F2F1EE`, `--text-muted #A8A49A`
  - Nhấn: `--primary #FF004D` (nút chính, link quan trọng), `--primary-strong #990070` khi sáng và `#FF5FA8` khi tối, `--secondary #5546FF` / `#8B80FF` (tag tích hợp, số liệu). Tông tím của màu phụ hợp với ảnh đại diện neon tím/xanh.
  - Bo góc 8/12/16px, bóng `--shadow-sm/md/lg`, thời gian chuyển động 150/200ms. Tất cả theo Skill Pack guide.
- **Chế độ tối** bật bằng `data-theme="dark"` trên thẻ `<html>`, giống Skill Pack guide.
- **Chữ:** Geist cho toàn trang, Geist Mono cho số workflow (`02`), tên trigger và highlight kỹ thuật. Các con số nổi bật ("10 workflows · 63 tests") to và đậm.
- **Ảnh đại diện:** bo tròn, viền 3px màu `--secondary`, có thêm một quầng sáng nhẹ khi ở chế độ tối.
- **Mật độ:** thoáng, dễ đọc lướt. Câu chữ ngắn, giọng chuyên nghiệp, nói thẳng vào lợi ích cho khách.

## Components

### Providers (ngôn ngữ + sáng/tối)
`lib/providers.tsx`, client component bọc toàn trang.
- Giữ `lang` (`"en" | "vi"`, mặc định `"en"`) và `theme` (`"light" | "dark"`). Đưa ra hàm `t` để lấy chữ giao diện, và `pick(text)` để lấy đúng ngôn ngữ của một nội dung có cả hai bản, thiếu bản VI thì trả bản EN.
- Đọc và ghi localStorage với key `portfolio:lang`, `portfolio:theme`. Cập nhật `document.documentElement.lang` và `dataset.theme`.
- **Ngôn ngữ:** trang được build sẵn bằng tiếng Anh. Nếu khách đã chọn VI, sau khi trang tải xong sẽ đổi sang VI, nên có thể thấy chữ Anh trong chớp mắt. Skill Pack guide cũng chấp nhận điều này.
PRD ref: `prd.md > Language Toggle (EN / VI)`, `prd.md > Light / Dark Theme`, `prd.md > States and Boundaries`.

### Theme Init Script
`lib/theme-script.ts`, chuỗi script chèn vào `<head>` trong `app/layout.tsx`. Script chạy trước khi trang hiện ra: nếu có theme đã lưu thì dùng, nếu chưa có thì dùng `prefers-color-scheme` (cài đặt sáng/tối của máy). Nhờ vậy trang không nháy trắng.
PRD ref: `prd.md > Light / Dark Theme`.

### Navbar
`components/Navbar.tsx`. Gồm logo hoặc tên, link tới `#home #about #skills #projects #contact`, nút `EN | VI` và nút ☀/🌙. Trên điện thoại, link gom vào menu ☰. Ở trang dự án, các link trỏ về `/#...`.
PRD ref: `prd.md > Screens and Layout`.

### Home Sections
`components/sections/Hero.tsx`, `About.tsx`, `Skills.tsx`, `Contact.tsx`.
- **Hero:** ảnh đại diện (`/avatar-640.webp`, kèm `srcset` bản 320 và 640), tên, chức danh, một câu giới thiệu, nút "View projects" (`#projects`) và "Contact" (`#contact`).
- **About:** đoạn nói vì sao automation của bạn production-ready.
- **Skills:** lưới các tag công cụ.
- **Contact:** nút Email (`mailto:thkien85@gmail.com`, kèm địa chỉ hiện thành chữ) và nút GitHub (`https://github.com/KelvinTrinhSG`, mở tab mới với `rel="noopener"`).
- Chữ lấy từ `content/en.ts` / `content/vi.ts`. Tên, chức danh và câu giới thiệu là **chữ tạm**, learner sửa lúc build.
PRD ref: `prd.md > Home, About, Skills`, `prd.md > Contact`.

### ProjectCard
`components/ProjectCard.tsx`. Nhận một dự án, hiện ảnh bìa, tên, mô tả một câu, số liệu và tag. Cả thẻ là link tới `/projects/[slug]/`.
PRD ref: `prd.md > Project List`.

### Project Page
`app/projects/[slug]/page.tsx`. Dùng `generateStaticParams()` lấy danh sách slug từ `content/projects`, và đặt `dynamicParams = false`, nên mỗi dự án được build sẵn thành một trang HTML. Nội dung trang: nút ← Back (`/#projects`), tổng quan, các nguyên tắc kỹ thuật, link repo, 10 `WorkflowCard`, nút Contact (`/#contact`).
PRD ref: `prd.md > Project Detail`.

### WorkflowCard
`components/WorkflowCard.tsx`, client component.
- **Trạng thái gọn:** số, tên, câu vấn đề, tag. Cả hàng là một `<button aria-expanded>`.
- **Trạng thái bung:** trigger, các bước, highlights, kết quả (chỉ hiện khi có), `ScreenshotStrip`, link GitHub tới `https://github.com/KelvinTrinhSG/n8n-form-crm-automations/tree/main/projects/<folder>`.
- Có thể bung nhiều thẻ cùng lúc. Mỗi thẻ tự nhớ mình đang mở hay đóng; rời trang thì không giữ lại.
- **Phần bung chỉ được tạo khi thẻ mở.** Nhờ vậy ảnh không tải lúc mở trang.
PRD ref: `prd.md > Workflow Detail`.

### ScreenshotStrip
`components/ScreenshotStrip.tsx`. Một hàng ảnh nhỏ vuốt ngang được (`overflow-x-auto` + `scroll-snap`). Mỗi ảnh có `width`/`height` lấy từ file kích thước ảnh (xem Data Model) để giữ chỗ, kèm nhãn song ngữ. Ảnh lỗi thì chuyển sang ô chữ có nhãn và link GitHub (`onError`). Bấm ảnh thì mở `Lightbox` tại vị trí ảnh đó.
PRD ref: `prd.md > Workflow Screenshots`.

### Lightbox
`components/Lightbox.tsx`, tự viết, không dùng thư viện.
- Lớp phủ toàn màn hình nền tối, ảnh lớn `max-w-[92vw] max-h-[82vh]`, nhãn và bộ đếm `3 / 6`.
- Có nút ‹ ›, phím ← → và vuốt (lệch hơn 40px thì chuyển ảnh). Đóng bằng ✕, Esc hoặc bấm nền.
- Khi mở thì khóa cuộn trang và đưa con trỏ bàn phím vào nút ✕. Khi đóng thì đưa con trỏ về ảnh nhỏ vừa bấm.
- Tải trước ảnh kế tiếp để chuyển ảnh nhanh.
PRD ref: `prd.md > Workflow Screenshots`.

### Not Found Page
`app/not-found.tsx`. Hiện "Project not found" và nút về `/#projects`. Khi xuất trang tĩnh, trang này thành `404.html`, và Vercel tự dùng nó cho mọi đường dẫn sai.
PRD ref: `prd.md > States and Boundaries`.

### Image Script
`scripts/images.mjs`, chạy bằng `npm run images`.
1. Gọi GitHub API (không cần đăng nhập) để lấy danh sách file trong `docs/screenshots/` của repo n8n. Tải từng ảnh qua `https://raw.githubusercontent.com/KelvinTrinhSG/n8n-form-crm-automations/main/docs/screenshots/<file>` vào `.cache/screenshots/`. Thư mục này bị git bỏ qua. File đã có thì không tải lại.
2. Dùng sharp tạo hai bản cho mỗi ảnh:
   - `public/shots/n8n-form-crm-automations/<name>-sm.webp`: rộng 640px, chất lượng 70, khoảng 20–40 KB.
   - `<name>-lg.webp`: rộng tối đa 1600px, chất lượng 82, khoảng 100–150 KB. Ảnh gốc nhỏ hơn 1600px thì giữ nguyên kích thước.
3. Nén ảnh đại diện từ `assets/avatar-original.png` thành `public/avatar-320.webp` và `public/avatar-640.webp`.
4. Ghi `content/projects/n8n-form-crm-automations.images.json` dạng `{ "<name>": { "w": 1600, "h": 900 } }` để component giữ chỗ cho ảnh.
5. In ra tổng dung lượng trước và sau khi nén.
- Kết quả trong `public/` được commit lên GitHub, nên Vercel không cần chạy sharp.
PRD ref: `prd.md > Workflow Screenshots`.

### Content Check Script
`scripts/check-content.mjs`, chạy bằng `npm run check`. Script kiểm tra:
- Mỗi workflow có đủ `name`, `problem`, `trigger`, `steps`, `highlights` ở cả EN và VI.
- Mỗi ảnh được nhắc tới trong nội dung đều có file `-sm`/`-lg` và có kích thước.
- Các `id` không trùng nhau.
Có lỗi thì in danh sách và thoát với mã lỗi. Đây là lưới an toàn khi thêm dự án mới, đúng tinh thần "production-ready".
PRD ref: `prd.md > Adding Projects Later`, `prd.md > States and Boundaries`.

## Data Model

Mọi dữ liệu là **nội dung tĩnh trong code**, chỉ thay đổi khi bạn sửa file. Riêng hai lựa chọn của khách được lưu trong trình duyệt.

```ts
// content/types.ts
type L = { en: string; vi?: string };          // vi thiếu → dùng en

type Screenshot = {
  file: string;            // "02-execution-rejected" (không đuôi)
  label: L;                // "Forged request rejected"
  kind: "result" | "execution";   // result (HubSpot/Sheets/Email) xếp trước
};

type Workflow = {
  id: string;              // "02"
  folder: string;          // "02-secure-webhook-gateway"
  name: L;
  problem: L;              // một câu
  tags: string[];          // ["Webhook", "HMAC"]
  trigger: L;
  steps: L[];              // 3–4 bước
  highlights: L[];         // 2–4 ý
  result?: L;              // chỉ khi có số liệu
  screenshots: Screenshot[];
};

type Project = {
  slug: string;            // "n8n-form-crm-automations"
  repo: string;            // URL GitHub
  name: L;
  summary: L;              // một câu cho thẻ
  overview: L;             // 2–3 câu
  stats: { label: L; value: string }[];  // 10 workflows, 63 tests, live-tested
  principles: L[];
  tags: string[];
  cover: string;           // "01-hubspot-contact"
  workflows: Workflow[];
};
```

| Dữ liệu | Nằm ở đâu | Cập nhật thế nào | Khách rời trang rồi quay lại |
|---|---|---|---|
| Chữ giao diện EN/VI | `content/en.ts`, `content/vi.ts` | Bạn sửa file | Không đổi |
| Dự án và workflow | `content/projects/*.ts` | Bạn sửa file | Không đổi |
| Kích thước ảnh | `content/projects/*.images.json` | Script `npm run images` tạo ra | Không đổi |
| Ngôn ngữ đã chọn | localStorage `portfolio:lang` | Khách bấm EN/VI | Vẫn giữ |
| Sáng/tối đã chọn | localStorage `portfolio:theme` | Khách bấm ☀/🌙 | Vẫn giữ |
| Workflow đang bung, lightbox đang mở | Bộ nhớ tạm của component | Khách bấm | Mất, trang mở lại ở trạng thái gọn |

- **Nguồn nội dung:** chữ EN của 10 workflow lấy từ README của từng thư mục `projects/NN-*` trong repo n8n. Claude dịch sang VI, learner đọc lại. Nhãn ảnh do Claude đặt dựa trên tên file.
- **Workflow 10:** gồm cả ảnh `10a-*` và `10b-*`.

## File Structure

```
My N8N Portfolio/
├── app/
│   ├── layout.tsx              # <html>, font Geist, theme init script, <Providers>, Navbar, footer
│   ├── page.tsx                # Trang chính: Hero, About, Skills, Projects, Contact
│   ├── globals.css             # Tailwind + token màu sáng/tối của Skill Pack guide
│   ├── not-found.tsx           # "Project not found" → 404.html
│   ├── icon.svg                # favicon
│   └── projects/[slug]/page.tsx  # Trang chi tiết dự án (build sẵn cho mỗi slug)
├── components/
│   ├── Navbar.tsx              # Link, EN|VI, ☀/🌙, menu ☰ trên điện thoại
│   ├── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx        # Lưới ProjectCard
│   │   └── Contact.tsx
│   ├── ProjectCard.tsx
│   ├── WorkflowCard.tsx        # Thẻ gọn ↔ bung
│   ├── ScreenshotStrip.tsx     # Hàng ảnh nhỏ
│   ├── Lightbox.tsx            # Xem ảnh lớn
│   └── ui/                     # Button, Tag, SectionTitle dùng chung
├── content/
│   ├── types.ts                # Kiểu dữ liệu ở mục Data Model
│   ├── en.ts                   # Chữ giao diện tiếng Anh (nguồn chuẩn)
│   ├── vi.ts                   # Chữ giao diện tiếng Việt (cùng cấu trúc với en.ts)
│   └── projects/
│       ├── index.ts            # Danh sách dự án → thêm repo mới ở đây
│       ├── n8n-form-crm-automations.ts         # Dự án + 10 workflow (EN/VI)
│       └── n8n-form-crm-automations.images.json  # Kích thước ảnh (script tạo)
├── lib/
│   ├── providers.tsx           # Ngôn ngữ + sáng/tối, t(), pick()
│   ├── theme-script.ts         # Script chống nháy trắng
│   └── storage.ts              # Đọc/ghi localStorage an toàn (try/catch)
├── public/
│   ├── avatar-320.webp, avatar-640.webp
│   └── shots/n8n-form-crm-automations/*-sm.webp, *-lg.webp   # 52 × 2 ảnh
├── scripts/
│   ├── images.mjs              # Tải và nén ảnh (npm run images)
│   └── check-content.mjs       # Kiểm tra nội dung (npm run check)
├── assets/avatar-original.png  # Ảnh gốc của learner (không đưa lên web)
├── .cache/                     # Ảnh gốc tải về, git bỏ qua
├── devpost/                    # Tài liệu hackathon
├── next.config.ts              # output: "export", images.unoptimized, trailingSlash: true
├── postcss.config.mjs
├── tsconfig.json
├── package.json                # scripts: dev, build, images, check, lint
├── .gitignore                  # node_modules, .next, out, .cache
└── README.md
```

## External Services and Dependencies

- **GitHub (chỉ dùng trong script ảnh, không dùng khi khách xem trang)**
  - `GET https://api.github.com/repos/KelvinTrinhSG/n8n-form-crm-automations/contents/docs/screenshots` → trả về mảng `[{ name, download_url, size }]`. Không cần key. Giới hạn 60 lần/giờ khi chưa đăng nhập, trong khi script chỉ gọi 1 lần. Tài liệu: https://docs.github.com/en/rest/repos/contents
  - Ảnh tải qua `download_url` (raw.githubusercontent.com), không bị giới hạn số lần như API.
- **Vercel:** gói Hobby miễn phí, dùng cho trang cá nhân. Không có biến môi trường. Tài liệu: https://vercel.com/docs
- **Google Fonts qua `next/font`:** font được tải về **lúc build** và đi kèm trang, nên khách không gọi tới Google.
- **Link ra ngoài:** `mailto:`, GitHub. Chỉ là link, không phải tích hợp.

## Important Failure Modes

- **Ảnh không tải được** (sai tên file hoặc file chưa được tạo) → ô ảnh hiện nhãn và link "View on GitHub", không hiện biểu tượng ảnh vỡ. `npm run check` bắt lỗi này trước khi đẩy code.
- **Trình duyệt chặn localStorage** (chế độ riêng tư, cài đặt chặt) → mọi lần đọc/ghi đều bọc `try/catch`. Trang vẫn chạy với EN và theo sáng/tối của máy, chỉ là không nhớ lựa chọn.
- **Thiếu bản dịch VI** cho một đoạn → `pick()` trả bản EN. `npm run check` liệt kê các chỗ thiếu.
- **Build trên Vercel lỗi** (thường do lỗi TypeScript hoặc cấu hình Tailwind) → luôn chạy `npm run build` trên máy trước khi đẩy code. Bản trên Vercel vẫn là bản build thành công gần nhất.

## What Was Simplified and Why

- **Trang tĩnh (`output: "export"`)** thay vì Next.js có server: không có gì cần tính toán khi khách xem trang. Bản có server sẽ phải lo runtime, giới hạn chạy và chi phí mà không thêm lợi ích nào.
- **Ảnh nén sẵn, commit lên GitHub** thay vì nén tự động lúc build hoặc dùng dịch vụ ảnh: Vercel không cần sharp, build nhanh, kết quả chắc chắn. Cái giá là ảnh mới phải chạy `npm run images` bằng tay.
- **Chuyển ngôn ngữ phía trình duyệt** thay vì hai bộ đường dẫn `/en`, `/vi`: đơn giản, giống Skill Pack guide. Cái giá là Google chỉ thấy bản tiếng Anh, và có thể thấy chữ Anh trong chớp mắt trước khi đổi sang VI. Bản đầy đủ sẽ cần định tuyến i18n và build hai lần.
- **Lightbox tự viết** thay vì cài thư viện: chỉ khoảng 100 dòng, không thêm phụ thuộc, toàn quyền về giao diện sáng/tối.
- **Nội dung viết tay** (scope đã cắt việc lấy dữ liệu từ GitHub API): script ảnh chỉ dùng GitHub API ở máy bạn, một lần, không chạy khi khách xem trang.

## Decisions and Open Issues

**Learner chọn:**
- Next.js như Skill Pack guide. Chấp nhận phải cài đặt, có bước build, lỗi khó đọc hơn.
- Chép và nén 52 ảnh về dự án thành hai cỡ WebP. Chấp nhận phải chạy lại script khi có ảnh mới.
- Đưa trang lên Vercel.

**Claude chọn để triển khai các lựa chọn trên (đổi được):**
- Tailwind 4 qua PostCSS, font Geist, chép nguyên token màu của Skill Pack guide.
- Cỡ ảnh: nhỏ 640px chất lượng 70, lớn 1600px chất lượng 82. Ảnh đại diện 320/640px.
- `trailingSlash: true` để đường dẫn dạng `/projects/<slug>/` chạy ổn khi xuất trang tĩnh.
- Thêm `npm run check` làm lưới an toàn cho nội dung.

**Điều learner chưa chắc:** chưa có điều nào được nêu ra trong cuộc trò chuyện này. Cách Next.js biến code thành file tĩnh và cách localStorage nhớ lựa chọn đã được giải thích ở *How This Works, In Plain Language*.

**Còn mở (không chặn việc build):**
- Tên hiển thị, chức danh và câu giới thiệu: dùng chữ tạm, learner sửa lúc build (`prd.md > Open Questions`).
- Tên repo GitHub và tên miền `*.vercel.app`: quyết ở `6-ship`.
- Bản dịch VI của 10 workflow do Claude viết: learner đọc lại trong lúc build.
