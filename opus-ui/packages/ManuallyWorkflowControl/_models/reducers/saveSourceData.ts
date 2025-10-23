import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

interface IAction {
  payload: {
    caseNo: string;
    autoActivity: boolean;
    businessNo: string;
    caseCategory: string;
    currentActivityKey: string;
    targetActivities: any[];
    taskId: string;
  };
}

export default function saveSourceData(state: any, { payload }: IAction) {
  return {
    ...state,
    formData: {
      ...lodash.pick(payload, [
        'caseNo',
        'autoActivity',
        'businessNo',
        'caseCategory',
        'currentActivityKey',
        'taskId',
        'targetActivities',
      ]),
      targetActivityKey: '',
    },
    targetActivitiesList: lodash.map(payload?.targetActivities, (item: any) => {
      return {
        dictCode: item?.nextActivityKey,
        dictName: formatMessageApi({ Dropdown_CAS_CurrentCaseStatus: item?.nextActivityKey }),
        ...item,
      };
    }),
  };
}
