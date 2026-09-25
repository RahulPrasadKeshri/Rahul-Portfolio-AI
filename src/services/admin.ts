import { AdminAuthState } from './firebase';

const ADMIN_STORAGE_KEY = 'rahul_portfolio_admin_auth';

export function getAdminAuthState(): AdminAuthState {
  try {
    const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Could not read admin state', e);
  }
  return {
    isAuthenticated: false,
    userEmail: null,
    role: 'guest',
  };
}

export function saveAdminAuthState(state: AdminAuthState) {
  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save admin state', e);
  }
}

export function clearAdminAuthState() {
  try {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  } catch (e) {
    console.warn('Could not clear admin state', e);
  }
}

// Simple password / passphrase verification for the administrative console
export function verifyAdminPasscode(code: string): boolean {
  // Developer override passcode for testing the administration panel
  return code.trim().toLowerCase() === 'system-override' || code.trim() === 'rahul2026';
}
