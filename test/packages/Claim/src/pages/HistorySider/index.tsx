import React from 'react';
import lodash from 'lodash';
import navigatorCaseOperationControllerService from '@/services/navigatorCaseOperationControllerService';
import { useSelector, useDispatch } from 'dva';
import DetailSider from 'navigator/components/DetailSider';
import SiderBarButton from '@/components/SiderBarButton';
import BackButton from '@/components/BackButton/SiderBarBackButton';
import CaseCategory from 'enum/CaseCategory';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import TaskStatus from 'basic/enum/TaskStatus';
import { notification } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetReverseShow from './useGetReverseShow';

export default ({ claimProcessData, caseNo, result, modelnamespace }: any) => {
  const dispatch = useDispatch();

  const showReverse = useGetReverseShow();
  const { inquiryClaimNo: businessNo, status, caseCategory, claimNo, companyCode }: any = claimProcessData || {};
  const userId = useSelector(({ user }: any) => user?.currentUser?.userId) || '';


  const handleReverse = () => {
    handleWarnMessageModal(
      [{ content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000628' }) }],
      {
        okFn: async () => {
          const response: any = await navigatorCaseOperationControllerService.reverse({
            caseNo,
            businessNo: companyCode ==='Assurance'? claimNo : businessNo,
            inquiryBusinessNo: businessNo,
            caseCategory,
            operationType: 'reversed',
            updateBy: userId,
          });
          if (response?.success) {
            notification.success({
              message: 'Reverse successfully!',
            });
            dispatch({
              type: `${modelnamespace || 'HKCLMOfClaimAssessmentController'}/getClaimData`,
              payload: {
                caseCategory,
                claimNo,
              },
            });
          }
        },
      }
    );
  };

  const isHK = lodash.includes(
    [CaseCategory.HK_CLM_CTG001, CaseCategory.HK_CLM_CTG002, CaseCategory.BP_CLM_CTG005, CaseCategory.BP_CLM_CTG009],
    caseCategory
  );

  return (
    <DetailSider>
      <BackButton />
      {!!isHK && !caseNo && !!showReverse && (
        <SiderBarButton 
          key={'reverse'}
          className={'reverse'}
          onClick={handleReverse}
          icon={'appeal'}
          disabled={status === TaskStatus.reversed}
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.caseDetail.reverse',
          })}
        />
      )}
    </DetailSider>
  );
};
