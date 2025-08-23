import { useSelector } from 'dva';
import { formUtils, Validator } from 'basic/components/Form';

interface IProps {
  NAMESPACE: string;
  treatmentId: string;
}

export default ({ NAMESPACE, treatmentId }: IProps) => {
  const dateOfAdmission = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.dateOfAdmission
  );
  const dateOfDischarge = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.dateOfDischarge
  );
  const treatmentType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.treatmentType
  );
  const dateOfConsultation = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.dateOfConsultation
  );

  return {
    Rules: {
      operationDateBetweenAdmissionDateAnddischargeDate: Validator.operationDateBetweenAdmissionDateAnddischargeDate(
        formUtils.queryValue(dateOfAdmission),
        formUtils.queryValue(dateOfDischarge),
        formUtils.queryValue(treatmentType)
      ),
      VLD_000600: Validator.VLD_000600(
        formUtils.queryValue(dateOfConsultation),
        formUtils.queryValue(treatmentType)
      ),
    },
    extraConfig: {},
  };
};
