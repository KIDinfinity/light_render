import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import { tranferResult } from 'configuration/pages/ConfigurationCenter/Utils/Transfer';
import ErrorCode from 'claim/enum/ErrorCode';
import { checkDuplicate, getObjectData } from 'configuration/utils';
import { getBasicData } from 'configuration/config';

class Validator {
  VLD_000267 = ({ formData, rows, functionData, key, transfer = true }: any) => (
    rule: any,
    value: any,
    callback: Function
  ) => {
    const { functionCode } = functionData;
    const handledFormData = lodash.set(formData, getBasicData(functionCode, key), value);
    const formDataTemp: any = getObjectData(formUtils.cleanValidateData(handledFormData));
    const newFormData = transfer
      ? tranferResult(functionData?.dataFieldList, formDataTemp, true)
      : formDataTemp;
    const filterRows = lodash
      .filter(rows, (item) => item?.cc_key !== formDataTemp?.cc_key)
      .map((item) => ({ ...item, ...item?.data }));
    const { isDuplicate, duplicateKeys } = checkDuplicate({
      functionData,
      changeData: filterRows,
      compareData: [newFormData],
    });
    if (isDuplicate && duplicateKeys?.includes(key)) {
      callback(
        formatMessageApi({
          Label_COM_WarningMessage: ErrorCode.ERR_000247,
        })
      );
    }

    callback();
  };
}

export const { VLD_000267 } = new Validator();
