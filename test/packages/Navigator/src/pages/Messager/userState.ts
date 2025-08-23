import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const ONLEAVE_COLOR = '#666666';

const getUserStateEnum = () => {
  const userStateEnum = {
    OFFLINE: {
      value: 0,
      text: formatMessageApi({
        Dropdown_USR_UserStatus: '4',
      }),
      status: 'default',
    },
    INACTIVE: {
      value: 1,
      text: formatMessageApi({
        Dropdown_USR_UserStatus: '1',
      }),
      status: 'warning',
    },
    ONLINE: {
      value: 2,
      text: formatMessageApi({
        Dropdown_USR_UserStatus: '2',
      }),
      status: 'success',
    },
    ONLEAVE: {
      value: 3,
      text: formatMessageApi({
        Dropdown_USR_UserStatus: '3',
      }),
      // onleave 只能用自定义颜色 antd里没有
      color: ONLEAVE_COLOR,
    },
  };
  return userStateEnum;
};

const getStatus = (value: any) =>
  lodash.find(Object.values(getUserStateEnum()), ['value', value])?.status;
const getText = (value: any) => {
  return lodash.find(Object.values(getUserStateEnum()), ['value', value])?.text;
};
const getColor = (value: any) => {
  if (value === getUserStateEnum().ONLEAVE.value) {
    return getUserStateEnum().ONLEAVE.color;
  }
};
export default getUserStateEnum;
export { getStatus, getText, getColor };
