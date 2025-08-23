import lodash from 'lodash';

/**
 *
 * @param {Array} forms 表单对象数组
 * @param {Boolean} force force validate forms
 * @return {Array} 返回表单校验错误
 */
const validateFormsAndGetErrorsByRequired = async ({ forms, force = false }: any) => {
  if (lodash.isArray(forms)) {
    const resultList = await Promise.all(
      lodash
        .chain(forms)
        .filter((item) => !lodash.isEmpty(item))
        .map(
          (form) =>
            new Promise((resolve) => {
              const fields = form.getFieldsValue();

              // 只提取 `rules` 中包含 `required: true` 的字段
              const requiredFieldNames = Object.keys(fields).filter((key) => {
                return form.getFieldInstance(key)?.props?.required || false;
              });
              form.validateFields(
                requiredFieldNames,
                {
                  force,
                },
                (errors: any) => {
                  if (errors && lodash.isObject(errors)) {
                    resolve(lodash.values(errors).map((item: any) => item.errors));
                  } else {
                    resolve([]);
                  }
                }
              );
            })
        )
        .value()
    );
    return lodash.flatten(resultList);
  }
  return [];
};

export default validateFormsAndGetErrorsByRequired;
