import { useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import useHandleChangeNumberOfUnitsCallback from 'decision/components/Benefit/Edit/_hooks/useHandleChangeNumberOfUnitsCallback';

export default ({ id, field }: any) => {
  const dispatch = useDispatch();
  const handleChangeDeductibleOption = useHandleChangeNumberOfUnitsCallback({
    id,
    field,
  });
  const coverageList: { coreCode: any; id: string }[] = useGetCoverageList('edit');
  const deductibleOptionList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.deductibleOptionList,
    shallowEqual
  );
  const curModalData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData,
    shallowEqual
  );

  return useMemo(() => {
    const curCoverage = coverageList?.find((item) => item.id === id);
    const { hospitalPlanCode, coreCode, deductibleOption } = curCoverage;
    //product、planOption联动，修改的时候重新去拿当前deductOptionList
    const curHospitalPlanCode = formUtils.queryValue(hospitalPlanCode);
    const curCoreCode = formUtils.queryValue(coreCode);
    //从state获取，没有就去调接口拿
    const targetData = deductibleOptionList?.find(
      (item: any) => item?.productCode === curCoreCode && item?.benefitPlan === curHospitalPlanCode
    );
    let curDeductibleOptionList = [];
    if (targetData) {
      curDeductibleOptionList = targetData.planDeductibleOptionList || [];
      const optionValueList = curDeductibleOptionList.map((item) => item?.uideductibleOption);
      //1.非list 2.空list 3.当前value没有包含在optionList里面,初始进页面coverageList为空的时候不应该进行赋值
      const coverageListWithModalData = curModalData?.processData?.coverageList;
      if (
        (!lodash.isArray(curDeductibleOptionList) ||
          curDeductibleOptionList?.length < 1 ||
          !optionValueList.includes(deductibleOption)) &&
        coverageListWithModalData?.length > 0
      ) {
        handleChangeDeductibleOption(null);
        dispatch({
          type: `${NAMESPACE}/setDecisionFieldData`,
          payload: {
            changedFields: {
              [field]: null,
            },
            id,
          },
        });
      }
    } else {
      dispatch({
        type: `${NAMESPACE}/getDeductibleOptionList`,
        payload: {
          coverageList: [curCoverage],
        },
      });
    }
    return {
      dictCode: 'deductibleOption',
      dictName: 'deductibleOption',
      dictData:
        curDeductibleOptionList?.map((item) => {
          return {
            deductibleOption: item.uideductibleOption,
          };
        }) || [],
    };
  }, [deductibleOptionList, coverageList, id, dispatch]);
};
