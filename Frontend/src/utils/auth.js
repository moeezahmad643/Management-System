// utils/auth.js

// Save token + user in localStorage
export function login(token, user) {
  localStorage.setItem("authToken", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function getToken() {
  return localStorage.getItem("authToken");
}

export const getUser = () => {
  try {
    const data = localStorage.getItem("user");
    if (!data || data === "undefined") return null; // guard
    return JSON.parse(data);
  } catch (e) {
    console.error("Invalid user JSON:", e);
    return null;
  }
};

export function isLoggedIn() {
  return !!getToken();
}


export const getAuth = () => {
  const user = getUser();
  return user ? { ...user, token: getToken() } : null;
};

export function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
}
