import { formUtils } from 'basic/components/Form';

// 薬剤治療種類 is selected，薬剤名 is null
export const VLD_000114 = (publicInsurance: any) => formUtils.queryValue(publicInsurance) === '01';
