export const getCookieUUID = () => {
  const cookieFields = document.cookie.split("; ");
  const uidField = cookieFields.find((field: string) => field.startsWith("user="));
  if (uidField) return uidField.split("=")[1];
}

export const getCookieName = () => {
  const cookieFields = document.cookie.split("; ");
  const uidField = cookieFields.find((field: string) => field.startsWith("user="));
  if (uidField) return uidField.split("=")[2];
}

export const setCookie = (uid: string, name: string, expirationDate: Date) => {
  document.cookie = `user=${uid + "=" + name}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict; Secure`;
}

export const deleteCookie = () => {
  document.cookie = `user=${getCookieUUID() + "=" + getCookieName()}; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; SameSite=Strict; Secure`;
}