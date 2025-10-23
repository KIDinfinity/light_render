import { useSelector } from 'dva';
import { Validator } from 'basic/components/Form';

interface IProps {
  NAMESPACE: string;
  treatmentId: string;
  form?: any;
}

export default ({ NAMESPACE, form, treatmentId }: IProps) => {
  const dateOfAdmission = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.dateOfAdmission
  );
  const dateOfDischarge = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.dateOfDischarge
  );
  const icuFromDate = form.getFieldValue('icuFromDate');
  const icuToDate = form.getFieldValue('icuToDate');

  return {
    Rules: {
      VLD_000020: Validator.VLD_000020(icuFromDate, icuToDate, dateOfAdmission, dateOfDischarge),
    },
    extraConfig: {},
  };
};
