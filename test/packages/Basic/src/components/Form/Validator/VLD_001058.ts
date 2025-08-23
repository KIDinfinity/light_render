import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';

export const VLD_001058 =
  (editFlag: any, requestDecision: any, riskToleranceLevel: any) =>
  (rule: any, value: any, callback: Function) => {
    if (
      !!editFlag &&
      lodash.includes([DecisionEnum.D, DecisionEnum.A], requestDecision) &&
      ((Number(riskToleranceLevel) === 1 && value > 14) ||
        (Number(riskToleranceLevel) === 2 && (value < 15 || value > 21)) ||
        (Number(riskToleranceLevel) === 3 && (value < 22 || value > 29)) ||
        (Number(riskToleranceLevel) === 4 && (value < 30 || value > 36)) ||
        (Number(riskToleranceLevel) === 5 && value < 37))
    ) {
      callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001158' }));
    }
    callback();
  };
