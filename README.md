# AGATEA — 5 website riêng biệt × 5 trang = 25 trang HTML

Bản thiết kế mới nhất thay thế cách làm 5 mẫu chỉ đổi màu. Mỗi phong cách có typography, bảng màu, bố cục sản phẩm, cách kể chuyện và luồng dẫn tới form khác nhau. Nội dung được sinh sẵn trong 25 file HTML để trình duyệt và công cụ tìm kiếm đọc trực tiếp mà không cần JavaScript dựng nội dung.

## 5 bộ thiết kế và link trong repo

| Concept | Trang chủ | Các trang chuyên biệt |
|---|---|---|
| 01 Thư phòng di sản | `mau-1.html` | `mau-1/*.html` |
| 02 Thiền trà tĩnh tại | `mau-2.html` | `mau-2/*.html` |
| 03 Quà tặng cảm xúc | `mau-3.html` | `mau-3/*.html` |
| 04 Smart Shop | `mau-4.html` | `mau-4/*.html` |
| 05 AGATEA Journal | `mau-5.html` | `mau-5/*.html` |

Mỗi thư mục `mau-N/` có đúng 4 trang: `cau-chuyen.html`, `bo-suu-tap.html`, `qua-tang.html`, `giai-dap.html`. Kết hợp với trang chủ `mau-N.html` thành 5 trang/bộ. Các URL cũ `cau-chuyen.html?mau=N`... chuyển hướng đến trang tương ứng trong thư mục mới.

### Điểm khác nhau thực chất

- **Di sản:** thư phòng nâu trầm, chữ Noto Serif, danh mục hàng ngang có số thứ tự, nội dung câu chuyện theo phong thư.
- **Tĩnh tại:** bố cục tối giản không viền, nhiều khoảng trắng, kiểu chữ nhẹ, câu chuyện ba khoảng thở.
- **Quà tặng:** phong cách hồng đất và đỏ mận, catalog thẻ bo mềm, công cụ chọn người nhận bằng nút tương tác trên trang Quà tặng.
- **Smart Shop:** thiết kế module, giá hàng đầu, bảng so sánh quy cách, bộ lọc và nút chọn mua nhanh.
- **Journal:** phong cách tạp chí, cột dọc số báo, câu chuyện nhiều chương và catalog hai cột kiểu biên tập.

## Sản phẩm và nội dung

Giữ đúng 6 sản phẩm & giá niêm yết theo COST A:

1. Trầm trà Hương Sen 120g / Hộp quà: **1.499.000đ**
2. Trầm trà 120g / Hộp quà: **1.199.000đ**
3. Trầm trà Hương Sen 100g / Hộp hít nam châm: **650.000đ**
4. Trầm trà 100g / Hộp hít nam châm: **500.000đ**
5. Trầm trà Hương Sen 10g / Hộp giấy: **80.000đ**
6. Trầm trà 10g / Hộp giấy: **60.000đ**

Ảnh `assets/*.svg` **chỉ là minh họa**, không phải ảnh bao bì thực tế được duyệt. Cần thay trước khi chạy Google Ads/Facebook Ads. Không dùng nội dung y tế, đánh giá khách hàng hoặc khuyến mại chưa chứng thực.

## Form đặt hàng

25 trang cùng dùng `atelier.js` và form có sẵn trong HTML, cho phép chọn sản phẩm, số lượng, điền người nhận, điện thoại, địa chỉ, lời nhắn. Có kiểm tra trường bắt buộc, tính tạm tính, trạng thái gửi và trang cảm ơn `cam-on.html`.

**GitHub Pages là website tĩnh: form hiển thị đơn DEMO, không gửi thông tin khách.** Để nhận đơn thật, triển khai repo vào Netlify, bật **Forms detection**, deploy lại rồi **kiểm chứng đơn thử xuất hiện trong Netlify → Forms → agatea-orders** trước khi dùng quảng cáo. Form `forms.html` là mẫu nhận trường dữ liệu. Tại tên miền Netlify mặc định, form sử dụng POST và chỉ chuyển trang cảm ơn sau khi HTTP response thành công. Với domain riêng, chỉ đặt `formsEnabled:true` trong `config.js` sau khi hệ thống nhận đơn được xác minh.

## Bật link preview không cảnh báo

GitHub Actions workflow đã có, nhưng lần chạy gần nhất thất bại tại bước Configure Pages do GitHub token không được phép tạo Pages site: `Resource not accessible by integration`.

Người quản trị repo cần vào **Settings → Pages → Build and deployment → Source: GitHub Actions**. Sau đó kích hoạt lại workflow **Publish AGATEA previews** từ tab **Actions**. Chỉ chia sẻ link khi workflow có kết quả thành công. Link dự kiến sau khi bật:
- `https://techzoneadapter-droid.github.io/tram-tra/mau-1.html`
- `https://techzoneadapter-droid.github.io/tram-tra/mau-2.html`
- `https://techzoneadapter-droid.github.io/tram-tra/mau-3.html`
- `https://techzoneadapter-droid.github.io/tram-tra/mau-4.html`
- `https://techzoneadapter-droid.github.io/tram-tra/mau-5.html`

## SEO và kiểm thử

Mỗi HTML có title/description riêng, H1 duy nhất, nội dung đọc trực tiếp, internal link 5 trang và mobile breakpoints trong `atelier.css`. Chưa có xác minh Lighthouse, ảnh chụp thực tế trên nhiều trình duyệt hoặc thử nghiệm nhận đơn trực tiếp tại Netlify. Trước khi index chính thức, chỉ cho Google index một bộ website đã chọn; noindex các concept review còn lại để tránh nội dung cạnh tranh cùng chủ đề.

Các file sửa chính: `atelier.css`, `atelier.js`, `mau-1.html`…`mau-5.html`, `mau-N/*.html`, `config.js`, `forms.html`.

## Nội dung hương trầm & đổi phong cách (31/10/2026)

- Viết lại 25 trang: nếp thư phòng chiều cuối năm; trà ngày mưa; món biếu dành cho thầy cũ; thông tin mua hàng minh bạch; bài bút ký về mùi hương và ký ức.
- Bỏ câu “Bạn thân mến...” lặp nhiều lần; cập nhật metadata, trang chủ, truyện, quà tặng, catalog, FAQ, form và công cụ gợi ý quà.
- Mẫu số 3 chuyển sang **xanh rêu / vàng đồng / giấy ngà**, không còn hồng hoặc đỏ mận.
- Có chuyên mục riêng về **hương trầm trong văn hóa thưởng hương** ở cả 25 trang, được phân biệt với Trầm trà đang niêm yết. Không thêm SKU nhang trầm vì nguồn COST A chỉ xác nhận sáu sản phẩm trà.
- Nội dung biên tập lưu tại `content/editorial.json`; CSS mới cho chương truyện, lư trầm, ghi chú biếu tặng ở `atelier.css`.
- Trước khi chạy Ads: thay vector minh họa bằng ảnh bao bì được duyệt, xác minh thành phần và xuất xứ, hoàn thiện thông tin doanh nghiệp/chính sách.
