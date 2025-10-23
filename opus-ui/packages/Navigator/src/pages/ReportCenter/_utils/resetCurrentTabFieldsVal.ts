import lodash from 'lodash';

const resetCurrentTabFieldsVal = (form: any, reportId: string): void => {
  lodash.mapKeys(form.getFieldsValue(), (value: any, key: string) => {
    const regExp = new RegExp(`^${reportId}`, 'g');
    if (regExp.test(key)) {
      form.resetFields(key);
    }
  });
};

export default resetCurrentTabFieldsVal;
