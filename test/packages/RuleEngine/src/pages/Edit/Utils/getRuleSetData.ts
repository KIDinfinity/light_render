import {v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';

const getUUid = (id: any) => id || uuidv4();

export default (ruleSetData: any) => {
  const newGroup = lodash.map(ruleSetData?.groups, (item) => {
    return {
      ...item,
      groupId: getUUid(item.groupId),
      groupConditions: lodash.map(item?.groupConditions, (groupC) => ({
        ...groupC,
        id: getUUid(groupC?.id),
      })),
      rules: lodash.map(item?.rules, (rule) => ({
        ...rule,
        conditions: lodash.map(rule?.conditions, (cond) => ({
          ...cond,
          id: getUUid(cond.id),
        })),
        results: lodash.map(rule?.results, (res) => ({
          ...res,
          id: getUUid(res.id),
        })),
      })),
    };
  });
  return {
    ...ruleSetData,
    groups: newGroup,
  };
};
