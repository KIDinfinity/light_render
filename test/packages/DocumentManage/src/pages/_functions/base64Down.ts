/**
 * 下载base64
 */
class Base64Down {
  /**
   * 初始化方法
   * @param base64
   * @param name
   */
  // eslint-disable-next-line class-methods-use-this
  init(base64: string, name: string) {
    const myBlob = this.dataURLtoBlob(base64);
    const myUrl = URL.createObjectURL(myBlob);
    this.downloadFile(myUrl, name);
  }

  /**
   * 转化为blob
   */
  // eslint-disable-next-line class-methods-use-this
  dataURLtoBlob(base64: string) {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  /**
   * 下载
   */
  // eslint-disable-next-line class-methods-use-this
  downloadFile(url: any, name: string) {
    const aDom = document.createElement('a');
    aDom.setAttribute('href', url);
    aDom.setAttribute('download', name);
    aDom.setAttribute('target', '_blank');
    const clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('click', true, true);
    aDom.dispatchEvent(clickEvent);
  }
}

export default new Base64Down();
