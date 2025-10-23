import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import { Country } from 'opus/Pages/Process/NewBusiness/DataEntry/enums/country';
import { DividendICPPaymentOption } from 'opus/Pages/Process/NewBusiness/DataEntry/enums/dividendICPPaymentOption';
import { formUtils } from 'basic/components/Form';
import { useDispatch } from 'dva';

export default () => {
  const dispatch = useDispatch();
  const currentInsuredNationality = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.insuredInfo?.nationality,
    shallowEqual
  );
  const currentPayorNationality = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.payorInfo?.nationality,
    shallowEqual
  );
  const currentDividendOption = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.dividendIcp?.dividendIcpPaymentOption,
    shallowEqual
  );

  return useMemo(() => {
    if (
      formUtils.queryValue(currentInsuredNationality) !== Country.TH &&
      formUtils.queryValue(currentPayorNationality) !== Country.TH
    ) {
      //同时还要清空dividendICPPaymentOption的值
      if (formUtils.queryValue(currentDividendOption) === DividendICPPaymentOption.PromptPay) {
        dispatch({
          type: `${NAMESPACE}/saveDividendICP`,
          payload: { changedFields: { dividendIcpPaymentOption: null } },
        });
      }
      return [DividendICPPaymentOption.PromptPay];
    }
    return [];
  }, [currentInsuredNationality, currentPayorNationality, currentDividendOption]);
};
