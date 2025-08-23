import lodash from 'lodash';
import moment from 'moment';

export const translateIncidentOfDataForBe = (data: any[]) => {
  return lodash.map(data, (item) => {
    const newItem = {
      ...item,
      partOfBodyInjuredArray: !lodash.isArray(item?.partOfBodyInjuredArray)
        ? [item?.partOfBodyInjuredArray]
        : item?.partOfBodyInjuredArray,
    };
    if (!lodash.isEmpty(item?.incidentDate) && !lodash.isEmpty(item?.incidentTime)) {
      const newDateTime = moment(
        `${moment(item?.incidentDate).format('YYYY/MM/DD')} ${moment(item?.incidentTime).format(
          'HH:mm'
        )}`
      ).format();
      newItem.incidentDate = newDateTime;
      newItem.incidentTime = newDateTime;
    }
    if (!lodash.isEmpty(item?.incidentDate) && lodash.isEmpty(item?.incidentTime)) {
      newItem.incidentDate = moment(item?.incidentDate)
        .set({ hour: 0, minute: 0, second: 0 })
        .format();
    }
    return newItem;
  });
};
