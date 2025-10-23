import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import AuthCache from '@/auth/Utils/AuthCache';
import { activityCode } from './enum';

interface IArgs {
  dispatch: Function;
  taskDetail: any;
}

export default {
  submit: {
    action: async ({ dispatch, taskDetail }: IArgs) => {
      const { currentUserId, dataForSaveUserGroup } = await dispatch({
        type: 'permissionMaintenanceController/getDataForButton',
      });
      const { taskId, taskDefKey } = taskDetail;
      // 是否为第一个节点，且操作的是当前用户的用户组
      const isFirstActivityAndCurrentUser =
        taskDefKey === activityCode.BP_UP_ACT001 && currentUserId === dataForSaveUserGroup.userId;
      if (!isFirstActivityAndCurrentUser) {
        AuthCache.removeCache();
      }
      const dataForSubmit: {
        taskId: string;
        variables: any;
      } = {
        taskId,
        variables: {
          nextActivity: isFirstActivityAndCurrentUser ? 'BP_UP_ACT002' : 'end',
        },
      };
      return {
        1: dataForSubmit,
        2: {
          ...dataForSaveUserGroup,
          taskId,
          status: isFirstActivityAndCurrentUser ? '0' : '1',
          creator: currentUserId,
          deleted: 0,
        },
        3: await assembleDefaultDataForSave({
          taskDetail,
          optionType: EOptionType.Submit,
          dataForSubmit: dataForSaveUserGroup,
        }),
      };
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: IArgs) => {
      const { dataForSaveUserGroup } = await dispatch({
        type: 'permissionMaintenanceController/getDataForButton',
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit: dataForSaveUserGroup,
      });
      return { 1: dataForSave };
    },
  },
};
