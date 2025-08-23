import { useState, useEffect } from 'react';
import lodash from 'lodash';
import { findDictionaryByTypeCodes } from '@/services/miscDictionaryControllerService';

export default (typeCode: string) => {
  const [dicts, setDicts] = useState<any[]>([]);
  const getDict = async () => {
    const response = await findDictionaryByTypeCodes([typeCode]);
    if (lodash.isArray(response?.resultData?.[typeCode])) {
      setDicts(response.resultData[typeCode]);
    }
  };

  useEffect(() => {
    getDict();
  }, [typeCode]);

  return dicts;
};
