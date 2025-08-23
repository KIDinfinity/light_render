import { useEffect } from 'react';
import { useDispatch } from 'dva';
import useJudgeIsTargetRelationOfInsured from 'process/NB/ManualUnderwriting/_hooks/useJudgeIsTargetRelationOfInsured';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ id }: any) => {
  const dispatch = useDispatch();
  const existEntityPolicyOwner = useJudgeIsTargetRelationOfInsured({ id });
  return useEffect(() => {
    if (existEntityPolicyOwner) {
      dispatch({
        type: `${NAMESPACE}/saveEntry`,
        target: 'handleChangePersaonalFields',
        payload: {
          changedFields: {
            dateOfBirth: null,
            customerAge: 0,
            gender: 'U',
            trusteeName: null,
          },
          id,
        },
      });
      dispatch({
        type: `${NAMESPACE}/saveEntry`,
        target: 'changeBasicInfoFields',
        payload: {
          changedFields: {
            title: 'OTHERS',
            nationality: null,
            ctfCountryCode: null,
          },
          id,
        },
      });
    }
  }, [existEntityPolicyOwner, id, dispatch]);
};
