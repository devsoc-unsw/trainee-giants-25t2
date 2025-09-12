export const getCookie = () => {
  const cookieFields = document.cookie.split("; ");
  const uidField = cookieFields.find((field: string) => field.startsWith("uid="));
  if (uidField) return uidField.split("=")[1];
}

export const setCookie = (uid: string, expirationDate: Date) => {
  document.cookie = `uid=${uid}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict; Secure`;
}

export const deleteCookie = (uid: string) => {
  document.cookie = `uid=${uid}; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; SameSite=Strict; Secure`;
}