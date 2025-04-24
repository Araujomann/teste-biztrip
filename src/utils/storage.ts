export const storage = {
  saveToken: (token: string) => {
    localStorage.setItem('@biztrip:token', token);
  },

  getToken: (): string | null => {
    return localStorage.getItem('@biztrip:token');
  },
  removeToken: () => {
    localStorage.removeItem('@biztrip:token');
  },
};
