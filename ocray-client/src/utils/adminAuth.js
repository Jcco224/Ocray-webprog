export function getUserType() {
  return String(window.localStorage.getItem('type') || '').toLowerCase();
}

export function isAdminAuthenticated() {
  const token = window.localStorage.getItem('token');
  const userType = getUserType();
  return Boolean(token) && userType !== 'viewer';
}

export function canAccessUsersPage() {
  return getUserType() === 'admin';
}

export function logoutAdmin() {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('firstName');
  window.localStorage.removeItem('type');
}
