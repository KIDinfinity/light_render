import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import { getProcedureList } from 'claim/pages/utils/selector';

const UNIT = 'day';

const validateDuplicateProcedure = (prestate: any, payload) => {
  const { procedureId } = payload;
  const state = lodash.cloneDeep(prestate);
  const { procedureListMap } = state.claimEntities;
  const { operationDateString, procedureCode, treatmentId } = procedureListMap[procedureId];
  const procedureList = getProcedureList(treatmentId, procedureListMap, 'operationDateString');
  const existProcedure = lodash.filter(procedureList, (item) => item.id !== procedureId);

  const finalProcedureCode = {
    value: formUtils.queryValue(procedureCode),
    name: 'procedureCode',
    touched: true,
    dirty: false,
    errors: undefined,
    validating: false,
  };
  lodash.map(existProcedure, (item) => {
    if (
      item.procedureCode === formUtils.queryValue(procedureCode) &&
      moment(item.operationDate).isSame(formUtils.queryValue(operationDateString), UNIT)
    ) {
      finalProcedureCode.errors = [
        {
          message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000091' }),
          field: 'procedureCode',
        },
      ];
    }
  });
  state.claimEntities.procedureListMap[procedureId].procedureCode = finalProcedureCode;

  return state;
};

export default validateDuplicateProcedure;
