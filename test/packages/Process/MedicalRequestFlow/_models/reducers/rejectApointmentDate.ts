import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, _: any) => {
  const nextState = produce(state, (draftState: any) => {
    const appointmentDateList = (() => {
      const activeAppointmentDate = lodash
        .chain(state)
        .get('businessData.appointmentDateList')
        .find((item) => item.status === 'active')
        .value();
      const rejectAppointmentDateList = lodash
        .chain(state)
        .get('businessData.appointmentDateList')
        .filter((item) => item.status === 'reject')
        .value();
      return [
        ...rejectAppointmentDateList,
        {
          ...activeAppointmentDate,
          status: 'reject',
        },
      ];
    })();

    lodash.set(draftState, 'businessData.appointmentDateList', appointmentDateList);
  });
  return {
    ...nextState,
  };
};
