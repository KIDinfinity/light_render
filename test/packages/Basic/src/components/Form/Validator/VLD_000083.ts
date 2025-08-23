import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

// 受付事案 为高障的时候必须录入 体の被害部分
export const VLD_000083 = (claimTypeArray: any) =>
  lodash.includes(formUtils.queryValue(claimTypeArray), 'TPD');
