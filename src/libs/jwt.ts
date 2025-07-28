export interface JwtPayload {
  name: string;
  //   eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const decodeJwt = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export const getFromToken = (property: string): string | null => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  const payload = decodeJwt(token);
  return payload?.[property] || null;
};

export const getFullNameFromToken = (): string | null => {
  return `${getFromToken("name") || ""} ${
    getFromToken("last_name") || ""
  }`.trim();
};
