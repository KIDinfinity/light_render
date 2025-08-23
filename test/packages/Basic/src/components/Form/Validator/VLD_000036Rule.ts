import lodash from 'lodash';

/**
 * 日本事故受付节点Policy length checking
 * 长度只能10/11/12位,
 * 如果长度是11/12位，第一位一定是半角字符「オ」Or「イ」Or「ウ」Or「タ」，第二位以后一定是半角数值型,
 * 如果长度10位，一定都是半角数值型
 */
export const VLD_000036Rule = (value: any) => {
  let isCheckSuccess = true;
  if (!lodash.isString(value) || value === '') {
    isCheckSuccess = false;
  }
  const minLength = 10;
  const maxLength = 12;
  const checkFirstCharacterMinLength = 11;
  const checkFirstCharacterMaxLength = 12;
  const policyNoLength = value.length;
  const numberCharacterLength = 10;
  const legalFirstCharacter = ['ｵ', 'ｲ', 'ｳ', 'ﾀ'];
  // 长度小于10
  if (policyNoLength && policyNoLength < minLength) {
    isCheckSuccess = false;
  }
  // 长度大于12
  if (policyNoLength > maxLength) {
    isCheckSuccess = false;
  }
  // 长度在10/11/12之间
  if (
    policyNoLength <= checkFirstCharacterMaxLength &&
    policyNoLength >= checkFirstCharacterMinLength
  ) {
    const firstCharacter = value[0];
    const leftStr = value.slice(1);
    isCheckSuccess = legalFirstCharacter.includes(firstCharacter) && /^[0-9]*$/.test(leftStr);
  }
  // 长度等于10
  if (policyNoLength === numberCharacterLength) {
    isCheckSuccess = /^[0-9]*$/.test(value);
  }

  return isCheckSuccess;
};
