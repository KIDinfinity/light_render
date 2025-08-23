import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import { isRequestForm, isMcReport, isAllFormListReceived, isShowError } from './documentUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';

enum MathType {
  Min = 'min',
  Max = 'max',
}

const getReceiveDate = ({ formList, type = MathType.Min, name = '', showErrors }: any) => {
  const Func = type === MathType.Min ? lodash.minBy : lodash.maxBy;
  const result = Func(formList, (el: any) => {
    const value = formUtils.queryValue(el[name]);
    return value ? +new Date(value) : value;
  });
  const resultData =
    (type !== MathType.Max || isAllFormListReceived(formList)) && result && result[name]
      ? moment(formUtils.queryValue(result[name])).startOf('day').format()
      : null;
  return showErrors
    ? {
        name,
        touched: true,
        dirty: false,
        value: resultData,
        errors: !resultData
          ? [{ field: name, message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }) }]
          : undefined,
        validating: false,
      }
    : resultData;
};

export default ({ documentList = [], bpoFormDataList }: any) => {
  const target: string[] = lodash.flatten(documentList);
  const formList = lodash.map(target, (documentId: string) => {
    const { receivedDate, applicationFromArrivalDate, documentTypeCode } = lodash.get(
      bpoFormDataList,
      `${documentId}.formData`,
      {}
    );
    return {
      firstFormReceiveDate: isRequestForm(documentTypeCode)
        ? applicationFromArrivalDate
        : receivedDate,
      lastFormReceiveDate: receivedDate,
      firstMcReceiveDate: isMcReport(documentTypeCode) ? receivedDate : null,
    };
  });
  const showErrors = isShowError(formList);
  // 書類受付日
  const firstFormReceiveDate = getReceiveDate({
    formList,
    name: 'firstFormReceiveDate',
    showErrors,
  });
  // 书类完备日
  const lastFormReceiveDate = getReceiveDate({
    formList,
    name: 'lastFormReceiveDate',
    showErrors,
    type: 'max',
  });
  // 诊断书受领日
  const firstMcReceiveDate = getReceiveDate({ formList, name: 'firstMcReceiveDate', showErrors });

  return { firstFormReceiveDate, lastFormReceiveDate, firstMcReceiveDate };
};
