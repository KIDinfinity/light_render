import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { findDictionaryByTypeCode } from '@/services/miscDictionaryControllerService';

export default async () => {
  const response = await findDictionaryByTypeCode(
    objectToFormData({ typeCode: 'Dropdown_CFG_Currency' })
  );

  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
    return response.resultData;
  }

  return [];
};
