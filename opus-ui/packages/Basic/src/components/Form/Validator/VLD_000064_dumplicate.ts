import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

// 验证事故受付-请求书受付，证券番号是否重复，如果有重复的，将重复的番号返回
export const VLD_000064 = (applicationListMap = {}) => {
  const policyNoRecipientNameArr: any = [];
  // 遍历，获取所有组合的值，放入数组
  if (applicationListMap) {
    const applicationArray = Object.entries(applicationListMap);
    lodash.forEach(applicationArray, (item: any) => {
      const policyNoArray = formUtils.queryValue(item[1].policyNoArray);
      const recipientName = formUtils.queryValue(item[1].recipientName);
      lodash.forEach(policyNoArray, (policyNo) => {
        policyNoRecipientNameArr.push(`${policyNo}-${recipientName}`);
      });
    });

    // 遍历数组，统计各个值的数量
    const policyObj = {};
    policyNoRecipientNameArr.forEach((item: any) => {
      if (policyObj[item]) {
        policyObj[item] += 1;
      } else {
        policyObj[item] = 1;
      }
    });
    // 判断各个值的数量，如果数量大于1，则认为是重复的值
    let formatMessageStr = '';
    lodash.mapKeys(policyObj, (val, key) => {
      if (val > 1) {
        formatMessageStr += `${key},`;
      }
    });
    // 如果有重複的值，返回番號-先宛名，如果沒有返回空字符串，ui會判斷如果為''，不顯示提示
    if (formatMessageStr !== '') {
      // 將重複值字符串轉換為數組，分別獲取番號和先宛名，拼接為新的字符串
      formatMessageStr = formatMessageStr.substr(0, formatMessageStr.length - 1);
      const formatMessageStrArr = formatMessageStr.split(',');
      let formatMessageArg = ` - ${formatMessageApi({
        Label_BIZ_Claim: 'app.claim.recipientName',
      })}`;
      formatMessageStrArr.forEach((item) => {
        const itemArr = item.split('-');
        formatMessageArg += `${itemArr[0]} - ${itemArr[1]}, `;
      });
      formatMessageArg = formatMessageArg.substr(0, formatMessageArg.length - 2);
      return formatMessageArg;
    }
  }
  return '';
};
