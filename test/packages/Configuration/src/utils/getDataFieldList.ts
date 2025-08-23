import lodash from 'lodash';
import { FunctionCode } from 'configuration/constant';

export default ({ dataFieldList, functionCode }: any) => {
  const hasVersionName = lodash.some(dataFieldList, (el) => el.fieldName === 'new_version_name');
  if (
    !hasVersionName &&
    functionCode === FunctionCode.Fun_venus_claim_plan_jp_standard_advanced_medical
  ) {
    dataFieldList.push({
      ...dataFieldList[0],
      componentType: 'text',
      fieldName: 'new_version_name',
      section: 'versionInformation',
      visible: true,
      editable: true,
      whereCriteria: true,
    });
  }
  return dataFieldList;
};
