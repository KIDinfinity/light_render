import moment from 'moment';
import lodash from 'lodash';

const onFieldsChangeOfDate = (changedFields: any, dateArray = []) => {
  const finalChangedFields = { ...changedFields };
  dateArray.map((key) => {
    if (lodash.has(changedFields, key) && changedFields[key].value) {
      finalChangedFields[key] = {
        ...finalChangedFields[key],
        value: moment(changedFields[key].value).startOf('day').format(),
      };
    }

    return null;
  });

  return finalChangedFields;
};

export default onFieldsChangeOfDate;
