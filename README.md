# Hướng Dẫn Sử Dụng & Triển Khai App KPI Huệ Linh V2

Chào mừng bạn đến với hệ thống **Đánh giá năng lực & KPI Nhân viên sản xuất (V2.0)** của Công ty TNHH TM-SX Huệ Linh.

---

## 🌟 Tính Năng Mới Trong Phiên Bản V2.0

1. **Báo Cáo Chi Tiết & Thống Kê Nâng Cao**:
   - Giao diện báo cáo mới với 5 bộ lọc linh hoạt: Khoảng thời gian, Phòng ban, Máy, Công đoạn, và Nhân viên.
   - **Biểu đồ xu hướng (SVG-based Line Chart)**: Vẽ trực tiếp bằng SVG trên trình duyệt giúp theo dõi biến động điểm số qua các ca/tháng.
   - Bảng xếp hạng: Thống kê tự động **Top 5 Nhân viên xuất sắc** và **Top 5 Nhân viên cần kèm cặp/cải thiện**.
   - Xuất dữ liệu báo cáo dạng CSV (tự động đính kèm BOM UTF-8 giúp mở Excel không bị lỗi font tiếng Việt).
   - Thiết kế in ấn chuyên dụng (CSS Print) giúp xuất báo cáo hoặc phiếu ra file PDF cực kỳ đẹp mắt.

2. **Phiếu Bàn Giao Ca Hoàn Thiện**:
   - Tích hợp bảng **Vật tư bàn giao** dạng 2 hàng tiêu đề lồng nhau: TT | Vật tư bàn giao (Tên vật tư, Mục đích) | Tình trạng (Tốt, Hư) | Ghi chú | Xóa.
   - Tự động lưu trữ lịch sử bàn giao ca và đồng bộ tức thì lên Google Sheets nếu cấu hình.

3. **Dropdown Bộ Lọc Lịch Sử**:
   - Đổi thanh tìm kiếm thủ công sang dạng `<select>` thả xuống với danh sách nhân sự đầy đủ từ hệ thống, hỗ trợ tìm nhanh theo cả Mã nhân viên (manv) hoặc Họ tên.

4. **Phân Quyền Chi Tiết (Role-based Authorization)**:
   - Hệ thống chia làm 4 quyền: `admin`, `quanly` (quản lý theo phòng ban), `congnhan` (chỉ xem phiếu của chính mình), và `baotri` (bàn giao ca, bảo trì máy).
   - Sidebar và các chức năng tự động ẩn/hiện hoặc phân lọc dữ liệu chính xác theo vai trò của tài khoản đăng nhập.

---

## ⚙️ Hướng Dẫn Cấu Hình Google Sheets (Trường hợp 2)

Hệ thống hỗ trợ 2 chế độ lưu trữ: **Cục bộ (localStorage)** và **Google Sheets (mạng nội bộ)**. Để đồng bộ dữ liệu của tất cả máy tính về một file Google Sheets dùng chung:

### Bước 1: Tạo Google Sheet
1. Tạo một bảng tính mới trên Google Drive của bạn.
2. Tạo 2 sheet con đặt tên chính xác là:
   - `DanhGia` (dành cho phiếu đánh giá năng lực)
   - `DanhGiaHangNgay` (dành cho phiếu đánh giá KPI hàng ngày)

### Bước 2: Dán mã Google Apps Script
1. Trên thanh công cụ Google Sheet, chọn **Tiện ích mở rộng** (Extensions) -> **Apps Script**.
2. Xóa hết code mặc định và dán đoạn mã Google Apps Script ở mục **Sao lưu & Cài đặt** trên App (hoặc lấy trực tiếp ở cuối file `app.js`).
3. Nhấp vào nút **Lưu** (biểu tượng đĩa mềm).

### Bước 3: Triển khai Web App (Deploy)
1. Nhấp vào nút **Triển khai** (Deploy) -> **Triển khai mới** (New deployment).
2. Chọn loại triển khai là **Ứng dụng web** (Web app).
3. Cấu hình như sau:
   - **Thực thi dưới dạng** (Execute as): **Tôi** (Me - địa chỉ email của bạn).
   - **Ai có quyền truy cập** (Who has access): **Bất kỳ ai** (Anyone).
4. Nhấp **Triển khai**, cấp quyền truy cập nếu Google yêu cầu, sau đó sao chép **URL ứng dụng web** được cung cấp.

### Bước 4: Cấu hình trên App KPI Huệ Linh
1. Mở App -> vào tab **Sao lưu & Cài đặt** (chỉ tài khoản `admin` mới truy cập được).
2. Chọn **Trường hợp 2 — Google Sheets (có server)**.
3. Dán URL đã copy vào ô **URL Google Apps Script**.
4. Bấm **Lưu cài đặt**. Sau đó bạn có thể kiểm tra bằng cách bấm **Kiểm tra kết nối** (Ping).

---

## 🚀 Hướng Dẫn Deploy Lên Netlify / Vercel

Ứng dụng được viết hoàn toàn bằng HTML, CSS và JavaScript thuần (Vanilla JS), chạy offline trực tiếp mà không cần cài đặt hoặc build. Để đưa lên mạng chạy online:

### Cách 1: Triển khai nhanh bằng kéo thả (Drag and Drop)
1. Truy cập vào trang web [Netlify Drop](https://app.netlify.com/drop).
2. Kéo toàn bộ thư mục `App_Danh_Gia_KPI_V2` (chứa file `index.html`, `app.js`, `auth.js`, `netlify.toml`,...) thả vào ô tải lên của Netlify.
3. Đợi 5 giây, Netlify sẽ cấp cho bạn một đường link chạy online miễn phí vĩnh viễn (ví dụ: `https://kpi-hreling.netlify.app`).

### Cách 2: Triển khai liên kết Github
1. Đẩy toàn bộ source code lên một repository cá nhân trên Github.
2. Đăng nhập Netlify -> chọn **Add new site** -> **Import an existing project**.
3. Chọn nhà cung cấp Github, liên kết repository của bạn.
4. Ở phần build settings, cấu hình:
   - **Build command**: (để trống)
   - **Publish directory**: `.` (hoặc thư mục gốc dự án)
5. Bấm **Deploy** để kích hoạt tự động cập nhật mỗi khi bạn đẩy code mới lên Github.

---

## 👥 Tài Khoản Đăng Nhập Mặc Định

Hệ thống đã tự động khởi tạo danh sách người dùng mẫu:
- **Tài khoản Admin**:
  - Username: `admin`
  - Mật khẩu: `admin123`
- **Quản lý sản xuất**:
  - Username: (Tạo mới trong tab Nhân sự & Danh mục -> Quản lý người dùng với role `quanly` hoặc `baotri`).
- **Công nhân**:
  - Username: Trùng với **Mã nhân viên** (VD: `T0006`, `T0024`), mật khẩu mặc định tự tạo hoặc gán bởi Admin.

*Lưu ý: Bạn nên đăng nhập tài khoản `admin` trước để cấu hình phân quyền hoặc đổi mật khẩu tài khoản trong tab Quản lý người dùng.*
