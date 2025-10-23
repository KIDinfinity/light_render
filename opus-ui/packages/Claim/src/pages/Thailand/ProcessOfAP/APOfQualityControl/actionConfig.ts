import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import checkInvoice from 'claim/pages/utils/checkInvoice';
import { getSubmitData as getDataForSubmit } from '@/utils/modelUtils/claimUtils';

const getSubmitData = async (dispatch, taskDetail) => {
  const { processInstanceId, taskId } = taskDetail;
  const claimData = await dispatch({
    type: 'apOfClaimCaseController/getDataForSubmit',
  });
  const dataForSubmit = {
    ...claimData,
    taskId,
    processInstanceId,
  };

  const followUpInquiryNoClaimList = await dispatch({
    type: 'followUpClaim/setInquiryNoClaimList',
  });

  const submitData = {
    ...dataForSubmit,
    ...followUpInquiryNoClaimList,
  };
  // 前端提交数据时置空notificationList
  delete submitData.notificationList;
  // AP category 流程，根据treatment 中是否有invoice 做判断， 无invoice 时，claimCase.assess_opertaion 赋值为“only_assess”
  submitData.assessOperation = checkInvoice(submitData);
  return submitData;
};

export default {
  submit: {
    validate: async ({ dispatch }: any) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors = await dispatch({
        type: 'apOfClaimCaseController/validateFields',
      });
      return errors;
    },
    action: async ({ dispatch, taskDetail, allveriables }: any) => {
      const dataForSubmit = await getSubmitData(dispatch, taskDetail);

      return {
        1: getDataForSubmit({ taskDetail, dataForSubmit, variables: allveriables[0] }),
      };
    },
    after: ({ dispatch }: any) => {
      dispatch({
        type: 'followUpClaim/saveSnapshot',
      });
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit: await getSubmitData(dispatch, taskDetail),
      });
      return { 1: dataForSave };
    },
  },
  image: {
    action: ({ taskDetail }: any) => {
      const caseNo = taskDetail?.processInstanceId;
      window.open(`/documentManage/${caseNo}`);
    },
    isShowNotice: false,
  },
};
