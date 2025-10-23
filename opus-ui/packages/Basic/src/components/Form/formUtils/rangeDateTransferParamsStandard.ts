import moment from 'moment';
import { isMomentObject } from '@/utils/inqueryUtils';
import lodash from 'lodash';

const rangeDateTransferParamsStandard = (formData: any) => {
  const newFormData = Object.keys(formData).reduce((pre, cur) => {
    // 是range并且是数组,转换日期格式
    const output = { ...pre };
    const el = formData[cur];
    if (isMomentObject(el)) {
      if (lodash.isArray(el) && el.length > 0) {
        output[`${cur}From`] = el[0] ? moment(el[0]).format('YYYY/MM/DD') : '';
        output[`${cur}To`] = el[1] ? moment(el[1]).format('YYYY/MM/DD') : '';
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

export default rangeDateTransferParamsStandard;
