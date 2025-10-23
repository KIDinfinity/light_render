import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import timeUtil from '@/utils/time';

export default function* (action: any, { select, put }) {
  const { policyInfo, selectedTransactionTypes, transactionTypes } = yield select((state) => ({
    ...lodash.pick(state?.batchCreateProcess, [
      'policyInfo',
      'selectedTransactionTypes',
      'transactionTypes',
    ]),
  }));
  const { posRequestInformation } = lodash.pick(policyInfo, ['posRequestInformation']);
  const posTransactionTypes = lodash
    .chain(transactionTypes)
    .filter((item) => lodash.includes(selectedTransactionTypes, item.id))
    .map((item) => lodash.pick(item, ['caseCategory', 'transactionTypeCode', 'slaLevel']))
    .value();
  const {
    submissionTime,
    submissionDate,
    submissionChannel,
    policyNo,
  } = lodash.pick(formUtils.cleanValidateData(posRequestInformation), [
    'submissionDate',
    'submissionTime',
    'submissionChannel',
    'policyNo',
  ]);
  const date = formUtils.queryValue(submissionDate);
  const time = formUtils.queryValue(submissionTime);
  const dateTime = `${moment(date).format('YYYY-MM-DD')}T${moment(time).format('HH:mm:ss')}`;
  const datePost = `${timeUtil.formatWithTimeZone({
    time: dateTime,
    format: 'YYYY-MM-DDTHH:mm:ss',
  })}`;

  return {
    posTransactionTypes,
    submissionDate: datePost,
    submissionChannel,
    policyNo,
  };
}
