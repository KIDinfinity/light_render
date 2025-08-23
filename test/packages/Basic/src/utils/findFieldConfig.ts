import lodash from 'lodash';

export default ({ configs, field }: any) => {
  if (lodash.isArray(configs) && lodash.isString(field)) {
    return (
      lodash
        .chain(configs)
        .find((item: any) => {
          return lodash.isEqual(field, item.field);
        })
        .value() || {}
    );
  }
  return {};
};
