import lodash from 'lodash';
import { getRandomColor } from 'opus/Utils';
import { Action } from '@/components/AuditLog/Enum';
import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { list } = payload;
  const colorDict = { ...state?.colorDict } || {};
  const nextState = produce(state, (draftState: any) => {
    const auditList = lodash.orderBy(
      lodash.uniqBy([...list, ...state.auditList], 'id'),
      'date',
      'desc'
    );
    lodash.set(draftState, 'auditList', auditList);

    //分配用户颜色:1.operatorId uniq 2.assign时,beAssignedUserId||formerAssigneeId uniq
    auditList.forEach((item) => {
      if (!colorDict[item.operatorId]) {
        colorDict[item.operatorId] = getRandomColor();
      }
      if (item.action === Action.AutoAssignment || item.action === Action.Assign) {
        if (!colorDict[item?.beAssignedUserId]) {
          colorDict[item.beAssignedUserId] = getRandomColor();
        }
        if (!colorDict[item?.formerAssigneeId]) {
          colorDict[item.formerAssigneeId] = getRandomColor();
        }
      }
    });
    lodash.set(draftState, 'colorDict', colorDict);
  });
  return nextState;
};
