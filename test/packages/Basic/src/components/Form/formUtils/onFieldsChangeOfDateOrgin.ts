import moment from 'moment';
import lodash from 'lodash';

const onFieldsChangeOfDateOrgin = (changedFields: any, dateArray = []) => {
  const finalChangedFields = { ...changedFields };

  dateArray.map((key) => {
    if (lodash.has(changedFields, key) && changedFields[key].value) {
      finalChangedFields[key] = {
        ...finalChangedFields[key],
        value: moment(changedFields[key].value).format(),
      };
    }

    return null;
  });

  return finalChangedFields;

};

export default onFieldsChangeOfDateOrgin;
