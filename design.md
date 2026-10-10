# IFA Team Portfolio — Design System (`design.md`)

Phong cách tham khảo từ [Software Mansion](https://swmansion.com/): các section màu khối full-bleed (color-block), typography geometric weight mỏng, card vuông có cạnh 3D "slab".

---

## 1. Triết lý

* **Color-blocked sections**: mỗi section có một nền riêng, dịu mắt (navy → trắng → periwinkle → cream → navy). Cam chỉ dùng trên nền tối, indigo cho link/tương tác trên nền sáng.
* **Light typography**: heading weight 400–500, không dùng bold. Nhấn mạnh bằng màu (cam) thay vì độ đậm.
* **Tactile cards**: card góc vuông, cạnh 3D đặc ở phải + dưới (`.slab`).
* **Không layout shift khi hover**: hover chỉ đổi màu (nền, viền, cạnh slab) hoặc xoay icon, không translate/scale. Transition chuẩn: `300ms cubic-bezier(0, 0, 0.2, 1)`.

---

## 2. Typography

| Cấp bậc | Font | Size | Weight | Tracking |
| :--- | :--- | :--- | :--- | :--- |
| Hero H1 | Instrument Sans | `44 → 72px` | 400 | `-0.02em` |
| Section H2 | Instrument Sans | `32 → 44px` | 400 | `-0.01em` |
| Card H3 | Instrument Sans | `22–24px` | 500 | `-0.01em` |
| Eyebrow (`.eyebrow`) | DM Sans | `14px` (12px trong card) | 600, uppercase | `0.2em` |
| Body | DM Sans | `15–18px` | 400 | normal |
| Pill / meta | DM Sans | `12–13px` | 500 | normal |

Nạp bằng `next/font/google` trong `lib/fonts.ts` → biến `--font-heading`, `--font-body` → Tailwind `font-heading`, `font-body`.

---

## 3. Màu (tailwind.config.js)

| Token | Hex | Dùng cho |
| :--- | :--- | :--- |
| `ink` | `#0D0F26` | Nền hero, chữ chính trên nền sáng, nút primary |
| `navy` / `navy-deep` | `#001A72` / `#0A0C20` | Chữ nav / footer |
| `indigo` | `#524BF4` | Link, hover nút, focus input, gạch active nav |
| `paper` / `mist` | `#FFFFFF` / `#F4F5FA` | Section trắng / nền input |
| `periwinkle` (+ `edge`) | `#EDF0FE` / `#D5DBF8` | Section Stack, hover nav, hover nút trắng |
| `cream` | `#FBF5EE` | Section Contact |
| `accent-orange` | `#F6A656` | Chữ nhấn hero (chỉ trên nền tối) |
| `accent-blue` / `accent-coral` | `#97A5ED` / `#F07A6E` | Đường trang trí hero / dấu `*` bắt buộc |
| `live` / `beta` | `#10B981` / `#F59E0B` | Chấm trạng thái dự án |

---

## 4. Component

* **`Section`** (`components/ui/section.tsx`): `tone = ink | paper | periwinkle | cream | navy` → nền + màu chữ + màu cạnh slab (`--slab-side`, `--slab-bottom`). Mọi section dùng wrapper này.
* **`.slab`** (`globals.css`): card trắng, góc vuông, viền 1px `ink/8%`, cạnh 3D bằng `::before` (phải) và `::after` (dưới) với `clip-path`. Màu cạnh lấy từ section cha qua `--slab-side` / `--slab-bottom`. `.slab-interactive`: hover đổi cạnh sang tông indigo + viền indigo, không di chuyển. Grid chứa slab cần `pr-[10px]` để cạnh không bị cắt.
* **Buttons** (`components/ui/button.tsx`): `primary` (nền ink), `inverse` (nền trắng trên nền tối), `outline` (`.btn-outline`, viền `currentColor`), `link` (chữ + `ArrowRight`). `ArrowRight` là mũi tên hướng phải, hover vào `group` thì xoay thành ↗ (kiểu SWM).
* **`ProfileLinks`** (`components/ui/profile-links.tsx`): GitHub org + trang developer Google Play / App Store, dạng pill outline. Dùng ở Hero và Contact; Footer có cột "Find us".
* **`.tech-pill`**: pill viền `currentColor 28%`, tự thích ứng nền sáng/tối.
* **Nav** (`components/ui/site-nav.tsx`): thanh trắng sticky, chữ navy, hover tô nền periwinkle, gạch indigo dưới section active, nút ink "Hire us".
* **Testimonials** (`components/section/testimonials.tsx`): carousel kiểu SWM tự chạy chậm liên tục (~28px/s, lặp vô hạn bằng cách render 3 bản), dừng khi hover/focus/chạm, nút prev / pause-play / next (`.btn-outline`) + chấm chỉ vị trí; `prefers-reduced-motion` thì mặc định dừng. Card `.slab` mặt navy `#1B1E45`, cạnh `#2A2E63`/`#363B7A`, icon ❝ màu `accent-blue`, avatar chữ cái đầu, tên + "Role, Company" hoặc nguồn store + sao. Dữ liệu ở `testimonials` trong `lib/data.ts`; quote rỗng = slot nét đứt chỉ hiện ở dev, ẩn ở production. Review store phải là review thật; quote khách hàng soạn sẵn cần khách xác nhận (đánh dấu `DRAFT` trong code).
* **Video YouTube trong card**: `youtubeId` → thumbnail + nút play tròn (hover đổi sang indigo), click mới nạp iframe `youtube-nocookie`.
* **Form**: label phía trên, input nền `mist` góc vuông, focus viền indigo, nút submit pill full-width.

---

## 5. Cấu trúc trang

1. **Hero** — `ink`: eyebrow trạng thái, H1 hai dòng (dòng 2 màu cam), 2 CTA, "Find us on" + ProfileLinks, hàng số liệu.
2. **Featured Projects** — `paper`: grid 3 cột card `.slab`.
3. **Reviews** — `ink`: heading + nút prev/next, carousel card quote.
4. **Stack** — `periwinkle`: 3 card `.slab` với thanh indigo ở đỉnh.
5. **Contact** — `cream`: heading + email + ProfileLinks/Discord bên trái, form trong `.slab` bên phải.
6. **Footer** — `navy-deep`.
