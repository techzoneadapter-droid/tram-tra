# AGATEA — 5 landing page bán Trà Trầm Hương

Bộ 5 concept website responsive, có chọn 6 sản phẩm, lọc quy cách, giá chính xác theo file COST A, điền biểu mẫu và trang cảm ơn.

## Link xem thử (sau khi bật GitHub Pages)

- https://techzoneadapter-droid.github.io/tram-tra/mau-1.html — Di sản
- https://techzoneadapter-droid.github.io/tram-tra/mau-2.html — Tĩnh tại
- https://techzoneadapter-droid.github.io/tram-tra/mau-3.html — Quà tặng
- https://techzoneadapter-droid.github.io/tram-tra/mau-4.html — Mua hàng
- https://techzoneadapter-droid.github.io/tram-tra/mau-5.html — Câu chuyện

Trang tổng hợp: https://techzoneadapter-droid.github.io/tram-tra/

**Đường dẫn chưa chắc đã hoạt động ngay.** Để bật GitHub Pages: vào repo → Settings → Pages → Build and deployment → Source → GitHub Actions. Repo đã có workflow deploy sẵn. Kiểm tra Actions chạy thành công mới chia sẻ link.

## Đặt hàng THẬT — cần kích hoạt Netlify Forms

GitHub Pages không thể lưu biểu mẫu gửi đơn vì chỉ hosting file tĩnh. Do đó trên GitHub Pages, sau khi điền form, trang cảm ơn sẽ hiện rõ **DEMO / KHÔNG GỬI ĐƠN THẬT**; không hề giả lập gửi đơn thành công.

Để có form lưu đơn thật:

1. Đăng nhập Netlify, chọn Add new project → Import an existing project → GitHub → repo `techzoneadapter-droid/tram-tra`.
2. Build command để trống, publish directory `.`.
3. Vào Netlify → Forms → **Enable form detection**, rồi redeploy. Form `agatea-orders` nằm trong `forms.html`.
4. Truy cập site qua domain `*.netlify.app`: form được gửi bằng POST và chỉ chuyển đến `cam-on.html` khi có HTTP 2xx.
5. Gửi một đơn thử và kiểm tra Netlify → Forms → `agatea-orders`, cả mục Verified và Spam. Cài Form notifications để nhận email.
6. Nếu dùng **custom domain** trên Netlify, chỉ sau khi kiểm tra Form detection hoạt động mới đổi `formsEnabled:true` trong `config.js`.

Đây là **form yêu cầu đặt hàng**, chưa có thanh toán online, tồn kho, email trả lời tự động hay vận đơn. Trước khi kinh doanh, điền thông tin pháp nhân/hotline/địa chỉ liên hệ thực, chính sách vận chuyển và thanh toán, hoàn thiện chính sách bảo mật.

## Thiết kế và hình sản phẩm

Nguồn Excel có **ảnh bao bì gốc tông nâu trầm, vàng kim**. Sáu ảnh `assets/*.svg` trong repo là **minh họa vector** bám tinh thần màu và bố cục sản phẩm, không phải ảnh chụp sản phẩm thật hoặc bản sao chính xác. Trước khi chạy Ads thay bằng ảnh đã được thương hiệu phê duyệt. Không dùng mockup xanh lá trước đây làm hình sản phẩm.

## SEO, Ads & Analytics

- 5 trang có title/description riêng, H1 và ItemList JSON-LD, nội dung kể chuyện độc lập.
- Khi chọn mẫu chạy thật, chuyển mẫu thắng thành trang chính, **noindex các bản thử còn lại**, dùng domain/canonical và sitemap chính thức để tránh trùng nội dung.
- `tracking.js` tạo sự kiện dataLayer: `agatea_select_product` và `agatea_order_submitted` (chỉ gửi đơn thành công, không tính đơn demo).
- Có thể cài `ga4Id` trong `config.js`; hãy thiết lập consent/cookie theo yêu cầu pháp lý. Chưa gắn tài khoản Google Ads hoặc Meta Pixel cụ thể.
- Không có review giả, khan hiếm giả hoặc tuyên bố y tế không kiểm chứng.

### Chỉnh sửa nội dung

- `site.js` — sản phẩm, giá, câu chuyện, cấu trúc 5 mẫu.
- `style.css` — responsive, màu, các phong cách.
- `config.js` — trạng thái nhận form / GA4.
- `mau-1.html` ... `mau-5.html` — SEO riêng từng mẫu.
- `cam-on.html` — lời cảm ơn và mã yêu cầu.
- `forms.html` — Netlify Forms skeleton (không xóa).

## Xem ngay qua link review tạm (không cần bật GitHub Pages)

Dịch vụ bên thứ ba raw.githack.com phục vụ bản HTML trực tiếp từ nhánh main. Khi mở có thể hiện màn hình xác nhận an toàn lần đầu; chỉ dùng để xem demo, không dùng làm website bán hàng thật hoặc nhập dữ liệu cá nhân thật.

- [Mẫu 1 — Di sản](https://raw.githack.com/techzoneadapter-droid/tram-tra/main/mau-1.html)
- [Mẫu 2 — Tĩnh tại](https://raw.githack.com/techzoneadapter-droid/tram-tra/main/mau-2.html)
- [Mẫu 3 — Quà tặng](https://raw.githack.com/techzoneadapter-droid/tram-tra/main/mau-3.html)
- [Mẫu 4 — Mua hàng](https://raw.githack.com/techzoneadapter-droid/tram-tra/main/mau-4.html)
- [Mẫu 5 — Câu chuyện](https://raw.githack.com/techzoneadapter-droid/tram-tra/main/mau-5.html)

## Cấu trúc điều hướng đa trang (cập nhật)

Mỗi concept `mau-1.html` ... `mau-5.html` là **Trang chủ** đầy đủ nội dung. Thanh menu có 5 mục dẫn đến 5 trang/đường dẫn:

- Trang chủ: `mau-1.html` ... `mau-5.html` tùy concept.
- Câu chuyện: `cau-chuyen.html?mau=1` (thay 1 bằng 2–5 để giữ đúng phong cách).
- Bộ sưu tập: `bo-suu-tap.html?mau=1`.
- Quà tặng: `qua-tang.html?mau=1`.
- Giải đáp: `giai-dap.html?mau=1`.

Mỗi trang có nội dung chuyên sâu, H1 riêng, title/description SEO riêng, menu thống nhất, nút đặt hàng và form lựa chọn 6 sản phẩm. `source_page` trong Netlify Forms cho biết đơn đến từ trang nào. HTML/CSS dùng chung quy tắc font **Be Vietnam Pro** cho nội dung và **Playfair Display** cho tiêu đề, responsive từ desktop đến mobile. Trang chuyên biệt dùng cùng 5 bảng màu qua query `?mau=N`.

**Lưu ý:** Đây là code và các bài kiểm tra kết xuất, chưa thay thế quá trình kiểm tra hiển thị trực tiếp trên máy thật/thiết bị thật trước khi chạy Ads. 
