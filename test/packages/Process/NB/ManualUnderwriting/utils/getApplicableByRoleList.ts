import { produce }  from 'immer';
import lodash from 'lodash';

export default ({ roleList: inputRoleList, customerType, fieldConfig, atomConfig }: any) => {
  const roleList = inputRoleList?.filter(roleData => !roleData.deleted)
  const visible = lodash.get(fieldConfig, 'field-props.visible', 'N');
  if (lodash.isEmpty(roleList)) {
    const result = produce(fieldConfig, (draftData: any) => {
      lodash.set(draftData, 'field-props.visible', 'N');
    });
    return result;
  }
  if (visible === 'N') {
    return fieldConfig;
  }
  if (!lodash.isEmpty(roleList)) {
    const atomCodeSet = new Set();
    lodash.forEach(roleList, (role: any) => {
      const key = `${fieldConfig?.caseCategory}_${fieldConfig?.activityCode}_${role?.customerRole}_${customerType}_${fieldConfig?.section}_fields_${fieldConfig?.field}`;
      atomCodeSet.add(key);
    });
    const relateAtom = lodash.filter(atomConfig, (atom) => {
      return atomCodeSet.has(atom.atomCode);
    });
    if (
      !relateAtom?.length ||
      lodash.every(relateAtom, (atom) => atom.applicable === 'N' || !atom.applicable)
    ) {
      const result = produce(fieldConfig, (draftData: any) => {
        lodash.set(draftData, 'field-props.visible', 'N');
      });
      return result;
    }
    if (relateAtom?.length && lodash.some(relateAtom, (atom) => atom.applicable === 'Y')) {
      if (visible === 'C') {
        const result = produce(fieldConfig, (draftData: any) => {
          lodash.set(draftData, 'field-props.visible', 'C');
        });
        return result;
      }
      const result = produce(fieldConfig, (draftData: any) => {
        lodash.set(draftData, 'field-props.visible', 'Y');
      });
      return result;
    }
  }
  return fieldConfig;
};
