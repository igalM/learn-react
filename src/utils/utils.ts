const storage = {
    getToken: () => localStorage.getItem("token"),
    setToken: (token: string) => localStorage.setItem("token", token),
    clearToken: () => localStorage.removeItem("token")
};

const withJWTHeaders = (token: string) => ({ Authorization: `Bearer ${token}` });

export { storage, withJWTHeaders };