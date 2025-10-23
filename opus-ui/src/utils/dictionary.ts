import lodash from 'lodash';
import miscDictionaryControllerService from '@/services/miscDictionaryControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import { tenant } from '@/components/Tenant';

declare const window: any;

class Dictionay {
  getLanguage = () => {
    return tenant.getLocaleLang();
  };

  getDictionaryByTypeCode = (typeCode: string = '') => {
    return lodash.get(window.dictionary, typeCode);
  };

  getDictionaryByTypeCodes = (typeCodes: string[] = []) => {
    const needToCall = lodash.filter(
      typeCodes,
      (code: string) => !lodash.has(window.dictionary, code)
    );
    const dictionary =
      needToCall.length !== typeCodes.length
        ? (lodash.chain(window.dictionary) as any).pick(typeCodes).value()
        : {};
    return {
      needToCall,
      dictionary,
    };
  };

  /**
   * 根据typecode 返回字典数组
   * @param {string} object.typeCode
   * @return {array}
   */
  getDictionaryArrayByTypeCode = ({ typeCode = '', language }: any) =>
    lodash
      .chain(window.dictionary[typeCode])
      .toPairs()
      .map(([key, value]) => ({ dictCode: key, dictName: value?.[language] }))
      .filter(({ dictCode, dictName }) => dictCode && dictName)
      .value();

  findDictionaryByTypeCode = async ({ typeCode, signal = null }: any) => {
    let result = [];
    const response = await miscDictionaryControllerService.findDictionariesByTypeCode(
      objectToFormData({
        typeCode,
      }),
      { signal }
    );
    const list = lodash.get(response, 'resultData', []);
    if (lodash.isArray(list)) {
      result = list;
    }
    return result;
  };
}

export const {
  getDictionaryByTypeCode,
  getDictionaryByTypeCodes,
  getDictionaryArrayByTypeCode,
  findDictionaryByTypeCode,
  getLanguage,
} = new Dictionay();
