import { useEffect } from 'react';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { shallowEqual } from 'react-redux';
import useGetPolicyDecision from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetPolicyDecision';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { useGetCoverageList } from 'opus/NewBusiness/ManualUnderwriting/_hooks';
import useGetFacultativeOptionVisible from './useGetFacultativeOptionVisible';
import useGetFacultativeReasonVisible from './useGetFacultativeReasonVisible';
import useProceedGetFacultativeInfo from './useProceedGetFacultativeInfo';
import TaskDefKey from 'enum/TaskDefKey';
import CaseCategory from 'enum/CaseCategory';

const FacultativeReasonDefaultValue = 'FC45';

export default () => {
  const policyDecision = useGetPolicyDecision();
  const coverageList = useGetCoverageList();
  const dbCoverageList = useSelector(({ [NAMESPACE]: modelnamespace }: any) => {
    return modelnamespace?.businessData?.policyList?.[0]?.coverageList || [];
  });
  const dispatch = useDispatch();
  const { caseCategory, activityKey } = useSelector(
    ({ processTask }: any) => processTask.getTask || {}
  );

  const decisionCode = formUtils.queryValue(
    lodash.chain(policyDecision).get('decisionCode').value()
  );
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const facultativeOptionVisible = useGetFacultativeOptionVisible();
  const facultativeReasonVisible = useGetFacultativeReasonVisible();
  const isProceedGetFacultativeInfo = useProceedGetFacultativeInfo();
  const isPostQC =
    caseCategory === CaseCategory.BP_NB_CTG003 && activityKey === TaskDefKey.BP_NB_ACT008;

  const facultativeInfo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.facultativeInfo,
    shallowEqual
  );

  const loadFacutativeInfoChangeFlag = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.loadFacutativeInfoChangeFlag,
    shallowEqual
  );

  useEffect(() => {
    if (taskNotEditable) {
      return;
    }

    lodash.forEach(coverageList, (coverage) => {
      if (isProceedGetFacultativeInfo && facultativeInfo === null) {
        return;
      }
      const { coreCode } = coverage;
      const dbCoverage = lodash.find(dbCoverageList, { coreCode });
      const info =
        lodash.find(facultativeInfo, {
          productCode: coreCode,
        }) || {};

      const { defaultValue } = info;

      const facultativePackageCodeFromDB = dbCoverage?.coverageDecision?.facultativePackageCode;
      const facultativePackageCode = formUtils.queryValue(
        coverage?.coverageDecision?.facultativePackageCode
      );
      let facultativePackageCodeValue = facultativePackageCode;

      // 特殊处理POST QC，存在admin用户，post qc可以修改decision code.
      // 如果是post qc流程
      // 且 acultative option 显示
      // 且 facultativeReasonValue为空
      // 则取数据库的值给facultativePackageCode
      if (isPostQC && facultativeOptionVisible && !facultativePackageCode) {
        facultativePackageCodeValue = facultativePackageCodeFromDB;
      }
      // facultative option 显示
      // 且 流程需要call getFacultativeInfo接口拿回defaultValue和displayFlag
      // 且 displayFlag = true
      // 且 facultativePackageCode 为空值
      // 符合以上条件才需要给facultativePackageCode默认值
      else if (
        facultativeOptionVisible &&
        isProceedGetFacultativeInfo &&
        info.displayFlag === true &&
        !facultativePackageCode
      ) {
        facultativePackageCodeValue = defaultValue;
      }
      // facultative option 不显示
      // 或 流程需要call getFacultativeInfo接口拿回displayFlag但是displayFlag=false
      // 符合以上条件需要把facultativePackageCode清空
      else if (
        !facultativeOptionVisible ||
        (isProceedGetFacultativeInfo && info.displayFlag === false)
      ) {
        facultativePackageCodeValue = undefined;
      }

      const facultativeReasonFromDB = dbCoverage?.coverageDecision?.facultativeReason;
      const facultativeReason = formUtils.queryValue(coverage?.coverageDecision?.facultativeReason);
      let facultativeReasonValue = facultativeReason;

      // 特殊处理POST QC，存在admin用户，post qc可以修改decision code.
      // 如果是post qc流程
      // 且 facultativeReasonVisible = true
      // 且 facultativeReasonValue为空
      // 则取数据库的值给facultativeReason
      if (isPostQC && facultativeReasonVisible && !facultativeReason) {
        facultativeReasonValue = facultativeReasonFromDB;
      }
      // facultative reason 显示
      // 且 流程需要call getFacultativeInfo接口拿回defaultValue和displayFlag
      // 且 displayFlag = true
      // 且 facultativeReason 为空值
      // 符合以上条件才需要给facultativeReason默认值
      // MDLTH-8139:去掉添加默认值的逻辑
      else if (
        facultativeReasonVisible &&
        isProceedGetFacultativeInfo &&
        info.displayFlag === true &&
        !facultativeReason
      ) {
        // facultativeReasonValue = FacultativeReasonDefaultValue;
      }
      // facultative reason 不显示
      // 或 流程需要call getFacultativeInfo接口拿回displayFlag但是displayFlag=false
      // 符合以上条件需要把facultativeReason清空
      else if (
        !facultativeReasonVisible ||
        (isProceedGetFacultativeInfo && info.displayFlag === false)
      ) {
        facultativeReasonValue = undefined;
      }

      if (
        facultativePackageCode !== facultativePackageCodeValue ||
        facultativeReason !== facultativeReasonValue
      ) {
        dispatch({
          type: `${NAMESPACE}/setFacultativeValue`,
          payload: {
            changedFields: {
              facultativeReason: facultativeReasonValue,
              facultativePackageCode: facultativePackageCodeValue,
            },
            coverageId: coverage?.id,
          },
        });
      }
    });
  }, [
    decisionCode,
    loadFacutativeInfoChangeFlag,
    dispatch,
    facultativeInfo,
    coverageList,
    facultativeOptionVisible,
    facultativeReasonVisible,
    dbCoverageList,
  ]);
};
