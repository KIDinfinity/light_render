import lodash from 'lodash';
import { transCodesToNames } from '@/utils/dictFormatMessage';

const internationalization = (type, dataSource) => {
  switch (type) {
    case 'city': {
      const typeCode = 'DropDown_INF_City';
      return lodash.map(dataSource, (item) => ({
        dictCode: item.cityDescription,
        dictName: transCodesToNames(item.cityCode, typeCode),
        typeCode,
        postalCode: item.postalCode,
      }));
    }
    case 'postal': {
      const typeCode = 'DropDown_INF_PostCode';
      return lodash.map(dataSource, (item) => ({
        dictCode: item.postalCode,
        dictName: transCodesToNames(item.postalCode, typeCode),
        typeCode,
      }));
    }
  }
};
export { internationalization };
