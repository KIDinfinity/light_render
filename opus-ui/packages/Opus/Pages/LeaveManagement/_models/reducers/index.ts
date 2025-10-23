import { produce } from 'immer';
import lodash from 'lodash';
import { LabelCOMLeaveLength } from 'opus/Enums';

export default {
  saveLeaveTable: (state: any, action: any) => {
    const { leaveTableData }: any = action.payload;
    const nextState = produce(state, (draftState: any) => {
      draftState.leaveTableData = leaveTableData;
    });
    return { ...nextState };
  },
  saveLeaveRange: (state: any, action: any) => {
    const { leaveRange }: any = action.payload;
    const nextState = produce(state, (draftState: any) => {
      draftState.leaveTableParams.leaveRange = leaveRange;
    });
    return { ...nextState };
  },
  saveOrganizationMemberList: (state: any, action: any) => {
    const { organizationMemberList }: any = action.payload;
    const nextState = produce(state, (draftState: any) => {
      draftState.organizationMemberList = organizationMemberList;
    });
    return { ...nextState };
  },
  saveAddLeaveForm: (state: any, action: any) => {
    const { changedValues, type }: any = action.payload;
    const nextState = produce(state, (draftState: any) => {
      if (type === 'onChange') {
        if (lodash.has(changedValues, 'leaveStartDate')) {
          if (
            draftState.addLeaveForm.leaveLength === LabelCOMLeaveLength.HalfdayAM ||
            draftState.addLeaveForm.leaveLength === LabelCOMLeaveLength.HalfdayPM
          ) {
            changedValues.leaveEndDate = changedValues.leaveStartDate;
          } else {
            changedValues.leaveEndDate = null;
          }
        }
        if (
          lodash.has(changedValues, 'leaveLength') &&
          (changedValues.leaveLength === LabelCOMLeaveLength.HalfdayAM ||
            changedValues.leaveLength === LabelCOMLeaveLength.HalfdayPM)
        ) {
          changedValues.leaveEndDate = draftState.addLeaveForm.leaveStartDate;
        }
      }
      draftState.addLeaveForm = { ...draftState.addLeaveForm, ...changedValues };
    });
    return { ...nextState };
  },
  saveEditLeaveForm: (state: any, action: any) => {
    const { changedValues, type }: any = action.payload;
    const nextState = produce(state, (draftState: any) => {
      if (type === 'onChange') {
        if (lodash.has(changedValues, 'leaveStartDate')) {
          if (
            draftState.editLeaveForm.leaveLength === LabelCOMLeaveLength.HalfdayAM ||
            draftState.editLeaveForm.leaveLength === LabelCOMLeaveLength.HalfdayPM
          ) {
            changedValues.leaveEndDate = changedValues.leaveStartDate;
          } else {
            changedValues.leaveEndDate = null;
          }
        }
        if (
          lodash.has(changedValues, 'leaveLength') &&
          (changedValues.leaveLength === LabelCOMLeaveLength.HalfdayAM ||
            changedValues.leaveLength === LabelCOMLeaveLength.HalfdayPM)
        ) {
          changedValues.leaveEndDate = draftState.editLeaveForm.leaveStartDate;
        }
      }
      draftState.editLeaveForm = { ...draftState.editLeaveForm, ...changedValues };
    });
    return { ...nextState };
  },
};
