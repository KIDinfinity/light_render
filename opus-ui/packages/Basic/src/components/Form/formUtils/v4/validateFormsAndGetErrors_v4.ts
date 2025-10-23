import lodash from 'lodash';

/**
 *
 * @param {Array} forms 表单对象数组
 * @param {Boolean} force force validate forms
 * @return {Array} 返回表单校验错误
 */
const validateFormsAndGetErrors_v4 = async ({ forms }: any) => {
  if (lodash.isArray(forms)) {
    const resultList = await Promise.all(
      lodash
        .chain(forms)
        .filter((item) => !lodash.isEmpty(item))
        .map(
          (form) =>
            new Promise((resolve) => {
              form
                .validateFields()
                .then(() => {
                  resolve([]);
                })
                .catch((errors: any) => {
                  if (errors && errors?.errorFields) {
                    resolve(errors?.errorFields);
                  } else {
                    resolve([]);
                  }
                });
            })
        )
        .value()
    );
    return lodash.flatten(resultList);
  }
  return [];
};

export default validateFormsAndGetErrors_v4;
