import { useSelector } from 'dva';
import { Validator } from 'basic/components/Form';

interface IProps {
  NAMESPACE: string;
  incidentId: string;
  diagnosisId: string;
}

export default ({ NAMESPACE, incidentId, diagnosisId }: IProps) => {
  const diagnosisList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.incidentListMap?.[incidentId]?.diagnosisList
  );
  const diagnosisListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.diagnosisListMap
  );

  return {
    Rules: {
      checkDiagnosisDuplicate: Validator.checkDiagnosisDuplicate(
        diagnosisList,
        diagnosisListMap,
        diagnosisId
      ),
    },
  };
};
