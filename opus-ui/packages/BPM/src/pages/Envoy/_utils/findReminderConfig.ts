import lodash from 'lodash';

export default ({ configs, groupCode, reasonCode, reminderCode }: any) => {
  return lodash
    .chain(configs)
    .find((item) => item.code === groupCode)
    .get('reasonConfigs', [])
    .find((item) => item.reasonCode === reasonCode)
    .get('reminderConfigs', [])
    .find((item: any) => item.reminderCode === reminderCode)
    .value();
};
