import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from '../activity.config';
import { transferFormFieldToValueString } from 'opus/Pages/Process/NewBusiness/DataEntry/utils/transferUtils';

export default () => {
  const dispatch = useDispatch();

  const insuredAge = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.insuredInfo?.age,
    shallowEqual
  );
  const insuredName = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.insuredInfo?.name,
    shallowEqual
  );
  const insuredLastName = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.insuredInfo?.lastName,
    shallowEqual
  );
  const payorName = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.payorInfo?.name,
    shallowEqual
  );
  const payorLastName = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.payorInfo?.lastName,
    shallowEqual
  );
  const accountName = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.dividendIcp?.accountName,
    shallowEqual
  );

  const finalAccountName = useMemo(() => {
    const currentInsuredAge = transferFormFieldToValueString(insuredAge);
    const currentInsuredName = transferFormFieldToValueString(insuredName);
    const currentInsuredLastName = transferFormFieldToValueString(insuredLastName);
    const currentPayorName = transferFormFieldToValueString(payorName);
    const currentPayorLastName = transferFormFieldToValueString(payorLastName);
    const currentAccountName = transferFormFieldToValueString(accountName);

    let name = null;
    if (currentInsuredAge && currentInsuredAge >= 20) {
      name = `${currentInsuredName} ${currentInsuredLastName}`;
    } else if (currentInsuredAge && currentInsuredAge < 20) {
      name = accountName ? currentAccountName : `${currentPayorName} ${currentPayorLastName}`;
    }

    return name?.trim() ? name : null;
  }, [insuredAge, insuredName, insuredLastName, payorName, payorLastName, accountName]);

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/saveDividendICP`,
      payload: { changedFields: { accountName: finalAccountName } },
    });
  }, [finalAccountName]);

  return finalAccountName;
};
