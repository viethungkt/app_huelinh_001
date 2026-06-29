/* ===================================================================
   APP ĐÁNH GIÁ NĂNG LỰC NHÂN VIÊN SẢN XUẤT — Công ty TNHH TM-SX Huệ Linh
   Phiên bản V2.0 — Biểu mẫu A/B/C — Mã TL: 001-QLHS001
   Chạy offline trên trình duyệt (localStorage) hoặc đồng bộ Google Sheets.
   =================================================================== */

/* ---------- 1. NHÓM A: 5 mốc tiêu chí đào tạo cơ bản (thang 1–5) ---------- */
const NHOM_A = [
  {id:'a1', ten:'Vệ sinh khu vực SX',  def:'Giữ vệ sinh máy, mặt bàn, dụng cụ và khu vực làm việc theo 5S.'},
  {id:'a2', ten:'Vận hành thiết bị',   def:'Bật/tắt, kiểm tra, theo dõi và vận hành máy đúng quy trình.'},
  {id:'a3', ten:'Tuân thủ nội quy',    def:'Chấp hành nội quy, lệnh điều hành, vị trí và công đoạn được phân công.'},
  {id:'a4', ten:'Kỷ luật các cấp',     def:'Đúng giờ, tác phong nghiêm túc, tuân thủ chuẩn kỷ luật làm việc.'},
  {id:'a5', ten:'An toàn lao động',    def:'Tuân thủ PPE, nhận diện mối nguy và phòng ngừa sự cố an toàn.'},
];

/* ---------- 2. NHÓM B: Báo cáo sự cố & cải tiến (chỉ 4 hoặc 5) ---------- */
const NHOM_B = [
  {id:'b1', ten:'Chủ động báo cáo bất thường'},
  {id:'b2', ten:'Đề xuất cải tiến'},
  {id:'b3', ten:'Ngăn ngừa tái diễn lỗi'},
];

/* ---------- 3. NHÓM C: Chỉ số đa kỹ năng (chỉ 4 hoặc 5) ---------- */
const NHOM_C = [
  {id:'c1', ten:'Vận hành nhiều máy'},
  {id:'c2', ten:'Hỗ trợ khâu khác / công đoạn khác'},
  {id:'c3', ten:'Hướng dẫn công nhân mới'},
];

/* ---------- 3.5. TIÊU CHÍ ĐÁNH GIÁ HÀNG NGÀY (24 tiêu chí) ---------- */
const DAILY_CATEGORIES = [
  {
    id: 'vanhanh',
    ten: 'Vận hành máy cơ bản',
    cls: 'sec-vh',
    criteria: [
      {id: 'vh1', ten: 'Bật / tắt máy đúng quy trình', def: 'Thực hiện thao tác khởi động và dừng máy đúng trình tự, không làm tắt / mở tùy tiện, không bỏ qua bước an toàn bắt buộc.'},
      {id: 'vh2', ten: 'Kiểm tra tình trạng máy trước khi chạy', def: 'Kiểm tra sơ bộ tình trạng điện, cơ khí, tín hiệu, vật cản, nguyên vật liệu và tình trạng sẵn sàng trước khi đưa máy vào hoạt động.'},
      {id: 'vh3', ten: 'Theo dõi tín hiệu bất thường', def: 'Phát hiện và báo cáo kịp thời các dấu hiệu bất thường của máy như tiếng động lạ, rung, mùi khét, lỗi hiển thị hoặc vận hành không ổn định.'},
      {id: 'vh4', ten: 'Duy trì máy trong trạng thái sẵn sàng sản xuất', def: 'Bảo đảm máy luôn ở trạng thái sạch, đủ điều kiện vận hành và không bị bỏ mặc gây ảnh hưởng đến kế hoạch sản xuất.'}
    ]
  },
  {
    id: 'thaotac',
    ten: 'Thao tác sản xuất',
    cls: 'sec-tt',
    criteria: [
      {id: 'tt1', ten: 'Thực hiện thao tác đúng quy trình công nghệ', def: 'Làm đúng quy trình thao tác đã hướng dẫn, không tự ý thay đổi thứ tự hoặc cách làm trái với chỉ đạo quản lý.'},
      {id: 'tt2', ten: 'Đảm bảo nhịp độ và năng suất công việc', def: 'Duy trì tiến độ làm việc phù hợp với yêu cầu sản xuất, không chậm trễ vô lý, không làm gián đoạn dây chuyền.'},
      {id: 'tt3', ten: 'Kiểm soát chất lượng đầu ra', def: 'Theo dõi chất lượng sản phẩm trong quá trình làm việc, phát hiện sai lỗi và báo cáo / xử lý đúng thẩm quyền.'},
      {id: 'tt4', ten: 'Xử lý sản phẩm, vật tư và bán thành phẩm đúng cách', def: 'Sử dụng, đặt để, chuyển giao và bảo quản vật tư / sản phẩm đúng quy định, tránh hư hỏng hoặc nhầm lẫn.'}
    ]
  },
  {
    id: '5s',
    ten: 'Vệ sinh khu vực & 5S',
    cls: 'sec-vs',
    criteria: [
      {id: 'vs1', ten: 'Vệ sinh đầu ca', def: 'Thực hiện vệ sinh khu vực, máy, mặt bàn, dụng cụ và vị trí làm việc trước khi bắt đầu ca làm việc.'},
      {id: 'vs2', ten: 'Vệ sinh định kỳ trong ca (theo giờ)', def: 'Duy trì vệ sinh, gọn gàng, loại bỏ rác, vật cản, vết bẩn hoặc phế liệu trong suốt thời gian làm việc.'},
      {id: 'vs3', ten: 'Vệ sinh cuối ca', def: 'Làm sạch máy, khu vực làm việc và chuẩn bị trạng thái bàn giao cho ca sau hoặc kết thúc ngày làm việc.'},
      {id: 'vs4', ten: 'Duy trì 5S tại vị trí làm việc', def: 'Sắp xếp đúng vị trí, giữ sạch sẽ, phân loại rõ ràng và duy trì tính ngăn nắp theo nguyên tắc 5S.'}
    ]
  },
  {
    id: 'tuanthu',
    ten: 'Tuân thủ điều hành & phân công',
    cls: 'sec-dh',
    criteria: [
      {id: 'dh1', ten: 'Thực hiện lệnh điều hành của quản lý', def: 'Thực hiện đúng chỉ đạo từ giám sát / quản lý, không trì hoãn, không làm sai nội dung được giao.'},
      {id: 'dh2', ten: 'Tuân thủ đúng vị trí và công đoạn được phân công', def: 'Không tự ý đổi vị trí, bỏ vị trí hoặc làm việc ngoài phạm vi được phân công khi chưa được phép.'},
      {id: 'dh3', ten: 'Bàn giao ca đầy đủ', def: 'Bàn giao rõ ràng tình trạng máy, công việc, sản lượng, lỗi phát sinh và các lưu ý cần thiết cho ca tiếp theo.'},
      {id: 'dh4', ten: 'Báo cáo kịp thời các vấn đề phát sinh', def: 'Thông tin ngay các sự cố, sai lỗi, bất thường, thiếu hụt hoặc khó khăn ảnh hưởng đến sản xuất.'}
    ]
  },
  {
    id: 'thaido',
    ten: 'Thái độ & tác phong làm việc',
    cls: 'sec-td',
    criteria: [
      {id: 'tp1', ten: 'Tác phong và đồng phục', def: 'Đồng phục gọn gàng, sạch sẽ, tác phong nghiêm túc, không lôi thôi, không phản cảm trong khu vực làm việc.'},
      {id: 'tp2', ten: 'Tuân thủ quy định hành vi tại nơi làm việc', def: 'Không ăn uống, khạc nhổ, nói lớn, đùa giỡn, tụ tập, nói chuyện không được phép hoặc có hành vi làm giảm tính chuyên nghiệp.'},
      {id: 'tp3', ten: 'Giao tiếp đúng mực trong khu vực sản xuất', def: 'Trao đổi cần thiết, đúng nội dung công việc, đúng thái độ, không gây ảnh hưởng đến người khác hoặc môi trường sản xuất.'},
      {id: 'tp4', ten: 'Thái độ hợp tác và tinh thần trách nhiệm', def: 'Thể hiện tinh thần phối hợp, tôn trọng quản lý, hỗ trợ công việc chung và có trách nhiệm với phần việc của mình.'}
    ]
  },
  {
    id: 'kyluat',
    ten: 'Kỷ luật thời gian',
    cls: 'sec-kl',
    criteria: [
      {id: 'kl1', ten: 'Đúng giờ vào ca', def: 'Có mặt và sẵn sàng làm việc đúng giờ quy định, không đi trễ, không vào ca trong tình trạng thiếu chuẩn bị.'},
      {id: 'kl2', ten: 'Tuân thủ thời gian nghỉ giải lao', def: 'Nghỉ đúng thời gian quy định, không kéo dài thời gian nghỉ ngoài cho phép.'},
      {id: 'kl3', ten: 'Quay lại vị trí đúng giờ sau nghỉ', def: 'Trở lại vị trí làm việc đúng thời điểm để không ảnh hưởng đến hoạt động của tổ / chuyền / máy.'},
      {id: 'kl4', ten: 'Thực hiện chuẩn kỷ luật làm việc theo mô hình', def: 'Thể hiện tính nghiêm túc, trách nhiệm, đúng chuẩn mực, đúng vị trí, đúng chỉ đạo và tôn trọng kỷ luật công việc ở mức cao.'}
    ]
  }
];

/* ---------- 4. Thang điểm ---------- */
const THANG_A = [
  {v:1, label:'1 - Không đạt',     mau:'#d64545'},
  {v:2, label:'2 - Cần cải thiện', mau:'#e6a817'},
  {v:3, label:'3 - Đạt yêu cầu',   mau:'#2f7bbd'},
  {v:4, label:'4 - Tốt',           mau:'#3fa34d'},
  {v:5, label:'5 - Xuất sắc',      mau:'#1f7a33'},
];
const THANG_BC = [
  {v:4, label:'4 - Tốt / đúng chuẩn',       mau:'#3fa34d'},
  {v:5, label:'5 - Xuất sắc / Vượt mục tiêu', mau:'#1f7a33'},
];

/* ---------- 5. Dropdown kết quả (chỉnh trong Danh mục) ---------- */
const DEFAULT_KETQUA = {
  ketqua:['Xuất sắc (Vượt mục tiêu)','Thành công (Đạt mục tiêu)','Đạt cơ bản','Cần cải thiện','Chưa đạt (Đào tạo lại)'],
  hanhdong:['Xác nhận vị trí độc lập','Tiếp tục theo dõi','Cần kèm cặp / coaching','Đào tạo lại','Đề xuất khen thưởng','Đề xuất điều chuyển vị trí'],
  luong:['Không thay đổi','Đề xuất tăng bậc','Đề xuất tăng lương','Xem xét lại cấp bậc','Tạm giữ nguyên chờ đánh giá'],
};

/* ---------- 6. Xếp loại theo điểm nền A ---------- */
function xepLoai(diem){
  if(diem==null) return {ten:'—', cls:'b-3', mau:'#9ca3af'};
  if(diem>=4.5) return {ten:'Xuất sắc', cls:'b-5', mau:'#1f7a33'};
  if(diem>=3.8) return {ten:'Tốt', cls:'b-4', mau:'#3fa34d'};
  if(diem>=3.0) return {ten:'Đạt yêu cầu', cls:'b-3', mau:'#2f7bbd'};
  if(diem>=2.0) return {ten:'Cần cải thiện', cls:'b-2', mau:'#e6a817'};
  return {ten:'Không đạt', cls:'b-1', mau:'#d64545'};
}
// Đề xuất "Kết quả tổng thể" tự động
function deXuatKetQua(diemA, soDaKyNang){
  if(diemA==null) return null;
  if(diemA>=4.5 || (diemA>=4.0 && soDaKyNang>=4)) return 'Xuất sắc (Vượt mục tiêu)';
  if(diemA>=3.8) return 'Thành công (Đạt mục tiêu)';
  if(diemA>=3.0) return 'Đạt cơ bản';
  if(diemA>=2.0) return 'Cần cải thiện';
  return 'Chưa đạt (Đào tạo lại)';
}

/* ---------- 7. Danh mục mặc định ---------- */
const DEFAULT_DM = {
  maymoc:['Cán 01','Cán 02','Cán 04','In 01','In 02','Ghép 02','Ghép 03','Ghép 04'],
  congdoan:['Cán','In','Ghép','Thành phẩm'],
  ca:['Ca ngày (7h00–19h00)','Ca đêm (19h00–7h00)'],
};

/* ---------- 8. Lưu trữ ---------- */
const LS = {
  PHIEU:'hl_v2_phieu', PHIEU_DAILY:'hl_v2_phieu_daily', DM:'hl_v2_danhmuc', NS:'hl_v2_nhansu', KQ:'hl_v2_ketqua', CFG:'hl_v2_config',
  BGC:'hl_v2_bangiaoca', BAOTRI:'hl_v2_baotri', BAOTRI_LS:'hl_v2_baotri_lichsu',
  get(k,def){ try{const v=localStorage.getItem(k); return v==null?def:JSON.parse(v);}catch(e){return def} },
  set(k,v){ localStorage.setItem(k, JSON.stringify(v)); },
};
function getPhieu(){ return LS.get(LS.PHIEU, []); }
function savePhieu(a){ LS.set(LS.PHIEU, a); }
function getPhieuDaily(){ return LS.get(LS.PHIEU_DAILY, []); }
function savePhieuDaily(a){ LS.set(LS.PHIEU_DAILY, a); }
function getDM(){ return LS.get(LS.DM, JSON.parse(JSON.stringify(DEFAULT_DM))); }
function saveDM(d){ LS.set(LS.DM, d); }
function getNS(){ return LS.get(LS.NS, (window.NHANSU_DEFAULT||[]).slice()); }
function saveNS(a){ LS.set(LS.NS, a); }
function getKQ(){ return LS.get(LS.KQ, JSON.parse(JSON.stringify(DEFAULT_KETQUA))); }
function saveKQ(k){ LS.set(LS.KQ, k); }
function getCfg(){ return LS.get(LS.CFG, {mode:'local', sheetUrl:''}); }
function saveCfg(c){ LS.set(LS.CFG, c); }

/* ---------- 9. Tiện ích ---------- */
const $ = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>[...el.querySelectorAll(s)];
function uid(){ return 'p'+Date.now()+Math.random().toString(36).slice(2,7); }
function esc(s){ return (s==null?'':String(s)).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function fmtNgay(iso){ if(!iso) return ''; const p=iso.split('-'); return p.length===3?`${p[2]}-${p[1]}-${p[0]}`:iso; }
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(t._t); t._t=setTimeout(()=>t.classList.remove('show'),2400); }
function round2(n){ return Math.round(n*100)/100; }

/* ---------- 10. Tính toán ---------- */
function diemNenA(scoreA){
  const vals=NHOM_A.map(a=>scoreA[a.id]).filter(v=>v>=1&&v<=5);
  if(!vals.length) return null;
  return round2(vals.reduce((a,b)=>a+b,0)/vals.length);
}
function demDaKyNang(scoreB, scoreC){
  let n=0;
  NHOM_B.forEach(b=>{ if(scoreB[b.id]>=4) n++; });
  NHOM_C.forEach(c=>{ if(scoreC[c.id]>=4) n++; });
  return n; // 0..6
}
function tinhPhieu(p){
  const dA=diemNenA(p.scoreA||{});
  const soDK=demDaKyNang(p.scoreB||{}, p.scoreC||{});
  return {
    diemA:dA,
    soDaKyNang:soDK,
    tyleDaKyNang: Math.round(soDK/6*100),
    ketQuaDeXuat: deXuatKetQua(dA, soDK),
    xepLoai: dA!=null? xepLoai(dA).ten : null,
  };
}

function xepLoaiDaily(diem){
  if(diem==null) return {ten:'—', cls:'b-3', mau:'#9ca3af'};
  if(diem>=4.5) return {ten:'Xuất sắc', cls:'b-5', mau:'#1f7a33'};
  if(diem>=3.8) return {ten:'Tốt', cls:'b-4', mau:'#3fa34d'};
  if(diem>=3.0) return {ten:'Đạt yêu cầu', cls:'b-3', mau:'#2f7bbd'};
  if(diem>=2.0) return {ten:'Cần cải thiện', cls:'b-2', mau:'#e6a817'};
  return {ten:'Không đạt', cls:'b-1', mau:'#d64545'};
}

function tinhPhieuDaily(p){
  const s = p.scores || {};
  
  // 1. Năng suất: average of vh1, vh4, tt1, tt2
  const v_ns = [s.vh1, s.vh4, s.tt1, s.tt2].filter(v => v != null);
  const scoreNS = v_ns.length ? round2(v_ns.reduce((a,b)=>a+b,0)/v_ns.length) : null;
  
  // 2. Chất lượng: average of tt3, tt4
  const v_cl = [s.tt3, s.tt4].filter(v => v != null);
  const scoreCL = v_cl.length ? round2(v_cl.reduce((a,b)=>a+b,0)/v_cl.length) : null;
  
  // 3. An toàn: average of vh3, average(vs1,vs2,vs3,vs4), tp2
  const v_5s = [s.vs1, s.vs2, s.vs3, s.vs4].filter(v => v != null);
  const avg5S = v_5s.length ? v_5s.reduce((a,b)=>a+b,0)/v_5s.length : null;
  
  const v_at = [s.vh3, avg5S, s.tp2].filter(v => v != null);
  const scoreAT = v_at.length ? round2(v_at.reduce((a,b)=>a+b,0)/v_at.length) : null;
  
  // 4. Phối hợp & Thái độ: average of tp3, tp4, kl4
  const v_ph = [s.tp3, s.tp4, s.kl4].filter(v => v != null);
  const scorePH = v_ph.length ? round2(v_ph.reduce((a,b)=>a+b,0)/v_ph.length) : null;
  
  // 5. Tuân thủ tiêu chuẩn: average of average(vs1,vs2,vs3,vs4), dh1, dh2, dh3, dh4, average(kl1,kl2,kl3)
  const v_kl_time = [s.kl1, s.kl2, s.kl3].filter(v => v != null);
  const avgKlTime = v_kl_time.length ? v_kl_time.reduce((a,b)=>a+b,0)/v_kl_time.length : null;
  
  const v_tt = [avg5S, s.dh1, s.dh2, s.dh3, s.dh4, avgKlTime].filter(v => v != null);
  const scoreTT = v_tt.length ? round2(v_tt.reduce((a,b)=>a+b,0)/v_tt.length) : null;
  
  // Final Weighted Score
  let final = null;
  if (scoreNS != null && scoreCL != null && scoreAT != null && scorePH != null && scoreTT != null) {
    final = round2(scoreNS * 0.25 + scoreCL * 0.25 + scoreAT * 0.20 + scorePH * 0.15 + scoreTT * 0.15);
  }
  
  return {
    kpiProductivity: scoreNS,
    kpiQuality: scoreCL,
    kpiSafety: scoreAT,
    kpiAttitude: scorePH,
    kpiCompliance: scoreTT,
    finalScore: final,
    xepLoai: final != null ? xepLoaiDaily(final).ten : null
  };
}

window.HL = { NHOM_A, NHOM_B, NHOM_C, THANG_A, THANG_BC, xepLoai, deXuatKetQua,
  diemNenA, demDaKyNang, tinhPhieu, getPhieu, savePhieu, getDM, saveDM, getNS, saveNS,
  getKQ, saveKQ, getCfg, saveCfg, round2, esc };

/* ===================================================================
   11. ĐIỀU HƯỚNG
   =================================================================== */
const VIEW_META = {
  dashboard:{title:'Bảng điều khiển', sub:'Tổng quan năng lực nhân viên sản xuất'},
  danhgia:{title:'Phiếu đánh giá năng lực', sub:'Đánh giá năng lực định kỳ — 01 phiếu / 01 nhân viên'},
  danhgia_hangngay:{title:'Đánh giá hàng ngày công nhân sản xuất', sub:'Đánh giá hiệu suất và kỷ luật làm việc hàng ngày của công nhân sản xuất'},
  lichsu:{title:'Lịch sử & Báo cáo', sub:'Tra cứu, lọc, in và xuất các phiếu đã lưu'},
  baocao:{title:'Báo cáo nâng cao', sub:'Thống kê chi tiết theo thời gian, bộ phận, máy, khâu và nhân viên'},
  danhmuc:{title:'Nhân sự & Danh mục', sub:'Quản lý danh sách nhân viên, máy, công đoạn, ca'},
  bangiaoca:{title:'Phiếu bàn giao ca', sub:'Ghi nhận tình trạng máy, sản lượng, phế phẩm khi chuyển ca'},
  kpinhamay:{title:'KPI Nhà máy', sub:'Tổng sản lượng, tỷ lệ phế phẩm, thời gian dừng máy, OEE'},
  baotri:{title:'Bảo trì máy', sub:'Lịch bảo trì định kỳ, trạng thái máy, lịch sử sửa chữa'},
  dulieu:{title:'Sao lưu & Cài đặt', sub:'Xuất/nhập dữ liệu và chọn chế độ lưu trữ'},
  huongdan:{title:'Hướng dẫn sử dụng', sub:'Hướng dẫn thao tác nhanh và xem báo cáo dành cho công nhân & tổ trưởng'},
};
let currentView='dashboard';
let currentSubTab='nangluc';
let currentDashboardTab='nangluc';
let draft=null, editingId=null;
let draftDaily=null, editingDailyId=null;

// ============================================
// AUTHENTICATION INTEGRATION
// ============================================

// Kiểm tra đã đăng nhập chưa, chưa login thì hiển thị overlay
function requireAuth() {
  if (!window.AUTH || !window.AUTH.isAuthenticated()) {
    showLoginOverlay();
    return false;
  }
  hideLoginOverlay();
  return true;
}

