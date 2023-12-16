import CryptoJS from 'crypto-js'

interface StorageReturn {
  setStorage(
    key: string,
    value: any,
    expire?: number,
    isEncrypt?: boolean,
    type?: 'localStorage' | 'sessionStorage',
  ): boolean | never
  getStorage(
    key: string,
    isEncrypt?: boolean,
    type?: 'localStorage' | 'sessionStorage',
  ): any
  getAllStorage(type?: 'localStorage' | 'sessionStorage'): any
  removeStorage(
    key: string,
    type?: 'localStorage' | 'sessionStorage',
  ): void | never
  clearStorage(type?: 'localStorage' | 'sessionStorage'): void
}

class Store implements StorageReturn {
  // 十六位十六进制数作为密钥
  #SECRET_KEY = CryptoJS.enc.Utf8.parse('231216chstorages')
  // 十六位十六进制数作为密钥偏移量
  #SECRET_IV = CryptoJS.enc.Utf8.parse('chstorages231216')
  // storage 的 key 前缀
  #prefix = 'ch-utils-storage'

  /**
   * @description 加密
   * @param data 接收需要加密的内容
   * @return 返回加密后的字符串
   */
  private encrypt(data: object | string): string {
    if (typeof data === 'object') {
      try {
        data = JSON.stringify(data)
      } catch (e) {
        throw new Error('encrypt error' + e)
      }
    }
    const dataHex = CryptoJS.enc.Utf8.parse(data)
    const encrypted = CryptoJS.AES.encrypt(dataHex, this.#SECRET_KEY, {
      iv: this.#SECRET_IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })

    return encrypted.ciphertext.toString()
  }

  /**
   * @description 解密
   * @param data 接收需要解密的内容
   * @return 返回解密后的字符串
   */
  private decrypt(data: string): string {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(data)
    const str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    const decrypt = CryptoJS.AES.decrypt(str, this.#SECRET_KEY, {
      iv: this.#SECRET_IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)

    return decryptedStr.toString()
  }

  /**
   * @description 自动添加前缀
   * @param key 接收需要添加前缀的字符串
   * @return 返回已添加前缀的字符串
   */
  private autoAddPreFix(key: string): string {
    return `${this.#prefix}_${key}`
  }

  /**
   * @description 存储 storage
   * @param key 要存储的 storage 的 key
   * @param value 要存储的 storage 的 value
   * @param expire 要存储的 storage 的过期时间，单位为分钟
   * @param isEncrypt 是否要对存储的 storage 进行加密
   * @param type 要存储的 storage 的类型
   * @return 返回添加成功或添加失败标识
   */
  setStorage(
    key: string,
    value: any,
    expire: number = 24 * 60,
    isEncrypt: boolean = true,
    type: 'localStorage' | 'sessionStorage' = 'localStorage',
  ): boolean | never {
    if (typeof key !== 'string') throw new Error('Key must be a string')
    if (value === '' || value === null || value === undefined) value = null
    if (isNaN(expire) || expire < 0) throw new Error('Expire must be a number')
    const data = {
      value,
      expire: Date.now() + 1000 * 60 * expire,
      isEncrypt,
    }
    // 是否需要加密，判断装载加密数据或原数据
    window[type].setItem(
      this.autoAddPreFix(key),
      isEncrypt ? this.encrypt(JSON.stringify(data)) : JSON.stringify(data),
    )
    return true
  }

  /**
   * @description 获取存储的 storage
   * @param key 要获取的 storage 的 key
   * @param isEncrypt 是否要对获取的 storage 进行解密
   * @param type 要获取的 storage 的类型
   * @return 返回获取的值
   */
  getStorage(
    key: string,
    isEncrypt: boolean = true,
    type: 'localStorage' | 'sessionStorage' = 'localStorage',
  ): any {
    if (typeof key !== 'string') throw new Error('Key must be a string')
    key = this.autoAddPreFix(key)
    if (!window[type].getItem(key)) return null
    const isOriginEncrypt = !!this.decrypt(window[type].getItem(key) as string)
    const storageVal = isOriginEncrypt
      ? isEncrypt
        ? JSON.parse(this.decrypt(window[type].getItem(key) as string))
        : JSON.parse(window[type].getItem(key) as string)
      : JSON.parse(window[type].getItem(key) as string)
    const now = Date.now()
    if (now >= storageVal.expire) {
      this.removeStorage(key)
      return null
    } else {
      return isOriginEncrypt
        ? isEncrypt
          ? storageVal.value
          : storageVal
        : storageVal.value
    }
  }

  /**
   * @description 获取所有存储的 storage
   * @param type 要获取的 storage 的类型
   * @return 返回所有存储的 storage
   */
  getAllStorage(type: 'localStorage' | 'sessionStorage' = 'localStorage'): any {
    const storageList: any = {}
    const keys = Object.keys(window[type])
    keys.forEach((key: string) => {
      if (key.includes(this.#prefix)) {
        const storageVal = this.decrypt(window[type].getItem(key) as string)
          ? JSON.parse(this.decrypt(window[type].getItem(key) as string))
          : JSON.parse(window[type].getItem(key) as string)
        storageList[key] = storageVal.value!
      }
    })
    return storageList
  }

  /**
   * @description 删除指定 key 的 storage
   * @param key 要删除的 storage 的 key
   * @param type 要删除的 storage 的类型
   */
  removeStorage(
    key: string,
    type: 'localStorage' | 'sessionStorage' = 'localStorage',
  ): void | never {
    if (typeof key !== 'string') throw new Error('Key must be a string')
    key = this.autoAddPreFix(key)
    window[type].removeItem(key)
  }

  /**
   * @description 清空 storage
   * @param type 要清空的 storage 的类型
   */
  clearStorage(type: 'localStorage' | 'sessionStorage' = 'localStorage'): void {
    window[type].clear()
  }
}

export const storage = new Store()
