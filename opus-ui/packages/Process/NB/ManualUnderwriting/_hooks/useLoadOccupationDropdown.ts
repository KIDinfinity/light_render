import { useEffect } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { getCfgOccupationInfo } from '@/services/owbNbCfgControllerService';
import Dictionary from 'basic/enum/Dictionary';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const occupationFilterTypeCodes = [
    Dictionary.Dropdown_IND_Occupation,
    Dictionary.Dropdown_IND_NatureofBusiness,
    Dictionary.Dropdown_IND_PositionHeld,
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const response = await getCfgOccupationInfo(occupationFilterTypeCodes);
      const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
      if (success) {
        dispatch({
          type: `${NAMESPACE}/setOccupationFullList`,
          payload: {
            occupationFullList: resultData,
          },
        });
      }
    })();
  }, []);
};