function showLoginOverlay() {
  const overlay = document.getElementById('loginOverlay');
  if (overlay) {
    if (!overlay.innerHTML.trim()) {
      overlay.innerHTML = `
        <div class="login-box">
          <div class="login-header">
            <h2>KPI Huệ Linh V2</h2>
            <p>Hệ thống đánh giá năng lực sản xuất</p>
          </div>
          <form id="loginForm" onsubmit="return doLogin(event)">
            <div class="form-group">
              <label for="loginUser">Tên đăng nhập</label>
              <input type="text" id="loginUser" placeholder="Nhập username" required>
            </div>
            <div class="form-group">
              <label for="loginPass">Mật khẩu</label>
              <input type="password" id="loginPass" placeholder="Nhập mật khẩu" required>
            </div>
            <button type="submit" class="btn-login">Đăng nhập</button>
            <div class="login-error" id="loginError"></div>
          </form>
          <div class="login-hint">
            <small>Tài khoản mặc định được cung cấp bởi Quản trị viên</small>
          </div>
        </div>
      `;
    }
    overlay.style.display = 'flex';
  }
}

function hideLoginOverlay() {
  const overlay = document.getElementById('loginOverlay');
  if (overlay) overlay.style.display = 'none';
}

// Đăng nhập
function doLogin(e) {
  if (e) e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const err = document.getElementById('loginError');

  if (!user || !pass) {
    err.textContent = 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu';
    return false;
  }

  const result = window.AUTH.login(user, pass);
  if (result.success) {
    err.textContent = '';
    document.getElementById('loginUser').value = '';
    document.getElementById('loginPass').value = '';
    hideLoginOverlay();
    toast(`✓ Chào mừng ${result.user.hoten || result.user.username}`);
    updateSidebarByRole(); // Cập nhật sidebar theo quyền mới
    // Reload view hiện tại để cập nhật quyền
    switchView('dashboard');
  } else {
    err.textContent = result.message;
    return false;
  }
}

// Đăng xuất
function doLogout() {
  if (window.AUTH) window.AUTH.logout();
  hideLoginOverlay();
  showLoginOverlay();
  updateUserDisplay();
  toast('Đã đăng xuất');
}

// Cập nhật hiển thị thông tin user trong topbar
function updateUserDisplay() {
  const session = window.AUTH ? window.AUTH.getSession() : null;
  const topActions = document.getElementById('topActions');
  if (!topActions) return;

  if (session) {
    const roleLabels = {
      admin: 'Admin',
      quanly: 'Quản lý',
      congnhan: 'Công nhân',
      baotri: 'Bảo trì'
    };
    const roleColor = {
      admin: 'var(--xanh-dam)',
      quanly: 'var(--xanhla)',
      congnhan: 'var(--xanhduong)',
      baotri: 'var(--cam)'
    };
    topActions.innerHTML = `
      <span style="display:flex;align-items:center;gap:8px;padding:6px 12px;background:var(--xam-nhat);border-radius:8px;font-size:12px;margin-right:8px">
        <b>${session.user.hoten || session.user.username}</b>
        <span style="color:${roleColor[session.user.role]||'var(--xam)'};font-weight:700">[${roleLabels[session.user.role]||session.user.role}]</span>
        ${session.user.phongban ? `<span class="muted">· ${session.user.phongban}</span>` : ''}
      </span>
      <button class="btn sec sm" onclick="doLogout()">Đăng xuất</button>
    `;
  } else {
    topActions.innerHTML = '';
  }
}

// Filter data theo quyền của user
function filterByPermission(data, resource) {
  if (!window.AUTH) return data;
  const session = window.AUTH.getSession();
  if (!session) return []; // Chưa login → không thấy gì

  const { role, phongban } = session.user;

  if (role === window.AUTH.ROLES.ADMIN) {
    return data; // Admin xem tất cả
  }

  if (role === window.AUTH.ROLES.QUANLY) {
    // Quản lý chỉ thấy phòng ban của mình
    return data.filter(item => item.phongban === phongban);
  }

  if (role === window.AUTH.ROLES.CONGNHAN) {
    // Công nhân chỉ thấy của mình
    return data.filter(item => item.manv === session.user.username || item.hoten === session.user.hoten);
  }

  if (role === window.AUTH.ROLES.BAOTRI) {
    // Bảo trì thấy tất cả (hoặc có thể filter theo phòng ban sau)
    return data;
  }

  return data;
}

// Kiểm tra quyền truy cập view
function canAccessView(view) {
  if (!window.AUTH) return false;
  const session = window.AUTH.getSession();
  if (!session) return false;

  const { role, phongban } = session.user;

  // Tất cả user đều có thể xem dashboard (nhưng data sẽ được filter)
  if (view === 'dashboard') return true;

  // Quyền chi tiết theo role
  switch (view) {
    case 'danhgia': // Phiếu đánh giá năng lực
      return role === window.AUTH.ROLES.ADMIN || role === window.AUTH.ROLES.QUANLY;
    case 'danhgia_hangngay': // Đánh giá hàng ngày
      return true; // Tất cả đều tạo được phiếu hàng ngày của mình
    case 'lichsu': // Lịch sử
      return role === window.AUTH.ROLES.ADMIN || role === window.AUTH.ROLES.QUANLY || role === window.AUTH.ROLES.CONGNHAN;
    case 'baocao': // Báo cáo nâng cao
      return role === window.AUTH.ROLES.ADMIN || role === window.AUTH.ROLES.QUANLY;
    case 'danhmuc': // Nhân sự & Danh mục
      return role === window.AUTH.ROLES.ADMIN || role === window.AUTH.ROLES.QUANLY;
    case 'bangiaoca': // Bàn giao ca
      return role === window.AUTH.ROLES.ADMIN || role === window.AUTH.ROLES.QUANLY || role === window.AUTH.ROLES.BAOTRI;
    case 'kpinhamay': // KPI Nhà máy
      return role === window.AUTH.ROLES.ADMIN || role === window.AUTH.ROLES.QUANLY;
    case 'baotri': // Bảo trì
      return role === window.AUTH.ROLES.ADMIN || role === window.AUTH.ROLES.BAOTRI;
    case 'dulieu': // Sao lưu & Cài đặt
      return role === window.AUTH.ROLES.ADMIN;
    case 'huongdan': // Hướng dẫn sử dụng
      return true; // Ai cũng xem được
    default:
      return false;
  }
}

function switchView(v){
  // Kiểm tra quyền truy cập view
  if (!canAccessView(v)) {
    toast('⚠ Bạn không có quyền truy cập chức năng này');
    return;
  }

  currentView=v;
  $$('#nav button').forEach(b=>b.classList.toggle('active', b.dataset.view===v));
  $$('.view').forEach(s=>s.classList.remove('active'));
  $('#view-'+v).classList.add('active');
  $('#viewTitle').textContent=VIEW_META[v]?.title||v;
  $('#viewSub').textContent=VIEW_META[v]?.sub||'';
  $('#topActions').innerHTML='';
  updateUserDisplay();
  closeSidebar();
  if(v==='dashboard') renderDashboard();
  if(v==='danhgia') renderForm();
  if(v==='danhgia_hangngay') renderFormDaily();
  if(v==='lichsu') renderLichSu();
  if(v==='baocao') renderBaoCao();
  if(v==='danhmuc') renderDanhMuc();
  if(v==='bangiaoca') renderBanGiaoCa();
  if(v==='kpinhamay') renderKPINhaMay();
  if(v==='baotri') renderBaoTri();
  if(v==='dulieu') renderDuLieu();
  if(v==='huongdan') renderHuongDan();
}
function openSidebar(){ $('#sidebar').classList.add('open'); $('#overlay').classList.add('open'); }
function closeSidebar(){ $('#sidebar').classList.remove('open'); $('#overlay').classList.remove('open'); }

