const USER_STORAGE_KEY: string = 'USER_INFO';
export const LOCAL_SERVICE = {
    user: {
        set: (dataLogin: any) =>
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(dataLogin)),
        get: () => {
            let localDataLogin: string|null = localStorage.getItem(USER_STORAGE_KEY);
            return localDataLogin ? JSON.parse(localDataLogin) : null;
        },
        unset: () => localStorage.removeItem(USER_STORAGE_KEY),
      },
}