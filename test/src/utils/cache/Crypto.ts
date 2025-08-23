/**
 * 加密工具
 */
import CryptoJS from 'crypto-js';
import { Env } from '@/components/Tenant/constants';

declare const NODE_ENV: any;
const currentNodeEnv = typeof NODE_ENV !== 'undefined' ? NODE_ENV : null;

const password = 'fwd-venus';

window.CryptoJS = {
  decrypt: (key: string) => {
    const value = sessionStorage.getItem(key) || localStorage.getItem(key);
    return CryptoJS.AES.decrypt(value, password).toString(CryptoJS.enc.Utf8);
  },
};

class Crypto {
  // 加密
  encrypt(key: string) {
    const newkey = typeof key === 'string' ? key : JSON.stringify(key);
    return currentNodeEnv === Env.Development
      ? newkey
      : CryptoJS.AES.encrypt(newkey, password).toString();
  }
  // 解密
  decrypt(key: any) {
    try {
      return currentNodeEnv === Env.Development
        ? key
        : CryptoJS.AES.decrypt(key, password).toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return key;
    }
  }
}
export default new Crypto();
