import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
export default (virtualFormFieldList, fieldName, changedFields, oldValue, newValue) => {
  if (lodash.isArray(virtualFormFieldList)) {
    const currentVirtualField = virtualFormFieldList.find((ele) => ele.fieldName === fieldName);
    //当前为virtualField，需要封入label, locale_old, locale_new, format, typeCode
    //1.先判断是否是虚拟表单元素，如果不是直接return null
    if (!currentVirtualField) {
      return null;
    }
    //2.当前changedFields
    const currentChangedField = lodash.find(changedFields, (field) => {
      const { __change } = field;
      return __change?.name === fieldName;
    });
    if (currentChangedField) {
      return currentChangedField;
    }
    //当前为未被changedFields捕获的diff(无法确定是否有locale)
    const { label, format, typeCode, dictTypeCode, dictCode } = currentVirtualField;
    let finalLabel = label;
    if (dictTypeCode && dictCode) {
      finalLabel = formatMessageApi({
        [dictTypeCode]: dictCode,
      });
    }
    return { __change: { label: finalLabel, format, typeCode, locale_old: '', locale_new: '' } };
  }
};
