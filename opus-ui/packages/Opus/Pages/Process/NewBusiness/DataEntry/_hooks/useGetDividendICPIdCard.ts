import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import { Country } from 'opus/Pages/Process/NewBusiness/DataEntry/enums/country';
import { DividendICPPaymentOption } from 'opus/Pages/Process/NewBusiness/DataEntry/enums/dividendICPPaymentOption';
import { formUtils } from 'basic/components/Form';

export default () => {
  //
  const currentInsuredAge = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.insuredInfo?.age,
    shallowEqual
  );
  const currentInsuredNationality = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.insuredInfo?.nationality,
    shallowEqual
  );
  const currentInsuredIdCard = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.insuredInfo?.idCard,
    shallowEqual
  );
  const currentPayorNationality = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.payorInfo?.nationality,
    shallowEqual
  );
  const currentPayorIdCard = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.payorInfo?.idCard,
    shallowEqual
  );

  return useMemo(() => {
    let finalIdCard = null;
    if (
      currentInsuredAge &&
      currentInsuredAge >= 20 &&
      formUtils.queryValue(currentInsuredNationality) === Country.TH
    ) {
      finalIdCard = formUtils.queryValue(currentInsuredIdCard);
    }
    if (
      currentInsuredAge &&
      currentInsuredAge < 20 &&
      formUtils.queryValue(currentPayorNationality) === Country.TH
    ) {
      finalIdCard = formUtils.queryValue(currentPayorIdCard);
    }

    return finalIdCard;
  }, [
    currentInsuredAge,
    currentInsuredNationality,
    currentPayorNationality,
    currentInsuredIdCard,
    currentPayorIdCard,
  ]);
};
