import { CaseManagement } from '@/auth/Constant';
import { getAuth } from '@/auth/Utils';
import BackButton from '@/components/BackButton';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Icon, Spin } from 'antd';
import CaseCategory from 'basic/enum/CaseCategory';
import useLoading from 'basic/hooks/useLoading';
import { ReactComponent as appealSvg } from 'bpm/assets/appeal-case.svg';
import { ReactComponent as AFISvg } from 'bpm/assets/appeal.svg';
import { ReactComponent as cameraSvg } from 'bpm/assets/camera.svg';
import { ReactComponent as EwsSvg } from 'bpm/assets/ews.svg';
import { ReactComponent as exitSvg } from 'bpm/assets/exit.svg';
import { ReactComponent as LightSvg } from 'bpm/assets/light.svg';
import { ReactComponent as PMASvg } from 'bpm/assets/PMA.svg';
import { ReactComponent as revertSvg } from 'bpm/assets/revert.svg';
import { ReactComponent as ruleResultsSvg } from 'bpm/assets/ruleResult.svg';
import { useSelector } from 'dva';
import lodash, { some } from 'lodash';
import React, { useCallback } from 'react';
import ProcessStatus from '../enum/ProcessStatus';
import styles from './LeftMenu.less';

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
  isShowRuleResultsButton,
  handleOpenruleResults,
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

  const commonAuthorityList =
    useSelector(({ authController }: any) => authController.commonAuthorityList) || [];

  return (
    <div className={styles.leftMenu} style={{ height: '70%', position: 'relative' }}>
      {!isCaseEnd && some(permissionMenus, (el) => el === CaseManagement.cancelCaseManagement) && (
        <div className={isCaseEnd ? '' : styles.exitBox}>
          <a onClick={endProcess}>
            {!isCaseEnd && <Icon component={exitSvg} className="bpm/exit.svg" />}
            <span>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.caseDetail.end-case',
              })}
            </span>
          </a>
        </div>
      )}
      {some(permissionMenus, (el) => el === CaseManagement.urgentCaseManagement) && (
        <div className={isCaseEnd ? styles.disabled : styles.box} onClick={rapidAndcancelrRapid}>
          <a>
            {urgent ? (
              <Icon component={LightSvg} className="urgent-svg urgent-svg-active" />
            ) : (
              <Icon component={LightSvg} className="urgent-svg" />
            )}
            <span>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.caseDetail.urgent',
              })}
            </span>
          </a>
        </div>
      )}
      <div className={isShowEwsButton ? styles.box : styles.hide} onClick={handleOpenEws}>
        <a>
          <Icon component={EwsSvg} />
          <span>
            {formatMessageApi({
              Label_BPM_Button: 'ews',
            })}
          </span>
        </a>
      </div>
      <div
        className={isShowRuleResultsButton ? styles.box : styles.hide}
        onClick={handleOpenruleResults}
      >
        <a>
          <Icon component={ruleResultsSvg} />
          <span>
            {formatMessageApi({
              Label_BPM_Button: 'RuleResult',
            })}
          </span>
        </a>
      </div>
      <div className={!isDocumentAllowed ? styles.hide : styles.box} onClick={documentManageOpen}>
        <a>
          <Icon component={cameraSvg} className="camera-svg" />
          <span>
            {formatMessageApi({
              Label_BPM_Button: 'image',
            })}
          </span>
        </a>
      </div>
      {isClaimReversal &&
        some(permissionMenus, (el) => el === CaseManagement.revertCaseManagement) && (
          <div className={styles.box} onClick={claimReversal}>
            <a>
              <Icon component={revertSvg} />
              <span>
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.caseDetail.revert',
                })}
              </span>
            </a>
          </div>
        )}
      {isClaimReverse &&
        some(permissionMenus, (el) => el === CaseManagement.RS_HK_Button_CaseMgm_Reverse) && (
          <div className={styles.box} onClick={handleClaimRevere}>
            <a>
              <Icon component={AFISvg} />
              <span>
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.caseDetail.reverse',
                })}
              </span>
            </a>
          </div>
        )}

      {[CaseCategory.BP_NB_CTG001, CaseCategory.BP_NB_CTG005].includes(caseCategory) &&
        isTargetStatus &&
        some(permissionMenus, (el) => el === CaseManagement.RS_NB_Button_CaseMgm_AFI) && (
          <div className={reversalLoading ? styles.disabled : styles.box} onClick={onReversalClick}>
            <a>
              <Icon component={reversalLoading ? Spin : AFISvg} />
              <span>
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.caseDetail.revert',
                })}
              </span>
            </a>
          </div>
        )}
      {!!isSendPMA && showPMA && (
        <div className={styles.box} onClick={hanleSendPMA}>
          <a>
            <Icon component={PMASvg} />
            <span>
              {' '}
              {formatMessageApi({
                Label_BIZ_Claim: 'CreateCheque',
              })}
            </span>
          </a>
        </div>
      )}
      {[CaseCategory.BP_CLM_CTG007, CaseCategory.BP_CLM_CTG008].includes(caseCategory) &&
        getAuth(commonAuthorityList, {
          authorityCode: 'ttttt',
        }) && isCaseEnd && (
          <div className={styles.box} onClick={handleAppeal}>
            <a>
              <Icon component={appealSvg} />
              <span>
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.caseDetail.appeal',
                })}
              </span>
            </a>
          </div>
        )}
      <BackButton />
    </div>
  );
};

export default React.memo(LeftMenu);
