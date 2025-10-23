import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from '../activity.config';
import { transferFormFieldToValueString } from 'opus/Pages/Process/NewBusiness/DataEntry/utils/transferUtils';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

export default ({ config, fieldConfig, isInsured, currentValue }) => {
  const dispatch = useDispatch();
  const dicts = getDrowDownList(
    config['x-dict']?.dictTypeCode || fieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
  );
  const insuredNonThCrsList = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.insuredCrs?.nonThCrsList,
    shallowEqual
  );
  const payorNonThCrsList = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.payorCrs?.nonThCrsList,
    shallowEqual
  );
  return useMemo(() => {
    const nonThCrsList = isInsured ? insuredNonThCrsList : payorNonThCrsList;
    const currentCodeList = nonThCrsList.map((item) => formUtils.queryValue(item.noTinReasonCode));
    const filteredDicts = dicts.filter(
      (dictItem) =>
        !currentCodeList.includes(dictItem.dictCode) || dictItem.dictCode === currentValue
    );

    return filteredDicts;
  }, [dicts, insuredNonThCrsList, payorNonThCrsList, isInsured]);
};
