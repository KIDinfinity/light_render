import lodash from 'lodash';

export default ({ info, conditionItem }: any) => {
  return {
    groupkey: (info.groupId && lodash.isEmpty(info.groupId) && 'groupId') || 'id',
    conditionsKey:
      (conditionItem.atomCode && lodash.isEmpty(conditionItem.atomCode) && 'atomCode') || 'id',
    conditionsValue:
      (conditionItem.atomCode &&
        lodash.isEmpty(conditionItem.atomCode) &&
        conditionItem.atomCode) ||
      conditionItem.id,
    groupValue: (info.groupId && lodash.isEmpty(info.groupId) && info.groupId) || info.id,
  };
};
