import lodash from 'lodash';

export default (state: any, action: any) => {
  const { headerInfoConfig, defaultHeaderInfoConfig, templateHeaderHelper } = state;
  const { list } = templateHeaderHelper;
  const config = headerInfoConfig || defaultHeaderInfoConfig || {};
  const { params } = action.payload;

  for (const [key, value] of lodash.entries(params)) {
    const index = Number(key) - 1;
    if (lodash.isPlainObject(value)) {
      const item = config[index];
      config[index] = lodash.merge(item, value);
    } else if (lodash.isString(value)) {
      if (list.has(value)) {
        const targetItem = list.get(value);
        config[index] = { ...targetItem, key: `${targetItem.key}_${new Date().getTime()}` };
      }
    } else if (lodash.isFunction(value)) {
      const newItem = value({ current: config[index], all: config });
      if(!lodash.isEqual(config[index], newItem))
        config[index] = newItem;
    }
  }

  state.headerInfoConfig = config;
  return state;
};
