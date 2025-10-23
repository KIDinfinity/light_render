import lodash from 'lodash';

const getFieldLayout = ({ span, name = 'fieldLayout', xs = 24, sm = 12, md, lg }: any) => ({
  [name]: {
    xs: { span: xs },
    sm: { span: sm },
    md: { span: md || span },
    lg: { span: lg || span },
  },
});

export default (layConf: any) => {
  if (lodash.isPlainObject(layConf)) {
    return lodash
      .chain(layConf)
      .keys()
      .reduce((layout: any, key: any) => {
        const isDefault = key === 'default';
        const fieldKey = isDefault ? 'fieldLayout' : key;
        const options = lodash.isPlainObject(layConf[key])
          ? { ...layConf[key] }
          : getFieldLayout({
              span: layConf[key],
              name: isDefault ? 'fieldLayout' : 'layout',
            });

        return {
          ...layout,
          [fieldKey]: isDefault ? options.fieldLayout : options,
        };
      }, {})
      .value();
  }
  if (lodash.isNumber(layConf)) {
    return getFieldLayout({ span: layConf });
  }
  return false;
};

/**  24 /  4
 *  <FormSection layConf={4}>
 *  <FormSection layConf={{
 *    default: 4,
 *    a: 6
 *  }}
 */
