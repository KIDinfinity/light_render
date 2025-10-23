import { EOptionType } from 'basic/enum';
import { NAMESPACE } from 'process/MedicalRequestFlow/activity.config';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';

export default {
  save: {
    // timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const claimProcessData = await dispatch({
        type: `${NAMESPACE}/getDataForSave`,
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
