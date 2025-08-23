import React, { lazy, Suspense, useEffect, useMemo } from 'react';
import { useDispatch } from 'dva';
import { LS, LSKey } from '@/utils/cache';
import lodash from 'lodash';
import bpm from 'bpm/pages/OWBEntrance';
import eTaskStatus from 'claim/enum/TaskStatus';
import ETatButtonCode from 'claim/enum/ETatButtonCode';
import { tarckClaimLoad, tarckUnload, tarckClaimStatus } from '@/components/TarckPoint/utils';
import logButton from '@/components/AuditLog/API/logButton';
import owbConfig from './component.config';
import AuthPremission from '@/auth/Authorized/AuthPremission';
import CaseCategory from 'enum/CaseCategory';
import SnapshotCheckVersionModal from 'claim/utils/SnapshotCheckVersionModal';
import addUpdateDate from '@/utils/addUpdateDate';
import useAutoGetProcessJobInfo from 'navigator/components/CaseTaskDetail/hooks/useAutoGetProcessJobInfo';
import { useReadPrepareData } from '@/components/SolutionRead/Hooks';
import ErrorBoundary from '@/components/ErrorBoundary';
import { tenant, Region } from '@/components/Tenant';
import CaseContainer from 'basic/components/CaseContainer';

import { isOldNewBusinessUi } from 'process/Utils';

let preTaskDetail: any = null;

const IsolatedDataUpdate = ({ taskDetail, ...res }) => {
  useAutoGetProcessJobInfo(taskDetail?.processInstanceId);
  useReadPrepareData({ taskDetail });
  preTaskDetail = taskDetail;
  const requireTatButtonCode = lodash.values(ETatButtonCode);

  const dispatch = useDispatch();

  const isNB = [
    CaseCategory.BP_NB_CTG001,
    CaseCategory.BP_NB_CTG002,
    CaseCategory.BP_NB_CTG003,
    CaseCategory.BP_NB_CTG004,
    CaseCategory.BP_AP_CTG02,
    CaseCategory.BP_NB_CTG005,
  ].includes(taskDetail.caseCategory);
  const someClaim =
    [CaseCategory.HK_CLM_CTG002, CaseCategory.HK_CLM_CTG001].includes(taskDetail.caseCategory) &&
    tenant.region() === Region.HK;
  const someJPClaim =
    [
      CaseCategory.JP_CLM_CTG001,
      CaseCategory.JP_CLM_CTG002,
      CaseCategory.JP_CLM_CTG004,
      CaseCategory.JP_CLM_CTG005,
    ].includes(taskDetail.caseCategory) && tenant.region() === Region.JP;

  bpm.setCommonActionLife({
    before: async (options: { buttonCode: any }) => {
      const { buttonCode } = options;
      const shouldCheckVersion =
        (isNB || someClaim || someJPClaim) && ['save', 'submit'].includes(buttonCode);

      if (shouldCheckVersion) {
        const { success, versionNo, userName } =
          (await dispatch({
            type: 'task/checkVersion',
            payload: { taskId: taskDetail?.taskId },
          })) || {};
        if (!success) {
          await SnapshotCheckVersionModal({ versionNo, userName });
        }
      }
    },
    after: async (options: any) => {
      const { buttonCode, versionNo } = options;
      if (['save', 'withdraw', 'submit', 'resume', 'appeal'].includes(buttonCode)) {
        await addUpdateDate(options?.taskDetail?.caseNo);
      }
      const shouldCheckVersion = (isNB || someClaim) && ['save', 'submit'].includes(buttonCode);

      if (shouldCheckVersion) {
        if (versionNo) {
          await dispatch({
            type: 'task/saveVersion',
            payload: {
              currentVersion: versionNo,
            },
          });
        } else {
          await dispatch({
            type: 'task/updateVersion',
            payload: { taskId: options?.taskDetail?.taskId },
          });
        }
      }
      if (lodash.includes(requireTatButtonCode, buttonCode)) {
        await tarckClaimStatus({ dispatch, targetStatus: eTaskStatus.Completed });
      }
      if (!['approval'].includes(buttonCode)) {
        await logButton({
          ...options,
          taskId: options?.taskDetail?.taskId,
          caseNo: options?.taskDetail?.caseNo,
          activityKey: options?.taskDetail?.activityKey,
        });
      }
    },
  });

  useEffect(() => {
    tarckClaimLoad({
      dispatch,
      taskDetail,
      businessData: res?.businessData,
    });

    if (
      taskDetail?.taskId &&
      taskDetail?.taskId === preTaskDetail?.taskId &&
      taskDetail?.taskStatus !== preTaskDetail?.taskStatus
    ) {
      tarckClaimStatus({ dispatch, targetStatus: taskDetail?.taskStatus });
    }

    dispatch({
      type: 'formCommonController/handleUnSubmited',
    });

    return () => {
      tarckUnload({ dispatch });
    };
  }, []);

  useEffect(() => {
    return () => {
      const reAssessmentTimer = LS.getItem(LSKey.REASSESSMENTTIMER, false);
      clearInterval(reAssessmentTimer);
      LS.removeItem(LSKey.REASSESSMENTTIMER);
    };
  }, []);

  // useEffect(() => {
  //   dispatch({
  //     type: 'solutionRead/getReaderData',
  //   });
  // }, [taskDetail]);
  return null;
};

export default ({ taskDetail = {}, ...res }: any) => {
  const { caseCategory, taskDefKey } = taskDetail;
  // const isNewNBUI = getNewNBUI(taskDetail);
  const isOldNewBusiness = isOldNewBusinessUi({ caseCategory, taskDefKey });

  const config = owbConfig;
  const _config = useMemo(() => {
    if (!!isOldNewBusiness) {
      return lodash.find(
        config || [],
        ({ caseCategory: configCaseCategory }: any) =>
          lodash.toUpper(configCaseCategory) === lodash.toUpper(`${caseCategory}_process`)
      );
    }

    const sameCaseCategoryConfig = config.reduce((acc: any[], item: any) => {
      return lodash.includes(
        lodash.toUpper(item.caseCategory),
        lodash.isString(caseCategory) ? lodash.toUpper(caseCategory) : caseCategory
      )
        ? acc.concat(item)
        : acc;
    }, []);

    const regionConfig = sameCaseCategoryConfig.find((item: any) => {
      return tenant.region() === item.region;
    });

    return regionConfig
      ? regionConfig
      : lodash.find(sameCaseCategoryConfig, (item) => {
          return lodash.isString(item.caseCategory)
            ? item.caseCategory === lodash.toUpper(caseCategory)
            : lodash.includes(item.caseCategory, lodash.toUpper(caseCategory));
        });
  }, [taskDetail, caseCategory]);

  const Component = _config?.taskDefKey?.[taskDefKey] || lazy(() => import('./Default'));

  return (
    <ErrorBoundary panelName="PageDetailLayout">
      <Suspense fallback={<></>}>
        <AuthPremission type="history">
          <CaseContainer>
            <Component taskDetail={taskDetail} {...res} />
          </CaseContainer>
        </AuthPremission>
      </Suspense>
      <IsolatedDataUpdate taskDetail={taskDetail} {...res} />
    </ErrorBoundary>
  );
};
