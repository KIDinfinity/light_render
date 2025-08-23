import moment from 'moment';
import { isMomentObject } from '@/utils/inqueryUtils';
import lodash from 'lodash';

const rangeDateTransferParams = (formData: any) => {
  const newFormData = Object.keys(formData).reduce((pre, cur) => {
    // 是range并且是数组,转换日期格式
    const output = { ...pre };
    const el = formData[cur];
    if (isMomentObject(el)) {
      if (lodash.isArray(el) && el.length > 0) {
        output[`${cur}From`] = el[0] ? moment(el[0]).format('DD/MM/YYYY') : '';
        output[`${cur}To`] = el[1] ? moment(el[1]).format('DD/MM/YYYY') : '';
      } else {
        output[cur] = el ? moment(el).format('L') : '';
      }
    } else {
      output[cur] = el;
    }
    return output;
  }, {});
  return newFormData;

};

export default rangeDateTransferParams;
