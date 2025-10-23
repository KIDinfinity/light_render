import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { ClaimType } from 'claim/enum';
import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';

interface IProps {
  NAMESPACE: string;
  treatmentId: string;
}

export default ({ NAMESPACE, treatmentId }: IProps) => {
  const treatmentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]
  );
  const isExistICU =
    (treatmentList?.therapiesType === TherapiesTypeEnum.ICU && treatmentList?.icu) ||
    formUtils.queryValue(treatmentList?.treatmentType) === ClaimType.OPD;

  return {
    Rules: {},
    extraConfig: {
      existCodes: isExistICU ? [TherapiesTypeEnum.ICU] : [],
    },
  };
};
