import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { tenant } from '@/components/Tenant';
import rbac2GroupControllerService from '@/services/rbac2GroupControllerService';
import bpmActivityRunTimeVariableService from '@/services/bpmActivityRunTimeVariableService';
import navigatorUserControllerService from '@/services/navigatorUserControllerService';
import { safeParseUtil } from '@/utils/utils';
import dcSnapshotService from '@/services/dcSnapshotService';

interface IEffects {
  put: any;
  call: Function;
  select: Function;
}

export default {
  *findAllGroup(_: any, { call, put }: IEffects) {
    const response = yield call(rbac2GroupControllerService.findAllGroup);
    if (lodash.get(response, 'success')) {
      const resultData = lodash.get(response, 'resultData', []);
      yield put({
        type: 'saveData',
        payload: {
          allGroup: resultData,
        },
      });
    }
  },
  *getSnapshot({ payload }: any, { call, put }: IEffects) {
    const taskId = lodash.get(payload, 'taskId', '');
    const response = yield call(dcSnapshotService.queryData, {
      taskId,
      dataType: 'mainPage',
    });
    if (lodash.get(response, 'resultData.dataValue')) {
      yield put({
        type: 'saveClaimProcessData',
        payload: {
          userInfo: safeParseUtil(response.resultData.dataValue),
        },
      });
    } else {
      yield put({
        type: 'getData',
        payload: {
          taskId,
        },
      });
    }
  },
  *getData({ payload }: any, { call, put }: IEffects) {
    const { taskId } = payload;
    const findUserIdRes = yield call(
      bpmActivityRunTimeVariableService.findUserIdByTaskId,
      objectToFormData({
        name: 'BP_UP_CTG001_USERID',
        taskId,
      })
    );
    if (lodash.get(findUserIdRes, 'success')) {
      const userId = lodash.get(findUserIdRes, 'resultData[0].text', '');
      const advancedQueryRichRes = yield call(navigatorUserControllerService.advancedQueryRich, {
        params: {
          userId,
          regionCode: tenant.remoteRegion(),
        },
        currentPage: 1,
        pageSize: 1,
      });
      if (lodash.get(advancedQueryRichRes, 'success')) {
        const userInfo = lodash.get(advancedQueryRichRes, 'resultData.rows[0]', {});
        yield put({
          type: 'saveClaimProcessData',
          payload: {
            userInfo,
          },
        });
      }
    }
  },
  *selUserGroup({ payload }: any, { select, put }: IEffects) {
    const { groupCode } = payload;
    const { allGroup, userInfo } = yield select((state: any) => ({
      allGroup: state.permissionMaintenanceController.allGroup,
      userInfo: state.permissionMaintenanceController.userInfo,
    }));
    const groupInfo = lodash.find(allGroup, (item: any) => item.groupCode === groupCode);
    const isCurrentUserGroup = groupCode === userInfo.newUserGroupCode;
    yield put({
      type: 'saveData',
      payload: {
        userInfo: {
          ...userInfo,
          newUserGroupCode: isCurrentUserGroup ? '' : groupInfo.groupCode,
          newUserGroupDesc: isCurrentUserGroup ? '' : groupInfo.groupDesc,
          newUserGroupName: isCurrentUserGroup ? '' : groupInfo.groupName,
        },
      },
    });
  },
  *getDataForButton(_: any, { select }: IEffects) {
    const { currentUserId, userInfo } = yield select((state: any) => ({
      currentUserId: state.user.currentUser.userId,
      userInfo: state.permissionMaintenanceController.userInfo,
    }));
    return {
      currentUserId,
      dataForSaveUserGroup: userInfo,
    };
  },
};
