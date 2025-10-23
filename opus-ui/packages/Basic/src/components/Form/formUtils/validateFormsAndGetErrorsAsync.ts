import lodash from 'lodash';

/**
 *
 * @param {Array} forms 表单对象数组
 * @param {Boolean} force force validate forms
 * @return {Array} 返回表单校验错误
 */
const validateFormsAndGetErrorsAsync = ({ forms, force = false }: any) => {
  if (lodash.isArray(forms)) {
    const tasks = lodash
      .chain(forms)
      .filter((item) => !lodash.isEmpty(item))
      .map(
        (form) =>
          new Promise((resolve) => {
            form.validateFields({ force }, (errors: any) => {
              if (errors && lodash.isObject(errors)) {
                resolve(lodash.values(errors).map((item: any) => item.errors));
              } else {
                resolve([]);
              }
            });
          })
      )
      .value();

    return Promise.all(tasks).then((result: any) => {
      return lodash.flattenDeep(result);
    });
  }
  return [];

};

export default validateFormsAndGetErrorsAsync;
