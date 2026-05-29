const ADMIN_AUTH_KEY = 'ocray-admin-session';

export const ADMIN_CREDENTIALS = {
  email: 'ocray@admin.com',
  password: 'ocray123',
};

export function loginAdmin(email, password) {
  const isValid =
    email.trim().toLowerCase() === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password;

  if (isValid) {
    window.localStorage.setItem(ADMIN_AUTH_KEY, 'true');
  }

  return isValid;
}

export function logoutAdmin() {
  window.localStorage.removeItem(ADMIN_AUTH_KEY);
}

export function isAdminAuthenticated() {
  return window.localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
}
