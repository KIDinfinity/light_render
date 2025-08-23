import lodash from 'lodash';
import moment from 'moment';
import { cleanFieldsMeta } from 'claim/pages/utils/formUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

const UNIT = 'day';

export const VLD_000061 = (procedureListMap: any, oldprocedureItem: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const procedureList = cleanFieldsMeta(procedureListMap);
  const procedure = cleanFieldsMeta(oldprocedureItem);
  const { procedureCode, id } = procedure;

  const exist = lodash.some(
    procedureList,
    (procedureItem: any) =>
      lodash.isPlainObject(procedureItem) &&
      id !== procedureItem.id &&
      moment(value).isSame(formUtils.queryValue(procedureItem.operationDate), UNIT) &&
      formUtils.queryValue(procedureItem.procedureCode) === formUtils.queryValue(procedureCode)
  );
  if (formUtils.queryValue(procedureCode) && value && exist) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000091' }));
  }
  callback();
};
