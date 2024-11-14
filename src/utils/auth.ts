import Cookies from "js-cookie";

export function setAuthToken(token: string) {
  Cookies.set("token", token, { expires: 7 });
}
export function getAuthToken() {
  const token = Cookies.get("token");
  if (!token) {
    return null;
  }
  return token;
}

export function setTemporaryToken(token: string) {
  Cookies.set("temporaryToken", token, { expires: (1 / 1440) * 5 });
}
export function getTemporaryToken() {
  const token = Cookies.get("temporaryToken");
  if (!token) {
    return null;
  }
  return token;
}

export function removeAuthToken() {
  Cookies.remove("token");
}
