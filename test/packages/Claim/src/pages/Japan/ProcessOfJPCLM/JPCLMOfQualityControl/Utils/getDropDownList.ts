import lodash from 'lodash';
import { DropDown, DocumentCategory, Category } from '../Enum';
import type { DocumentProps } from '../Typings';

export const getDiagnosisInsurance = (documentTypeCode: string) =>
  `CapabilitytoClaim_${documentTypeCode}`;

export default (formDataListMap: any = {}) => {
  return lodash
    .values(formDataListMap)
    .reduce((arrs, current: DocumentProps) => {
      const {
        formData: { documentTypeCode },
      } = current;
      const curCategory: string = DocumentCategory[documentTypeCode];
      const DropDownArrs = DropDown[curCategory] || [];
      if (Category.DiagnosisReport === curCategory) {
        DropDownArrs.push(getDiagnosisInsurance(documentTypeCode));
      }
      return lodash.uniq(arrs.concat(DropDownArrs));
    }, [])
    .concat(DropDown.Common);
};
