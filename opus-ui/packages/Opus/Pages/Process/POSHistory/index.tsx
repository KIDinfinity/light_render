import React, { useEffect, useState } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import {
  tarckInquiryLoad,
  tarckUnload,
  eEventName,
  eEventOperation,
} from '@/components/TarckPoint';
import { useSearchParams } from 'umi';
import HistoryEntrance from 'claim/pages/ClaimHistory/HistoryEntrance';
import config from './config';
import { ErrorTypeEnum } from '@/enum/ErrorType';
import AuthPremission from '@/auth/Authorized/AuthPremission';
import SiderTabs from 'opus/Modules/SiderTabs';
import styles from './index.less';

export default function ClaimHistory(props) {
  const dispatch = useDispatch();
  const [renderStatus, setRenderStatus] = useState(false);
  const [search] = useSearchParams();
  const caseCategory = search.get('caseCategory');
  const businessNo = search.get('businessNo');
  const caseNo = search.get('caseNo');

  useEffect(() => {
    async function a() {
      const historyComponentConfig = lodash
        .chain(config)
        .find((item: any) => lodash.includes(item.caseCategory, caseCategory))
        .value();
      let result: any = {};
      if (historyComponentConfig) {
        result = await dispatch({
          type: `${historyComponentConfig.NAMESPACE}/${historyComponentConfig.initEffect}`,
          payload: {
            caseCategory,
            businessNo,
          },
        });

        if (!result?.success && result?.type === ErrorTypeEnum.DataAuthorityException) {
          await dispatch({
            type: 'authController/saveNoPermissionClaimNos',
            payload: {
              claimNo: businessNo,
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

      // history TAT
      tarckInquiryLoad({
        ...props,
        caseNo: caseNo,
        dispatch,
        businessData: result?.resultData,
        eventName: eEventName.posHistory,
        eventOperation: eEventOperation.viewDetail,
      });
      setRenderStatus(true);
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
  }, [caseCategory, businessNo]);

  const HistoryComponent = () => {
    const historyComponent = lodash
      .chain(config)
      .find((item: any) => lodash.includes(item.caseCategory, caseCategory))
      .get('component')
      .value();

    return historyComponent ? (
      historyComponent({
        taskNotEditable: true,
        params: { caseCategory, claimNo: businessNo, caseNo },
      })
    ) : (
      <HistoryEntrance />
    );
  };

  return (
    <>
      <AuthPremission type="history" claimNo={businessNo}>
        <div id="LoadableComponent" className={styles.processlayout}>
          <div className={styles.main}>{renderStatus && HistoryComponent()}</div>
          <div className={styles.sider}>
            <SiderTabs />
          </div>
        </div>
      </AuthPremission>
    </>
  );
}
