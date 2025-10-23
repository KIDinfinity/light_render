import lodash, { chain } from 'lodash';
import AuditConfig from 'claim/pages/auditLog.config';
import { getVirtualFormChangedField } from './index.ts';
import { transformChangedFields } from './index.ts';

const fieldNameTransferList = [
  {
    path: 'payeeList.payeeContactList',
    telNo: 'phoneNo',
  },
  {
    path: 'incidentList.treatmentList.invoiceList.serviceItemList',
    serviceItem: 'procedureType',
  },
];
//针对有的fieldName匹配但是value不匹配，拿到错误changedField，配置到下面list将强制value也得相等
const needValueEqualList = ['ctfStartDate', 'fundAllocation', 'ctfCountryCode', 'reason'];
const handleFieldTransfer = (fieldName, path, isNeedHandleMap) => {
  let currentFieldName = '';
  if (isNeedHandleMap) {
    currentFieldName = isNeedHandleMap?.[fieldName];
  }
  return currentFieldName;
};
// 在claimData里存在changedField传过来的数据
export default (
  claimData: any = {},
  changedFields: any[] = [],
  fieldName: string,
  path: string,
  currentController: string,
  oldValue: any,
  newValue: any
) => {
  const simplifyPath = path?.replace(/\[\d+\]/g, '');
  const claimValues = lodash.values(claimData);
  const changedFieldsAfter = transformChangedFields({
    changedFields,
    currentController,
    simplifyPath,
  });
  //针对需要fieldMap的字段，得到一个flag，需要特定的path和fieldName完全一致，fieldNameTransferList配置
  const isNeedHandleMap = lodash.find(
    fieldNameTransferList,
    (ele) => ele.path === simplifyPath && ele?.[fieldName]
  );
  const isNeedValueEqual = needValueEqualList.includes(fieldName);
  const fullMatchField = lodash.find(
    changedFieldsAfter,
    (field) => fieldName === field?.__change.name
  )?.__change?.name;
  //校验是否虚拟表单
  const virtualFormFieldList = chain(AuditConfig)
    .find({ namespace: currentController })
    .get('virtualFormFieldList')
    .value();
  if (virtualFormFieldList && virtualFormFieldList.length > 0) {
    const curVirtualFormField = getVirtualFormChangedField(
      virtualFormFieldList,
      fieldName,
      changedFieldsAfter,
      oldValue,
      newValue
    );
    if (curVirtualFormField) {
      return curVirtualFormField;
    }
  }
  return (
    claimData &&
    lodash.find(changedFieldsAfter, (fields: any, index: number, arr: object[]) => {
      const { __change, validating, mapIndex, ...res } = fields;
      const matches = path.match(/\[(\d+)\]/);
      const indexInPath = matches?.[1];
      let matchField =
        fieldName?.includes(__change?.name) || __change?.name?.match?.(/^.+_[0-9]+$/); // 临时处理name与实际有出入的问题
      matchField = matchField ? matchField : handleFieldTransfer(fieldName, path, isNeedHandleMap);
      const matchData =
        !(isNeedHandleMap || isNeedValueEqual) &&
        (lodash.isEmpty(res) ||
          lodash.some(
            lodash.values(res),
            (value: any) => value && lodash.includes(claimValues, value)
          ) ||
          res?.virtualFormFieldList?.includes(fieldName));
      let matchValue;
      if (isNeedHandleMap) {
        matchValue = claimData[fieldName] === __change?.value;
        return matchField && (matchData || matchValue);
      } else {
        matchValue = claimData[__change?.name] === __change?.value;
        if (lodash.isArray(__change?.errors) && __change?.errors?.length > 0) {
          //changedField存在errorId时向后匹配changedField（MUW的fund第一个会误匹配errorChangedField）
          matchValue = false;
        }
        //针对list类型不能使用===
        if (
          __change?.value &&
          lodash.isArray(__change?.value) &&
          lodash.isArray(claimData[__change?.name])
        ) {
          matchValue = lodash.isEqual(
            lodash.sortBy(claimData[__change?.name]),
            lodash.sortBy(__change?.value)
          );
          //list为空的时候claimData没有这个属性
          if (__change?.value.length === 0 && claimData[__change?.name] === undefined) {
            matchValue = true;
          }
        }
      }
      //针对includes做的兼容，存在完全匹配changeField，但是当前字段不匹配，则继续往下寻找
      if (fullMatchField && fullMatchField !== __change?.name) {
        return null;
      }
      //claimData存在完全匹配的字段，但是changeFields里面不存在，不应该进入log
      if (!fullMatchField && Object.keys(claimData)?.includes(fieldName)) {
        return null;
      }
      return (
        matchField &&
        (matchData || matchValue) &&
        (mapIndex === undefined || mapIndex == indexInPath) // 解决列表中修改多个同名同值字段时可能出现的覆盖问题
      );
    })
  );
};
