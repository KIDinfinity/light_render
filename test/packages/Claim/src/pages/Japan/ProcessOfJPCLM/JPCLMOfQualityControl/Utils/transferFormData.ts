import lodash from 'lodash';
import { DocumentStatus } from '../Enum';
import setDefaultValue from './setDefaultValue';
import { isRequestForm, isAnnuityForm, getFormArrivalDate } from './documentUtils';

const getClaimType = (claimType: any) =>
  lodash.isString(claimType) && !lodash.isEmpty(claimType) ? claimType.split(',') : claimType;

export default ({ currentData, snapShotData, isCompleteTask, isEmptySnapShot }: any) => {
  const { documentId, documentStatus, documentTypeCode } = currentData;
  const snapShotStatus = lodash.get(snapShotData, 'documentStatus');
  const isRequestFormData = isRequestForm(documentTypeCode);
  const isAnnuiyFormData = isAnnuityForm(documentTypeCode);

  // 是否采用snapShot
  const isUseSnapShot =
    !isEmptySnapShot &&
    !isCompleteTask &&
    snapShotData &&
    !(
      documentStatus !== snapShotStatus &&
      (lodash.toLower(snapShotStatus) === DocumentStatus.P ||
        lodash.toLower(documentStatus) !== DocumentStatus.P)
    );

  // 设置默认值
  const newItem = setDefaultValue(
    isUseSnapShot
      ? {
          ...snapShotData,
          documentStatus,
        }
      : currentData
  );

  let ExtendsData = {};

  // 不用缓存时， 某些字段不直接覆盖
  if (isRequestFormData) {
    if (!isUseSnapShot) {
      ExtendsData = {
        firstPolicyId:
          lodash.get(currentData, 'firstPolicyId') || lodash.get(snapShotData, 'firstPolicyId'),
        claimType:
          getClaimType(lodash.get(currentData, 'claimType')) ||
          getClaimType(lodash.get(snapShotData, 'claimType')),
      };
    } else {
      ExtendsData = {
        claimType: getClaimType(lodash.get(newItem, 'claimType')),
      };
    }
  }

  if (!isUseSnapShot && isAnnuiyFormData) {
    ExtendsData = {
      policyId: lodash.get(currentData, 'policyId') || lodash.get(snapShotData, 'policyId'),
    };
  }

  return lodash.assign(newItem, {
    ...ExtendsData,
    ...getFormArrivalDate({ formData: newItem, documentId }),
  });
};