// Ẩn/hiện các nút nav theo quyền role
function updateSidebarByRole() {
  if (!window.AUTH) return;
  const session = window.AUTH.getSession();
  $$('#nav button').forEach(btn => {
    const v = btn.dataset.view;
    if (!v) return;
    if (!session) {
      btn.style.display = 'none';
      return;
    }
    btn.style.display = canAccessView(v) ? '' : 'none';
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  $$('#nav button').forEach(b=> b.onclick=()=>switchView(b.dataset.view));
  $('#hamburger').onclick=openSidebar;
  $('#overlay').onclick=closeSidebar;
  updateModePill();

  // Kiểm tra authentication trước khi load dashboard
  if (requireAuth()) {
    updateSidebarByRole();
    switchView('dashboard');
  }

  updateUserDisplay();
});
function updateModePill(){
  const cfg=getCfg();
  const el=$('#modePill');
  if(el) el.textContent = cfg.mode==='sheet'?'Chế độ: Google Sheets':'Chế độ: Cục bộ';
}

/* ===================================================================
   12. PHIẾU ĐÁNH GIÁ
   =================================================================== */
function blankPhieu(){
  const dm=getDM();
  return {
    id:null, ngay:new Date().toISOString().slice(0,10), ca:dm.ca[0]||'',
    manv:'', hoten:'', phongban:'', chucdanh:'',
    may:dm.maymoc[0]||'', congdoan:dm.congdoan[0]||'',
    scoreA:{}, scoreB:{}, scoreC:{},
    ketQua:'', hanhDongNS:'', anhHuongLuong:'', ketQuaTuDong:true,
    ykienQuanDoc:'', nguoiDG:'',
  };
}

function renderForm(){
  const dm=getDM(), kq=getKQ();
  if(!draft) draft=blankPhieu();
  const p=draft;
  $('#topActions').innerHTML=`
    <button class="btn sec sm" id="btnReset">Làm mới</button>
    <button class="btn sm" id="btnSave">💾 Lưu phiếu</button>`;
  const opt=(arr,sel)=>arr.map(x=>`<option ${x===sel?'selected':''}>${esc(x)}</option>`).join('');

  // Nhóm A — dropdown 1..5 mỗi tiêu chí
  const aHtml=NHOM_A.map(a=>{
    const sel=p.scoreA[a.id];
    const opts=THANG_A.map(t=>`<option value="${t.v}" ${sel==t.v?'selected':''}>${esc(t.label)}</option>`).join('');
    return `<div class="crit-cell">
      <div class="ct">${esc(a.ten)}</div>
      <div class="def">${esc(a.def)}</div>
      <select data-grp="A" data-cid="${a.id}"><option value="">— Chọn điểm —</option>${opts}</select>
    </div>`;
  }).join('');

  // Nhóm B/C — dropdown 4/5
  const bcItem=(it,grp,store)=>{
    const sel=store[it.id];
    const opts=THANG_BC.map(t=>`<option value="${t.v}" ${sel==t.v?'selected':''}>${esc(t.label)}</option>`).join('');
    return `<div class="bc-item"><span class="bn">${esc(it.ten)}</span>
      <select data-grp="${grp}" data-cid="${it.id}"><option value="">— Không áp dụng —</option>${opts}</select></div>`;
  };
  const bHtml=NHOM_B.map(b=>bcItem(b,'B',p.scoreB)).join('');
  const cHtml=NHOM_C.map(c=>bcItem(c,'C',p.scoreC)).join('');

  const t=tinhPhieu(p);
  const xl=xepLoai(t.diemA);

  $('#view-danhgia').innerHTML=`
    <div class="card">
      <h3>Thông tin chung</h3>
      <div class="row">
        <div class="col">
          <label>Chọn nhân viên (đồng bộ Excel) *</label>
          <div class="nv-search-wrap" id="nvWrap"></div>
        </div>
        <div class="col"><label>Máy / Công đoạn phụ trách *</label><select id="f_may">${opt(dm.maymoc,p.may)}</select></div>
        <div class="col" style="max-width:170px"><label>Công đoạn</label><select id="f_cd">${opt(dm.congdoan,p.congdoan)}</select></div>
        <div class="col" style="max-width:180px"><label>Ngày rà soát *</label><input type="date" id="f_ngay" value="${p.ngay}"></div>
      </div>
      <div class="row" style="margin-top:12px">
        <div class="col"><label>Ca làm việc</label><select id="f_ca">${opt(dm.ca,p.ca)}</select></div>
        <div class="col"><label>Người đánh giá (quản đốc / giám sát)</label><input id="f_ngdg" value="${esc(p.nguoiDG)}" placeholder="Họ tên người đánh giá"></div>
      </div>
    </div>

    <div class="card">
      <div class="sec-head sec-a">☰ NHÓM A: 5 mốc tiêu chí đào tạo cơ bản <span class="sec-tag">Thang điểm 1–5</span></div>
      <div class="sec-body"><div class="grid-a">${aHtml}</div></div>

      <div class="sec-head sec-b">⚠ NHÓM B: Báo cáo sự cố & cải tiến <span class="sec-tag">Chỉ chọn 4 hoặc 5</span></div>
      <div class="sec-body"><div class="bc-col">${bHtml}</div></div>

      <div class="sec-head sec-c">⚡ NHÓM C: Chỉ số đa kỹ năng <span class="sec-tag">Chỉ chọn 4 hoặc 5</span></div>
      <div class="sec-body"><div class="bc-col">${cHtml}</div></div>
    </div>

    <div class="card">
      <h3>Kết quả & quyết định</h3>
      <div class="final-box" style="margin-bottom:16px">
        <div><div class="muted">ĐIỂM NỀN (NHÓM A)</div><div class="final-num" id="fDiemA" style="color:${xl.mau}">${t.diemA!=null?t.diemA.toFixed(2):'—'}</div></div>
        <div><div class="muted">Xếp loại nền</div><div id="fXL" style="margin-top:6px"><span class="badge ${xl.cls}">${xl.ten}</span></div></div>
        <div><div class="muted">Đa kỹ năng (B+C)</div><div class="final-num" id="fDK" style="font-size:34px;color:var(--cam)">${t.soDaKyNang}<span style="font-size:16px;color:var(--xam)">/6</span></div></div>
        <div style="flex:1;min-width:200px" class="muted" id="fDeXuat">Đề xuất kết quả: <b style="color:var(--xanh-dam)">${t.ketQuaDeXuat||'—'}</b></div>
      </div>
      <div class="row">
        <div class="col"><label>Kết quả tổng thể</label><select id="f_kq">${opt(kq.ketqua,p.ketQua)}</select>
          <label style="margin-top:6px;font-weight:400"><input type="checkbox" id="f_auto" style="width:auto" ${p.ketQuaTuDong?'checked':''}> Tự động theo điểm</label></div>
        <div class="col"><label>Hành động nhân sự quyết định</label><select id="f_hd">${opt(kq.hanhdong,p.hanhDongNS)}</select></div>
        <div class="col"><label>Ảnh hưởng cấp bậc & lương</label><select id="f_lg">${opt(kq.luong,p.anhHuongLuong)}</select></div>
      </div>
    </div>

    <div class="card">
      <h3>Ý kiến chỉ đạo / nhận xét của quản đốc</h3>
      <textarea id="f_yk" placeholder="Ghi nhận cụ thể đóng góp cải tiến hoặc lý do điều động nhân sự hỗ trợ khâu thiếu người...">${esc(p.ykienQuanDoc)}</textarea>
    </div>`;

  renderNVSearch();
  // binds
  $('#f_ngay').addEventListener('input', e=>draft.ngay=e.target.value);
  $('#f_ca').addEventListener('change', e=>draft.ca=e.target.value);
  $('#f_may').addEventListener('change', e=>draft.may=e.target.value);
  $('#f_cd').addEventListener('change', e=>draft.congdoan=e.target.value);
  $('#f_ngdg').addEventListener('input', e=>draft.nguoiDG=e.target.value);
  $('#f_kq').addEventListener('change', e=>{draft.ketQua=e.target.value; draft.ketQuaTuDong=false; $('#f_auto').checked=false;});
  $('#f_hd').addEventListener('change', e=>draft.hanhDongNS=e.target.value);
  $('#f_lg').addEventListener('change', e=>draft.anhHuongLuong=e.target.value);
  $('#f_auto').addEventListener('change', e=>{draft.ketQuaTuDong=e.target.checked; recalcForm();});
  $('#f_yk').addEventListener('input', e=>draft.ykienQuanDoc=e.target.value);

  $$('select[data-grp]').forEach(s=>{
    s.addEventListener('change', ()=>{
      const grp=s.dataset.grp, cid=s.dataset.cid, val=s.value===''?null:+s.value;
      if(grp==='A') draft.scoreA[cid]=val;
      if(grp==='B') draft.scoreB[cid]=val;
      if(grp==='C') draft.scoreC[cid]=val;
      recalcForm();
    });
  });
  $('#btnReset').addEventListener('click', ()=>{ if(confirm('Làm mới toàn bộ phiếu hiện tại?')){ draft=blankPhieu(); editingId=null; renderForm(); } });
  $('#btnSave').addEventListener('click', savePhieuHienTai);
  recalcForm();
}

function renderNVSearch(){
  const wrap=$('#nvWrap'); if(!wrap) return;
  const p=draft;
  if(p.hoten){
    wrap.innerHTML=`<div class="nv-chip"><b>${esc(p.hoten)}</b>
      <span class="muted">${esc(p.manv||'—')} · ${esc(p.phongban||'')}</span>
      <span class="x" id="nvClear" title="Bỏ chọn">×</span></div>`;
    $('#nvClear').addEventListener('click', ()=>{ draft.manv='';draft.hoten='';draft.phongban='';draft.chucdanh=''; renderNVSearch(); });
    return;
  }
  wrap.innerHTML=`<input id="nvInput" placeholder="— Chọn / gõ tên nhân sự —" autocomplete="off">
    <div class="nv-dropdown" id="nvDrop"></div>`;
  const inp=$('#nvInput'), drop=$('#nvDrop');
  const ns=getNS();
  function show(list){
    if(!list.length){ drop.classList.remove('show'); return; }
    drop.innerHTML=list.slice(0,40).map((n,i)=>`<div class="nv-opt" data-i="${i}">
      <div class="nv-name">${esc(n.hoten)}</div>
      <div class="nv-meta">${esc(n.manv||'—')} · ${esc(n.phongban||'')}${n.chucdanh?' · '+esc(n.chucdanh):''}</div></div>`).join('');
    drop.classList.add('show');
    $$('.nv-opt',drop).forEach((o,i)=>o.addEventListener('click', ()=>{
      const n=list[i]; draft.manv=n.manv; draft.hoten=n.hoten; draft.phongban=n.phongban; draft.chucdanh=n.chucdanh;
      renderNVSearch();
    }));
  }
  inp.addEventListener('input', ()=>{
    const q=inp.value.trim().toLowerCase();
    if(!q){ show(ns); return; }
    show(ns.filter(n=>(n.hoten+' '+n.manv+' '+n.phongban+' '+n.chucdanh).toLowerCase().includes(q)));
  });
  inp.addEventListener('focus', ()=>show(ns));
  document.addEventListener('click',e=>{ if(!wrap.contains(e.target)) drop.classList.remove('show'); }, {once:true});
}

function recalcForm(){
  const t=tinhPhieu(draft);
  const xl=xepLoai(t.diemA);
  const set=(id,v)=>{const e=$(id);if(e)e.textContent=v;};
  if($('#fDiemA')){ $('#fDiemA').textContent=t.diemA!=null?t.diemA.toFixed(2):'—'; $('#fDiemA').style.color=xl.mau; }
  if($('#fXL')) $('#fXL').innerHTML=`<span class="badge ${xl.cls}">${xl.ten}</span>`;
  if($('#fDK')) $('#fDK').innerHTML=`${t.soDaKyNang}<span style="font-size:16px;color:var(--xam)">/6</span>`;
  if($('#fDeXuat')) $('#fDeXuat').innerHTML=`Đề xuất kết quả: <b style="color:var(--xanh-dam)">${t.ketQuaDeXuat||'—'}</b>`;
  // Tự động điền kết quả tổng thể
  if(draft.ketQuaTuDong && t.ketQuaDeXuat){
    draft.ketQua=t.ketQuaDeXuat;
    const sel=$('#f_kq'); if(sel) sel.value=t.ketQuaDeXuat;
  }
}

function savePhieuHienTai(){
  if(!draft.hoten){ toast('⚠ Vui lòng chọn nhân viên'); return; }
  const choamA=NHOM_A.some(a=>draft.scoreA[a.id]>=1);
  if(!choamA){ toast('⚠ Cần chấm ít nhất 1 tiêu chí Nhóm A'); return; }
  const t=tinhPhieu(draft);
  if(draft.ketQuaTuDong) draft.ketQua=t.ketQuaDeXuat||draft.ketQua;
  const rec={ ...draft, id:draft.id||uid(), ...t, luuLuc:new Date().toISOString() };
  const arr=getPhieu();
  const idx=arr.findIndex(x=>x.id===rec.id);
  if(idx>=0) arr[idx]=rec; else arr.push(rec);
  savePhieu(arr);
  // Đồng bộ Google Sheets nếu bật
  const cfg=getCfg();
  if(cfg.mode==='sheet' && cfg.sheetUrl) syncToSheet(rec);
  toast(idx>=0?'✓ Đã cập nhật phiếu':'✓ Đã lưu phiếu đánh giá');
  draft=null; editingId=null;
  switchView('lichsu');
}

function suaPhieu(id){
  const p=getPhieu().find(x=>x.id===id); if(!p) return;
  draft=JSON.parse(JSON.stringify(p));
  draft.scoreA=draft.scoreA||{}; draft.scoreB=draft.scoreB||{}; draft.scoreC=draft.scoreC||{};
  editingId=id; switchView('danhgia');
}

/* ===================================================================
   13. DASHBOARD
   =================================================================== */
function barRow(label,val,max,color,disp){
  const pct=max?Math.min(100,val/max*100):0;
  const show=disp!==undefined?disp:val.toFixed(2);
  return `<div class="bar-row"><div class="bl">${esc(label)}</div>
    <div class="bt"><div class="bf" style="width:${pct}%;background:${color}">${show}</div></div></div>`;
}
function renderDashboard(){
  const view=$('#view-dashboard');
  let headerHtml = `
    <div class="row no-print" style="margin-bottom:18px; border-bottom: 2px solid var(--vien); padding-bottom: 8px; width: 100%">
      <button class="btn ${currentDashboardTab==='nangluc'?'':'sec'} sm" id="btnDashNangLuc" style="margin-right:8px">Thống kê năng lực</button>
      <button class="btn ${currentDashboardTab==='hangngay'?'':'sec'} sm" id="btnDashHangNgay">Hiệu suất KPI hàng ngày</button>
    </div>
  `;
  if(currentDashboardTab==='nangluc'){
    const arr=filterByPermission(getPhieu(), 'phieu').filter(p=>p.diemA!=null);
    if(!arr.length){
      view.innerHTML=headerHtml+`<div class="empty"><div class="big">📊</div>
        <h3>Chưa có dữ liệu đánh giá</h3>
        <p class="muted">Hãy tạo phiếu đánh giá đầu tiên ở mục <b>Phiếu đánh giá</b>.</p>
        <button class="btn" style="margin-top:14px" onclick="switchView('danhgia')">+ Tạo phiếu đánh giá</button></div>`;
      bindDashEvents();
      return;
    }
    const n=arr.length;
    const tbA=round2(arr.reduce((a,p)=>a+p.diemA,0)/n);
    const datChuan=arr.filter(p=>p.diemA>=3).length;
    const tyleDat=Math.round(datChuan/n*100);
    const soNV=new Set(arr.map(p=>(p.manv||p.hoten))).size;
    const tbDK=Math.round(arr.reduce((a,p)=>a+(p.soDaKyNang||0),0)/n*10)/10;

    const loaiOrder=['Xuất sắc','Tốt','Đạt yêu cầu','Cần cải thiện','Không đạt'];
    const loaiMau={'Xuất sắc':'#1f7a33','Tốt':'#3fa34d','Đạt yêu cầu':'#2f7bbd','Cần cải thiện':'#e6a817','Không đạt':'#d64545'};
    const loaiCount={}; loaiOrder.forEach(l=>loaiCount[l]=0);
    arr.forEach(p=>{ const x=xepLoai(p.diemA).ten; if(loaiCount[x]!=null) loaiCount[x]++; });

    const aAvg=NHOM_A.map(a=>{
      const vals=arr.map(p=>p.scoreA?.[a.id]).filter(v=>v>=1&&v<=5);
      return {ten:a.ten, val:vals.length?round2(vals.reduce((x,y)=>x+y,0)/vals.length):0};
    });
    const bcStat=[...NHOM_B.map(b=>['B',b]),...NHOM_C.map(c=>['C',c])].map(([g,it])=>{
      const cnt=arr.filter(p=>(g==='B'?p.scoreB:p.scoreC)?.[it.id]>=4).length;
      return {ten:it.ten, cnt};
    }).sort((a,b)=>b.cnt-a.cnt);

    const byMay={};
    arr.forEach(p=>{ (byMay[p.may]=byMay[p.may]||[]).push(p.diemA); });
    const mayRows=Object.entries(byMay).map(([m,v])=>({may:m,tb:round2(v.reduce((a,b)=>a+b,0)/v.length),n:v.length})).sort((a,b)=>b.tb-a.tb);
    const byPB={};
    arr.forEach(p=>{ const k=p.phongban||'(Khác)'; (byPB[k]=byPB[k]||[]).push(p.diemA); });
    const pbRows=Object.entries(byPB).map(([m,v])=>({pb:m,tb:round2(v.reduce((a,b)=>a+b,0)/v.length),n:v.length})).sort((a,b)=>b.tb-a.tb);

    const xlT=xepLoai(tbA);
    view.innerHTML=headerHtml+`
      <div class="kpi-cards">
        <div class="kpi-card"><div class="k-label">Điểm nền TB (Nhóm A)</div><div class="k-val" style="color:${xlT.mau}">${tbA.toFixed(2)}</div><div class="k-sub"><span class="badge ${xlT.cls}">${xlT.ten}</span></div></div>
        <div class="kpi-card"><div class="k-label">Số phiếu / nhân viên</div><div class="k-val">${n}</div><div class="k-sub">${soNV} nhân viên</div></div>
        <div class="kpi-card"><div class="k-label">Tỷ lệ đạt chuẩn (≥3.0)</div><div class="k-val">${tyleDat}%</div><div class="k-sub">${datChuan}/${n} phiếu</div></div>
        <div class="kpi-card" style="border-top-color:var(--cam)"><div class="k-label">Đa kỹ năng TB</div><div class="k-val" style="color:var(--cam)">${tbDK}<span style="font-size:16px;color:var(--xam)">/6</span></div><div class="k-sub">chỉ số B+C mỗi người</div></div>
      </div>
      <div class="row">
        <div class="col card" style="min-width:300px"><h3>Điểm trung bình theo tiêu chí Nhóm A</h3>
          <div class="bar-chart">${aAvg.map(k=>barRow(k.ten,k.val,5,xepLoai(k.val).mau)).join('')}</div></div>
        <div class="col card" style="min-width:280px"><h3>Phân bố xếp loại</h3>
          <div class="bar-chart">${loaiOrder.map(l=>barRow(l,loaiCount[l],n,loaiMau[l],loaiCount[l])).join('')}</div></div>
      </div>
      <div class="row">
        <div class="col card" style="min-width:300px"><h3>Hiệu suất theo máy / công đoạn</h3>
          <div class="tablewrap"><table><tr><th>Máy</th><th class="center">Phiếu</th><th class="center">Điểm TB</th><th>Xếp loại</th></tr>
            ${mayRows.map(m=>{const x=xepLoai(m.tb);return `<tr><td>${esc(m.may)}</td><td class="center">${m.n}</td><td class="center"><b>${m.tb.toFixed(2)}</b></td><td><span class="badge ${x.cls}">${x.ten}</span></td></tr>`;}).join('')}
          </table></div></div>
        <div class="col card" style="min-width:300px"><h3>Đa kỹ năng — số người đạt mỗi chỉ số (B+C)</h3>
          <div class="bar-chart">${bcStat.map(b=>barRow(b.ten,b.cnt,n,'#d97706',b.cnt)).join('')}</div></div>
      </div>
      <div class="card"><h3>Năng lực theo phòng ban</h3>
        <div class="tablewrap"><table><tr><th>Phòng ban</th><th class="center">Phiếu</th><th class="center">Điểm TB</th><th>Xếp loại</th></tr>
          ${pbRows.map(m=>{const x=xepLoai(m.tb);return `<tr><td>${esc(m.pb)}</td><td class="center">${m.n}</td><td class="center"><b>${m.tb.toFixed(2)}</b></td><td><span class="badge ${x.cls}">${x.ten}</span></td></tr>`;}).join('')}
        </table></div></div>`;
  } else {
    const arr=filterByPermission(getPhieuDaily(), 'phieu_daily').filter(p=>p.finalScore!=null);
    if(!arr.length){
      view.innerHTML=headerHtml+`<div class="empty"><div class="big">📊</div>
        <h3>Chưa có dữ liệu đánh giá hàng ngày</h3>
        <p class="muted">Hãy tạo phiếu đánh giá đầu tiên ở mục <b>Đánh giá hàng ngày</b>.</p>
        <button class="btn" style="margin-top:14px" onclick="switchView('danhgia_hangngay')">+ Tạo phiếu đánh giá</button></div>`;
      bindDashEvents();
      return;
    }
    const n=arr.length;
    const tbFinal=round2(arr.reduce((a,p)=>a+p.finalScore,0)/n);
    const datChuan=arr.filter(p=>p.finalScore>=3).length;
    const tyleDat=Math.round(datChuan/n*100);
    const soNV=new Set(arr.map(p=>(p.manv||p.hoten))).size;
    const totXuatSac=arr.filter(p=>p.finalScore>=3.8).length;
    const tyleTot=Math.round(totXuatSac/n*100);

    const loaiOrder=['Xuất sắc','Tốt','Đạt yêu cầu','Cần cải thiện','Không đạt'];
    const loaiMau={'Xuất sắc':'#1f7a33','Tốt':'#3fa34d','Đạt yêu cầu':'#2f7bbd','Cần cải thiện':'#e6a817','Không đạt':'#d64545'};
    const loaiCount={}; loaiOrder.forEach(l=>loaiCount[l]=0);
    arr.forEach(p=>{ const x=xepLoaiDaily(p.finalScore).ten; if(loaiCount[x]!=null) loaiCount[x]++; });

    const kpiNames = [
      {k: 'kpiProductivity', ten: 'Năng suất (25%)', color: 'var(--xanhduong)'},
      {k: 'kpiQuality', ten: 'Chất lượng (25%)', color: '#0ea5e9'},
      {k: 'kpiSafety', ten: 'An toàn (20%)', color: 'var(--xanhla)'},
      {k: 'kpiAttitude', ten: 'Phối hợp & Thái độ (15%)', color: 'var(--cam)'},
      {k: 'kpiCompliance', ten: 'Tuân thủ tiêu chuẩn (15%)', color: 'var(--tim)'}
    ];
    const kpiAvg = kpiNames.map(item => {
      const vals = arr.map(p => p[item.k]).filter(v => v != null);
      return {ten: item.ten, val: vals.length ? round2(vals.reduce((a,b)=>a+b,0)/vals.length) : 0, color: item.color};
    });

    const catAvg = DAILY_CATEGORIES.map(cat => {
      const vals = [];
      arr.forEach(p => {
        cat.criteria.forEach(crit => {
          if (p.scores?.[crit.id] != null) vals.push(p.scores[crit.id]);
        });
      });
      return {ten: cat.ten, val: vals.length ? round2(vals.reduce((a,b)=>a+b,0)/vals.length) : 0, cls: cat.cls};
    });

    const byMay={};
    arr.forEach(p=>{ (byMay[p.may]=byMay[p.may]||[]).push(p.finalScore); });
    const mayRows=Object.entries(byMay).map(([m,v])=>({may:m,tb:round2(v.reduce((a,b)=>a+b,0)/v.length),n:v.length})).sort((a,b)=>b.tb-a.tb);
    const byPB={};
    arr.forEach(p=>{ const k=p.phongban||'(Khác)'; (byPB[k]=byPB[k]||[]).push(p.finalScore); });
    const pbRows=Object.entries(byPB).map(([m,v])=>({pb:m,tb:round2(v.reduce((a,b)=>a+b,0)/v.length),n:v.length})).sort((a,b)=>b.tb-a.tb);

    const xlT=xepLoaiDaily(tbFinal);
    view.innerHTML=headerHtml+`
      <div class="kpi-cards">
        <div class="kpi-card"><div class="k-label">Điểm KPI TB Hàng ngày</div><div class="k-val" style="color:${xlT.mau}">${tbFinal.toFixed(2)}</div><div class="k-sub"><span class="badge ${xlT.cls}">${xlT.ten}</span></div></div>
        <div class="kpi-card"><div class="k-label">Số phiếu / nhân viên</div><div class="k-val">${n}</div><div class="k-sub">${soNV} nhân viên</div></div>
        <div class="kpi-card"><div class="k-label">Tỷ lệ đạt chuẩn (≥3.0)</div><div class="k-val">${tyleDat}%</div><div class="k-sub">${datChuan}/${n} phiếu</div></div>
        <div class="kpi-card" style="border-top-color:var(--xanh)"><div class="k-label">Tỷ lệ Tốt/Xuất sắc (≥3.8)</div><div class="k-val" style="color:var(--xanhla)">${tyleTot}%</div><div class="k-sub">${totXuatSac}/${n} phiếu</div></div>
      </div>
      <div class="row">
        <div class="col card" style="min-width:300px"><h3>Điểm trung bình theo 5 nhóm KPI tổng hợp</h3>
          <div class="bar-chart">${kpiAvg.map(k=>barRow(k.ten,k.val,5,k.color)).join('')}</div></div>
        <div class="col card" style="min-width:280px"><h3>Phân bố xếp loại</h3>
          <div class="bar-chart">${loaiOrder.map(l=>barRow(l,loaiCount[l],n,loaiMau[l],loaiCount[l])).join('')}</div></div>
      </div>
      <div class="row">
        <div class="col card" style="min-width:300px"><h3>Điểm trung bình theo 6 nhóm quy trình 2026</h3>
          <div class="bar-chart">${catAvg.map(c=>{
            let hexColor = 'var(--xanh)';
            if(c.cls==='sec-vh') hexColor='var(--xanhduong)';
            if(c.cls==='sec-tt') hexColor='#0ea5e9';
            if(c.cls==='sec-vs') hexColor='var(--xanhla)';
            if(c.cls==='sec-dh') hexColor='var(--tim)';
            if(c.cls==='sec-td') hexColor='var(--cam)';
            if(c.cls==='sec-kl') hexColor='var(--do)';
            return barRow(c.ten, c.val, 5, hexColor);
          }).join('')}</div></div>
        <div class="col card" style="min-width:300px"><h3>Hiệu suất theo máy / công đoạn</h3>
          <div class="tablewrap"><table><tr><th>Máy</th><th class="center">Phiếu</th><th class="center">Điểm TB</th><th>Xếp loại</th></tr>
            ${mayRows.map(m=>{const x=xepLoaiDaily(m.tb);return `<tr><td>${esc(m.may)}</td><td class="center">${m.n}</td><td class="center"><b>${m.tb.toFixed(2)}</b></td><td><span class="badge ${x.cls}">${x.ten}</span></td></tr>`;}).join('')}
          </table></div></div>
      </div>
      <div class="card"><h3>Hiệu suất theo phòng ban</h3>
        <div class="tablewrap"><table><tr><th>Phòng ban</th><th class="center">Phiếu</th><th class="center">Điểm TB</th><th>Xếp loại</th></tr>
          ${pbRows.map(m=>{const x=xepLoaiDaily(m.tb);return `<tr><td>${esc(m.pb)}</td><td class="center">${m.n}</td><td class="center"><b>${m.tb.toFixed(2)}</b></td><td><span class="badge ${x.cls}">${x.ten}</span></td></tr>`;}).join('')}
        </table></div></div>`;
  }
  bindDashEvents();
}
function bindDashEvents(){
  const btnNl=$('#btnDashNangLuc');
  const btnHn=$('#btnDashHangNgay');
  if(btnNl&&btnHn){
    btnNl.onclick=()=>{currentDashboardTab='nangluc';renderDashboard();};
    btnHn.onclick=()=>{currentDashboardTab='hangngay';renderDashboard();};
  }
}

/* ===================================================================
   14. LỊCH SỬ & BÁO CÁO
   =================================================================== */
let filterState={tu:'',den:'',may:'',pb:'',cd:'',cn:''};
let reportFilterState={tu:'',den:'',may:'',pb:'',cd:'',cn:'',loai:'nangluc'};

/* --- Hàm tạo HTML bộ lọc chung (dùng cho cả 2 tab) --- */
function buildFilterHtml(f, dm, pbList, nsList, countShown, countTotal, labelPhieu) {
  const nvOpts = nsList.map(n => `<option value="${esc(n.manv || n.hoten)}" ${f.cn===(n.manv || n.hoten)?'selected':''}>${esc(n.hoten)}${n.manv?' ('+esc(n.manv)+')':''}</option>`).join('');
  const cdOpts = dm.congdoan.map(c => `<option value="${esc(c)}" ${f.cd===c?'selected':''}>${esc(c)}</option>`).join('');
  return `
    <div class="card no-print">
      <div class="filters">
        <div class="col" style="min-width:130px"><label>Từ ngày</label><input type="date" id="ft_tu" value="${f.tu}"></div>
        <div class="col" style="min-width:130px"><label>Đến ngày</label><input type="date" id="ft_den" value="${f.den}"></div>
        <div class="col" style="min-width:130px"><label>Máy</label>
          <select id="ft_may"><option value="">— Tất cả —</option>${dm.maymoc.map(m=>`<option ${f.may===m?'selected':''}>${esc(m)}</option>`).join('')}</select></div>
        <div class="col" style="min-width:130px"><label>Công đoạn</label>
          <select id="ft_cd"><option value="">— Tất cả —</option>${cdOpts}</select></div>
        <div class="col" style="min-width:130px"><label>Phòng ban</label>
          <select id="ft_pb"><option value="">— Tất cả —</option>${pbList.map(m=>`<option ${f.pb===m?'selected':''}>${esc(m)}</option>`).join('')}</select></div>
        <div class="col" style="min-width:160px"><label>Nhân viên</label>
          <select id="ft_cn"><option value="">— Tất cả —</option>${nvOpts}</select></div>
        <div style="display:flex;align-items:flex-end"><button class="btn sec sm" id="ft_clear">Xóa lọc</button></div>
      </div>
      <div class="muted" style="margin-top:8px">Hiển thị <b>${countShown}</b>/${countTotal} ${labelPhieu}.
        <button class="btn sec sm" onclick="window.print()">🖨 In danh sách</button>
        <button class="btn sec sm" onclick="xuatCSVLichSu()">⬇ Xuất CSV</button>
      </div>
    </div>`;
}

/* --- Lọc dữ liệu chung --- */
function applyFilter(arr, f) {
  return arr.filter(p => {
    if(f.tu && p.ngay < f.tu) return false;
    if(f.den && p.ngay > f.den) return false;
    if(f.may && p.may !== f.may) return false;
    if(f.cd && p.congdoan !== f.cd) return false;
    if(f.pb && p.phongban !== f.pb) return false;
    if(f.cn && p.manv !== f.cn && p.hoten !== f.cn) return false;
    return true;
  });
}

/* --- Bind filter events chung --- */
function bindFilterEvents() {
  const bind = (id, key) => {
    const el = document.getElementById(id); if(!el) return;
    el.addEventListener('change', e => { filterState[key]=e.target.value; renderLichSu(); });
  };
  bind('ft_tu','tu'); bind('ft_den','den'); bind('ft_may','may');
  bind('ft_cd','cd'); bind('ft_pb','pb'); bind('ft_cn','cn');
  const btnClear = document.getElementById('ft_clear');
  if(btnClear) btnClear.onclick=()=>{filterState={tu:'',den:'',may:'',pb:'',cd:'',cn:''};renderLichSu();};
  const btnNl=document.getElementById('btnTabNangLuc');
  const btnHn=document.getElementById('btnTabHangNgay');
  if(btnNl) btnNl.onclick=()=>{currentSubTab='nangluc';filterState.cn='';renderLichSu();};
  if(btnHn) btnHn.onclick=()=>{currentSubTab='hangngay';filterState.cn='';renderLichSu();};
}

function renderLichSu(){
  const dm=getDM();
  const ns=getNS();
  const pbList=[...new Set(ns.map(n=>n.phongban).filter(Boolean))];
  $('#topActions').innerHTML=`<button class="btn sec sm" onclick="switchView(currentSubTab==='nangluc'?'danhgia':'danhgia_hangngay')">+ Phiếu mới</button>`;
  const view=$('#view-lichsu');
  const f=filterState;

  const tabHtml=`
    <div class="row no-print" style="margin-bottom:12px;border-bottom:2px solid var(--vien);padding-bottom:8px;width:100%">
      <button class="btn ${currentSubTab==='nangluc'?'':'sec'} sm" id="btnTabNangLuc" style="margin-right:8px">Đánh giá năng lực</button>
      <button class="btn ${currentSubTab==='hangngay'?'':'sec'} sm" id="btnTabHangNgay">Đánh giá hàng ngày</button>
    </div>`;

  if(currentSubTab==='nangluc'){
    const arr=filterByPermission(getPhieu(),'phieu').slice().sort((a,b)=>(b.ngay+(b.luuLuc||'')).localeCompare(a.ngay+(a.luuLuc||'')));
    const list=applyFilter(arr,f);
    view.innerHTML=tabHtml+buildFilterHtml(f,dm,pbList,ns,list.length,arr.length,'phiếu năng lực')+`
      <div class="card">${list.length?`<div class="tablewrap"><table>
        <tr><th>Ngày</th><th>Nhân viên</th><th>Phòng ban</th><th>Máy / Công đoạn</th><th class="center">Điểm A</th><th class="center">ĐKN</th><th>Kết quả</th><th class="no-print center">Thao tác</th></tr>
        ${list.map(p=>{const x=xepLoai(p.diemA);return `<tr>
          <td>${fmtNgay(p.ngay)}<br><span class="muted">${esc(p.ca||'')}</span></td>
          <td><b>${esc(p.hoten)}</b>${p.manv?`<br><span class="muted">${esc(p.manv)}</span>`:''}</td>
          <td>${esc(p.phongban||'')}</td>
          <td>${esc(p.may)}<br><span class="muted">${esc(p.congdoan||'')}</span></td>
          <td class="center"><b style="color:${x.mau}">${p.diemA!=null?p.diemA.toFixed(2):'—'}</b><br><span class="badge ${x.cls}" style="font-size:10px">${x.ten}</span></td>
          <td class="center"><b style="color:var(--cam)">${p.soDaKyNang||0}/6</b></td>
          <td>${esc(p.ketQua||'—')}</td>
          <td class="no-print center" style="white-space:nowrap">
            <button class="btn sec sm" onclick="xemPhieu('${p.id}')">Xem</button>
            <button class="btn sec sm" onclick="suaPhieu('${p.id}')">Sửa</button>
            <button class="btn danger sm" onclick="xoaPhieu('${p.id}')">Xóa</button></td></tr>`;}).join('')}
      </table></div>`:`<div class="empty"><div class="big">📋</div><p class="muted">Không có phiếu nào khớp bộ lọc.</p></div>`}</div>
      <div id="phieuChiTiet"></div>`;
  } else {
    const arr=filterByPermission(getPhieuDaily(),'phieu_daily').slice().sort((a,b)=>(b.ngay+(b.luuLuc||'')).localeCompare(a.ngay+(a.luuLuc||'')));
    const list=applyFilter(arr,f);
    view.innerHTML=tabHtml+buildFilterHtml(f,dm,pbList,ns,list.length,arr.length,'phiếu hàng ngày')+`
      <div class="card">${list.length?`<div class="tablewrap"><table>
        <tr><th>Ngày</th><th>Nhân viên</th><th>Phòng ban</th><th>Máy / Công đoạn</th><th class="center">Điểm KPI</th><th class="center">Xếp loại</th><th class="no-print center">Thao tác</th></tr>
        ${list.map(p=>{const x=xepLoaiDaily(p.finalScore);return `<tr>
          <td>${fmtNgay(p.ngay)}<br><span class="muted">${esc(p.ca||'')}</span></td>
          <td><b>${esc(p.hoten)}</b>${p.manv?`<br><span class="muted">${esc(p.manv)}</span>`:''}</td>
          <td>${esc(p.phongban||'')}</td>
          <td>${esc(p.may)}<br><span class="muted">${esc(p.congdoan||'')}</span></td>
          <td class="center"><b style="color:${x.mau}">${p.finalScore!=null?p.finalScore.toFixed(2):'—'}</b></td>
          <td class="center"><span class="badge ${x.cls}">${x.ten}</span></td>
          <td class="no-print center" style="white-space:nowrap">
            <button class="btn sec sm" onclick="xemPhieuDaily('${p.id}')">Xem</button>
            <button class="btn sec sm" onclick="suaPhieuDaily('${p.id}')">Sửa</button>
            <button class="btn danger sm" onclick="xoaPhieuDaily('${p.id}')">Xóa</button></td></tr>`;}).join('')}
      </table></div>`:`<div class="empty"><div class="big">📋</div><p class="muted">Không có phiếu nào khớp bộ lọc.</p></div>`}</div>
      <div id="phieuChiTiet"></div>`;
  }
  bindFilterEvents();
}
function xoaPhieu(id){
  if(!confirm('Xóa phiếu đánh giá này? Không thể hoàn tác.')) return;
  savePhieu(getPhieu().filter(x=>x.id!==id)); toast('✓ Đã xóa phiếu'); renderLichSu();
}
function xemPhieu(id){
  const p=getPhieu().find(x=>x.id===id); if(!p) return;
  const x=xepLoai(p.diemA);
  const aRows=NHOM_A.map(a=>{const v=p.scoreA?.[a.id];const td=THANG_A.find(t=>t.v===v);
    return `<tr><td>${esc(a.ten)}</td><td class="center"><b style="color:${td?td.mau:'#999'}">${v||'—'}</b></td><td>${td?esc(td.label.split(' - ')[1]):'<span class="muted">chưa chấm</span>'}</td></tr>`;}).join('');
  const bcRows=(arrG,store,grpName)=>arrG.map(it=>{const v=store?.[it.id];
    return `<tr><td>${esc(it.ten)} <span class="muted">(${grpName})</span></td><td class="center"><b style="color:${v>=4?(v===5?'#1f7a33':'#3fa34d'):'#999'}">${v||'—'}</b></td><td>${v?(v===5?'Xuất sắc / Vượt mục tiêu':'Tốt / đúng chuẩn'):'<span class="muted">không áp dụng</span>'}</td></tr>`;}).join('');
  const box=$('#phieuChiTiet');
  box.innerHTML=`<div class="card" id="printArea">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;border-bottom:2px solid #0b5d3b;padding-bottom:12px;margin-bottom:14px">
      <div><h3 style="border:none;margin:0;padding:0">PHIẾU ĐÁNH GIÁ NĂNG LỰC NHÂN VIÊN — HÀNG NGÀY / ĐỊNH KỲ</h3>
        <div class="muted">Công ty TNHH TM-SX Huệ Linh · Mã TL: 001-QLHS001 · Phiên bản V2.0</div></div>
      <button class="btn sm no-print" onclick="printPhieu()">🖨 In phiếu</button></div>
    <div class="tablewrap"><table style="margin-bottom:14px">
      <tr><th>Ngày rà soát</th><td>${fmtNgay(p.ngay)}</td><th>Ca</th><td>${esc(p.ca)}</td></tr>
      <tr><th>Nhân viên</th><td><b>${esc(p.hoten)}</b></td><th>Mã NV</th><td>${esc(p.manv)||'—'}</td></tr>
      <tr><th>Phòng ban</th><td>${esc(p.phongban||'—')}</td><th>Máy / Công đoạn</th><td>${esc(p.may)} / ${esc(p.congdoan)}</td></tr>
    </table></div>
    <h4 style="color:#127a4e;margin:10px 0 6px">NHÓM A — Tiêu chí đào tạo cơ bản (1–5)</h4>
    <div class="tablewrap"><table><tr><th>Tiêu chí</th><th class="center">Điểm</th><th>Mức</th></tr>${aRows}</table></div>
    <h4 style="color:#5b21b6;margin:14px 0 6px">NHÓM B — Báo cáo sự cố & cải tiến</h4>
    <div class="tablewrap"><table><tr><th>Chỉ số</th><th class="center">Điểm</th><th>Mức</th></tr>${bcRows(NHOM_B,p.scoreB,'B')}</table></div>
    <h4 style="color:#d97706;margin:14px 0 6px">NHÓM C — Chỉ số đa kỹ năng</h4>
    <div class="tablewrap"><table><tr><th>Chỉ số</th><th class="center">Điểm</th><th>Mức</th></tr>${bcRows(NHOM_C,p.scoreC,'C')}</table></div>
    <div class="final-box" style="margin-top:14px">
      <div><div class="muted">ĐIỂM NỀN (A)</div><div class="final-num" style="color:${x.mau}">${p.diemA!=null?p.diemA.toFixed(2):'—'}</div></div>
      <div><div class="muted">Xếp loại</div><div style="margin-top:6px"><span class="badge ${x.cls}">${x.ten}</span></div></div>
      <div><div class="muted">Đa kỹ năng</div><div class="final-num" style="font-size:34px;color:var(--cam)">${p.soDaKyNang||0}/6</div></div>
    </div>
    <div class="tablewrap"><table style="margin-top:14px">
      <tr><th>Kết quả tổng thể</th><td>${esc(p.ketQua||'—')}</td></tr>
      <tr><th>Hành động nhân sự</th><td>${esc(p.hanhDongNS||'—')}</td></tr>
      <tr><th>Ảnh hưởng cấp bậc & lương</th><td>${esc(p.anhHuongLuong||'—')}</td></tr>
    </table></div>
    ${p.ykienQuanDoc?`<div style="margin-top:14px"><b>Ý kiến chỉ đạo / nhận xét của quản đốc:</b><div style="white-space:pre-wrap;margin-top:4px">${esc(p.ykienQuanDoc)}</div></div>`:''}
    <div class="row" style="margin-top:28px">
      <div class="col center">.................................<br><span class="muted">Người đánh giá</span><br>${esc(p.nguoiDG)||''}</div>
      <div class="col center">.................................<br><span class="muted">Quản đốc / Quản lý sản xuất</span></div>
    </div></div>`;
  box.scrollIntoView({behavior:'smooth'});
}
function printPhieu(){ document.body.classList.add('print-one'); window.print(); setTimeout(()=>document.body.classList.remove('print-one'),400); }

/* ===================================================================
   14.5. BÁO CÁO CHI TIẾT & THỐNG KÊ NÂNG CAO
   =================================================================== */
function buildReportFilterHtml(f, dm, pbList, nsList) {
  const nvOpts = nsList.map(n => `<option value="${esc(n.manv || n.hoten)}" ${f.cn===(n.manv || n.hoten)?'selected':''}>${esc(n.hoten)}${n.manv?' ('+esc(n.manv)+')':''}</option>`).join('');
  const cdOpts = dm.congdoan.map(c => `<option value="${esc(c)}" ${f.cd===c?'selected':''}>${esc(c)}</option>`).join('');
  return `
    <div class="card no-print">
      <div class="filters">
        <div class="col" style="min-width:130px"><label>Từ ngày</label><input type="date" id="rpt_tu" value="${f.tu}"></div>
        <div class="col" style="min-width:130px"><label>Đến ngày</label><input type="date" id="rpt_den" value="${f.den}"></div>
        <div class="col" style="min-width:130px"><label>Máy</label>
          <select id="rpt_may"><option value="">— Tất cả —</option>${dm.maymoc.map(m=>`<option ${f.may===m?'selected':''}>${esc(m)}</option>`).join('')}</select></div>
        <div class="col" style="min-width:130px"><label>Công đoạn</label>
          <select id="rpt_cd"><option value="">— Tất cả —</option>${cdOpts}</select></div>
        <div class="col" style="min-width:130px"><label>Phòng ban</label>
          <select id="rpt_pb"><option value="">— Tất cả —</option>${pbList.map(m=>`<option ${f.pb===m?'selected':''}>${esc(m)}</option>`).join('')}</select></div>
        <div class="col" style="min-width:160px"><label>Nhân viên</label>
          <select id="rpt_cn"><option value="">— Tất cả —</option>${nvOpts}</select></div>
        <div style="display:flex;align-items:flex-end;gap:10px">
          <button class="btn sec sm" id="rpt_clear">Xóa lọc</button>
        </div>
      </div>
      <div style="margin-top:14px; display:flex; gap:10px;" class="no-print">
        <button class="btn sm" onclick="window.print()">🖨 In báo cáo</button>
        <button class="btn sec sm" onclick="xuatCSVBaoCao()">⬇ Xuất CSV chi tiết</button>
      </div>
    </div>`;
}

function veBieuDoLineSVG(points) {
  if(!points || !points.length) {
    return `<div style="height:200px; display:flex; align-items:center; justify-content:center; color:var(--xam)">Không có dữ liệu xu hướng</div>`;
  }
  const width = 600;
  const height = 220;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;
  
  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;
  
  const minY = 1;
  const maxY = 5;
  const getY = (val) => {
    const pct = (val - minY) / (maxY - minY);
    return height - paddingBottom - pct * chartH;
  };
  
  const getX = (index) => {
    if(points.length === 1) return paddingLeft + chartW / 2;
    return paddingLeft + (index / (points.length - 1)) * chartW;
  };
  
  let gridHtml = '';
  for(let yVal = 1; yVal <= 5; yVal++) {
    const y = getY(yVal);
    gridHtml += `
      <line x1="${paddingLeft}" y1="${y}" x2="${width - paddingRight}" y2="${y}" stroke="var(--vien)" stroke-dasharray="4,4" />
      <text x="${paddingLeft - 10}" y="${y + 4}" font-size="11" fill="var(--xam)" text-anchor="end">${yVal.toFixed(1)}</text>
    `;
  }
  
  let pathD = '';
  let dotsHtml = '';
  let labelsHtml = '';
  
  points.forEach((p, idx) => {
    const x = getX(idx);
    const y = getY(p.val);
    if(idx === 0) {
      pathD = `M ${x} ${y}`;
    } else {
      pathD += ` L ${x} ${y}`;
    }
    
    dotsHtml += `
      <circle cx="${x}" cy="${y}" r="4" fill="var(--xanh)" stroke="#fff" stroke-width="1.5" />
      <text x="${x}" y="${y - 8}" font-size="11" font-weight="bold" fill="var(--xanh-dam)" text-anchor="middle">${p.val.toFixed(2)}</text>
    `;
    
    labelsHtml += `
      <text x="${x}" y="${height - paddingBottom + 18}" font-size="10" fill="var(--xam)" text-anchor="middle" transform="${points.length > 8 ? `rotate(-15, ${x}, ${height - paddingBottom + 18})` : ''}">${esc(p.label)}</text>
    `;
  });
  
  return `
    <svg viewBox="0 0 ${width} ${height}" width="100%" height="${height}" style="background:#fff; border:1px solid var(--vien); border-radius:8px; padding:10px 0;">
      ${gridHtml}
      ${points.length > 1 ? `<path d="${pathD}" fill="none" stroke="var(--xanh)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />` : ''}
      ${dotsHtml}
      ${labelsHtml}
    </svg>
  `;
}

function getTrendPoints(list, isDaily) {
  const sorted = list.slice().sort((a,b)=>a.ngay.localeCompare(b.ngay));
  if(!sorted.length) return [];
  
  const dates = [...new Set(sorted.map(p=>p.ngay))];
  let mode = 'date';
  if(dates.length > 15) {
    mode = 'month';
  }
  
  const groups = {};
  sorted.forEach(p => {
    const key = mode === 'date' ? p.ngay : p.ngay.substring(0, 7);
    if(!groups[key]) groups[key] = [];
    const score = isDaily ? p.finalScore : p.diemA;
    if(score != null) groups[key].push(score);
  });
  
  return Object.entries(groups).map(([time, vals]) => {
    const avg = vals.reduce((a,b)=>a+b, 0) / vals.length;
    return { label: mode==='date' ? fmtNgay(time) : time, val: round2(avg) };
  }).sort((a,b)=>a.label.localeCompare(b.label));
}

function renderBaoCao() {
  const dm = getDM();
  const ns = getNS();
  const pbList = [...new Set(ns.map(n => n.phongban).filter(Boolean))];
  const view = $('#view-baocao');
  const f = reportFilterState;

  const tabHtml = `
    <div class="row no-print" style="margin-bottom:12px;border-bottom:2px solid var(--vien);padding-bottom:8px;width:100%">
      <button class="btn ${f.loai==='nangluc'?'':'sec'} sm" id="btnRptTabNangLuc" style="margin-right:8px">Đánh giá năng lực</button>
      <button class="btn ${f.loai==='hangngay'?'':'sec'} sm" id="btnRptTabHangNgay">Đánh giá hàng ngày</button>
    </div>`;

  let contentHtml = '';

  if (f.loai === 'nangluc') {
    const arr = filterByPermission(getPhieu(), 'phieu').slice().sort((a,b)=>a.ngay.localeCompare(b.ngay));
    const list = applyFilter(arr, f);
    const filterHtml = buildReportFilterHtml(f, dm, pbList, ns);

    if (!list.length) {
      contentHtml = tabHtml + filterHtml + `
        <div class="card"><div class="empty"><h3>Không có dữ liệu khớp bộ lọc</h3><p class="muted">Vui lòng điều chỉnh lại bộ lọc báo cáo.</p></div></div>`;
    } else {
      const count = list.length;
      const validA = list.filter(p => p.diemA != null);
      const avgA = validA.length ? round2(validA.reduce((sum, p) => sum + p.diemA, 0) / validA.length) : 0;
      const datChuan = validA.filter(p => p.diemA >= 3.0).length;
      const tyleDat = count ? Math.round(datChuan / count * 100) : 0;
      const tbDKN = count ? round2(list.reduce((sum, p) => sum + (p.soDaKyNang || 0), 0) / count) : 0;

      const overviewHtml = `
        <div class="report-grid">
          <div class="report-card">
            <div class="sub">TỔNG SỐ PHIẾU</div>
            <div class="val">${count}</div>
            <div class="sub">Phiếu đánh giá năng lực</div>
          </div>
          <div class="report-card" style="border-top-color: var(--xanhduong);">
            <div class="sub">ĐIỂM NỀN TB (NHÓM A)</div>
            <div class="val">${avgA.toFixed(2)}</div>
            <div class="sub">Xếp loại: ${xepLoai(avgA).ten}</div>
          </div>
          <div class="report-card" style="border-top-color: var(--xanhla);">
            <div class="sub">TỶ LỆ ĐẠT CHUẨN (≥3.0)</div>
            <div class="val">${tyleDat}%</div>
            <div class="sub">${datChuan} / ${count} phiếu đạt chuẩn</div>
          </div>
          <div class="report-card" style="border-top-color: var(--cam);">
            <div class="sub">ĐA KỸ NĂNG TRUNG BÌNH</div>
            <div class="val">${tbDKN} <span style="font-size:14px;color:var(--xam)">/6</span></div>
            <div class="sub">Chỉ số B+C trung bình</div>
          </div>
        </div>`;

      const points = getTrendPoints(list, false);
      const chartHtml = `
        <div class="card">
          <h3>📈 Biểu đồ xu hướng điểm nền trung bình</h3>
          <div style="margin-top:14px;">
            ${veBieuDoLineSVG(points)}
          </div>
        </div>`;

      const sortedByScore = list.slice().sort((a,b) => (b.diemA || 0) - (a.diemA || 0));
      const top5 = sortedByScore.slice(0, 5);
      const bottom5 = sortedByScore.slice().reverse().slice(0, 5);

      const rankRow = (p) => `<tr>
        <td><b>${esc(p.hoten)}</b>${p.manv?`<br><span class="muted">${esc(p.manv)}</span>`:''}</td>
        <td>${esc(p.phongban||'')}</td>
        <td>${esc(p.may)}</td>
        <td class="center"><b>${p.diemA!=null?p.diemA.toFixed(2):'—'}</b></td>
        <td class="center"><span class="badge ${xepLoai(p.diemA).cls}">${xepLoai(p.diemA).ten}</span></td>
      </tr>`;

      const rankingHtml = `
        <div class="row">
          <div class="col card" style="min-width:300px">
            <h3>🏆 Top nhân viên xuất sắc nhất</h3>
            <div class="tablewrap" style="margin-top:10px">
              <table class="ranking-table">
                <thead><tr><th>Họ tên</th><th>Bộ phận</th><th>Máy</th><th class="center">Điểm A</th><th class="center">Xếp loại</th></tr></thead>
                <tbody>${top5.map(rankRow).join('')}</tbody>
              </table>
            </div>
          </div>
          <div class="col card" style="min-width:300px">
            <h3>⚠️ Nhóm nhân viên cần cải thiện / đào tạo lại</h3>
            <div class="tablewrap" style="margin-top:10px">
              <table class="ranking-table">
                <thead><tr><th>Họ tên</th><th>Bộ phận</th><th>Máy</th><th class="center">Điểm A</th><th class="center">Xếp loại</th></tr></thead>
                <tbody>${bottom5.map(rankRow).join('')}</tbody>
              </table>
            </div>
          </div>
        </div>`;

      const detailedTableHtml = `
        <div class="card">
          <h3>📋 Bảng tổng hợp chi tiết đã lọc</h3>
          <div class="tablewrap" style="margin-top:12px">
            <table>
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Nhân viên</th>
                  <th>Phòng ban</th>
                  <th>Máy / Công đoạn</th>
                  <th class="center">Điểm A</th>
                  <th class="center">Đa kỹ năng</th>
                  <th>Đề xuất kết quả</th>
                  <th class="no-print center">Xem</th>
                </tr>
              </thead>
              <tbody>
                ${list.map(p => `<tr>
                  <td>${fmtNgay(p.ngay)}</td>
                  <td><b>${esc(p.hoten)}</b>${p.manv?`<br><span class="muted">${esc(p.manv)}</span>`:''}</td>
                  <td>${esc(p.phongban||'—')}</td>
                  <td>${esc(p.may)} / ${esc(p.congdoan||'—')}</td>
                  <td class="center"><b>${p.diemA!=null?p.diemA.toFixed(2):'—'}</b></td>
                  <td class="center">${p.soDaKyNang||0}/6</td>
                  <td>${esc(p.ketQua||'—')}</td>
                  <td class="no-print center"><button class="btn sec sm" onclick="xemPhieu('${p.id}')">Xem</button></td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
        <div id="phieuChiTiet"></div>`;

      contentHtml = tabHtml + filterHtml + overviewHtml + chartHtml + rankingHtml + detailedTableHtml;
    }
  } else {
    const arr = filterByPermission(getPhieuDaily(), 'phieu_daily').slice().sort((a,b)=>a.ngay.localeCompare(b.ngay));
    const list = applyFilter(arr, f);
    const filterHtml = buildReportFilterHtml(f, dm, pbList, ns);

    if (!list.length) {
      contentHtml = tabHtml + filterHtml + `
        <div class="card"><div class="empty"><h3>Không có dữ liệu khớp bộ lọc</h3><p class="muted">Vui lòng điều chỉnh lại bộ lọc báo cáo.</p></div></div>`;
    } else {
      const count = list.length;
      const validScore = list.filter(p => p.finalScore != null);
      const avgScore = validScore.length ? round2(validScore.reduce((sum, p) => sum + p.finalScore, 0) / validScore.length) : 0;
      const datChuan = validScore.filter(p => p.finalScore >= 3.0).length;
      const tyleDat = count ? Math.round(datChuan / count * 100) : 0;
      const totXuatSac = validScore.filter(p => p.finalScore >= 3.8).length;
      const tyleTot = count ? Math.round(totXuatSac / count * 100) : 0;

      const overviewHtml = `
        <div class="report-grid">
          <div class="report-card">
            <div class="sub">TỔNG SỐ PHIẾU</div>
            <div class="val">${count}</div>
            <div class="sub">Phiếu đánh giá hàng ngày</div>
          </div>
          <div class="report-card" style="border-top-color: var(--xanhduong);">
            <div class="sub">ĐIỂM KPI TỔNG HỢP TB</div>
            <div class="val">${avgScore.toFixed(2)}</div>
            <div class="sub">Xếp loại: ${xepLoaiDaily(avgScore).ten}</div>
          </div>
          <div class="report-card" style="border-top-color: var(--xanhla);">
            <div class="sub">TỶ LỆ ĐẠT CHUẨN (≥3.0)</div>
            <div class="val">${tyleDat}%</div>
            <div class="sub">${datChuan} / ${count} phiếu đạt chuẩn</div>
          </div>
          <div class="report-card" style="border-top-color: var(--cam);">
            <div class="sub">TỶ LỆ TỐT/XUẤT SẮC (≥3.8)</div>
            <div class="val">${tyleTot}%</div>
            <div class="sub">${totXuatSac} / ${count} phiếu khá/giỏi</div>
          </div>
        </div>`;

      const points = getTrendPoints(list, true);
      const chartHtml = `
        <div class="card">
          <h3>📈 Biểu đồ xu hướng điểm KPI trung bình hàng ngày</h3>
          <div style="margin-top:14px;">
            ${veBieuDoLineSVG(points)}
          </div>
        </div>`;

      const sortedByScore = list.slice().sort((a,b) => (b.finalScore || 0) - (a.finalScore || 0));
      const top5 = sortedByScore.slice(0, 5);
      const bottom5 = sortedByScore.slice().reverse().slice(0, 5);

      const rankRow = (p) => `<tr>
        <td><b>${esc(p.hoten)}</b>${p.manv?`<br><span class="muted">${esc(p.manv)}</span>`:''}</td>
        <td>${esc(p.phongban||'')}</td>
        <td>${esc(p.may)}</td>
        <td class="center"><b>${p.finalScore!=null?p.finalScore.toFixed(2):'—'}</b></td>
        <td class="center"><span class="badge ${xepLoaiDaily(p.finalScore).cls}">${xepLoaiDaily(p.finalScore).ten}</span></td>
      </tr>`;

      const rankingHtml = `
        <div class="row">
          <div class="col card" style="min-width:300px">
            <h3>🏆 Top nhân viên điểm KPI cao nhất</h3>
            <div class="tablewrap" style="margin-top:10px">
              <table class="ranking-table">
                <thead><tr><th>Họ tên</th><th>Bộ phận</th><th>Máy</th><th class="center">Điểm KPI</th><th class="center">Xếp loại</th></tr></thead>
                <tbody>${top5.map(rankRow).join('')}</tbody>
              </table>
            </div>
          </div>
          <div class="col card" style="min-width:300px">
            <h3>⚠️ Nhóm nhân viên điểm KPI thấp nhất</h3>
            <div class="tablewrap" style="margin-top:10px">
              <table class="ranking-table">
                <thead><tr><th>Họ tên</th><th>Bộ phận</th><th>Máy</th><th class="center">Điểm KPI</th><th class="center">Xếp loại</th></tr></thead>
                <tbody>${bottom5.map(rankRow).join('')}</tbody>
              </table>
            </div>
          </div>
        </div>`;

      const detailedTableHtml = `
        <div class="card">
          <h3>📋 Bảng tổng hợp chi tiết đã lọc</h3>
          <div class="tablewrap" style="margin-top:12px">
            <table>
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Nhân viên</th>
                  <th>Phòng ban</th>
                  <th>Máy / Công đoạn</th>
                  <th class="center">Năng suất</th>
                  <th class="center">Chất lượng</th>
                  <th class="center">An toàn</th>
                  <th class="center">Điểm KPI</th>
                  <th class="center">Xếp loại</th>
                  <th class="no-print center">Xem</th>
                </tr>
              </thead>
              <tbody>
                ${list.map(p => `<tr>
                  <td>${fmtNgay(p.ngay)}</td>
                  <td><b>${esc(p.hoten)}</b>${p.manv?`<br><span class="muted">${esc(p.manv)}</span>`:''}</td>
                  <td>${esc(p.phongban||'—')}</td>
                  <td>${esc(p.may)} / ${esc(p.congdoan||'—')}</td>
                  <td class="center">${p.kpiProductivity!=null?p.kpiProductivity.toFixed(2):'—'}</td>
                  <td class="center">${p.kpiQuality!=null?p.kpiQuality.toFixed(2):'—'}</td>
                  <td class="center">${p.kpiSafety!=null?p.kpiSafety.toFixed(2):'—'}</td>
                  <td class="center"><b>${p.finalScore!=null?p.finalScore.toFixed(2):'—'}</b></td>
                  <td class="center"><span class="badge ${xepLoaiDaily(p.finalScore).cls}">${xepLoaiDaily(p.finalScore).ten}</span></td>
                  <td class="no-print center"><button class="btn sec sm" onclick="xemPhieuDaily('${p.id}')">Xem</button></td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
        <div id="phieuChiTiet"></div>`;

      contentHtml = tabHtml + filterHtml + overviewHtml + chartHtml + rankingHtml + detailedTableHtml;
    }
  }

  view.innerHTML = contentHtml;
  bindReportFilterEvents();
}

function bindReportFilterEvents() {
  const bind = (id, key) => {
    const el = document.getElementById(id); if(!el) return;
    el.addEventListener('change', e => { reportFilterState[key] = e.target.value; renderBaoCao(); });
  };
  bind('rpt_tu','tu'); bind('rpt_den','den'); bind('rpt_may','may');
  bind('rpt_cd','cd'); bind('rpt_pb','pb'); bind('rpt_cn','cn');

  const btnClear = document.getElementById('rpt_clear');
  if (btnClear) btnClear.addEventListener('click', () => {
    reportFilterState = { tu: '', den: '', pb: '', may: '', cd: '', cn: '', loai: reportFilterState.loai };
    renderBaoCao();
  });

  const btnNl = document.getElementById('btnRptTabNangLuc');
  const btnHn = document.getElementById('btnRptTabHangNgay');
  if (btnNl) btnNl.addEventListener('click', () => { reportFilterState.loai = 'nangluc'; reportFilterState.cn = ''; renderBaoCao(); });
  if (btnHn) btnHn.addEventListener('click', () => { reportFilterState.loai = 'hangngay'; reportFilterState.cn = ''; renderBaoCao(); });
}

function xuatCSVBaoCao() {
  const isDaily = reportFilterState.loai === 'hangngay';
  if (isDaily) {
    const arr = filterByPermission(getPhieuDaily(),'phieu_daily').slice().sort((a,b)=>a.ngay.localeCompare(b.ngay));
    const list = applyFilter(arr, reportFilterState);
    if(!list.length){ toast('⚠ Không có dữ liệu để xuất'); return; }
    
    const head=['Ngày','Mã NV','Nhân viên','Phòng ban','Máy','Công đoạn','Ca'];
    DAILY_CATEGORIES.forEach(cat => {
      cat.criteria.forEach(crit => {
        head.push(`${cat.ten}: ${crit.ten}`);
      });
    });
    head.push('KPI Năng suất (25%)','KPI Chất lượng (25%)','KPI An toàn (20%)','KPI Phối hợp & Thái độ (15%)','KPI Tuân thủ tiêu chuẩn (15%)','Điểm KPI tổng hợp','Xếp loại','Người ĐG','Ý kiến quản đốc');

    const rows=list.map(p=>{
      const r = [fmtNgay(p.ngay),p.manv,p.hoten,p.phongban,p.may,p.congdoan,p.ca];
      DAILY_CATEGORIES.forEach(cat => {
        cat.criteria.forEach(crit => {
          r.push(p.scores?.[crit.id]??'');
        });
      });
      r.push(p.kpiProductivity??'',p.kpiQuality??'',p.kpiSafety??'',p.kpiAttitude??'',p.kpiCompliance??'',p.finalScore??'',p.xepLoai??'',p.nguoiDG||'',(p.ykienQuanDoc||'').replace(/\n/g,' '));
      return r;
    });
    const csv='﻿'+[head,...rows].map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\r\n');
    taiFile(csv,`BaoCaoChiTiet_KPI_HangNgay_${new Date().toISOString().slice(0,10)}.csv`,'text/csv');
    toast('✓ Đã xuất CSV báo cáo hàng ngày');
  } else {
    const arr = filterByPermission(getPhieu(),'phieu').slice().sort((a,b)=>a.ngay.localeCompare(b.ngay));
    const list = applyFilter(arr, reportFilterState);
    if(!list.length){ toast('⚠ Không có dữ liệu để xuất'); return; }
    
    const head=['Ngày','Mã NV','Nhân viên','Phòng ban','Máy','Công đoạn','Ca',
      ...NHOM_A.map(a=>'A: '+a.ten),...NHOM_B.map(b=>'B: '+b.ten),...NHOM_C.map(c=>'C: '+c.ten),
      'Điểm nền A','Đa kỹ năng','Xếp loại','Kết quả tổng thể','Hành động NS','Ảnh hưởng lương','Người ĐG','Ý kiến quản đốc'];
    const rows=list.map(p=>[fmtNgay(p.ngay),p.manv,p.hoten,p.phongban,p.may,p.congdoan,p.ca,
      ...NHOM_A.map(a=>p.scoreA?.[a.id]??''),...NHOM_B.map(b=>p.scoreB?.[b.id]??''),...NHOM_C.map(c=>p.scoreC?.[c.id]??''),
      p.diemA??'',p.soDaKyNang??'',p.xepLoai??'',p.ketQua||'',p.hanhDongNS||'',p.anhHuongLuong||'',p.nguoiDG||'',(p.ykienQuanDoc||'').replace(/\n/g,' ')]);
    const csv='﻿'+[head,...rows].map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\r\n');
    taiFile(csv,`BaoCaoChiTiet_NangLuc_${new Date().toISOString().slice(0,10)}.csv`,'text/csv');
    toast('✓ Đã xuất CSV báo cáo năng lực');
  }
}

function renderHuongDan() {
  const view = $('#view-huongdan');
  view.innerHTML = `
    <div class="card" style="border-top: 4px solid var(--xanh-dam)">
      <h3 style="border-bottom: 2px solid var(--xanh-nhat); padding-bottom: 8px;">🔑 HƯỚNG DẪN ĐĂNG NHẬP</h3>
      <ol style="margin-left: 20px; line-height: 1.8;">
        <li><b>Địa chỉ truy cập</b>: Mở ứng dụng trên trình duyệt của máy tính hoặc điện thoại di động.</li>
        <li><b>Tên đăng nhập (Username)</b>:
          <ul style="margin-left: 20px; list-style-type: circle;">
            <li><b>Tổ trưởng / Quản lý</b>: Nhập tài khoản quản lý được cấp (Ví dụ: <code>admin</code>, <code>quanly</code>).</li>
            <li><b>Công nhân</b>: Nhập chính xác <b>Mã nhân viên</b> của mình (Ví dụ: <code>T0006</code>, <code>T0024</code>,...).</li>
          </ul>
        </li>
        <li><b>Mật khẩu</b>: Nhập mật khẩu của bạn (Mặc định ban đầu của admin là <code>admin123</code>).</li>
        <li>Bấm nút <b>Đăng nhập</b>. Có thông báo chào mừng màu xanh hiện ra là thành công.</li>
      </ol>
    </div>

    <div class="card" style="border-top: 4px solid var(--xanh)">
      <h3 style="border-bottom: 2px solid var(--xanh-nhat); padding-bottom: 8px;">📝 CÁCH ĐỌC & HIỂU ĐIỂM SỐ CỦA BẢN THÂN</h3>
      <p style="margin-bottom: 10px;">Hệ thống chấm điểm kết quả làm việc dựa trên thang điểm từ <b>1 đến 5</b>:</p>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: #fff5f5; border-left: 4px solid var(--do); border-radius: 4px;">
          <span style="font-size: 18px;">🔴</span>
          <span><b>Từ 1.0 đến dưới 2.0 (Không đạt)</b>: Chưa đúng quy trình, cần đào tạo lại công đoạn.</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: #fffbeb; border-left: 4px solid var(--vang); border-radius: 4px;">
          <span style="font-size: 18px;">🟡</span>
          <span><b>Từ 2.0 đến dưới 3.0 (Cần cải thiện)</b>: Đã biết làm nhưng còn chậm, quên vệ sinh hoặc đi muộn.</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: #eff6ff; border-left: 4px solid var(--xanhduong); border-radius: 4px;">
          <span style="font-size: 18px;">🔵</span>
          <span><b>Từ 3.0 đến dưới 3.8 (Đạt yêu cầu)</b>: Đạt năng suất ca, làm tốt, đi làm đúng giờ, giữ sạch 5S. <b style="color: var(--xanhduong)">[Mốc Chuẩn]</b></span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: #f0fdf4; border-left: 4px solid var(--xanhla); border-radius: 4px;">
          <span style="font-size: 18px;">🟢</span>
          <span><b>Từ 3.8 đến dưới 4.5 (Tốt)</b>: Hoạt động xuất sắc, chủ động hỗ trợ người khác khi rảnh ca.</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: #ecfdf5; border-left: 4px solid var(--xanhladam); border-radius: 4px;">
          <span style="font-size: 18px;">❇️</span>
          <span><b>Từ 4.5 đến 5.0 (Xuất sắc)</b>: Vượt mục tiêu sản lượng, phát hiện sự cố máy móc hoặc có cải tiến.</span>
        </div>
      </div>
    </div>

    <div class="card" style="border-top: 4px solid var(--xanhduong)">
      <h3 style="border-bottom: 2px solid var(--xanh-nhat); padding-bottom: 8px;">📈 CÁCH DÙNG BỘ LỌC XEM BÁO CÁO CHI TIẾT</h3>
      <ol style="margin-left: 20px; line-height: 1.8;">
        <li>Bấm chọn mục 📈 <b>Báo cáo nâng cao</b> trên thanh điều hướng bên trái.</li>
        <li>Chọn loại dữ liệu muốn xem:
          <ul style="margin-left: 20px; list-style-type: circle;">
            <li><b>Đánh giá năng lực</b>: Xem tổng kết năng lực tay nghề định kỳ (Đa kỹ năng, vận hành,...).</li>
            <li><b>Đánh giá hàng ngày</b>: Xem điểm chấm công việc, 5S và kỷ luật hàng ngày.</li>
          </ul>
        </li>
        <li>Sử dụng các ô lọc:
          <ul style="margin-left: 20px; list-style-type: circle;">
            <li><b>Từ ngày / Đến ngày</b>: Chọn thời gian muốn thống kê.</li>
            <li><b>Máy / Công đoạn / Phòng ban</b>: Chọn tổ máy hoặc bộ phận làm việc tương ứng.</li>
            <li><b>Nhân viên</b>: Chọn tên của bạn hoặc công nhân bạn muốn xem riêng điểm.</li>
          </ul>
        </li>
      </ol>
      <div class="hint" style="margin-top: 12px; margin-bottom: 0;">
        💡 <b>Mẹo nhanh</b>: Nếu muốn xem lại toàn bộ dữ liệu từ đầu, bấm nút <b>Xóa lọc</b> màu xám.
      </div>
    </div>

    <div class="card" style="border-top: 4px solid var(--cam)">
      <h3 style="border-bottom: 2px solid var(--xanh-nhat); padding-bottom: 8px;">📊 CÁC THÔNG TIN TRÊN MÀN HÌNH BÁO CÁO</h3>
      <ul style="margin-left: 20px; line-height: 1.8;">
        <li><b>Hộp chỉ số tổng hợp</b>: Cho biết tổng số phiếu, điểm trung bình đạt được, xếp loại chung và tỷ lệ đạt chuẩn.</li>
        <li><b>Biểu đồ xu hướng</b>: Biểu đồ dạng đường kẻ giúp bạn nhìn thấy điểm của mình đang tăng hay giảm qua thời gian.</li>
        <li><b>Bảng xếp hạng</b>: Liệt kê Top 5 người điểm cao nhất (tổ biểu dương) và nhóm cần được kèm cặp đào tạo thêm.</li>
        <li><b>Bảng chi tiết phiếu</b>: Ở cuối trang, bạn có thể bấm nút <b>Xem</b> trên từng dòng để mở xem chi tiết nhận xét của quản đốc.</li>
      </ul>
    </div>

    <div class="card" style="border-top: 4px solid var(--xam)">
      <h3 style="border-bottom: 2px solid var(--xanh-nhat); padding-bottom: 8px;">🖨 XUẤT FILE VÀ IN ẤN</h3>
      <ul style="margin-left: 20px; line-height: 1.8;">
        <li><b>In báo cáo (PDF)</b>: Bấm nút <b>In báo cáo</b> màu xanh lá để in trực tiếp hoặc lưu lại thành file PDF. Giao diện in ấn đã được thiết kế ẩn các phần thừa để trang giấy được sạch đẹp nhất.</li>
        <li><b>Tải file Excel (CSV)</b>: Bấm nút <b>Xuất CSV chi tiết</b> màu xám để tải dữ liệu về mở trên Excel của máy tính (Đảm bảo font tiếng Việt hiển thị chính xác 100%).</li>
      </ul>
    </div>
  `;
}

/* ===================================================================
   15. NHÂN SỰ & DANH MỤC
   =================================================================== */
let nsFilter='';
function renderDanhMuc(){
  const view=$('#view-danhmuc');
  const ns=getNS(), dm=getDM(), kq=getKQ();
  let nsList=ns;
  if(nsFilter){ const q=nsFilter.toLowerCase(); nsList=ns.filter(n=>(n.hoten+' '+n.manv+' '+n.phongban+' '+n.chucdanh).toLowerCase().includes(q)); }
  const dmBlock=(key,tieude)=>`
    <div class="card"><h3>${esc(tieude)}</h3>
      <div id="dm_${key}">${dm[key].map((v,i)=>`<div class="bar-row" style="margin-bottom:6px">
        <input value="${esc(v)}" data-dmkey="${key}" data-i="${i}" style="max-width:340px">
        <button class="btn danger sm" onclick="xoaDM('${key}',${i})">Xóa</button></div>`).join('')}</div>
      <button class="btn sec sm" style="margin-top:8px" onclick="themDM('${key}')">+ Thêm</button></div>`;
  const kqBlock=(key,tieude)=>`
    <div class="card"><h3>${esc(tieude)}</h3>
      <div id="kq_${key}">${kq[key].map((v,i)=>`<div class="bar-row" style="margin-bottom:6px">
        <input value="${esc(v)}" data-kqkey="${key}" data-i="${i}" style="max-width:400px">
        <button class="btn danger sm" onclick="xoaKQ('${key}',${i})">Xóa</button></div>`).join('')}</div>
      <button class="btn sec sm" style="margin-top:8px" onclick="themKQ('${key}')">+ Thêm</button></div>`;

  // User management form (Admin only)
  let userForm = '';
  if (window.AUTH && window.AUTH.isAdmin()) {
    userForm = `
      <div class="card" id="formUserCard" style="display:none; border-top:4px solid var(--xanh-dam); margin-top:18px">
        <h3 id="formUserTitle">+ Thêm người dùng mới</h3>
        <form id="formUser" onsubmit="return false">
          <div class="row">
            <div class="col" style="max-width:200px">
              <label>Username *</label>
              <input type="text" id="usr_username" required autocomplete="off">
            </div>
            <div class="col">
              <label>Họ tên *</label>
              <input type="text" id="usr_hoten" required>
            </div>
            <div class="col" style="max-width:180px">
              <label>Phòng ban</label>
              <input type="text" id="usr_phongban" list="pbList">
              <datalist id="pbList">${[...new Set(getNS().map(n=>n.phongban).filter(Boolean))].map(p=>`<option value="${esc(p)}">`).join('')}</datalist>
            </div>
          </div>
          <div class="row" style="margin-top:12px">
            <div class="col" style="max-width:160px">
              <label>Role *</label>
              <select id="usr_role" required>
                <option value="admin">Admin</option>
                <option value="quanly">Quản lý</option>
                <option value="congnhan">Công nhân</option>
                <option value="baotri">Bảo trì</option>
              </select>
            </div>
            <div class="col" style="max-width:160px">
              <label>Mật khẩu</label>
              <input type="password" id="usr_password" placeholder="Để trống nếu không đổi">
            </div>
            <div class="col" style="display:flex;align-items:flex-end;gap:10px">
              <button class="btn" id="btnSaveUser" type="button">💾 Lưu</button>
              <button class="btn sec" id="btnCancelUser" type="button">Hủy</button>
            </div>
          </div>
          <div class="muted" style="margin-top:10px;font-size:11px">
            Lưu ý: Công nhân chỉ có thể xem và tạo phiếu hàng ngày của chính mình. Quản lý thao tác theo phòng ban.
          </div>
        </form>
      </div>
    `;
  }

  // User management section (Admin only)
  let userSection = '';
  if (window.AUTH && window.AUTH.isAdmin()) {
    const users = window.AUTH.getUsers();
    userSection = `
      <div class="card" style="border-top:4px solid var(--xanh-dam)">
        <h3>👥 Quản lý người dùng (${users.length} users)</h3>
        <div class="muted" style="margin-bottom:10px">Tạo user với role: admin, quanly (quản lý theo phòng ban), congnhan (chỉ xem của mình), baotri (bảo trì).</div>
        <button class="btn sm" onclick="themUser()">+ Thêm user mới</button>
        <div class="tablewrap" style="margin-top:12px">
          <table>
            <tr><th>Username</th><th>Họ tên</th><th>Phòng ban</th><th>Role</th><th>Trạng thái</th><th class="center">Thao tác</th></tr>
            ${users.map(u=>`<tr>
              <td><b>${esc(u.username)}</b></td>
              <td>${esc(u.hoten)}</td>
              <td>${esc(u.phongban||'—')}</td>
              <td><span class="tag">${u.role}</span></td>
              <td>${u.active?'<span class="badge b-4">Hoạt động</span>':'<span class="badge b-1">Khóa</span>'}</td>
              <td class="center">
                <button class="btn sec sm" onclick="editUser('${u.username}')">Sửa</button>
                <button class="btn danger sm" onclick="deleteUser('${u.username}')">Xóa</button>
              </td></tr>`).join('')}
          </table>
        </div>
      </div>`;
  }

  // Nhân sự section
  const nsSectionHtml = `
    <div class="card" style="border-top:4px solid var(--xanhduong); margin-top:18px">
      <h3>👤 Danh sách nhân sự (${ns.length} người)</h3>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;margin-bottom:12px">
        <div style="flex:1;min-width:200px">
          <label>Tìm kiếm nhân sự</label>
          <input id="nsSearch" value="${esc(nsFilter)}" placeholder="Tìm theo tên, mã NV, phòng ban...">
        </div>
        <button class="btn sec sm" onclick="lamMoiNS()">↺ Nạp lại từ Excel</button>
        <button class="btn sm" onclick="themNS()">+ Thêm nhân sự</button>
        <button class="btn" onclick="luuNS()">💾 Lưu danh sách</button>
      </div>
      ${nsList.length ? `<div class="tablewrap"><table>
        <tr><th style="width:90px">Mã NV</th><th>Họ tên</th><th>Chức danh</th><th>Phòng ban</th><th class="center no-print">Xóa</th></tr>
        ${nsList.map((n,i)=>{
          const realIdx = ns.indexOf(n);
          return `<tr>
            <td><input data-nsi="${realIdx}" data-nf="manv" value="${esc(n.manv)}" style="max-width:80px"></td>
            <td><input data-nsi="${realIdx}" data-nf="hoten" value="${esc(n.hoten)}"></td>
            <td><input data-nsi="${realIdx}" data-nf="chucdanh" value="${esc(n.chucdanh||'')}" style="max-width:140px"></td>
            <td><input data-nsi="${realIdx}" data-nf="phongban" value="${esc(n.phongban||'')}"></td>
            <td class="center no-print"><button class="btn danger sm" onclick="xoaNS(${realIdx})">Xóa</button></td>
          </tr>`;
        }).join('')}
      </table></div>` : `<div class="muted">Không tìm thấy nhân sự nào khớp.</div>`}
    </div>
  `;

  view.innerHTML=`
    <div class="row">${dmBlock('maymoc','Máy móc')}${dmBlock('congdoan','Công đoạn')}${dmBlock('ca','Ca làm việc')}</div>
    <div class="row" style="margin-top:18px"><h3 style="color:var(--xanh-dam);margin:6px 0 12px">Tùy chọn kết quả & quyết định</h3>${kqBlock('ketqua','Kết quả tổng thể')}${kqBlock('hanhdong','Hành động nhân sự')}${kqBlock('luong','Ảnh hưởng cấp bậc & lương')}</div>
    ${userSection}
    ${userForm}
    ${nsSectionHtml}
    <div class="card" style="background:var(--xanh-nhat);margin-top:18px"><button class="btn" onclick="luuDanhMuc()">💾 Lưu máy/công đoạn/ca & tùy chọn kết quả</button></div>
  `;

  const nsSearchEl = document.getElementById('nsSearch');
  if (nsSearchEl) nsSearchEl.oninput=e=>{nsFilter=e.target.value;clearTimeout(window._nst);window._nst=setTimeout(renderDanhMuc,300);};

  // Bind User form if visible
  bindUserForm();
}
// Nhân sự
function themNS(){ const a=getNS(); a.unshift({manv:'',hoten:'Nhân sự mới',phongban:'',chucdanh:''}); saveNS(a); nsFilter=''; renderDanhMuc(); }
function xoaNS(i){ const a=getNS(); a.splice(i,1); saveNS(a); renderDanhMuc(); }
function lamMoiNS(){ if(!confirm('Nạp lại toàn bộ danh sách nhân sự từ Excel gốc? Thay đổi thủ công sẽ mất.')) return; saveNS((window.NHANSU_DEFAULT||[]).slice()); toast('✓ Đã nạp lại từ Excel'); renderDanhMuc(); }
function luuNS(){
  const a=getNS();
  $$('#view-danhmuc input[data-nsi]').forEach(inp=>{ const i=+inp.dataset.nsi,f=inp.dataset.nf; if(a[i]) a[i][f]=inp.value.trim(); });
  saveNS(a.filter(n=>n.hoten)); toast('✓ Đã lưu danh sách nhân sự'); renderDanhMuc();
}
// Máy/công đoạn/ca
function themDM(k){ const d=getDM(); d[k].push('Mục mới'); saveDM(d); renderDanhMuc(); }
function xoaDM(k,i){ const d=getDM(); d[k].splice(i,1); saveDM(d); renderDanhMuc(); }
// Kết quả
function themKQ(k){ const q=getKQ(); q[k].push('Mục mới'); saveKQ(q); renderDanhMuc(); }
function xoaKQ(k,i){ const q=getKQ(); q[k].splice(i,1); saveKQ(q); renderDanhMuc(); }
function luuDanhMuc(){
  const d=getDM();
  $$('#view-danhmuc input[data-dmkey]').forEach(inp=>{ const k=inp.dataset.dmkey,i=+inp.dataset.i; if(d[k]&&d[k][i]!==undefined) d[k][i]=inp.value.trim(); });
  Object.keys(d).forEach(k=>d[k]=d[k].filter(v=>v)); saveDM(d);
  const q=getKQ();
  $$('#view-danhmuc input[data-kqkey]').forEach(inp=>{ const k=inp.dataset.kqkey,i=+inp.dataset.i; if(q[k]&&q[k][i]!==undefined) q[k][i]=inp.value.trim(); });
  Object.keys(q).forEach(k=>q[k]=q[k].filter(v=>v)); saveKQ(q);
  toast('✓ Đã lưu danh mục'); renderDanhMuc();
}

/* ===================================================================
   15.5. QUẢN LÝ USER
   =================================================================== */
let editingUsername = null;

function themUser() {
  editingUsername = null;
  const card = document.getElementById('formUserCard');
  const title = document.getElementById('formUserTitle');
  if (!card || !title) return;
  title.textContent = '+ Thêm người dùng mới';
  document.getElementById('usr_username').value = '';
  document.getElementById('usr_username').disabled = false;
  document.getElementById('usr_hoten').value = '';
  document.getElementById('usr_phongban').value = '';
  document.getElementById('usr_role').value = 'quanly';
  document.getElementById('usr_password').value = '';
  card.style.display = 'block';
  card.scrollIntoView({behavior:'smooth'});
}

function editUser(username) {
  if (!window.AUTH || !window.AUTH.isAdmin()) return;
  const users = window.AUTH.getUsers();
  const user = users.find(u => u.username === username);
  if (!user) return;
  editingUsername = username;
  const card = document.getElementById('formUserCard');
  const title = document.getElementById('formUserTitle');
  if (!card || !title) return;
  title.textContent = `✏ Chỉnh sửa: ${username}`;
  document.getElementById('usr_username').value = username;
  document.getElementById('usr_username').disabled = true; // Không đổi username
  document.getElementById('usr_hoten').value = user.hoten || '';
  document.getElementById('usr_phongban').value = user.phongban || '';
  document.getElementById('usr_role').value = user.role || 'quanly';
  document.getElementById('usr_password').value = ''; // Để trống = không đổi pass
  card.style.display = 'block';
  card.scrollIntoView({behavior:'smooth'});
}

function deleteUser(username) {
  if (!window.AUTH || !window.AUTH.isAdmin()) return;
  const session = window.AUTH.getSession();
  if (session && session.user.username === username) {
    toast('⚠ Không thể xóa chính mình'); return;
  }
  if (!confirm(`Xóa user "${username}"? Hành động không thể hoàn tác.`)) return;
  const result = window.AUTH.deleteUser(username);
  if (result.success) {
    toast('✓ Đã xóa user'); renderDanhMuc();
  } else {
    toast('⚠ ' + result.message);
  }
}

function bindUserForm() {
  const btnSave = document.getElementById('btnSaveUser');
  const btnCancel = document.getElementById('btnCancelUser');
  if (!btnSave || !btnCancel) return;

  btnSave.onclick = () => {
    const username = document.getElementById('usr_username').value.trim();
    const hoten = document.getElementById('usr_hoten').value.trim();
    const phongban = document.getElementById('usr_phongban').value.trim();
    const role = document.getElementById('usr_role').value;
    const password = document.getElementById('usr_password').value;

    if (!username) { toast('⚠ Nhập username'); return; }
    if (!hoten) { toast('⚠ Nhập họ tên'); return; }

    if (editingUsername) {
      // Cập nhật
      const updates = { hoten, phongban, role };
      if (password) updates.password = password;
      // Nếu đổi active status
      const result = window.AUTH.updateUser(editingUsername, updates);
      if (result.success) {
        toast('✓ Đã cập nhật user'); editingUsername = null; renderDanhMuc();
      } else {
        toast('⚠ ' + result.message);
      }
    } else {
      // Thêm mới
      if (!password) { toast('⚠ Nhập mật khẩu cho user mới'); return; }
      const result = window.AUTH.createUser({ username, hoten, phongban, role, password });
      if (result.success) {
        toast('✓ Đã tạo user mới'); editingUsername = null; renderDanhMuc();
      } else {
        toast('⚠ ' + result.message);
      }
    }
  };

  btnCancel.onclick = () => {
    editingUsername = null;
    const card = document.getElementById('formUserCard');
    if (card) card.style.display = 'none';
  };
}

/* ===================================================================
   16. SAO LƯU & CÀI ĐẶT (TH1 cục bộ / TH2 Google Sheets)
   =================================================================== */
function renderDuLieu(){
  const view=$('#view-dulieu');
  const arr=getPhieu(); const arrDaily=getPhieuDaily(); const cfg=getCfg();
  view.innerHTML=`
    <div class="card">
      <h3>Chế độ lưu trữ</h3>
      <div class="radio-mode">
        <label><input type="radio" name="mode" value="local" ${cfg.mode!=='sheet'?'checked':''}>
          <span><b>Trường hợp 1 — Cục bộ (không cần server)</b><br><span class="muted">Dữ liệu lưu ngay trên thiết bị này. Phù hợp khi dữ liệu không lớn. Hoạt động hoàn toàn offline.</span></span></label>
        <label><input type="radio" name="mode" value="sheet" ${cfg.mode==='sheet'?'checked':''}>
          <span><b>Trường hợp 2 — Google Sheets (có server)</b><br><span class="muted">Mỗi phiếu lưu được gửi lên Google Sheets dùng chung. Nhiều người nhập, dữ liệu tập trung.</span></span></label>
      </div>
      <div id="sheetCfg" style="display:${cfg.mode==='sheet'?'block':'none'};margin-top:10px">
        <label>URL Google Apps Script (Web App)</label>
        <input id="sheetUrl" value="${esc(cfg.sheetUrl||'')}" placeholder="https://script.google.com/macros/s/..../exec">
        <div class="hint" style="margin-top:10px">Cách tạo: mở Google Sheets → Tiện ích mở rộng → Apps Script → dán đoạn mã ở mục <b>Hướng dẫn</b> bên dưới → Triển khai (Deploy) thành Web App → dán URL vào đây. Bấm <b>Kiểm tra kết nối</b> để xác nhận.</div>
        <div class="btn-group" style="margin-top:10px"><button class="btn sec sm" onclick="testSheet()">🔌 Kiểm tra kết nối</button>
          <button class="btn sec sm" onclick="dongBoTatCa()">⬆ Đồng bộ tất cả phiếu lên Sheets</button></div>
      </div>
      <div style="margin-top:14px"><button class="btn" onclick="luuCaiDat()">💾 Lưu cài đặt</button></div>
    </div>
    <div class="card">
      <h3>Xuất dữ liệu</h3>
      <div class="muted" style="margin-bottom:12px">Hiện có <b>${arr.length}</b> phiếu năng lực và <b>${arrDaily.length}</b> phiếu hàng ngày lưu trên thiết bị này.</div>
      <div class="btn-group">
        <button class="btn" onclick="xuatJSON()">⬇ Sao lưu toàn bộ (.json)</button>
        <button class="btn sec" onclick="xuatCSV()">⬇ Bảng tổng hợp năng lực (.csv)</button>
        <button class="btn sec" onclick="xuatCSVDaily()">⬇ Bảng tổng hợp hàng ngày (.csv)</button>
      </div>
    </div>
    <div class="card"><h3>Nhập dữ liệu (khôi phục)</h3>
      <div class="muted" style="margin-bottom:12px">Chọn file .json đã sao lưu. Dữ liệu sẽ gộp vào (phiếu trùng ID được cập nhật).</div>
      <input type="file" id="fileImport" accept=".json" style="max-width:360px"></div>
    <div class="card"><h3>Hướng dẫn tạo Google Apps Script (TH2)</h3>
      <div class="muted">Dán đoạn mã sau vào Apps Script, sửa tên Sheet nếu cần, rồi Deploy → New deployment → Web app → Execute as <b>Me</b>, Who has access <b>Anyone</b>:</div>
      <pre style="background:#1e293b;color:#e2e8f0;padding:14px;border-radius:8px;overflow-x:auto;font-size:11px;margin-top:8px;white-space:pre-wrap">${esc(GAS_CODE)}</pre></div>
    <div class="card" style="background:#fdeaea;border-color:#d64545">
      <h3 style="color:#d64545;border-color:#f5c2c2">Xóa toàn bộ dữ liệu</h3>
      <div class="muted" style="margin-bottom:10px">Xóa tất cả phiếu khỏi thiết bị này. Hãy sao lưu trước.</div>
      <button class="btn danger" onclick="xoaTatCa()">🗑 Xóa toàn bộ phiếu</button></div>`;
  $$('input[name=mode]').forEach(r=>r.onchange=()=>{ $('#sheetCfg').style.display=r.value==='sheet'?'block':'none'; });
  $('#fileImport').onchange=nhapJSON;
}
function luuCaiDat(){
  const mode=$('input[name=mode]:checked').value;
  const sheetUrl=$('#sheetUrl')?$('#sheetUrl').value.trim():'';
  saveCfg({mode,sheetUrl}); updateModePill(); toast('✓ Đã lưu cài đặt ('+(mode==='sheet'?'Google Sheets':'Cục bộ')+')');
}
function xuatJSON(){
  const data={app:'HL-KPI-V2',version:'2.0',exportAt:new Date().toISOString(),phieu:getPhieu(),phieuDaily:getPhieuDaily(),danhmuc:getDM(),nhansu:getNS(),ketqua:getKQ()};
  taiFile(JSON.stringify(data,null,2),`SaoLuu_DanhGiaNangLuc_${new Date().toISOString().slice(0,10)}.json`,'application/json');
  toast('✓ Đã xuất sao lưu');
}
function xuatCSV(){
  const arr=getPhieu(); if(!arr.length){toast('⚠ Chưa có dữ liệu');return;}
  const head=['Ngày','Mã NV','Nhân viên','Phòng ban','Máy','Công đoạn','Ca',
    ...NHOM_A.map(a=>'A: '+a.ten),...NHOM_B.map(b=>'B: '+b.ten),...NHOM_C.map(c=>'C: '+c.ten),
    'Điểm nền A','Đa kỹ năng','Xếp loại','Kết quả tổng thể','Hành động NS','Ảnh hưởng lương','Người ĐG','Ý kiến quản đốc'];
  const rows=arr.map(p=>[fmtNgay(p.ngay),p.manv,p.hoten,p.phongban,p.may,p.congdoan,p.ca,
    ...NHOM_A.map(a=>p.scoreA?.[a.id]??''),...NHOM_B.map(b=>p.scoreB?.[b.id]??''),...NHOM_C.map(c=>p.scoreC?.[c.id]??''),
    p.diemA??'',p.soDaKyNang??'',p.xepLoai??'',p.ketQua||'',p.hanhDongNS||'',p.anhHuongLuong||'',p.nguoiDG||'',(p.ykienQuanDoc||'').replace(/\n/g,' ')]);
  const csv='﻿'+[head,...rows].map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\r\n');
  taiFile(csv,`TongHop_DanhGiaNangLuc_${new Date().toISOString().slice(0,10)}.csv`,'text/csv');
  toast('✓ Đã xuất CSV');
}
function taiFile(content,name,type){
  const blob=new Blob([content],{type});const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}
function nhapJSON(e){
  const file=e.target.files[0]; if(!file) return;
  const r=new FileReader();
  r.onload=()=>{ try{
    const data=JSON.parse(r.result);
    const inc=data.phieu||[];
    const incDaily=data.phieuDaily||[];
    const cur=getPhieu(); const map={}; cur.forEach(p=>map[p.id]=p); inc.forEach(p=>map[p.id]=p);
    savePhieu(Object.values(map));
    const curDaily=getPhieuDaily(); const mapDaily={}; curDaily.forEach(p=>mapDaily[p.id]=p); incDaily.forEach(p=>mapDaily[p.id]=p);
    savePhieuDaily(Object.values(mapDaily));
    if(data.danhmuc) saveDM(data.danhmuc);
    if(data.nhansu) saveNS(data.nhansu);
    if(data.ketqua) saveKQ(data.ketqua);
    toast(`✓ Đã khôi phục thành công dữ liệu`); renderDuLieu();
  }catch(err){ toast('⚠ File không hợp lệ'); } };
  r.readAsText(file);
}
function xoaTatCa(){
  if(!confirm('XÓA TOÀN BỘ phiếu (bao gồm năng lực và hàng ngày)? Hãy chắc chắn đã sao lưu.')) return;
  if(!confirm('Xác nhận lần cuối: xóa tất cả?')) return;
  savePhieu([]); savePhieuDaily([]); toast('✓ Đã xóa toàn bộ'); renderDuLieu();
}

/* ===================================================================
   16.5. ĐÁNH GIÁ HÀNG NGÀY CÔNG NHÂN SẢN XUẤT
   =================================================================== */
function blankPhieuDaily() {
  const dm = getDM();
  return {
    id: null, ngay: new Date().toISOString().slice(0,10), ca: dm.ca[0] || '',
    manv: '', hoten: '', phongban: '', chucdanh: '',
    may: dm.maymoc[0] || '', congdoan: dm.congdoan[0] || '',
    scores: {}, nguoiDG: '', ykienQuanDoc: '', luuLuc: ''
  };
}

function renderFormDaily(){
  const dm=getDM();
  if(!draftDaily) draftDaily=blankPhieuDaily();
  const p=draftDaily;
  $('#topActions').innerHTML=`
    <button class="btn sec sm" id="btnResetDaily">Làm mới</button>
    <button class="btn sm" id="btnSaveDaily">💾 Lưu phiếu hàng ngày</button>`;
  const opt=(arr,sel)=>arr.map(x=>`<option ${x===sel?'selected':''}>${esc(x)}</option>`).join('');

  const groupsHtml = DAILY_CATEGORIES.map(cat => {
    const critHtml = cat.criteria.map(crit => {
      const score = p.scores[crit.id];
      const chips = makeScoreChips(crit.id, score);
      return `<div class="crit-cell">
        <div class="ct">${esc(crit.ten)}</div>
        <div class="def">${esc(crit.def)}</div>
        ${chips}
      </div>`;
    }).join('');
    
    return `<div class="sec-head ${cat.cls}">${esc(cat.ten)} <span class="sec-tag">Thang điểm 1–5</span></div>
    <div class="sec-body"><div class="grid-a">${critHtml}</div></div>`;
  }).join('');

  const t=tinhPhieuDaily(p);
  const xl=xepLoaiDaily(t.finalScore);

  $('#view-danhgia_hangngay').innerHTML=`
    <div class="card">
      <h3>Thông tin chung</h3>
      <div class="row">
        <div class="col">
          <label>Chọn nhân viên (đồng bộ Excel) *</label>
          <div class="nv-search-wrap" id="nvWrapDaily"></div>
        </div>
        <div class="col"><label>Máy phụ trách *</label><select id="fd_may">${opt(dm.maymoc,p.may)}</select></div>
        <div class="col" style="max-width:170px"><label>Công đoạn</label><select id="fd_cd">${opt(dm.congdoan,p.congdoan)}</select></div>
        <div class="col" style="max-width:180px"><label>Ngày đánh giá *</label><input type="date" id="fd_ngay" value="${p.ngay}"></div>
      </div>
      <div class="row" style="margin-top:12px">
        <div class="col"><label>Ca làm việc</label><select id="fd_ca">${opt(dm.ca,p.ca)}</select></div>
        <div class="col"><label>Người đánh giá (quản đốc / giám sát)</label><input id="fd_ngdg" value="${esc(p.nguoiDG)}" placeholder="Họ tên người đánh giá"></div>
      </div>
    </div>

    <div class="card">
      <h3>Tiêu chí đánh giá hàng ngày (24 tiêu chí)</h3>
      <div style="margin-top:12px">${groupsHtml}</div>
    </div>

    <div class="card">
      <h3>Liên kết nhóm KPI & Kết quả</h3>
      <div class="final-box" style="margin-bottom:16px; display:flex; flex-direction:column; align-items:stretch; gap:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px; border-bottom:1px solid rgba(0,0,0,0.1); padding-bottom:12px;">
          <div><div class="muted" style="font-weight:700">ĐIỂM KPI TỔNG HỢP HÀNG NGÀY</div><div class="final-num" id="fdFinalScore" style="color:${xl.mau}">${t.finalScore!=null?t.finalScore.toFixed(2):'—'}</div></div>
          <div><div class="muted" style="font-weight:700">Xếp loại</div><div id="fdXL" style="margin-top:6px"><span class="badge ${xl.cls}">${xl.ten}</span></div></div>
        </div>
        <div class="bar-chart" id="fdKpiBars">
          ${barRow('Năng suất (25%)', t.kpiProductivity||0, 5, 'var(--xanhduong)', t.kpiProductivity!=null?t.kpiProductivity.toFixed(2):'—')}
          ${barRow('Chất lượng (25%)', t.kpiQuality||0, 5, '#0ea5e9', t.kpiQuality!=null?t.kpiQuality.toFixed(2):'—')}
          ${barRow('An toàn (20%)', t.kpiSafety||0, 5, 'var(--xanhla)', t.kpiSafety!=null?t.kpiSafety.toFixed(2):'—')}
          ${barRow('Phối hợp & Thái độ (15%)', t.kpiAttitude||0, 5, 'var(--cam)', t.kpiAttitude!=null?t.kpiAttitude.toFixed(2):'—')}
          ${barRow('Tuân thủ tiêu chuẩn (15%)', t.kpiCompliance||0, 5, 'var(--tim)', t.kpiCompliance!=null?t.kpiCompliance.toFixed(2):'—')}
        </div>
      </div>
    </div>

    <div class="card">
      <h3>Ý kiến nhận xét của quản đốc</h3>
      <textarea id="fd_yk" placeholder="Nhập ý kiến nhận xét cụ thể về ngày làm việc...">${esc(p.ykienQuanDoc)}</textarea>
    </div>`;

  renderNVSearchDaily();

  $('#fd_ngay').addEventListener('input', e=>draftDaily.ngay=e.target.value);
  $('#fd_ca').addEventListener('change', e=>draftDaily.ca=e.target.value);
  $('#fd_may').addEventListener('change', e=>draftDaily.may=e.target.value);
  $('#fd_cd').addEventListener('change', e=>draftDaily.congdoan=e.target.value);
  $('#fd_ngdg').addEventListener('input', e=>draftDaily.nguoiDG=e.target.value);
  $('#fd_yk').addEventListener('input', e=>draftDaily.ykienQuanDoc=e.target.value);

  $$('#view-danhgia_hangngay input[type="radio"]').forEach(r=>{
    r.addEventListener('change', ()=>{
      const cid=r.dataset.cid, val=+r.value;
      draftDaily.scores[cid]=val;
      recalcFormDaily();
    });
  });

  $('#btnResetDaily').addEventListener('click', ()=>{ if(confirm('Làm mới toàn bộ phiếu hiện tại?')){ draftDaily=blankPhieuDaily(); editingDailyId=null; renderFormDaily(); } });
  $('#btnSaveDaily').addEventListener('click', savePhieuDailyHienTai);
}

function makeScoreChips(critId, selectedValue) {
  return `<div class="score-group">
    ${[1, 2, 3, 4, 5].map(v => {
      const uniqueId = `opt_${critId}_${v}`;
      return `<div class="score-opt">
        <input type="radio" id="${uniqueId}" name="${critId}" value="${v}" ${selectedValue === v ? 'checked' : ''} data-cid="${critId}">
        <label for="${uniqueId}">${v}</label>
      </div>`;
    }).join('')}
  </div>`;
}

function recalcFormDaily(){
  const t=tinhPhieuDaily(draftDaily);
  const xl=xepLoaiDaily(t.finalScore);
  if($('#fdFinalScore')){
    $('#fdFinalScore').textContent=t.finalScore!=null?t.finalScore.toFixed(2):'—';
    $('#fdFinalScore').style.color=xl.mau;
  }
  if($('#fdXL')) $('#fdXL').innerHTML=`<span class="badge ${xl.cls}">${xl.ten}</span>`;
  if($('#fdKpiBars')){
    $('#fdKpiBars').innerHTML = `
      ${barRow('Năng suất (25%)', t.kpiProductivity||0, 5, 'var(--xanhduong)', t.kpiProductivity!=null?t.kpiProductivity.toFixed(2):'—')}
      ${barRow('Chất lượng (25%)', t.kpiQuality||0, 5, '#0ea5e9', t.kpiQuality!=null?t.kpiQuality.toFixed(2):'—')}
      ${barRow('An toàn (20%)', t.kpiSafety||0, 5, 'var(--xanhla)', t.kpiSafety!=null?t.kpiSafety.toFixed(2):'—')}
      ${barRow('Phối hợp & Thái độ (15%)', t.kpiAttitude||0, 5, 'var(--cam)', t.kpiAttitude!=null?t.kpiAttitude.toFixed(2):'—')}
      ${barRow('Tuân thủ tiêu chuẩn (15%)', t.kpiCompliance||0, 5, 'var(--tim)', t.kpiCompliance!=null?t.kpiCompliance.toFixed(2):'—')}
    `;
  }
}

function renderNVSearchDaily(){
  const wrap=$('#nvWrapDaily'); if(!wrap) return;
  const p=draftDaily;
  if(p.hoten){
    wrap.innerHTML=`<div class="nv-chip"><b>${esc(p.hoten)}</b>
      <span class="muted">${esc(p.manv||'—')} · ${esc(p.phongban||'')}</span>
      <span class="x" id="nvClearDaily" title="Bỏ chọn">×</span></div>`;
    $('#nvClearDaily').onclick=()=>{ draftDaily.manv='';draftDaily.hoten='';draftDaily.phongban='';draftDaily.chucdanh=''; renderNVSearchDaily(); };
    return;
  }
  wrap.innerHTML=`<input id="nvInputDaily" placeholder="— Chọn / gõ tên nhân sự —" autocomplete="off">
    <div class="nv-dropdown" id="nvDropDaily"></div>`;
  const inp=$('#nvInputDaily'), drop=$('#nvDropDaily');
  const ns=getNS();
  function show(list){
    if(!list.length){ drop.classList.remove('show'); return; }
    drop.innerHTML=list.slice(0,40).map((n,i)=>`<div class="nv-opt" data-i="${i}">
      <div class="nv-name">${esc(n.hoten)}</div>
      <div class="nv-meta">${esc(n.manv||'—')} · ${esc(n.phongban||'')}${n.chucdanh?' · '+esc(n.chucdanh):''}</div></div>`).join('');
    drop.classList.add('show');
    $$('.nv-opt',drop).forEach((o)=>{
      const idx = +o.dataset.i;
      o.onclick=()=>{
        const n=list[idx]; draftDaily.manv=n.manv; draftDaily.hoten=n.hoten; draftDaily.phongban=n.phongban; draftDaily.chucdanh=n.chucdanh;
        renderNVSearchDaily();
      };
    });
  }
  inp.oninput=()=>{
    const q=inp.value.trim().toLowerCase();
    if(!q){ show(ns); return; }
    show(ns.filter(n=>(n.hoten+' '+n.manv+' '+n.phongban+' '+n.chucdanh).toLowerCase().includes(q)));
  };
  inp.onfocus=()=>show(ns);
  document.addEventListener('click',e=>{ if(!wrap.contains(e.target)) drop.classList.remove('show'); }, {once:true});
}

function savePhieuDailyHienTai(){
  if(!draftDaily.hoten){ toast('⚠ Vui lòng chọn nhân viên'); return; }
  const totalCrit = DAILY_CATEGORIES.reduce((acc, cat) => acc + cat.criteria.length, 0);
  const ratedCrit = Object.keys(draftDaily.scores).filter(k => draftDaily.scores[k] != null).length;
  if(ratedCrit < totalCrit) {
    if(!confirm(`⚠ Mới chấm ${ratedCrit}/${totalCrit} tiêu chí. Bạn có muốn lưu phiếu không?`)) return;
  }
  const t=tinhPhieuDaily(draftDaily);
  const rec={ ...draftDaily, id:draftDaily.id||uid(), ...t, luuLuc:new Date().toISOString() };
  const arr=getPhieuDaily();
  const idx=arr.findIndex(x=>x.id===rec.id);
  if(idx>=0) arr[idx]=rec; else arr.push(rec);
  savePhieuDaily(arr);
  // 🔧 FIX P1: Đồng bộ phiếu hàng ngày lên Google Sheets nếu bật chế độ sheet
  const cfgD=getCfg();
  if(cfgD.mode==='sheet' && cfgD.sheetUrl) syncToSheetDaily(rec);
  toast(idx>=0?'✓ Đã cập nhật phiếu hàng ngày':'✓ Đã lưu phiếu hàng ngày');
  draftDaily=null; editingDailyId=null;
  switchView('lichsu');
}

function suaPhieuDaily(id){
  const p=getPhieuDaily().find(x=>x.id===id); if(!p) return;
  draftDaily=JSON.parse(JSON.stringify(p));
  draftDaily.scores=draftDaily.scores||{};
  editingDailyId=id; switchView('danhgia_hangngay');
}

function xoaPhieuDaily(id){
  if(!confirm('Xóa phiếu đánh giá hàng ngày này? Không thể hoàn tác.')) return;
  savePhieuDaily(getPhieuDaily().filter(x=>x.id!==id)); toast('✓ Đã xóa phiếu'); renderLichSu();
}

function xemPhieuDaily(id){
  const p=getPhieuDaily().find(x=>x.id===id); if(!p) return;
  const x=xepLoaiDaily(p.finalScore);
  
  let rowsHtml = '';
  DAILY_CATEGORIES.forEach(cat => {
    cat.criteria.forEach((crit, idx) => {
      const v = p.scores?.[crit.id];
      const categoryLabel = idx === 0 ? `<td rowspan="${cat.criteria.length}" style="font-weight:700; vertical-align:middle; background:var(--xam-nhat); color:var(--xanh-dam); width:180px">${esc(cat.ten)}</td>` : '';
      rowsHtml += `<tr>
        ${categoryLabel}
        <td><b>${esc(crit.id.toUpperCase())}</b>: ${esc(crit.ten)}</td>
        <td class="center" style="font-weight:700; color:${v ? xepLoaiDaily(v).mau : '#999'}">${v||'—'}</td>
      </tr>`;
    });
  });

  const box=$('#phieuChiTiet');
  box.innerHTML=`<div class="card" id="printArea">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;border-bottom:2px solid #0b5d3b;padding-bottom:12px;margin-bottom:14px">
      <div><h3 style="border:none;margin:0;padding:0">BẢNG ĐÁNH GIÁ HÀNG NGÀY CÔNG NHÂN SẢN XUẤT</h3>
        <div class="muted">Công ty TNHH TM-SX Huệ Linh · Mã TL: 001-QLHS001 · Phiên bản V2.0</div></div>
      <button class="btn sm no-print" onclick="printPhieu()">🖨 In phiếu</button></div>
    <div class="tablewrap"><table style="margin-bottom:14px">
      <tr><th>Ngày đánh giá</th><td>${fmtNgay(p.ngay)}</td><th>Ca</th><td>${esc(p.ca)}</td></tr>
      <tr><th>Nhân viên</th><td><b>${esc(p.hoten)}</b></td><th>Mã NV</th><td>${esc(p.manv)||'—'}</td></tr>
      <tr><th>Phòng ban</th><td>${esc(p.phongban||'—')}</td><th>Máy phụ trách</th><td>${esc(p.may)} / ${esc(p.congdoan)}</td></tr>
    </table></div>
    <h4 style="color:#0b5d3b;margin:10px 0 6px">Kết quả chấm điểm chi tiết (24 tiêu chí)</h4>
    <div class="tablewrap"><table>
      <thead>
        <tr>
          <th>Nhóm chỉ số</th>
          <th>Tiêu chí đánh giá</th>
          <th class="center">Điểm</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table></div>
    
    <h4 style="color:#0b5d3b;margin:20px 0 6px">Quy đổi nhóm chỉ số KPI & Kết quả xếp loại</h4>
    <div class="final-box" style="margin-top:14px; display:flex; flex-direction:column; align-items:stretch; gap:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px; border-bottom:1px solid rgba(0,0,0,0.1); padding-bottom:12px;">
        <div><div class="muted">ĐIỂM KPI TỔNG HỢP HÀNG NGÀY</div><div class="final-num" style="color:${x.mau}">${p.finalScore!=null?p.finalScore.toFixed(2):'—'}</div></div>
        <div><div class="muted">Xếp loại</div><div style="margin-top:6px"><span class="badge ${x.cls}">${x.ten}</span></div></div>
      </div>
      <div class="bar-chart">
        ${barRow('Năng suất (25%)', p.kpiProductivity||0, 5, 'var(--xanhduong)', p.kpiProductivity!=null?p.kpiProductivity.toFixed(2):'—')}
        ${barRow('Chất lượng (25%)', p.kpiQuality||0, 5, '#0ea5e9', p.kpiQuality!=null?p.kpiQuality.toFixed(2):'—')}
        ${barRow('An toàn (20%)', p.kpiSafety||0, 5, 'var(--xanhla)', p.kpiSafety!=null?p.kpiSafety.toFixed(2):'—')}
        ${barRow('Phối hợp & Thái độ (15%)', p.kpiAttitude||0, 5, 'var(--cam)', p.kpiAttitude!=null?p.kpiAttitude.toFixed(2):'—')}
        ${barRow('Tuân thủ tiêu chuẩn (15%)', p.kpiCompliance||0, 5, 'var(--tim)', p.kpiCompliance!=null?p.kpiCompliance.toFixed(2):'—')}
      </div>
    </div>
    
    ${p.ykienQuanDoc?`<div style="margin-top:14px"><b>Ý kiến nhận xét của quản đốc:</b><div style="white-space:pre-wrap;margin-top:4px">${esc(p.ykienQuanDoc)}</div></div>`:''}
    <div class="row" style="margin-top:28px">
      <div class="col center">.................................<br><span class="muted">Người đánh giá</span><br>${esc(p.nguoiDG)||''}</div>
      <div class="col center">.................................<br><span class="muted">Quản đốc / Quản lý sản xuất</span></div>
    </div></div>`;
  box.scrollIntoView({behavior:'smooth'});
}

function xuatCSVDaily(){
  const arr=getPhieuDaily(); if(!arr.length){toast('⚠ Chưa có dữ liệu hàng ngày');return;}
  const head=['Ngày','Mã NV','Nhân viên','Phòng ban','Máy','Công đoạn','Ca'];
  DAILY_CATEGORIES.forEach(cat => {
    cat.criteria.forEach(crit => {
      head.push(`${cat.ten}: ${crit.ten}`);
    });
  });
  head.push('KPI Năng suất (25%)','KPI Chất lượng (25%)','KPI An toàn (20%)','KPI Phối hợp & Thái độ (15%)','KPI Tuân thủ tiêu chuẩn (15%)','Điểm KPI tổng hợp','Xếp loại','Người ĐG','Ý kiến quản đốc');

  const rows=arr.map(p=>{
    const r = [fmtNgay(p.ngay),p.manv,p.hoten,p.phongban,p.may,p.congdoan,p.ca];
    DAILY_CATEGORIES.forEach(cat => {
      cat.criteria.forEach(crit => {
        r.push(p.scores?.[crit.id]??'');
      });
    });
    r.push(p.kpiProductivity??'',p.kpiQuality??'',p.kpiSafety??'',p.kpiAttitude??'',p.kpiCompliance??'',p.finalScore??'',p.xepLoai??'',p.nguoiDG||'',(p.ykienQuanDoc||'').replace(/\n/g,' '));
    return r;
  });
  const csv='﻿'+[head,...rows].map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\r\n');
  taiFile(csv,`TongHop_DanhGiaHangNgay_${new Date().toISOString().slice(0,10)}.csv`,'text/csv');
  toast('✓ Đã xuất CSV hàng ngày');
}
/* ----- Google Sheets sync (TH2) ----- */
function syncToSheet(rec){
  const cfg=getCfg(); if(!cfg.sheetUrl) return;
  // dùng no-cors fire-and-forget; Apps Script nhận POST text/plain để tránh preflight
  fetch(cfg.sheetUrl,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},
    body:JSON.stringify({action:'save', loai:'nangluc', phieu:rec})
  }).catch(()=>{ toast('⚠ Không gửi được dữ liệu lên Sheets. Kiểm tra kết nối mạng.'); });
}
// 🔧 FIX P1: Hàm sync riêng cho phiếu hàng ngày (24 tiêu chí)
function syncToSheetDaily(rec){
  const cfg=getCfg(); if(!cfg.sheetUrl) return;
  fetch(cfg.sheetUrl,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},
    body:JSON.stringify({action:'save', loai:'hangngay', phieu:rec})
  }).catch(()=>{ toast('⚠ Không gửi được phiếu hàng ngày lên Sheets. Kiểm tra kết nối mạng.'); });
}
function testSheet(){
  const url=$('#sheetUrl').value.trim(); if(!url){toast('⚠ Nhập URL trước');return;}
  toast('Đang kiểm tra...');
  fetch(url,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action:'ping'})})
    .then(()=>toast('✓ Đã gửi yêu cầu ping. Vào Google Sheet kiểm tra dòng PING trong sheet DanhGia.'))
    .catch(()=>toast('⚠ Không kết nối được URL — kiểm tra lại đường dẫn Apps Script.'));
}
// 🔧 FIX P2: Đồng bộ cả phiếu năng lực VÀ phiếu hàng ngày
function dongBoTatCa(){
  const cfg=getCfg(); if(!cfg.sheetUrl){toast('⚠ Lưu URL trước');return;}
  const arrNL=getPhieu();
  const arrHN=getPhieuDaily();
  if(!arrNL.length && !arrHN.length){toast('⚠ Chưa có dữ liệu phiếu nào');return;}
  arrNL.forEach(p=>syncToSheet(p));
  arrHN.forEach(p=>syncToSheetDaily(p));
  toast(`✓ Đã gửi ${arrNL.length} phiếu năng lực + ${arrHN.length} phiếu hàng ngày lên Sheets`);
}
/* ===================================================================
   17. PHIẾU BÀN GIAO CA
   =================================================================== */
function getBGC(){ return LS.get(LS.BGC, []); }
function saveBGC(a){ LS.set(LS.BGC, a); }

let bgcDraft=null;
function blankBGC(){
  const dm=getDM();
  return {
    id:null, ngay:new Date().toISOString().slice(0,10),
    caGiao:dm.ca[0]||'', caNhan:dm.ca[1]||dm.ca[0]||'',
    may:dm.maymoc[0]||'', nguoiGiao:'', nguoiNhan:'',
    veSinhMay:'dat', sanLuong:0, pheoPham:0,
    tinhTrangMay:'tot', ghiChuMay:'', ghiChuChung:'',
    vatTu:[
      {ten:'', mucDich:'', tinhTrang:'tot', ghiChu:''},
      {ten:'', mucDich:'', tinhTrang:'tot', ghiChu:''},
      {ten:'', mucDich:'', tinhTrang:'tot', ghiChu:''},
      {ten:'', mucDich:'', tinhTrang:'tot', ghiChu:''},
    ]
  };
}

function renderBanGiaoCa(){
  const dm=getDM(), arr=getBGC();
  if(!bgcDraft) bgcDraft=blankBGC();
  const p=bgcDraft;
  const opt=(list,sel)=>list.map(x=>`<option ${x===sel?'selected':''}>${esc(x)}</option>`).join('');
  const nsOpt=getNS().map(n=>`<option value="${esc(n.hoten)}" ${n.hoten===p.nguoiGiao?'selected':''}>${esc(n.hoten)} (${esc(n.phongban)})</option>`).join('');
  const nsOpt2=getNS().map(n=>`<option value="${esc(n.hoten)}" ${n.hoten===p.nguoiNhan?'selected':''}>${esc(n.hoten)} (${esc(n.phongban)})</option>`).join('');

  $('#topActions').innerHTML=`<button class="btn sm" id="btnSaveBGC">💾 Lưu phiếu bàn giao</button>`;
  $('#view-bangiaoca').innerHTML=`
    <div class="card">
      <h3>Phiếu bàn giao ca</h3>
      <div class="row">
        <div class="col"><label>Ngày</label><input type="date" id="bgc_ngay" value="${p.ngay}"></div>
        <div class="col"><label>Ca giao</label><select id="bgc_cagiao">${opt(dm.ca,p.caGiao)}</select></div>
        <div class="col"><label>Ca nhận</label><select id="bgc_canhan">${opt(dm.ca,p.caNhan)}</select></div>
        <div class="col"><label>Máy</label><select id="bgc_may">${opt(dm.maymoc,p.may)}</select></div>
      </div>
      <div class="row" style="margin-top:12px">
        <div class="col"><label>Người giao ca</label><select id="bgc_nguoigiao"><option value="">— Chọn —</option>${nsOpt}</select></div>
        <div class="col"><label>Người nhận ca</label><select id="bgc_nguoinhan"><option value="">— Chọn —</option>${nsOpt2}</select></div>
      </div>
    </div>
    <div class="card">
      <h3>Nội dung bàn giao</h3>
      <div class="row">
        <div class="col"><label>Vệ sinh máy</label>
          <select id="bgc_vesinh">
            <option value="dat" ${p.veSinhMay==='dat'?'selected':''}>Đạt — Sạch sẽ</option>
            <option value="chuadat" ${p.veSinhMay==='chuadat'?'selected':''}>Chưa đạt — Cần vệ sinh lại</option>
          </select></div>
        <div class="col"><label>Sản lượng trong ca (cuộn/tấm)</label><input type="number" id="bgc_sanluong" value="${p.sanLuong}" min="0"></div>
        <div class="col"><label>Phế phẩm phát sinh (cuộn/tấm)</label><input type="number" id="bgc_phepham" value="${p.pheoPham}" min="0"></div>
      </div>
      <div class="row" style="margin-top:12px">
        <div class="col"><label>Tình trạng máy móc khi bàn giao</label>
          <select id="bgc_ttmay">
            <option value="tot" ${p.tinhTrangMay==='tot'?'selected':''}>Tốt — Hoạt động bình thường</option>
            <option value="loi_nhe" ${p.tinhTrangMay==='loi_nhe'?'selected':''}>Lỗi nhẹ — Vẫn chạy được</option>
            <option value="hong" ${p.tinhTrangMay==='hong'?'selected':''}>Hỏng — Cần sửa chữa</option>
          </select></div>
        <div class="col"><label>Ghi chú tình trạng máy</label><input id="bgc_ghichumay" value="${esc(p.ghiChuMay)}" placeholder="Mô tả sự cố nếu có..."></div>
      </div>
      <div style="margin-top:12px"><label>Ghi chú chung</label><textarea id="bgc_ghichuchung" placeholder="Các vấn đề cần lưu ý cho ca sau...">${esc(p.ghiChuChung)}</textarea></div>
    </div>
    <div class="card">
      <h3>Vật tư bàn giao</h3>
      <div class="tablewrap">
        <table id="bgcVatTuTable">
          <thead>
            <tr>
              <th rowspan="2" style="width:36px" class="center">TT</th>
              <th colspan="2" class="center">Vật tư bàn giao</th>
              <th colspan="2" class="center">Tình trạng</th>
              <th rowspan="2">Ghi chú</th>
              <th rowspan="2" class="center no-print" style="width:60px">Xóa</th>
            </tr>
            <tr>
              <th>Tên vật tư / dụng cụ</th>
              <th>Mục đích sử dụng</th>
              <th class="center" style="width:60px">Tốt</th>
              <th class="center" style="width:60px">Hư</th>
            </tr>
          </thead>
          <tbody>
            ${(p.vatTu||[]).map((vt,i)=>`<tr>
              <td class="center">${i+1}</td>
              <td><input data-vti="${i}" data-vtf="ten" value="${esc(vt.ten)}" placeholder="Tên vật tư..."></td>
              <td><input data-vti="${i}" data-vtf="mucDich" value="${esc(vt.mucDich)}" placeholder="Mục đích..."></td>
              <td class="center"><input type="radio" name="tt_${i}" value="tot" ${vt.tinhTrang!=='hu'?'checked':''} data-vti="${i}" data-vtf="tinhTrang" style="width:auto"></td>
              <td class="center"><input type="radio" name="tt_${i}" value="hu" ${vt.tinhTrang==='hu'?'checked':''} data-vti="${i}" data-vtf="tinhTrang" style="width:auto"></td>
              <td><input data-vti="${i}" data-vtf="ghiChu" value="${esc(vt.ghiChu)}" placeholder="Ghi chú..."></td>
              <td class="center no-print"><button class="btn danger sm" onclick="xoaVatTuBGC(${i})">X</button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <button class="btn sec sm" style="margin-top:8px" onclick="themVatTuBGC()">+ Thêm dòng vật tư</button>
    </div>
    <div class="card">
      <h3>Lịch sử bàn giao gần đây</h3>
      ${arr.length?`<div class="tablewrap"><table>
        <tr><th>Ngày</th><th>Ca giao</th><th>Máy</th><th>Người giao</th><th>SL</th><th>PP</th><th>TT Máy</th><th class="center">Xóa</th></tr>
        ${arr.slice().sort((a,b)=>(b.ngay+b.id).localeCompare(a.ngay+a.id)).slice(0,20).map(r=>`<tr>
          <td>${fmtNgay(r.ngay)}</td><td>${esc(r.caGiao)}</td><td>${esc(r.may)}</td>
          <td>${esc(r.nguoiGiao)}</td><td class="center">${r.sanLuong}</td><td class="center">${r.pheoPham}</td>
          <td><span class="badge ${r.tinhTrangMay==='tot'?'b-4':r.tinhTrangMay==='loi_nhe'?'b-2':'b-1'}">${r.tinhTrangMay==='tot'?'Tốt':r.tinhTrangMay==='loi_nhe'?'Lỗi nhẹ':'Hỏng'}</span></td>
          <td class="center"><button class="btn danger sm" onclick="xoaBGC('${r.id}')">Xóa</button></td></tr>`).join('')}
      </table></div>`:`<div class="empty"><div class="big">🔄</div><p class="muted">Chưa có phiếu bàn giao nào.</p></div>`}
    </div>`;

  $('#bgc_ngay').addEventListener('input', e=>bgcDraft.ngay=e.target.value);
  $('#bgc_cagiao').addEventListener('change', e=>bgcDraft.caGiao=e.target.value);
  $('#bgc_canhan').addEventListener('change', e=>bgcDraft.caNhan=e.target.value);
  $('#bgc_may').addEventListener('change', e=>bgcDraft.may=e.target.value);
  $('#bgc_nguoigiao').addEventListener('change', e=>bgcDraft.nguoiGiao=e.target.value);
  $('#bgc_nguoinhan').addEventListener('change', e=>bgcDraft.nguoiNhan=e.target.value);
  $('#bgc_vesinh').addEventListener('change', e=>bgcDraft.veSinhMay=e.target.value);
  $('#bgc_sanluong').addEventListener('input', e=>bgcDraft.sanLuong=+e.target.value||0);
  $('#bgc_phepham').addEventListener('input', e=>bgcDraft.pheoPham=+e.target.value||0);
  $('#bgc_ttmay').addEventListener('change', e=>bgcDraft.tinhTrangMay=e.target.value);
  $('#bgc_ghichumay').addEventListener('input', e=>bgcDraft.ghiChuMay=e.target.value);
  $('#bgc_ghichuchung').addEventListener('input', e=>bgcDraft.ghiChuChung=e.target.value);

  // Bind vật tư inputs
  $$('#bgcVatTuTable input[data-vti]').forEach(inp => {
    const i = +inp.dataset.vti, f = inp.dataset.vtf;
    const ev = inp.type === 'radio' ? 'change' : 'input';
    inp.addEventListener(ev, () => {
      if (!bgcDraft.vatTu) bgcDraft.vatTu = [];
      if (!bgcDraft.vatTu[i]) bgcDraft.vatTu[i] = {ten:'',mucDich:'',tinhTrang:'tot',ghiChu:''};
      bgcDraft.vatTu[i][f] = inp.type === 'radio' ? inp.value : inp.value;
    });
  });

  $('#btnSaveBGC').onclick=saveBGCPhieu;
}

function themVatTuBGC(){
  if(!bgcDraft.vatTu) bgcDraft.vatTu=[];
  bgcDraft.vatTu.push({ten:'',mucDich:'',tinhTrang:'tot',ghiChu:''});
  renderBanGiaoCa();
}

function xoaVatTuBGC(i){
  if(!bgcDraft.vatTu||bgcDraft.vatTu.length<=1){toast('⚠ Phải có ít nhất 1 dòng vật tư');return;}
  bgcDraft.vatTu.splice(i,1);
  renderBanGiaoCa();
}

function saveBGCPhieu(){
  if(!bgcDraft.nguoiGiao){toast('⚠ Chọn người giao ca');return;}
  if(!bgcDraft.nguoiNhan){toast('⚠ Chọn người nhận ca');return;}
  const rec={...bgcDraft, id:bgcDraft.id||uid(), luuLuc:new Date().toISOString()};
  const arr=getBGC(); arr.push(rec); saveBGC(arr);
  toast('✓ Đã lưu phiếu bàn giao ca');
  bgcDraft=blankBGC(); renderBanGiaoCa();
}
function xoaBGC(id){
  if(!confirm('Xóa phiếu bàn giao này?'))return;
  saveBGC(getBGC().filter(x=>x.id!==id)); toast('✓ Đã xóa'); renderBanGiaoCa();
}

/* ===================================================================
   18. KPI NHÀ MÁY
   =================================================================== */
function renderKPINhaMay(){
  const bgcArr=getBGC();
  const btArr=getBaoTriLS();
  const view=$('#view-kpinhamay');

  if(!bgcArr.length){
    view.innerHTML=`<div class="empty"><div class="big">🏭</div>
      <h3>Chưa có dữ liệu</h3>
      <p class="muted">Hãy nhập phiếu bàn giao ca để KPI nhà máy tự tổng hợp.</p>
      <button class="btn" style="margin-top:14px" onclick="switchView('bangiaoca')">→ Bàn giao ca</button></div>`;
    return;
  }

  const tongSL=bgcArr.reduce((s,r)=>s+r.sanLuong,0);
  const tongPP=bgcArr.reduce((s,r)=>s+r.pheoPham,0);
  const tyLePP=tongSL>0?round2(tongPP/tongSL*100):0;

  const soLanDung=btArr.filter(r=>r.loai==='suachua').length;
  const tongGioDung=btArr.filter(r=>r.loai==='suachua').reduce((s,r)=>s+(r.thoiGianDung||0),0);

  const tongGioKhaDung=bgcArr.length*12;
  const oee=tongGioKhaDung>0?round2((tongGioKhaDung-tongGioDung)/tongGioKhaDung*100):100;

  // Theo máy
  const byMay={};
  bgcArr.forEach(r=>{
    if(!byMay[r.may]) byMay[r.may]={sl:0,pp:0,phieu:0};
    byMay[r.may].sl+=r.sanLuong; byMay[r.may].pp+=r.pheoPham; byMay[r.may].phieu++;
  });
  const mayRows=Object.entries(byMay).map(([m,v])=>({may:m,...v,tyLePP:v.sl?round2(v.pp/v.sl*100):0})).sort((a,b)=>b.sl-a.sl);

  // Theo ngày (7 ngày gần nhất)
  const byNgay={};
  bgcArr.forEach(r=>{
    if(!byNgay[r.ngay]) byNgay[r.ngay]={sl:0,pp:0};
    byNgay[r.ngay].sl+=r.sanLuong; byNgay[r.ngay].pp+=r.pheoPham;
  });
  const ngayRows=Object.entries(byNgay).sort((a,b)=>b[0].localeCompare(a[0])).slice(0,7).reverse();

  view.innerHTML=`
    <div class="kpi-cards">
      <div class="kpi-card"><div class="k-label">Tổng sản lượng</div><div class="k-val">${tongSL}</div><div class="k-sub">cuộn/tấm (tất cả ca)</div></div>
      <div class="kpi-card" style="border-top-color:${tyLePP>5?'var(--do)':'var(--xanhla)'}"><div class="k-label">Tỷ lệ phế phẩm</div><div class="k-val" style="color:${tyLePP>5?'var(--do)':'var(--xanhla)'}">${tyLePP}%</div><div class="k-sub">${tongPP} phế / ${tongSL} tổng</div></div>
      <div class="kpi-card" style="border-top-color:var(--vang)"><div class="k-label">Thời gian dừng máy</div><div class="k-val" style="color:var(--vang)">${tongGioDung}h</div><div class="k-sub">${soLanDung} lần sửa chữa</div></div>
      <div class="kpi-card" style="border-top-color:${oee>=80?'var(--xanhla)':'var(--do)'}"><div class="k-label">OEE (Hiệu suất TB)</div><div class="k-val" style="color:${oee>=80?'var(--xanhla)':'var(--do)'}">${oee}%</div><div class="k-sub">Hiệu suất thiết bị tổng thể</div></div>
    </div>
    <div class="row">
      <div class="col card"><h3>Sản lượng theo máy</h3>
        <div class="tablewrap"><table>
          <tr><th>Máy</th><th class="center">Số ca</th><th class="center">Sản lượng</th><th class="center">Phế phẩm</th><th class="center">Tỷ lệ PP</th></tr>
          ${mayRows.map(m=>`<tr><td>${esc(m.may)}</td><td class="center">${m.phieu}</td><td class="center"><b>${m.sl}</b></td><td class="center">${m.pp}</td>
            <td class="center"><span style="color:${m.tyLePP>5?'var(--do)':'var(--xanhla)'}">${m.tyLePP}%</span></td></tr>`).join('')}
        </table></div></div>
      <div class="col card"><h3>Sản lượng 7 ngày gần nhất</h3>
        <div class="bar-chart">${ngayRows.map(([ngay,v])=>barRow(fmtNgay(ngay),v.sl,Math.max(...ngayRows.map(r=>r[1].sl))||1,'var(--xanh)',v.sl)).join('')}</div></div>
    </div>`;
}

/* ===================================================================
   19. BẢO TRÌ MÁY
   =================================================================== */
function getBaoTri(){ return LS.get(LS.BAOTRI, []); }
function saveBaoTriData(a){ LS.set(LS.BAOTRI, a); }
function getBaoTriLS(){ return LS.get(LS.BAOTRI_LS, []); }
function saveBaoTriLS(a){ LS.set(LS.BAOTRI_LS, a); }

function getMayStatus(){
  const dm=getDM();
  const btArr=getBaoTri();
  return dm.maymoc.map(may=>{
    const rec=btArr.find(r=>r.may===may);
    return {may, trangThai:rec?rec.trangThai:'dangchay', ghiChu:rec?rec.ghiChu:''};
  });
}

function renderBaoTri(){
  const dm=getDM(), btArr=getBaoTri(), lsArr=getBaoTriLS();
  const view=$('#view-baotri');
  const mayStatus=getMayStatus();

  $('#topActions').innerHTML=`<button class="btn sm" id="btnThemSC">+ Ghi nhận sửa chữa</button>
    <button class="btn sec sm" id="btnThemBTDK">+ Lịch bảo trì định kỳ</button>`;

  view.innerHTML=`
    <div class="card">
      <h3>Trạng thái máy móc</h3>
      <div class="tablewrap"><table>
        <tr><th>Máy</th><th>Trạng thái</th><th>Ghi chú</th><th class="center">Cập nhật</th></tr>
        ${mayStatus.map((m,i)=>`<tr>
          <td><b>${esc(m.may)}</b></td>
          <td><select data-mayi="${i}" class="bt-status">
            <option value="dangchay" ${m.trangThai==='dangchay'?'selected':''}>🟢 Đang chạy</option>
            <option value="dangsua" ${m.trangThai==='dangsua'?'selected':''}>🟡 Đang sửa</option>
            <option value="dung" ${m.trangThai==='dung'?'selected':''}>🔴 Dừng / Hỏng</option>
          </select></td>
          <td><input data-mayi="${i}" class="bt-ghichu" value="${esc(m.ghiChu)}" placeholder="Ghi chú..." style="max-width:250px"></td>
          <td class="center"><button class="btn sec sm" onclick="luuTrangThaiMay(${i})">Lưu</button></td></tr>`).join('')}
      </table></div>
    </div>
    <div class="card">
      <h3>Lịch bảo trì định kỳ</h3>
      ${lsArr.filter(r=>r.loai==='dinhky').length?`<div class="tablewrap"><table>
        <tr><th>Máy</th><th>Nội dung</th><th>Chu kỳ</th><th>Lần gần nhất</th><th>Lần tới</th><th class="center">Xóa</th></tr>
        ${lsArr.filter(r=>r.loai==='dinhky').map(r=>`<tr>
          <td>${esc(r.may)}</td><td>${esc(r.noiDung)}</td><td>${esc(r.chuKy)}</td>
          <td>${fmtNgay(r.lanGanNhat)}</td><td><b>${fmtNgay(r.lanToi)}</b></td>
          <td class="center"><button class="btn danger sm" onclick="xoaBaoTriLS('${r.id}')">Xóa</button></td></tr>`).join('')}
      </table></div>`:`<div class="muted">Chưa có lịch bảo trì định kỳ.</div>`}
    </div>
    <div class="card">
      <h3>Lịch sử sửa chữa</h3>
      ${lsArr.filter(r=>r.loai==='suachua').length?`<div class="tablewrap"><table>
        <tr><th>Ngày</th><th>Máy</th><th>Mô tả sự cố</th><th>Thời gian dừng</th><th>Người sửa</th><th class="center">Xóa</th></tr>
        ${lsArr.filter(r=>r.loai==='suachua').sort((a,b)=>(b.ngay||'').localeCompare(a.ngay||'')).map(r=>`<tr>
          <td>${fmtNgay(r.ngay)}</td><td>${esc(r.may)}</td><td>${esc(r.moTa)}</td>
          <td class="center">${r.thoiGianDung||0}h</td><td>${esc(r.nguoiSua)}</td>
          <td class="center"><button class="btn danger sm" onclick="xoaBaoTriLS('${r.id}')">Xóa</button></td></tr>`).join('')}
      </table></div>`:`<div class="muted">Chưa có lịch sử sửa chữa.</div>`}
    </div>
    <div id="formBaoTri"></div>`;

  $('#btnThemSC').onclick=()=>showFormSuaChua();
  $('#btnThemBTDK').onclick=()=>showFormBTDinhKy();
}

function luuTrangThaiMay(i){
  const dm=getDM();
  const may=dm.maymoc[i]; if(!may) return;
  const sel=$(`.bt-status[data-mayi="${i}"]`);
  const ghichu=$(`.bt-ghichu[data-mayi="${i}"]`);
  const btArr=getBaoTri();
  const idx=btArr.findIndex(r=>r.may===may);
  const rec={may, trangThai:sel.value, ghiChu:ghichu.value.trim()};
  if(idx>=0) btArr[idx]=rec; else btArr.push(rec);
  saveBaoTriData(btArr);
  toast(`✓ Đã cập nhật trạng thái: ${may}`);
}

function showFormSuaChua(){
  const dm=getDM();
  const box=$('#formBaoTri');
  box.innerHTML=`<div class="card" style="border-top:3px solid var(--do)">
    <h3>Ghi nhận sửa chữa / sự cố</h3>
    <div class="row">
      <div class="col"><label>Ngày</label><input type="date" id="sc_ngay" value="${new Date().toISOString().slice(0,10)}"></div>
      <div class="col"><label>Máy</label><select id="sc_may">${dm.maymoc.map(m=>`<option>${esc(m)}</option>`).join('')}</select></div>
      <div class="col"><label>Thời gian dừng máy (giờ)</label><input type="number" id="sc_gio" value="1" min="0" step="0.5"></div>
      <div class="col"><label>Người sửa</label><input id="sc_nguoi" placeholder="Tên thợ bảo trì..."></div>
    </div>
    <div style="margin-top:12px"><label>Mô tả sự cố & cách xử lý</label><textarea id="sc_mota" placeholder="Mô tả chi tiết sự cố..."></textarea></div>
    <div class="btn-group" style="margin-top:12px"><button class="btn" onclick="luuSuaChua()">💾 Lưu</button>
      <button class="btn sec" onclick="$('#formBaoTri').innerHTML=''">Hủy</button></div></div>`;
  box.scrollIntoView({behavior:'smooth'});
}

function showFormBTDinhKy(){
  const dm=getDM();
  const box=$('#formBaoTri');
  box.innerHTML=`<div class="card" style="border-top:3px solid var(--vang)">
    <h3>Thêm lịch bảo trì định kỳ</h3>
    <div class="row">
      <div class="col"><label>Máy</label><select id="dk_may">${dm.maymoc.map(m=>`<option>${esc(m)}</option>`).join('')}</select></div>
      <div class="col"><label>Nội dung bảo trì</label><input id="dk_noidung" placeholder="VD: Thay dầu, kiểm tra bạc đạn..."></div>
      <div class="col"><label>Chu kỳ</label><select id="dk_chuky">
        <option>Hàng tuần</option><option>2 tuần</option><option>Hàng tháng</option><option>3 tháng</option><option>6 tháng</option><option>Hàng năm</option>
      </select></div>
    </div>
    <div class="row" style="margin-top:12px">
      <div class="col"><label>Lần gần nhất</label><input type="date" id="dk_gannhat" value="${new Date().toISOString().slice(0,10)}"></div>
      <div class="col"><label>Lần tới (dự kiến)</label><input type="date" id="dk_lantoi"></div>
    </div>
    <div class="btn-group" style="margin-top:12px"><button class="btn" onclick="luuBTDinhKy()">💾 Lưu</button>
      <button class="btn sec" onclick="$('#formBaoTri').innerHTML=''">Hủy</button></div></div>`;
  box.scrollIntoView({behavior:'smooth'});
}

function luuSuaChua(){
  const rec={
    id:uid(), loai:'suachua',
    ngay:$('#sc_ngay').value, may:$('#sc_may').value,
    thoiGianDung:+$('#sc_gio').value||0,
    nguoiSua:$('#sc_nguoi').value.trim(),
    moTa:$('#sc_mota').value.trim(),
    luuLuc:new Date().toISOString()
  };
  if(!rec.moTa){toast('⚠ Nhập mô tả sự cố');return;}
  const arr=getBaoTriLS(); arr.push(rec); saveBaoTriLS(arr);
  toast('✓ Đã ghi nhận sửa chữa');
  $('#formBaoTri').innerHTML=''; renderBaoTri();
}

function luuBTDinhKy(){
  const rec={
    id:uid(), loai:'dinhky',
    may:$('#dk_may').value, noiDung:$('#dk_noidung').value.trim(),
    chuKy:$('#dk_chuky').value,
    lanGanNhat:$('#dk_gannhat').value, lanToi:$('#dk_lantoi').value,
    luuLuc:new Date().toISOString()
  };
  if(!rec.noiDung){toast('⚠ Nhập nội dung bảo trì');return;}
  const arr=getBaoTriLS(); arr.push(rec); saveBaoTriLS(arr);
  toast('✓ Đã thêm lịch bảo trì định kỳ');
  $('#formBaoTri').innerHTML=''; renderBaoTri();
}

function xoaBaoTriLS(id){
  if(!confirm('Xóa mục này?'))return;
  saveBaoTriLS(getBaoTriLS().filter(x=>x.id!==id)); toast('✓ Đã xóa'); renderBaoTri();
}

const GAS_CODE = `// =====================================================================
// Google Apps Script — App KPI Huệ Linh v2.0
// Paste toàn bộ code này vào Apps Script, Deploy > Web app > Anyone
// =====================================================================
function doPost(e){
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);

    // Ping test
    if(data.action==='ping'){
      var shPing = ss.getSheetByName('DanhGia') || ss.insertSheet('DanhGia');
      shPing.appendRow([new Date(),'PING','— Kết nối thành công từ App KPI Huệ Linh']);
      return ok();
    }

    var p = data.phieu;
    var loai = data.loai || 'nangluc';

    // -------------------------------------------------------
    // 1. PHIẾU NĂNG LỰC → Sheet 'DanhGia'
    // -------------------------------------------------------
    if(loai === 'nangluc'){
      var sh = ss.getSheetByName('DanhGia') || ss.insertSheet('DanhGia');
      // Kiểm tra có dòng này chưa (dedup theo ID)
      var lastRow = sh.getLastRow();
      if(lastRow > 1){
        var ids = sh.getRange(2, 27, lastRow-1, 1).getValues().flat();
        if(ids.indexOf(p.id) >= 0) return ok(); // Đã tồn tại, bỏ qua
      }
      if(lastRow === 0){
        sh.appendRow(['Ngày','Mã NV','Nhân viên','Phòng ban','Máy','Công đoạn','Ca',
          'A1 Vệ sinh','A2 Vận hành','A3 Nội quy','A4 Kỷ luật','A5 An toàn',
          'B1 Báo cáo','B2 Cải tiến','B3 Ngăn ngừa',
          'C1 Nhiều máy','C2 Hỗ trợ','C3 Hướng dẫn',
          'Điểm A','Đa kỹ năng /6','Xếp loại','Kết quả',
          'Hành động NS','Ảnh hưởng lương','Người ĐG','Ý kiến QĐ','ID','Lưu lúc']);
      }
      var a=p.scoreA||{}, b=p.scoreB||{}, c=p.scoreC||{};
      sh.appendRow([p.ngay,p.manv,p.hoten,p.phongban,p.may,p.congdoan,p.ca,
        a.a1||'',a.a2||'',a.a3||'',a.a4||'',a.a5||'',
        b.b1||'',b.b2||'',b.b3||'',
        c.c1||'',c.c2||'',c.c3||'',
        p.diemA||'',p.soDaKyNang||0,p.xepLoai||'',p.ketQua||'',
        p.hanhDongNS||'',p.anhHuongLuong||'',p.nguoiDG||'',p.ykienQuanDoc||'',
        p.id,p.luuLuc]);
    }

    // -------------------------------------------------------
    // 2. PHIẾU HÀNG NGÀY (24 tiêu chí) → Sheet 'DanhGiaHangNgay'
    // -------------------------------------------------------
    else if(loai === 'hangngay'){
      var shD = ss.getSheetByName('DanhGiaHangNgay') || ss.insertSheet('DanhGiaHangNgay');
      // Dedup theo ID
      var lastRowD = shD.getLastRow();
      if(lastRowD > 1){
        var idsD = shD.getRange(2, 1, lastRowD-1, 1).getValues().flat();
        if(idsD.indexOf(p.id) >= 0) return ok();
      }
      if(lastRowD === 0){
        shD.appendRow(['ID','Ngày','Mã NV','Nhân viên','Phòng ban','Máy','Công đoạn','Ca',
          'VH1','VH2','VH3','VH4',
          'TT1','TT2','TT3','TT4',
          'VS1','VS2','VS3','VS4',
          'DH1','DH2','DH3','DH4',
          'TP1','TP2','TP3','TP4',
          'KL1','KL2','KL3','KL4',
          'KPI Năng suất','KPI Chất lượng','KPI An toàn',
          'KPI Phối hợp','KPI Tuân thủ','Điểm KPI tổng','Xếp loại',
          'Người ĐG','Ý kiến QĐ','Lưu lúc']);
      }
      var s=p.scores||{};
      shD.appendRow([p.id,p.ngay,p.manv,p.hoten,p.phongban,p.may,p.congdoan,p.ca,
        s.vh1||'',s.vh2||'',s.vh3||'',s.vh4||'',
        s.tt1||'',s.tt2||'',s.tt3||'',s.tt4||'',
        s.vs1||'',s.vs2||'',s.vs3||'',s.vs4||'',
        s.dh1||'',s.dh2||'',s.dh3||'',s.dh4||'',
        s.tp1||'',s.tp2||'',s.tp3||'',s.tp4||'',
        s.kl1||'',s.kl2||'',s.kl3||'',s.kl4||'',
        p.kpiProductivity||'',p.kpiQuality||'',p.kpiSafety||'',
        p.kpiAttitude||'',p.kpiCompliance||'',p.finalScore||'',p.xepLoai||'',
        p.nguoiDG||'',p.ykienQuanDoc||'',p.luuLuc]);
    }

    return ok();
  } catch(err) {
    return ContentService.createTextOutput('ERROR: ' + err.message);
  }
}
function ok(){ return ContentService.createTextOutput('OK'); }
function doGet(e){ return ContentService.createTextOutput('App KPI Huệ Linh — GAS đang hoạt động. Dùng POST để gửi dữ liệu.'); }`;
