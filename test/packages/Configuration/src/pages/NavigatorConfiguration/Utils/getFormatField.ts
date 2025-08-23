import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { DataImageField } from 'configuration/pages/ConfigurationCenter/Utils/Constant';

export const getFormat = (fieldName: string) => {
  const label = `configuration.label.fieldName.${lodash.camelCase(fieldName)}`;
  const formatName = formatMessageApi({ Label_BIZ_Claim: label });
  return lodash.isEqual(formatName, label) ? fieldName : formatName;
};

export const getSearchComponent = (searchComponentList: any[] = []) => {
  return lodash
    .chain(searchComponentList)
    .filter((item: any) => item.newPageComponent)
    ?.map((item) => ({
      ...item,
      componentCaption: getFormat(item.fieldName),
    }))
    .value();
};

export const getDataFieldList = (dataFieldList: any[] = []) => {
  return lodash.map(dataFieldList, (item: any) => ({
    ...item,
    fieldCaption: getFormat(item.fieldName),
  }));
};

export const getColumns = (key: any) => ({
  title: getFormat(key),
  dataIndex: key,
  key,
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
      const newDataFieldList = dataFieldMap[item]?.map((el) => ({
        ...el,
        fieldCaption: getFormat(el.fieldName),
        editable: !taskNotEditable && el.editable,
        visible: lodash.includes(DataImageField, el.fieldName) ? false : el.visible,
      }));
      return {
        section: item !== 'undefined' ? section : false,
        hasVisibleField: hasVisibleField(newDataFieldList),
        dataFieldList: newDataFieldList,
      };
    })
    .value();
};
