import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import CustomerRole from 'basic/enum/CustomerRole';

interface IChangeIsInterestMHITClientItem {
  entities: object;
  modalData: object;
}

const findPolicyOwnerClient = (clientMap: object) => {
  return lodash.find(clientMap || {}, (item) => {
    return lodash.includes(
      formUtils.queryValue(item?.personalInfo?.customerRole),
      CustomerRole.PolicyOwner
    );
  });
};

export default ({ entities, modalData }: IChangeIsInterestMHITClientItem) => {
  const oldPolicyOwnerClientItem = findPolicyOwnerClient(entities?.clientMap);
  const newPolicyOwnerClientItem = findPolicyOwnerClient(modalData?.entities?.clientMap);

  const newIsInterestMhit = formUtils.queryValue(
    newPolicyOwnerClientItem?.otherInfo?.isInterestMhit
  );
  const oldIsInterestMhit = formUtils.queryValue(
    oldPolicyOwnerClientItem?.otherInfo?.isInterestMhit
  );

  return newPolicyOwnerClientItem && !lodash.isEqual(newIsInterestMhit, oldIsInterestMhit)
    ? newPolicyOwnerClientItem
    : {};
};
