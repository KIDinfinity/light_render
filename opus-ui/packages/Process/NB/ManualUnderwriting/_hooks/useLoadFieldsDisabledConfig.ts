import { useEffect } from 'react';
import { useDispatch } from 'dva';
import useJudgeIsGBSN from 'basic/components/CaseContainer/hooks/useJudgeIsGBSN';
// TODO: Discard No Reference
export default () => {
  const dispatch = useDispatch();
  const atomGroupCode = 'BP_NB_CTG001_BP_NB_ACT004_disable_condition';
  const GBSNatomGroupCode = 'BP_NB_CTG005_BP_NB_ACT004_disable_condition';
  const isGBSN = useJudgeIsGBSN();
  useEffect(() => {
    if (atomGroupCode) {
      dispatch({
        type: 'atomConfig/loadAtomGroup',
        payload: {
          atomGroupCode,
        },
      });
      if (isGBSN)
        dispatch({
          type: 'atomConfig/loadAtomGroup',
          payload: {
            atomGroupCode: GBSNatomGroupCode,
          },
        });
    }
  }, [atomGroupCode]);
};
