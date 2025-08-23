import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const changedFields = lodash.get(action, 'payload.changedFields');
  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'appointmentDate')) {
      const appointmentDateList = (() => {
        const haveAtiveAppointmentDate = lodash
          .chain(state)
          .get('businessData.appointmentDateList')
          .find((item) => item.status === 'active')
          .isEmpty()
          .value();
        if (!haveAtiveAppointmentDate) {
          return lodash
            .chain(state)
            .get('businessData.appointmentDateList', [])
            .map((item: any) => {
              if (item.status === 'active') {
                return {
                  ...item,
                  appointmentDate: changedFields?.appointmentDate?.value,
                };
              }
              return item;
            })
            .value();
        } else {
          return [
            ...lodash.get(state, 'businessData.appointmentDateList', []),
            {
              appointmentDate: changedFields?.appointmentDate?.value,
              status: 'active',
              businessNo: lodash.get(state, 'businessData.businessNo'),
              applicationId: lodash.get(state, 'businessData.applicationId'),
            },
          ];
        }
      })();

      lodash.set(draftState, 'businessData.appointmentDateList', appointmentDateList);
    }
  });
  return {
    ...nextState,
  };
};
