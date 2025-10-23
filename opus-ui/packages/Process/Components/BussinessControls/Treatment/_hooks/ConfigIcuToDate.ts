import { useSelector } from 'dva';
import { formUtils, Validator } from 'basic/components/Form';

interface IProps {
  NAMESPACE: string;
  treatmentId: string;
  form?: any;
}

export default ({ NAMESPACE, form, treatmentId }: IProps) => {
  const icuFromDateValue = form.getFieldValue('icuFromDate');
  const dateOfDischarge = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.dateOfDischarge
  );

  return {
    Rules: {
      VLD_000057: Validator.VLD_000057HK(formUtils.queryValue(icuFromDateValue)),
      VLD_000601: Validator.VLD_000601(formUtils.queryValue(dateOfDischarge)),
    },
    extraConfig: {},
  };
};
