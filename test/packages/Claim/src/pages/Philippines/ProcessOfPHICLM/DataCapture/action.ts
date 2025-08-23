import lodash from 'lodash';
import moment from 'moment';
import { taskGoBack } from '@/utils/task';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { EOptionType } from 'basic/enum/EOptionType';
import { snapShotSchema } from 'claim/schema/Snapshot';
import { wholeEntities } from './_models/dto/EntriesModel';
import { assemblePHCLMDataForSave } from 'basic/utils/SnapshotTool';

export default {
  submit: {
    validate: async ({ dispatch }) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors: any = await dispatch({
        type: 'PHCLMOfDataCaptureController/validateFields',
      });
      return errors;
    },
    action: async ({ taskDetail, dispatch, allveriables }) => {
      const { taskDefKey, taskStatus, processInstanceId, taskId } = lodash.pick(taskDetail, [
        'taskId',
        'taskStatus',
        'processInstanceId',
        'taskDefKey',
        'caseCategory',
        'processInstanceId',
      ]);
      const dataForBaseInfoParam = {
        activityCode: taskDefKey,
        activityStatus: taskStatus,
        caseNo: processInstanceId,
        categoryCode: '',
        creator: '',
        deleted: 0,
        gmtCreate: '',
        gmtModified: '',
        id: '',
        modifier: '',
        taskId,
        transId: '',
      };
      const dataForSubmit = await dispatch({
        type: 'PHCLMOfDataCaptureController/getDataForSubmit',
      });

      const { insured, claimant } = dataForSubmit;
      const variable = {
        ...allveriables[2],
        insuredId: insured?.insuredId,
        claimantName: `${claimant?.firstName}_${claimant?.middleName}_${claimant?.surname}`,
        submissionChannel: dataForSubmit.submissionChannel,
        submissionDate: moment(dataForSubmit.submissionDate).format('YYYY-MM-DD HH:mm:ss'),
      };
      return {
        1: dataForBaseInfoParam,
        2: getSubmitData({ taskDetail, dataForSubmit, variables: variable }),
        3: dataForBaseInfoParam,
      };
    },
    after: async () => {
      taskGoBack();
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }) => {
      const dataForSubmit = await dispatch({
        type: 'PHCLMOfDataCaptureController/getDataForSubmit',
      });

      const dataForSave = await assemblePHCLMDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
        dataSchema: snapShotSchema,
      });
      return {
        1: dataForSave,
      };
    },
  },
  split: {
    isShowNotice: false,
    validate: async ({ dispatch }) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors: any = await dispatch({
        type: 'PHCLMOfDataCaptureController/validateFields',
      });
      return errors;
    },
    action: async ({ dispatch }) => {
      const claimData = await dispatch({
        type: 'PHCLMOfDataCaptureController/getDataForSubmit',
      });
      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData, wholeEntities },
      });
    },
  },
  image: {
    validate: async ({ dispatch, taskDetail }: any) => {
      const dataForSubmit = await dispatch({
        type: 'PHCLMOfDataCaptureController/getDataForSubmit',
      });
      await dispatch({
        type: 'PHCLMOfDataCaptureController/updateMandatoryDoc',
        payload: getSubmitData({ taskDetail, dataForSubmit, variables: null }),
      });
    },
  },
};
