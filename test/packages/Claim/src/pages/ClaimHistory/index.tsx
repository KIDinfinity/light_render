import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import {
  tarckInquiryLoad,
  tarckUnload,
  eEventName,
  eEventOperation,
} from '@/components/TarckPoint';
import HospitalIncomeModal from 'claim/components/CalculationPathModal/HospitalIncomeModal';
import OutPatientModal from 'claim/components/CalculationPathModal/OutPatientModal';
import InpatientPerDayModal from 'claim/components/CalculationPathModal/InpatientPerDayModal';
import HistoryEntrance from 'claim/pages/ClaimHistory/HistoryEntrance';
import config from './config';
import { ErrorTypeEnum } from '@/enum/ErrorType';
import AuthPremission from '@/auth/Authorized/AuthPremission';
import { history } from 'umi';
import queryString from 'query-string';

export default function ClaimHistory(props) {
  const dispatch = useDispatch();
  const noPermissionClaimNos = useSelector((state) => state.authController.noPermissionClaimNos);
  const query = queryString.parse(history.location.search);
  const { caseCategory, claimNo } = query;
  console.log('caseCategory, claimNo ', {caseCategory, claimNo })

  useEffect(() => {
    async function a() {
      const caseNo = await dispatch({
        type: 'workspaceHistory/getCaseNoByBusinessNo',
        payload: {
          claimNo,
        },
      });

      const historyComponentConfig = lodash
        .chain(config)
        .find((item: any) => lodash.includes(item.caseCategory, caseCategory))
        .value();

        console.log('historyComponentConfig', historyComponentConfig)
      let result: any = {};
      if (historyComponentConfig) {
        result = await dispatch({
          type: `${historyComponentConfig.NAMESPACE}/${historyComponentConfig.initEffect}`,
          payload: {
            caseCategory,
            claimNo,
          },
        });

        if (!result?.success && result?.type === ErrorTypeEnum.DataAuthorityException) {
          await dispatch({
            type: 'authController/saveNoPermissionClaimNos',
            payload: {
              claimNo,
              result: true,
            },
          });
        }

        dispatch({
          type: 'claimEditable/set',
          payload: {
            taskStatus: false,
            taskDefKey: '',
            submissionChannel: '',
            procActOrder: '',
          },
        });
      }

      dispatch({
        type: 'claimEditable/set',
        payload: {
          taskStatus: false,
          taskDefKey: '',
          submissionChannel: '',
          procActOrder: '',
        },
      });

      dispatch({
        type: 'global/changeLayoutHeader',
        payload: {
          isShowHeader: false,
        },
      });

      dispatch({
        type: 'envoyController/setSubcaseId',
        payload: {
          subcaseId: '',
        },
      });
      // Bridge Claim-360
      if (claimNo) {
        dispatch({
          type: 'insured360/saveTaskInfo',
          payload: {
            taskDetail: { caseCategory, claimNo },
          },
        });
      }

      // history TAT
      tarckInquiryLoad({
        ...props,
        caseNo,
        dispatch,
        businessData: result?.resultData,
        eventName: eEventName.claimHistory,
        eventOperation: eEventOperation.viewDetail,
      });
    }
    a();
    return () => {
      dispatch({
        type: 'global/changeLayoutHeader',
        payload: {
          isShowHeader: true,
        },
      });
      tarckUnload(props);
    };
  }, [caseCategory, claimNo]);

  const HistoryComponent = () => {
    const historyComponent = lodash
      .chain(config)
      .find((item: any) => lodash.includes(item.caseCategory, caseCategory))
      .get('component')
      .value();

    return historyComponent ? (
      historyComponent({ taskNotEditable: true, params: { caseCategory, claimNo } })
    ) : (
      <HistoryEntrance />
    );
  };

  return (
    <Suspense fallback={<></>}>
      <AuthPremission type="history" claimNo={claimNo}>
        <div id="LoadableComponent" style={{height: '100%'}}>
          {HistoryComponent()}
          {/**
    //@ts-ignore */}
          <HospitalIncomeModal title="modal" />
          <OutPatientModal />
          <InpatientPerDayModal />
        </div>
      </AuthPremission>
    </Suspense>
  );
}
