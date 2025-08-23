import { produce } from 'immer';
import lodash from 'lodash';

const savePageArrowManage = (state: any, { payload }: any) => {
  const { incidentId, showLeft, showRight } = payload;

  return produce(state, (draft: any) => {
    const draftState = draft;
    const { pageArrowManage } = draft;
    if (lodash.isString(incidentId)) {
      const pageArrowStatus = lodash.get(pageArrowManage, `${incidentId}`, {});
      if (lodash.isEmpty(pageArrowStatus)) {
        pageArrowManage[incidentId] = {};
      }

      pageArrowManage[incidentId] = { ...pageArrowStatus, showLeft, showRight };
    }

    draftState.pageArrowManage = pageArrowManage;
  });
};

export default savePageArrowManage;
