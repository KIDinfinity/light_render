import { CaseManagement } from '@/auth/Constant';
import BackButton from '@/components/BackButton/SiderBarBackButton';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Spin } from 'antd';
import CaseCategory from 'basic/enum/CaseCategory';
import useLoading from 'basic/hooks/useLoading';
import SiderBarButton from '@/components/SiderBarButton'
import { ReactComponent as appealSvg } from 'bpm/assets/appeal-case.svg';
import { ReactComponent as AFISvg } from 'bpm/assets/appeal.svg';
import { ReactComponent as cameraSvg } from 'bpm/assets/camera.svg';
import { ReactComponent as EwsSvg } from 'bpm/assets/ews.svg';
import { ReactComponent as exitSvg } from 'bpm/assets/exit.svg';
import { ReactComponent as LightSvg } from 'bpm/assets/light.svg';
import { ReactComponent as PMASvg } from 'bpm/assets/PMA.svg';
import { ReactComponent as revertSvg } from 'bpm/assets/revert.svg';
import { ReactComponent as ruleResultsSvg } from 'bpm/assets/ruleResult.svg';
import lodash, { some } from 'lodash';
import React, { useCallback } from 'react';
import ProcessStatus from '../enum/ProcessStatus';

const LeftMenu = ({
  rapidAndcancelrRapid,
  isCaseEnd,
  isDocumentAllowed,
  urgent,
  endProcess,
  isClaimReversal,
  isClaimReverse,
  claimReversal,
  handleClaimRevere,
  permissionMenus = [],
  documentManageOpen,
  handleOpenEws,
  handleAFI,
  hanleSendPMA,
  handleAppeal,
  isShowEwsButton,
  caseCategory,
  status,
  isSendPMA,
  showPMA,
  loadingPMA,
  isShowRuleResultsButton,
  handleOpenruleResults,
  compressed
}: any) => {
  const isTargetStatus = (() => {
    const targetStatusList = [ProcessStatus.completed, ProcessStatus.NTU, ProcessStatus.withdrawal];
    return lodash.includes(targetStatusList, status);
  })();

  const { loading: reversalLoading, setLoading: setReversalLoading } = useLoading();

  const onReversalClick = useCallback(async () => {
    setReversalLoading(true);

    if (handleAFI) {
      setTimeout(() => {
        setReversalLoading(false);
      }, 3500);

      await handleAFI();

      setReversalLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleAFI]);
  return (
    <>
      {!isCaseEnd && some(permissionMenus, (el) => el === CaseManagement.cancelCaseManagement) && (
        <SiderBarButton 
          key={'end-case'}
          onClick={endProcess}
          compressed={compressed}
          className={'cm-end-case'}
          IconClassName='bpm/exit.svg'
          component={exitSvg}
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.caseDetail.end-case',
          })}
        />
      )}
      {some(permissionMenus, (el) => el === CaseManagement.urgentCaseManagement) && (
        <SiderBarButton 
          key={'urgent'}
          onClick={rapidAndcancelrRapid}
          className={'cm-urgent'}
          compressed={compressed}
          IconClassName={urgent? 'urgent-svg urgent-svg-active' : 'urgent-svg'}
          component={LightSvg}
          disabled={isCaseEnd}
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.caseDetail.urgent',
          })}
        />
      )}
      {
        isShowEwsButton && (
          <SiderBarButton 
            key={'ews'}
            onClick={handleOpenEws}
            className={'cm-ews'}
            compressed={compressed}
            component={EwsSvg}
            title={formatMessageApi({
              Label_BPM_Button: 'ews',
            })}
          />
        )
      }
      {
        isShowRuleResultsButton && (
          <SiderBarButton 
            key={'ruleResult'}
            className={'cm-rule-result'}
            onClick={handleOpenruleResults}
            compressed={compressed}
            component={ruleResultsSvg}
            title={formatMessageApi({
              Label_BPM_Button: 'RuleResult',
            })}
          />
        )
      }
      {
        isDocumentAllowed && (
          <SiderBarButton 
            key={'document'}
            onClick={documentManageOpen}
            className={'cm-document'}
            compressed={compressed}
            IconClassName={'camera-svg'}
            component={cameraSvg}
            title={formatMessageApi({
              Label_BPM_Button: 'image',
            })}
          />
        )
      }
      {isClaimReversal &&
        some(permissionMenus, (el) => el === CaseManagement.revertCaseManagement) && (
          <SiderBarButton 
            key={'claimReversal'}
            onClick={claimReversal}
            className={'cm-revert'}
            compressed={compressed}
            component={revertSvg}
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.caseDetail.revert',
            })}
          />
        )}
      {isClaimReverse &&
        some(permissionMenus, (el) => el === CaseManagement.RS_HK_Button_CaseMgm_Reverse) && (
          <SiderBarButton 
            key={'reverse'}
            className={'cm-reverse'}
            onClick={handleClaimRevere}
            compressed={compressed}
            component={AFISvg}
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.caseDetail.reverse',
            })}
          />
        )}

      {[CaseCategory.BP_NB_CTG001, CaseCategory.BP_NB_CTG005].includes(caseCategory) &&
        isTargetStatus &&
        some(permissionMenus, (el) => el === CaseManagement.RS_NB_Button_CaseMgm_AFI) && (
          <SiderBarButton 
            key={'revert'}
            className={'cm-revert2'}
            onClick={onReversalClick}
            compressed={compressed}
            component={reversalLoading ? Spin : AFISvg}
            disabled={reversalLoading}
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.caseDetail.revert',
            })}
          />
        )}
      {!!isSendPMA && showPMA && (
        <SiderBarButton 
          key={'PMA'}
          onClick={hanleSendPMA}
          className={'cm-pma'}
          compressed={compressed}
          component={PMASvg}
          disabled={loadingPMA}
          title={formatMessageApi({
            Label_BIZ_Claim: 'createCheque',
          })}
        />
      )}
      {[CaseCategory.BP_CLM_CTG007, CaseCategory.BP_CLM_CTG008].includes(caseCategory) &&
        isCaseEnd && (
          <SiderBarButton 
            key={'appeal'}
            className={'cm-appeal'}
            onClick={handleAppeal}
            compressed={compressed}
            component={appealSvg}
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.caseDetail.appeal',
            })}
          />
        )}
      <BackButton compressed={compressed} />
    </>
  );
};

export default React.memo(LeftMenu);
