import { ESelectFields, ETypeCodes } from '../_dto/enums';

/**
 * 获取可能需要国际化的field的type code
 *
 * 若需要新增，可继续添加需要做国际化的field判断
 * @param fieldName
 */
const getTypeCode = (fieldName: string): string => {
  if (fieldName === ESelectFields.formCategory) {
    return ETypeCodes.FormCategory;
  }

  if (fieldName === ESelectFields.docTypeCode) {
    return ETypeCodes.DocTypeCode;
  }

  return '';
};

export default getTypeCode;
