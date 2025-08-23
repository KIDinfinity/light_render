import lodash from 'lodash';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';

interface IProps {
  NAMESPACE: string;
  treatmentId: string;
}

export default ({ NAMESPACE, treatmentId }: IProps) => {
  const mainBenefitList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.mainBenefitList
  );
  const mainBenefitListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.mainBenefitListMap
  );

  return {
    extraConfig: {
      existCodes: lodash.map(
        lodash
          .values(mainBenefitListMap)
          .filter((item) => lodash.compact(mainBenefitList).includes(item.id)),
        (item) => formUtils.queryValue(item?.mainBenefit)
      ),
    },
  };
};
