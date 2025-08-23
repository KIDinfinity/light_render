import lodash from 'lodash';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();

  const coverageList =
    useSelector(({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.processData?.coverageList) || [];

  const mainCoverage = lodash.find(coverageList, ({ isMain }: any) => isMain === 'Y') || {};

  const productCode = formUtils.queryValue(mainCoverage?.coreCode);
  useEffect(() => {
    dispatch({
      type: 'dictionaryController/loadDictsByParentCode',
      payload: {
        parentCode: productCode,
        parentFieldName: 'productCode',
      },
    });
  }, [productCode]);
};
