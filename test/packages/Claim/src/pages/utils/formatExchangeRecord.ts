import { safeParseUtil } from '@/utils/utils';
import { convertRateRecord } from 'claim/pages/utils/handleExchangeRate';
import lodash from 'lodash';

export const formatExchangeRecord = (exchangeRecord: any) => {
  const exchangeRecordData = safeParseUtil(exchangeRecord);
  if (lodash.isArray(exchangeRecordData) && lodash.isEmpty(exchangeRecordData)) return null;
  if (lodash.isArray(exchangeRecordData)) {
    const newRecord = convertRateRecord(exchangeRecordData);
    return lodash.join(newRecord, ',');
  }
  return exchangeRecord;
};

export default formatExchangeRecord;
