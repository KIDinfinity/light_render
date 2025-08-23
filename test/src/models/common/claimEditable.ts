import { taskNotEditableKey } from 'claim/pages/component.config';
import EditFlag from '@/enum/editFlag';
import lodash from 'lodash';

export default {
  namespace: 'claimEditable',
  state: {
    taskNotEditable: true,
    dataNotEditable: true,
    taskNotEditablePermission: true, // 可编辑权限
  },
  effects: {
    *getTaskNotEditable(_: any, { select }: any) {
      const taskNotEditable = yield select(
        ({ claimEditable }: any) => claimEditable.taskNotEditable
      );

      return taskNotEditable;
    },
  },
  reducers: {
    setTaskNotEditable(state: any, action: any) {
      const { taskNotEditable } = action.payload;
      return {
        ...state,
        taskNotEditable,
      };
    },

    setTaskNotEditablePermission(state: any, action: any) {
      const { taskNotEditablePermission } = action.payload;
      return {
        ...state,
        taskNotEditablePermission,
      };
    },

    set(state: any, action: any) {
      const { taskStatus, taskDefKey, editFlag, isEditPage } = action.payload;
      let taskNotEditable = false;

      const editList = [EditFlag.bussinessError, EditFlag.editable];
      if (
        !taskStatus ||
        !lodash.includes(['todo'], taskStatus) ||
        taskNotEditableKey.includes(taskDefKey) ||
        state.taskNotEditablePermission
      ) {
        taskNotEditable = true;
      }
      if (
        isEditPage &&
        !state?.taskNotEditablePermission &&
        !lodash.includes(taskNotEditableKey, taskDefKey)
      ) {
        taskNotEditable = false;
      }

      let dataNotEditable = true;
      if (lodash.includes(editList, editFlag) && !state.taskNotEditablePermission) {
        dataNotEditable = false;
      }
      return {
        ...state,
        taskNotEditable,
        dataNotEditable,
      };
    },
  },
};
