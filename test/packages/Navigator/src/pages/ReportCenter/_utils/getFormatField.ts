import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const getFormat = (fieldName: string, reportCode: string) => {
  const tempSpecial = formatMessageApi({ Label_COM_ReportCenter: `${reportCode}_${fieldName}` });
  const tempCommon = formatMessageApi({ Label_COM_ReportCenter: fieldName });
  return lodash.isEqual(tempSpecial, `${reportCode}_${fieldName}`) ? tempCommon : tempSpecial;
};

export const getSearchComponent = (searchFieldList: any[] = []) => {
  return lodash
    .chain(searchFieldList)
    .map((item) => ({
      ...item,
      componentCaption: getFormat(item.fieldName, item.reportCode),
    }))
    .value();
};

export const getDropDownList = (dropDownList: any[] = []) => {
  return lodash.map(dropDownList, (item: any) => ({
    dictCode: item.fieldName,
    dictName: getFormat(item.fieldName, item.reportCode),
  }));
};

export const getDataFieldList = (dataFieldList: any[] = []) => {
  return lodash.map(dataFieldList, (item: any) => ({
    ...item,
    fieldCaption: getFormat(item.fieldName, item.reportCode),
  }));
};

export const getColumns = (fieldName: string, reportCode: string) => ({
  title: getFormat(fieldName, reportCode),
  dataIndex: fieldName,
  fieldName,
});

export const hasVisibleField = (dataFieldList: any[] = []) => {
  return lodash.some(dataFieldList, (item: any) => !!item?.visible);
};

export const getDataFieldSection = (dataFieldList: any[] = [], taskNotEditable: boolean) => {
  const dataFieldMap = lodash.groupBy(dataFieldList, (item) =>
    !lodash.isEmpty(item) && item?.section ? item.section : undefined
  );
  return lodash
    .chain(dataFieldMap)
    .keys()
    .orderBy()
    .map((item) => {
      const label = `navigator.configuration.section.${item}`;
      const formatSection = formatMessageApi({ Label_BIZ_Claim: label });
      const section = formatSection !== label ? formatSection : item;
      return {
        section: item !== 'undefined' ? section : false,
        hasVisibleField: hasVisibleField(dataFieldMap[item]),
        dataFieldList: dataFieldMap[item]?.map((el) => ({
          ...el,
          fieldCaption: getFormat(el.fieldName, el.reportCode),
          editable: !taskNotEditable && el.editable,
        })),
      };
    })
    .value();
};
