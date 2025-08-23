import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { formUtils, Validator } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';

interface IProps {
  NAMESPACE: string;
  incidentId: string;
  diagnosisId: string;
  isAdd?: boolean;
}

export default ({ NAMESPACE, incidentId, diagnosisId, isAdd }: IProps) => {
  const configs = tenant.region({
    [Region.HK]: {},
    [Region.TH]: () => {
      return {
        Rules: {
          VLD_000657: Validator.VLD_000657(),
        },
      };
    },
    notMatch: {},
  });

  const dispatch = useDispatch();

  const claimNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.claimNo
  );
  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRegisterMcs
  );
  const diagnosisListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.diagnosisListMap
  );
  const incidentNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap?.[incidentId]?.incidentNo
  );
  const firstIncidentId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.incidentListMap?.[0]?.incidentId
  );
  const diagnosisItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.diagnosisListMap?.[diagnosisId]
  );

  return {
    Rules: configs.Rules || {},
    editableConditions: !isAdd
      ? diagnosisItem?.isManualAdd || !isRegisterMcs
      : diagnosisItem?.isManualAdd ||
        !isRegisterMcs ||
        !(isRegisterMcs && (Number(incidentNo) === 1 || firstIncidentId === incidentId)),
    extraConfig: {
      searchName: 'diagnosis',
      dropdownCode: 'claim_dict004',
      optionShowType: 'both',
      searchIsCIByDiagnosisCode: (value: string) => {
        dispatch({
          type: `${NAMESPACE}/checkIsCIByDiagnosisCode`,
          payload: {
            claimNo,
            diagnosisId,
            incidentId,
            searchCode: value,
          },
        });
        dispatch({
          type: `${NAMESPACE}/retrieve3CiIndicator`,
          payload: {
            diagnosisCode: value,
            diagnosisId,
          },
        });
      },
      disabledDictCodes: lodash
        .chain(diagnosisListMap)
        .filter((item) => item.incidentId === incidentId)
        .map((item) => formUtils.queryValue(item.diagnosisCode))
        .uniq()
        .value(),
      warningMessage: [],
    },
  };
};
