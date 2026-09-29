# Team Portfolio & Showcase — Design System & Guidelines (`design.md`)

Tài liệu thiết kế chi tiết cho website **Portfolio, Profile Team, Tech Stack & Project Showcase**, kế thừa phong cách tối giản cao cấp (Modern Minimalist / macOS Liquid Retina aesthetic) của NotchOwl với typography **GeistSans**.

---

## 1. Triết lý Thiết kế (Design Philosophy)

* **Craft & Precision (Kỹ nghệ & Tinh xảo)**: Thể hiện năng lực kỹ thuật và mắt thẩm mỹ của team thông qua bố cục Bento-grid chặt chẽ, đường viền sub-pixel (`1px`), bo góc chuẩn Apple squircle.
* **Dark-First Modernity**: Tone nền tối sâu (`#090A0F`), tạo độ tương phản cao giúp các ảnh chụp mockup dự án, code snippets và logo công nghệ tỏa sáng.
* **Dynamic Notch & Floating UI**: Điểm nhấn nhận diện từ NotchOwl — thanh điều hướng (header) và bộ lọc dự án neo nhẹ nhàng ở mép trên màn hình như một Dynamic Notch thu gọn/mở rộng.

---

## 2. Typography (GeistSans & GeistMono)

Toàn bộ hệ thống chữ sử dụng **GeistSans** cho giao diện người dùng và **GeistMono** cho các thẻ công nghệ, commit stats và phím tắt.

### 2.1 Bảng phân cấp Typography

| Cấp bậc (Hierarchy) | Font Family | Size | Line Height | Weight | Tracking | Ứng dụng |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / Hero H1** | GeistSans | `52px – 72px` | `1.05` | 700 (Bold) | `-0.035em` | Tuyên ngôn của team ("We build...", "Crafting...") |
| **Section Title (H2)** | GeistSans | `32px – 40px` | `1.2` | 600 (SemiBold) | `-0.025em` | Tiêu đề: *Featured Projects*, *Our Stack*, *Team* |
| **Card Title (H3)** | GeistSans | `20px – 24px` | `1.3` | 600 (SemiBold) | `-0.015em` | Tên dự án, tên thành viên |
| **Body Large** | GeistSans | `18px` | `1.6` | 400 (Regular) | `-0.01em` | Giới thiệu ngắn hero, pitch dự án |
| **Body Regular** | GeistSans | `15px – 16px` | `1.6` | 400 (Regular) | `normal` | Mô tả chi tiết dự án, bio thành viên |
| **Meta / Tag / Subtext** | GeistSans | `13px – 14px` | `1.4` | 500 (Medium) | `+0.01em` | Vai trò (Role), ngày phát hành, client |
| **Tech Badge / Code** | GeistMono | `12px – 13px` | `1.4` | 500 (Medium) | `normal` | Thẻ công nghệ: `React`, `Rust`, `Next.js`, phím tắt |

### 2.2 Cấu hình CSS / Tailwind Variables

```css
@import url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/font/sans.css');
@import url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/font/mono.css');

:root {
  --font-sans: 'Geist Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: 'Geist Mono', monospace;
}

body {
  font-family: var(--font-sans);
  background-color: #090A0F;
  color: #F4F5F8;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## 3. Bảng Màu (Color Tokens)

### 3.1 Nền & Bề mặt (Surfaces)
* **Background Canvas**: `#090A0F` (Đen vũ trụ sâu, độ sâu lớn hơn pure black)
* **Panel / Card Surface (Level 1)**: `#12131A` (Nền thẻ dự án, card profile)
* **Surface Hover / Highlight (Level 2)**: `#1A1C26`
* **Floating Notch Nav**: `rgba(18, 19, 26, 0.75)` với `backdrop-filter: blur(24px)`
* **Subtle Borders**: `rgba(255, 255, 255, 0.08)` (Normal) / `rgba(255, 255, 255, 0.16)` (Hover)

### 3.2 Màu Chữ (Text)
* **Text High-Contrast**: `#FFFFFF` / `#F4F5F8` (Tiêu đề, số liệu ấn tượng)
* **Text Secondary**: `#9CA3AF` (Mô tả dự án, thông tin phụ)
* **Text Tertiary / Muted**: `#52525B` (Bản quyền, tag mờ, chỉ số inactive)

