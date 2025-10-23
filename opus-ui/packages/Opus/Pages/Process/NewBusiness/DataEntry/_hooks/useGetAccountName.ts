import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import { formUtils } from 'basic/components/Form';
import { transferFormFieldToValueString } from 'opus/Pages/Process/NewBusiness/DataEntry/utils/transferUtils';

export default () => {
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
  const insuredAge = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.insuredInfo?.age,
    shallowEqual
  );

  return useMemo(() => {
    const currentInsuredAge = formUtils.queryValue(insuredAge);
    const currentInsuredName = transferFormFieldToValueString(insuredName);
    const currentInsuredLastName = transferFormFieldToValueString(insuredLastName);
    const currentPayorName = transferFormFieldToValueString(payorName);
    const currentPayorLastName = transferFormFieldToValueString(payorLastName);
    const insuredNameStr = `${currentInsuredName} ${currentInsuredLastName}`;
    const payorNameStr = `${currentPayorName} ${currentPayorLastName}`;
    let finalDicts;
    if (currentInsuredAge && currentInsuredAge >= 20) {
      finalDicts = [
        {
          dictCode: insuredNameStr,
          dictName: insuredNameStr,
        },
      ];
    } else {
      finalDicts = [
        {
          dictCode: insuredNameStr,
          dictName: insuredNameStr,
        },
        {
          dictCode: payorNameStr,
          dictName: payorNameStr,
        },
      ];
    }
    finalDicts = finalDicts.filter((item) => {
      if (lodash.isEmpty(item?.dictCode)) {
        return false;
      }
      if (lodash.isString(item?.dictCode) && lodash.isFunction(item?.dictCode?.trim)) {
        return item?.dictCode?.trim();
      }
      return true;
    });
    return finalDicts;
  }, [insuredAge, insuredName, insuredLastName, payorName, payorLastName]);
};
