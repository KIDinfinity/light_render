import lodash from 'lodash';
import { EOptionType } from 'basic/enum';
import { assembleDefaultDataForSave, assemblePendingDataForSave } from 'basic/utils/SnapshotTool';

import bpm from 'bpm/pages/OWBEntrance';

export default {
  submit: {
    validate: {
      progress: async ({ dispatch }: any) => {
        const errors: any = await dispatch({
          type: 'batchDocumentScanningController/validateFields',
        });
        return errors;
      },
    },
    action: async ({ dispatch, taskDetail, allveriables }: any) => {
      const dataForSubmit = await dispatch({
        type: 'batchDocumentScanningController/getDataForSubmit',
        payload: {
          taskDetail,
        },
      });
      const saveData = await dispatch({
        type: 'batchDocumentScanningController/getDataForSave',
      });

      const dataForSave = await assemblePendingDataForSave({
        optionType: EOptionType.Submit,
        taskDetail,
        dataForSubmit: saveData,
      });

      const insuredList = lodash.get(
        dataForSubmit,
        'businessData.submissionBatchDatas[0].businessData.insured'
      );
      const policyNo = lodash.get(insuredList, 'policyNo');
      const insured = lodash.words(insuredList?.firstName + insuredList?.surname).join(' ');

      return {
        1: dataForSubmit,
        2: {
          ...dataForSubmit,
          activityVariables: {
            ...lodash.get(allveriables, '1'),
            insured,
            policyNo,
          },
        },
        3: dataForSave,
      };
    },
    after: () => {
      bpm.reload();
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const claimProcessData = await dispatch({
        type: 'batchDocumentScanningController/getDataForSave',
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit: claimProcessData,
      });
      return { 1: dataForSave };
    },
  },
};
