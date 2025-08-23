import lodash from 'lodash';

const cleanFieldsValue = ({ formData, fields }: any) => {
  const changeFields = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of lodash.entries(formData)) {
    if (lodash.includes(fields, key)) {
      if (lodash.isPlainObject(value)) {
        changeFields[key] = {
          // @ts-ignore
          ...value,
          value: '',
        };
      } else {
        changeFields[key] = '';
      }
    }
  }
  return changeFields;

};

export default cleanFieldsValue;
