import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import getNameByCode from './getNameByCode';
import type { DocumentModel, DropdownConfigureModel, FieldConfigureModel } from '../_dto/model';
import { EToolModules } from '../_dto/enums';

/**
 * 给document设置默认值，以及配置的数据
 * @param documents
 * @param dropdownConfigure
 * @param fieldConfigure
 */
const checkLinkageFields = (
  documents: DocumentModel[],
  dropdownConfigure: DropdownConfigureModel[],
  fieldConfigure: FieldConfigureModel[]
) => {
  return lodash.map(documents, (documentItem: DocumentModel | any) => {
    const docTypeCode = formUtils.queryValue(documentItem?.docTypeCode);
    const { formCategory } = getNameByCode(dropdownConfigure, { docTypeCode }) || {};
    const { indexClass } = getNameByCode(dropdownConfigure, { formCategory }) || {};

    const fields = fieldConfigure[EToolModules.edit];

    const documentNew = lodash.reduce(
      documentItem,
      (result: any, value: string, key: string) => {
        const field = lodash.find(fields, { fieldName: key });
        let tempValue = null;

        const { fieldName, defaultValue } = field || {};
        if (key === fieldName) {
          tempValue = value || defaultValue;
        } else {
          tempValue = value;
        }

        // eslint-disable-next-line no-param-reassign
        result[key] = tempValue;

        return result;
      },
      {}
    );

    return {
      ...documentNew,
      formCategory: formCategory || documentNew.formCategory,
      indexClass: indexClass || documentNew.indexClass,
    };
  });
};

export default checkLinkageFields;
