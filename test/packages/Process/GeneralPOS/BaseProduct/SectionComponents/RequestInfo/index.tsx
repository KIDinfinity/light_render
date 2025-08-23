import React, { useContext, useState, useEffect } from 'react';
import { FormAntCard, formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector, useDispatch,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import Item from './Item';
import { Button, Icon, Tooltip } from 'antd';
import { isDecision, isPolicyExcluded } from 'process/GeneralPOS/common/utils';
import useCheckEffectiveDate from '../../_hooks/useCheckEffectiveDate';
import context from 'bpm/pages/OWBEntrance/Context/context.ts';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const ServicingRequestInfo = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { state, dispatch: contextDispatch } = useContext(context);

  const transactionTypesMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities?.transactionTypesMap
  );

  const isHistory = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isHistory);
  const transactionTypeCodes = lodash
    .values(transactionTypesMap)
    .map((item) => formUtils.queryValue(item?.transactionTypeCode));

  const showReAssess = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.showReAssess
  );
  const srvCaseIndicatorList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.srvCaseIndicatorList
  );
  const indicatorValueIsF =
    srvCaseIndicatorList?.find((item) => item.indicatorCode === 'requestPolicyIndicator')
      ?.indicatorValue === 'F';
  const sourceSystem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.sourceSystem
  );
  const { caseCategory } = useSelector(({ processTask }: any) => processTask.getTask, shallowEqual);

  const reAssessLoading = useSelector(
    ({ loading }: any) => loading.effects[`${NAMESPACE}/reAssess`]
  );
  const showButton = isDecision({ caseCategory });

  const editable =
    useSectionEditable(EditSectionCodeEnum.Transaction, false, 'RequestInfo') &&
    !isPolicyExcluded(sourceSystem);

  const effectiveDateHaveChanged = useCheckEffectiveDate();

  const reAss = async () => {
    await dispatch({
      type: `login/saveLoadingStatus`,
      payload: { loadingStatus: true },
    });
    if (indicatorValueIsF) {
      await dispatch({
        type: `${NAMESPACE}/reAssess`,
      });
      await dispatch({
        type: `login/saveLoadingStatus`,
        payload: { loadingStatus: false },
      });
      return;
    }
    if (!lodash.isEmpty(state?.errors?.filter((item) => item !== 'paymentStatus'))) {
      await dispatch({
        type: `login/saveLoadingStatus`,
        payload: { loadingStatus: false },
      });
      return;
    }
    setLoading(true);
    let errors: any = await dispatch({
      type: `${NAMESPACE}/validateFields`,
      payload: { type: 'reass' },
    });
    errors = errors?.filter(
      (item) => !item.some((childrenItem) => childrenItem?.field === 'paymentStatus')
    );
    setLoading(false);
    if (!lodash.isEmpty(errors)) {
      contextDispatch({
        type: 'setButtonStatusAndErrorCount',
        payload: {
          buttonCode: 'submit',
          status: 'error',
          errors,
        },
      });
      await dispatch({
        type: `login/saveLoadingStatus`,
        payload: { loadingStatus: false },
      });
      return;
    }
    await dispatch({
      type: `${NAMESPACE}/reAssess`,
    });
    await dispatch({
      type: `login/saveLoadingStatus`,
      payload: { loadingStatus: false },
    });
  };

  const showIcon =
    showReAssess?.show && showReAssess?.change && !lodash.isEmpty(showReAssess?.warnMessage);
  useEffect(() => {
    if (effectiveDateHaveChanged) {
      dispatch({
        type: `${NAMESPACE}/setShowReAssess`,
        payload: {
          showReAssess: {
            show: true,
            change: true,
            warnMessage: lodash.uniq([...(showReAssess?.warnMessage || []), 'MSG_000828']),
          },
        },
      });
    }
  }, [effectiveDateHaveChanged]);

  return (
    <div className={styles.transactionTypeSection}>
      <FormAntCard
        title={formatMessageApi({
          Label_BIZ_Claim: 'RequestInfo',
        })}
      >
        <Item />
      </FormAntCard>
      {showButton && !isHistory && (
        <Button
          disabled={!editable}
          loading={loading || reAssessLoading}
          className={styles.assButton}
          onClick={reAss}
        >
          {showIcon ? (
            <>
              <div className={styles.white} />
              <div className={styles.reBtnFlag}>
                <Tooltip
                  overlayClassName={styles.reBtnFlagTooltip}
                  title={showReAssess?.warnMessage?.map((item) =>
                    formatMessageApi({
                      Label_COM_WarningMessage: item,
                    })
                  )}
                >
                  <Icon type="exclamation-circle" className={styles.icon} theme="filled" />
                </Tooltip>
              </div>
            </>
          ) : null}
          {formatMessageApi({
            Label_BPM_Button: 'app.navigator.task-detail-of-claim-assessment.button.re-assessment',
          })}
        </Button>
      )}
    </div>
  );
};

export default ServicingRequestInfo;
