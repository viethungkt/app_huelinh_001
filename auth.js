/**
 * Authentication & Authorization Service
 * Hệ thống phân quyền cho App KPI Huệ Linh V2
 */

const AUTH = {
  USERS_KEY: 'hl_v2_users',
  SESSION_KEY: 'hl_v2_session',
  ROLES: {
    ADMIN: 'admin',
    QUANLY: 'quanly',
    CONGNHAN: 'congnhan',
    BAOTRI: 'baotri'
  },

  // Mã hóa password đơn giản (offline)
  hash(password) {
    // Base64 encoding - đủ cho nội bộ
    try {
      return btoa(password);
    } catch (e) {
      // Fallback nếu có ký tự Unicode
      return btoa(unescape(encodeURIComponent(password)));
    }
  },

  verifyPassword(password, hash) {
    return this.hash(password) === hash;
  },

  // Đăng nhập
  login(username, password) {
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.active);
    if (!user) {
      return { success: false, message: 'Tài khoản không tồn tại hoặc bị khóa' };
    }
    if (!this.verifyPassword(password, user.password)) {
      return { success: false, message: 'Mật khẩu không đúng' };
    }
    // Tạo session
    const session = {
      user: {
        username: user.username,
        hoten: user.hoten,
        phongban: user.phongban,
        role: user.role
      },
      loginAt: new Date().toISOString()
    };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    return { success: true, user: session.user };
  },

  // Lấy session hiện tại
  getSession() {
    try {
      return JSON.parse(localStorage.getItem(this.SESSION_KEY));
    } catch (e) {
      return null;
    }
  },

  // Kiểm tra đã đăng nhập
  isAuthenticated() {
    const session = this.getSession();
    if (!session) return false;
    // Kiểm tra session hết hạn (24 giờ)
    const loginTime = new Date(session.loginAt);
    const now = new Date();
    const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
    if (hoursDiff > 24) {
      this.logout();
      return false;
    }
    return true;
  },

  // Đăng xuất
  logout() {
    localStorage.removeItem(this.SESSION_KEY);
  },

  // Kiểm tra quyền
  can(action, resource, phongban = null) {
    const session = this.getSession();
    if (!session) return false;

    const { role, phongban: userPB } = session.user;

    // Admin có quyền tất cả
    if (role === this.ROLES.ADMIN) return true;

    // Quyền theo từng resource
    switch (resource) {
      case 'phieu':
      case 'phieu_daily':
        // Quản lý có thể tạo/sửa của phòng ban mình
        if (role === this.ROLES.QUANLY && phongban === userPB) return true;
        // Công nhân chỉ xem của mình (self)
        if (role === this.ROLES.CONGNHAN && action === 'view_self') return true;
        // Công nhân có thể tạo/sửa phiếu hàng ngày của mình
        if (role === this.ROLES.CONGNHAN && resource === 'phieu_daily' && action === 'create') return true;
        break;

      case 'user':
        // Chỉ admin quản lý user
        if (action === 'manage' && role === this.ROLES.ADMIN) return true;
        break;

      case 'danhmuc':
        // Admin và quản lý xem danh mục
        if (role === this.ROLES.ADMIN || role === this.ROLES.QUANLY) return true;
        break;

      case 'baotri':
      case 'bgc':
        // Bảo trì và admin xem
        if (role === this.ROLES.BAOTRI || role === this.ROLES.ADMIN) return true;
        // Quản lý cũng xem bàn giao ca
        if (resource === 'bgc' && role === this.ROLES.QUANLY) return true;
        break;

      case 'report':
        // Admin xem tất cả báo cáo
        if (role === this.ROLES.ADMIN) return true;
        // Quản lý xem báo cáo phòng ban mình
        if (role === this.ROLES.QUANLY && phongban === userPB) return true;
        break;

      case 'dashboard':
        // Tất cả đều xem dashboard, nhưng admin thấy toàn bộ
        if (role === this.ROLES.ADMIN) return true;
        // Quản lý xem dashboard của phòng ban mình
        if (role === this.ROLES.QUANLY && phongban === userPB) return true;
        // Công nhân xem dashboard cá nhân
        if (role === this.ROLES.CONGNHAN && action === 'self') return true;
        break;
    }

    return false;
  },

  // Lấy danh sách user
  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(this.USERS_KEY)) || [];
    } catch (e) {
      return [];
    }
  },

  // Lưu danh sách user
  saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  },

  // Tạo user mới (admin only)
  createUser(userData) {
    const users = this.getUsers();
    // Kiểm tra username đã tồn tại
    if (users.find(u => u.username === userData.username)) {
      return { success: false, message: 'Username đã tồn tại' };
    }
    // Hash password
    userData.password = this.hash(userData.password);
    userData.active = true;
    userData.createdAt = new Date().toISOString();
    userData.updatedAt = userData.createdAt;
    users.push(userData);
    this.saveUsers(users);
    return { success: true };
  },

  // Cập nhật user
  updateUser(username, updates) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.username === username);
    if (idx === -1) {
      return { success: false, message: 'User không tồn tại' };
    }
    // Không cho phép thay đổi role của admin cuối cùng
    if (users[idx].role === this.ROLES.ADMIN && updates.role !== undefined && updates.role !== this.ROLES.ADMIN) {
      const adminCount = users.filter(u => u.role === this.ROLES.ADMIN).length;
      if (adminCount <= 1) {
        return { success: false, message: 'Không thể chuyển role admin cuối cùng' };
      }
    }
    users[idx] = { ...users[idx], ...updates, updatedAt: new Date().toISOString() };
    // Nếu đổi password, hash lại
    if (updates.password && !updates.password.startsWith('btoa_')) {
      users[idx].password = this.hash(updates.password);
    }
    this.saveUsers(users);
    return { success: true };
  },

  // Xóa user
  deleteUser(username) {
    const users = this.getUsers();
    const user = users.find(u => u.username === username);
    if (user && user.role === this.ROLES.ADMIN) {
      const adminCount = users.filter(u => u.role === this.ROLES.ADMIN).length;
      if (adminCount <= 1) {
        return { success: false, message: 'Không thể xóa admin cuối cùng' };
      }
    }
    const newUsers = users.filter(u => u.username !== username);
    this.saveUsers(newUsers);
    return { success: true };
  },

  // Lấy user theo phòng ban (cho quản lý xem)
  getUsersByPhongBan(phongban, currentUserRole) {
    const users = this.getUsers();
    if (currentUserRole === this.ROLES.ADMIN) {
      return users;
    }
    return users.filter(u => u.phongban === phongban);
  },

  // Kiểm tra xem user có phải là admin không
  isAdmin() {
    const session = this.getSession();
    return session && session.user.role === this.ROLES.ADMIN;
  },

  // Kiểm tra xem user có phải là quản lý không
  isQuanLy() {
    const session = this.getSession();
    return session && session.user.role === this.ROLES.QUANLY;
  },

  // Kiểm tra xem user có phải là bảo trì không
  isBaoTri() {
    const session = this.getSession();
    return session && session.user.role === this.ROLES.BAOTRI;
  }
};

