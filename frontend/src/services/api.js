const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://demo-backend-re6k.onrender.com').replace(/\/$/, '');

export const getAuthToken = () => {
  try {
    return localStorage.getItem('styleaura_token');
  } catch {
    return null;
  }
};

export const setAuthToken = (token) => {
  try {
    if (token) {
      localStorage.setItem('styleaura_token', token);
    } else {
      localStorage.removeItem('styleaura_token');
    }
  } catch (e) {
    console.error('Failed to update auth token', e);
  }
};

export async function apiRequest(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      (data && typeof data === 'object' && (data.message || data.error)) ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}
