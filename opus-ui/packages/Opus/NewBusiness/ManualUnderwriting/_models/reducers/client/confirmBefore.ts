import { produce } from 'immer';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const id = draftState.editingClientId;
    const newCrs = formUtils.queryValue(draftState.modalData.entities?.clientMap?.[id]?.newCrs);

    if (newCrs === 'N') {
      const crtInfoList = draftState.modalData.entities?.clientMap?.[id]?.crtInfoList;
      const filteredCrtInfoList = lodash.filter(crtInfoList, (crtId: string) => {
        const crtInfo = draftState.modalData.entities?.crtInfoMap?.[crtId];

        return !(
          crtInfo?.ctfType === 'TN' &&
          crtInfo?.ctfCountryCode !== 'USA' &&
          crtInfo?.type === 'S'
        );
      });
      const deletedCrtInfoList = lodash.difference(crtInfoList, filteredCrtInfoList);

      for (const crtId of deletedCrtInfoList) {
        delete draftState.modalData.entities?.crtInfoMap?.[crtId];
      }
      draftState.modalData.entities.clientMap[id].crtInfoList = filteredCrtInfoList;
    }
  });

  return {
    ...nextState,
  };
};
