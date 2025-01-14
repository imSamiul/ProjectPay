export function setAccessToken(token: string) {
  localStorage.setItem('accessToken', token);
}
export function getAccessToken() {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }
  return token;
}
export function clearAccessToken() {
  localStorage.removeItem('accessToken');
}