### 3.3 Màu Nhấn & Trạng thái (Accents & Badges)
* **Primary Glow / White Accent**: `rgba(255, 255, 255, 0.9)`
* **Active Status / Live Project**: `#10B981` (Xanh lá biểu thị sản phẩm đã launch)
* **In-Progress / Experimental**: `#F59E0B` (Vàng hổ phách biểu thị dự án R&D / Beta)
* **Accent Highlight**: Gradient tuyến tính `linear-gradient(135deg, #FFFFFF 0%, #9CA3AF 100%)`

---

## 4. Hệ thống Bố cục & Lưới (Layout & Grid)

* **Max Widths**:
  * Navigation / Header: `760px` (Dạng floating capsule neo giữa)
  * Main Container: `1200px`
  * Hero Text Container: `840px`
* **Spacing Scale**: Base 8px (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`).
* **Bento Grid**: Lưới 12 cột linh hoạt (`grid-cols-1 md:grid-cols-12 gap-6`).

---

## 5. Cấu trúc Component cốt lõi (Core UI Components)

### 5.1 The "Dynamic Notch" Header (Thanh điều hướng)
* Đặt cố định ở top giữa màn hình, mang hình dáng mở rộng từ notch của MacBook:
```css
.notch-nav {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(18, 19, 26, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: none;
  border-radius: 0 0 20px 20px;
  padding: 10px 24px;
  box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.7);
  z-index: 50;
}
```

### 5.2 Project Showcase Cards (Bento Showcase)
Mỗi dự án nằm trong một card kính tối viền phát quang subtle khi hover:
* **Background**: `#12131A`
* **Border Radius**: `20px`
* **Cover Mockup**: Tỷ lệ 16:10, có shadow đa tầng tạo hiệu ứng nổi màn hình.
* **Meta Bar**: Gồm Icon dự án, Tên dự án, Trạng thái (Live / Beta) và Danh sách Tech Tags.
* **Hover Interaction**: Card nâng nhẹ (`translateY(-4px)`), viền chuyển từ `rgba(255, 255, 255, 0.08)` sang `rgba(255, 255, 255, 0.22)`.

### 5.3 Tech Stack Capsule Tags
Thẻ công nghệ tối giản, tinh tế:
```css
.tech-pill {
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #D1D5DB;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
```

### 5.4 Team Member Profile Card
* **Ảnh chân dung/Avatar**: Bán thân phong cách monochrome hoặc ánh sáng góc nghiêng studio, bo góc `16px`.
* **Thông tin**: Họ tên (H3 GeistSans), Chức danh (Medium GeistSans), Github / X / LinkedIn links dạng icon phím tròn mini.
* **Interactive Element**: Hover vào card hiển thị câu quote triết lý kỹ thuật hoặc các repo chủ lực do thành viên phụ trách.

### 5.5 Action Buttons (CTA)
* **Primary (Contact / Work with Us)**: Nền trắng `#FFFFFF`, chữ đen `#090A0F`, radius `9999px`, padding `10px 24px`, font-weight `600`.
* **Secondary (View Case Study / GitHub)**: Nền trong suốt, viền `1px solid rgba(255,255,255,0.12)`, hover tăng sáng nền `rgba(255,255,255,0.06)`.

---

## 6. Sơ đồ các Phân đoạn Website (Page Structure)

1. **Hero Section**:
   * Badge trạng thái: `● Available for new projects / Q4 2026`
   * Headline lớn: Định vị giải pháp kỹ thuật & sản phẩm team xây dựng.
   * Quick CTAs + Live metric (Số dự án launched, tổng lượt download/users).
2. **Featured Projects (Bento Grid 4 khối)**:
   * Thẻ lớn (Span 8 cột): Dự án flagship tiêu biểu nhất (Full screenshot + interactive preview).
   * Thẻ nhỏ (Span 4 cột): Micro-app, tiện ích mã nguồn mở hoặc công cụ nội bộ.
   * Hai thẻ dưới (Span 6 cột mỗi thẻ): Các dự án client / SaaS nổi bật.
3. **Tech Stack & Capabilities**:
   * Phân nhóm rõ ràng: *Frontend & Native*, *Backend & Cloud*, *Design & Motion*.
   * Icon vector công nghệ kèm GeistMono labels.
4. **Team Members (The Builders)**:
   * Grid chân dung + vị trí nòng cốt (Lead Architect, UI/UX Designer, Systems Engineer).
5. **Contact / Notch Footer**:
   * Form liên hệ hoặc email capsule dạng 1-click copy kèm phím tắt.