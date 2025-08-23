import { produce }  from 'immer';
import lodash from 'lodash';

const updateCalendarInfoList = (state: any, action: any) => {
  const { dateTime } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.businessData.details = lodash.map(draftState.businessData?.details, (item: any) => {
      return {
        ...item,
        startTime: `${dateTime} 08:30:00`,
        endTime: `${dateTime} 18:30:00`,
      };
    });
  });

  return { ...nextState };
};

export default updateCalendarInfoList;
