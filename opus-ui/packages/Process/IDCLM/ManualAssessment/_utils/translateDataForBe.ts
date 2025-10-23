import lodash from 'lodash';

export const translateIncidentOfDataForBe = (data: any[]) => {
  return lodash.map(data, (item) => {
    const newItem = {
      ...item,
      partOfBodyInjuredArray: !lodash.isArray(item?.partOfBodyInjuredArray)
        ? [item?.partOfBodyInjuredArray]
        : item?.partOfBodyInjuredArray,
    };
    if (!lodash.isEmpty(item?.incidentDate)) {
      newItem.incidentTime = item?.incidentDate;
    }
    return newItem;
  });
};
