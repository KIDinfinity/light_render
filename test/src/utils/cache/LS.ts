import { safeParse } from './utils';
import Crypto from './Crypto';

/**
 * 工具类 - localStorage
 */
export default {
  constructor() {},

  getIsDictionary(key) {
    const languageReg = /dictionary/i;
    return languageReg.test(key);
  },
  /**
   * 取
   * @param {string} key
   * @param {Boolean} 是否有执行JSON.parse parsed
   * @return {string}
   */
  getItem(key: string, parsed: boolean = true) {
    if (!key) {
      return null;
    }
    if (!localStorage.getItem(key)) return null;
    let value = '';
    if (this.getIsDictionary(key)) {
      value = localStorage.getItem(key);
    } else {
      value = Crypto.decrypt(localStorage.getItem(key));
    }
    if (parsed) {
      return safeParse(value);
    }

    return value;
  },

  /**
   * 存
   * @param {string} key
   * @param {any} value
   */
  setItem(key: string, value: any) {
    if (!key) {
      return;
    }
    try {
      const newValue = typeof value === 'string' ? value : JSON.stringify(value);
      let content = newValue;
      if (!this.getIsDictionary(key)) {
        content = Crypto.encrypt(newValue);
      }
      localStorage.setItem(key, content);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`localStorage.setItem(${key}) failed`, { value, e });
    }
  },

  /**
   * 删
   * @param key
   */
  removeItem(key: string) {
    if (key) {
      localStorage.removeItem(key);
    }
  },

  /**
   * 清除
   * @param key
   */
  clear() {
    localStorage.clear();
  },

  /**
   * 保存到 localStorage，并设置过期时间
   * @param key 键名
   * @param value 值
   * @param ttl 过期时间（毫秒）
   */
  setWithExpiry(key: string, value: any, ttl: number): void {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    this.setItem(key, JSON.stringify(item));
  },

  /**
   * 从 localStorage 获取数据，检查是否过期
   * @param key 键名
   * @returns 数据值或 null（如果已过期）
   */
  getWithExpiry(key: string): any | null {
    const item = this.getItem(key);
    const now = new Date();

    // 检查是否过期
    if (now.getTime() > item?.expiry) {
      this.removeItem(key);
      return null;
    }

    return item?.value || null;
  },
};