// Khởi tạo user mặc định nếu chưa có
function initDefaultUsers() {
  const users = AUTH.getUsers();
  if (users.length === 0) {
    // Tạo admin mặc định từ danh sách nhân sự có sẵn
    const defaultNS = window.NHANSU_DEFAULT || [];
    // Lấy người đầu tiên làm admin (thường là Quản lý)
    const adminCandidates = defaultNS.filter(n => n.chucdanh && n.chucdanh.toLowerCase().includes('tổ trưởng'));
    const adminUser = adminCandidates[0] || defaultNS[0];

    if (adminUser) {
      const defaultUsers = [{
        username: 'admin',
        password: AUTH.hash('admin123'), // Mặc định: admin/admin123
        hoten: adminUser.hoten || 'Quản trị hệ thống',
        phongban: adminUser.phongban || 'VĂN PHÒNG',
        role: AUTH.ROLES.ADMIN,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }];
      AUTH.saveUsers(defaultUsers);
      console.log('Đã tạo user admin mặc định: username=admin, password=admin123');
    }
  }
}

// Gọi init khi load
document.addEventListener('DOMContentLoaded', () => {
  initDefaultUsers();
});

// Export để dùng trong app.js
if (typeof window !== 'undefined') {
  window.AUTH = AUTH;
}
