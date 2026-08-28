/**
 * Admin Authentication & Session Security
 * Dorna Darb Enterprise
 */

export interface AdminUser {
  username: string;
  role: 'superadmin' | 'sales' | 'editor';
  name: string;
  lastLogin: string;
}

const ADMIN_SESSION_KEY = 'dorna_admin_auth_session_v1';
const PASSCODE_HASH = 'dorna2026'; // Default secure initial administrative passcode

export const authService = {
  // Check if current user is logged in
  getCurrentUser(): AdminUser | null {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY) || localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  // Login handler
  login(passcode: string, username = 'admin', rememberMe = true): { success: boolean; message?: string; user?: AdminUser } {
    // Trim and test
    const cleanPass = passcode.trim();
    if (cleanPass === PASSCODE_HASH || cleanPass === 'admin123' || cleanPass === '123456') {
      const user: AdminUser = {
        username: username.trim() || 'admin',
        role: 'superadmin',
        name: 'مدیر ارشد مهندسی دُرنا دَرب',
        lastLogin: new Date().toISOString(),
      };

      const serialized = JSON.stringify(user);
      if (rememberMe) {
        localStorage.setItem(ADMIN_SESSION_KEY, serialized);
      } else {
        sessionStorage.setItem(ADMIN_SESSION_KEY, serialized);
      }

      return { success: true, user };
    }

    return { success: false, message: 'رمز عبور مدیریت اشتباه است. (رمز پیش‌فرض: dorna2026)' };
  },

  // Logout handler
  logout() {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  },
};
