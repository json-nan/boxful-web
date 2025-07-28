export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    }

    return false;
  } catch (error) {
    // If we can't decode the token, consider it invalid/expired
    return true;
  }
};

export const isTokenValid = (token: string | null): boolean => {
  if (!token || token.trim() === "") {
    return false;
  }

  return !isTokenExpired(token);
};
