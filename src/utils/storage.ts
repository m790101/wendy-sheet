const key = {
  loginState: "ls",
};

export default {
  set loginState(val) {
    if (val) {
      window.sessionStorage.setItem(key.loginState, val);
    } else {
      window.sessionStorage.removeItem(key.loginState);
    }
  },
  get loginState() {
    const _keyValue = window.sessionStorage.getItem(key.loginState);
    if (_keyValue) {
      return JSON.parse(_keyValue);
    } else {
      return false;
    }
  },
  async getLocalStorage(key: string) {

    const val = window.localStorage.getItem(key);

    try {
      if (val) {
        return JSON.parse(val);
      }
    } catch (error) {
      console.log("storage.getLocalStorage ERROR: " + error);
      return "";
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async setLocalStorage(key: string, val: any) {
    try {
      val = JSON.stringify(val);
    } catch (error) {
      console.log("storage.setLocalStorage ERROR: " + error);
      return "";
    }
    window.localStorage.setItem(key, val);
  },
  async removeLocalStorage(key: string) {
    window.localStorage.removeItem(key);
  },
  key,
};
