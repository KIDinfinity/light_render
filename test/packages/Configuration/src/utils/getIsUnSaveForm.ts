import lodash from 'lodash';
import  getObjectData  from './getObjectData';

export default (claimProcessData: any) => {
  const targetRecord = (lodash.chain(claimProcessData.changeData) as any)
    .find({ cc_key: claimProcessData?.formData?.cc_key })
    .value();
  const isMatchRecord =
    !targetRecord ||
    (targetRecord &&
      !lodash.isEqual(getObjectData(claimProcessData.formData), getObjectData(targetRecord)));
  const isUnSaveForm =
    !claimProcessData?.isUpdateMultiple &&
    !lodash.isEmpty(getObjectData(claimProcessData.formData)) &&
    isMatchRecord;
  return isUnSaveForm;
};