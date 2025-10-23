import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import {
  tarckInquiryLoad,
  tarckUnload,
  eEventName,
  eEventOperation,
} from '@/components/TarckPoint';
import HistoryEntrance from 'claim/pages/ClaimHistory/HistoryEntrance';
import { tenant } from '@/components/Tenant';
import config from './config';
import { ErrorTypeEnum } from '@/enum/ErrorType';
import Header from 'bpm/pages/OWBEntrance/Entrance/OpusNBHistoryHeader';
import Sider from 'bpm/pages/OWBEntrance/Sider/Sider';
import SiderTabs from 'opus/Modules/SiderTabs';
import AuthPremission from '@/auth/Authorized/AuthPremission';
import styles from './index.less';
import convert_businessDataBEToFE from 'opus/Utils/convert_businessDataBEToFE';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { validateReopen } from '@/services/owbNbAppealControllerService';
import { getCategoryPermission } from '@/services/rbac2PermissionLimitControllerService';
import queryString from 'query-string';
import { history } from 'umi';
import { checkAppealAuth } from 'opus/NewBusiness/ManualUnderwriting/_utils';

export default function NBHistory(props: any) {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.currentUser.userId);

  const [nbHistoryData, setNBHistoryData] = useState({});
  const [showReopen, setShowReopen] = useState(false);
  const [reopenDisabled, setReopenDisabled] = useState(true);
  const [caseNo, setCaseNo] = useState('');

  const query = queryString.parse(history.location.search);
  const { caseCategory, businessNo, taskId } = query || {};

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
            ...(!!taskId
              ? { taskId }
              : {
                  caseCategory,
                  businessNo,
                }),
          },
        });

        const busiData = lodash.get(result, 'resultData.businessData');
        const caseNo = result?.resultData?.businessData?.caseNo;
        const NewBusiness = convert_businessDataBEToFE({ requestData: busiData }, tenant.region());
        setCaseNo(caseNo);
        setNBHistoryData(NewBusiness);
        const laCompanyCode = busiData?.laCompanyCode ?? '2';
        const { taskDetail = {} } = window as any;
        (window as any).taskDetail = { ...taskDetail, companyCode: laCompanyCode };

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
        caseNo: result.resultData?.businessData?.caseNo,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseCategory, businessNo]);

  useEffect(() => {
    if (!lodash.isEmpty(nbHistoryData)) {
      async function getShowReopen() {
        const res = await validateReopen({ businessNo });

        if (res?.success) {
          setShowReopen(res.resultData?.display || false);
        }

        const editableRes = await getCategoryPermission({
          taskInfo: {
            activityKey: 'HIS_NB_001',
            businessNo,
            caseCategory: 'HIS_NB_001',
          },
          categoryCodeList: ['reOpenView'],
          userId,
        });

        if (editableRes?.success) {
          const match = editableRes.resultData?.find(
            (item: any) => item.categoryCode === 'reOpenView'
          );

          if (match) {
            setReopenDisabled(!match.result);
          }
        }
      }

      getShowReopen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nbHistoryData]);

  const HistoryComponent = () => {
    const historyComponent = lodash
      .chain(config)
      .find((item: any) => lodash.includes(item.caseCategory, caseCategory))
      .get('component')
      .value();

    return historyComponent ? (
      !lodash.isEmpty(nbHistoryData) &&
        historyComponent({
          taskNotEditable: true,
          params: {
            caseCategory,
            claimNo: businessNo,
          },
          businessData: nbHistoryData,
          taskDetail: {
            businessNo,
            caseCategory,
            submissionChannel: nbHistoryData?.submissionChannel,
          },
        })
    ) : (
      <HistoryEntrance />
    );
  };

  return (
    <>
      <AuthPremission type="history" claimNo={businessNo} caseDetailCaseNo="">
        <div id="LoadableComponent" className={styles.nbHistory}>
          <div className={styles.wrapper}>
            <Header />
            <div className={styles.sider}>
              <Sider
                buttonList={
                  showReopen
                    ? [
                        {
                          buttonCode: 'reopen',
                          title: formatMessageApi({ Label_COM_Opus: 'Reopen' }),
                          disabled: reopenDisabled,
                          action: async () => {
                            try {
                              await checkAppealAuth({ businessNo, caseNo });
                              dispatch({
                                type: `${NAMESPACE}/setInformationModalShow`,
                                payload: {
                                  category: 'AppealNote',
                                  taskDetail: {
                                    businessNo,
                                    caseCategory: 'HIS_NB_001', // nb history 固定值
                                    activityKey: 'HIS_NB_001', // nb history 固定值
                                  },
                                },
                              });
                            } catch (error) {
                              dispatch({
                                type: `${NAMESPACE}/setInformationModalShow`,
                                payload: {
                                  cancel: true,
                                },
                              });
                            }
                          },
                        },
                      ]
                    : []
                }
              />
            </div>
            <div className={styles.content}>{HistoryComponent()}</div>
          </div>

          <div className={styles.siderTabs}>
            <SiderTabs />
          </div>
        </div>
      </AuthPremission>
    </>
  );
}
