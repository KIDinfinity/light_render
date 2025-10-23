export const isArrayString = (value) => {
  let bool = false;
  if (
    typeof value === 'string' &&
    value.indexOf('[') === 0 &&
    value.indexOf(']') === value.length - 1
  ) {
    bool = true;
  }
  return bool;
};

export const testFullWidthString = (text: string) => {
  // eslint-disable-next-line no-control-regex
  const r = new RegExp(/[^\x00-\xff|\uff61-\uff9f]/, 'gi');
  return r.test(text);
};

/**
 * 驼峰转下划线
 * @param {String} text
 */
export const humptoLine = (text: string) => {
  return text.replace(/([A-Z])/g, '_$1').toLowerCase();
};
