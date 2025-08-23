import { produce }  from 'immer';
import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';

const updateInfoList = (state: any, action: any) => {
  const { changedFields, id } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const allTime = formUtils.queryValue(changedFields.allTime);
    let extra = {};
    if (allTime) {
      extra = !lodash.isEmpty(allTime)
        ? {
            startTime: `${moment(allTime[0]).format('YYYY-MM-DD HH:mm')}:00`,
            endTime: `${moment(allTime[1]).format('YYYY-MM-DD HH:mm')}:00`,
          }
        : {
            startTime: '',
            endTime: '',
          };
    }
    // eslint-disable-next-line no-param-reassign
    draftState.businessData.details = lodash.map(draftState.businessData?.details, (item: any) => {
      return id === item.id
        ? {
            ...item,
            ...changedFields,
            ...extra,
          }
        : item;
    });
  });

  return { ...nextState };
};

export default updateInfoList;
