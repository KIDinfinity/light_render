export default function (url: string = '', winName?: string = '_blank', feature?: string) {
  if (!feature) {
    const width = 600;
    const height = 400;
    const top = window.screen.availTop + window.screen.availHeight / 2 - height / 2;
    const left = window.screen.availLeft + window.screen.availWidth / 2 - width / 2;
    const winFeature = `
      top=${top},
      left=${left},
      width=${width},
      height=${height},
      menubar=0,
      status=0,
    `;
    feature = winFeature;
  }
  window.open(url, winName, feature);
}
