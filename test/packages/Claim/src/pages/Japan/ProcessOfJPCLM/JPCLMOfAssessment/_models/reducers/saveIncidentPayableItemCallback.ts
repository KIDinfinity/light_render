import { selsctColor } from '@/utils/claimUtils';
import { colorsPond } from '@/utils/constant';

const saveIncidentPayableItemCallback = (state, action) => {
  const { policyBackgrounds } = state;
  const newPolicyBackground = { ...policyBackgrounds };
  const { changedFields } = action.payload;
  const fieldsArray = Object.entries(changedFields);
  // 修改保单号时，判断修改后的保单有没有对应的背景色，没有则新增，有则无操作
  if (fieldsArray.length === 1) {
    const [name, { value }] = fieldsArray[0];
    if (name === 'policyNo' && !newPolicyBackground[`${value}`]) {
      const color = selsctColor(newPolicyBackground, colorsPond);

      newPolicyBackground[`${value}`] = color;
    }
  }

  return {
    ...state,
    policyBackgrounds: newPolicyBackground,
  };
};

export default saveIncidentPayableItemCallback;
