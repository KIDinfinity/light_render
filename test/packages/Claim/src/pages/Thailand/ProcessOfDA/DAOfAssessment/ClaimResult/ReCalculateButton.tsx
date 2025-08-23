import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';

import { messageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './AssessmentHandle.less';
import ErrorTip from '@/components/ErrorTooltip/ErrorTip';

const ReCalculateButton = ({ showRequiredError }) => {
  const dispatch = useDispatch();
  const [reCalcTrigger, setReCalcTrigger] = useState(false);
  const prevPropRef = useRef(showRequiredError);
  const loadingRef = useRef(false);
  useEffect(() => {
    if (prevPropRef.current && !showRequiredError && reCalcTrigger) {
      setReCalcTrigger(false);
    }
    prevPropRef.current = showRequiredError;
  }, [showRequiredError, reCalcTrigger]);
  const { benefitItemPayableListMap, reCalculateLoading, taskNotEditable, flags } = useSelector(
    (state: any) => ({
      benefitItemPayableListMap:
        state?.daOfClaimAssessmentController?.claimProcessData?.hasChangeSection
          ?.benefitItemPayableListMap,
      taskNotEditable: state?.claimEditable?.taskNotEditable,
      reCalculateLoading: state?.loading.effects['daOfClaimAssessmentController/reCalculate'],
      flags: state?.daOfClaimAssessmentController?.claimProcessData?.flags,
    })
  );

  const handleReCalculate = async () => {
    loadingRef.current = true;
    await dispatch({
      type: 'formCommonController/handleSubmited',
    });
    const errors = await dispatch({
      type: 'daOfClaimAssessmentController/validateFields',
      payload: {
        onlyRequired: true,
        skipValidateFormIds: [
          'treatmentPayableListItemAdd',
          'invoiceItemPayableItemAdd',
          '-claimDecision',
        ],
      },
    });

    if (
      (!lodash.isEmpty(errors) &&
        lodash
          .chain(errors)
          .flatMap()
          .some(
            (item) => item.message === formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' })
          )
          .value()) ||
      showRequiredError
    ) {
      loadingRef.current = false;

      setReCalcTrigger(true);
      return;
    }
    loadingRef.current = false;

    if (lodash.some(benefitItemPayableListMap, (item) => lodash.size(item) > 0)) {
      messageModal(
        {
          typeCode: 'Label_COM_WarningMessage',
          dictCode: 'MSG_000408',
        },
        {
          okFn: () => {
            dispatch({ type: 'daOfClaimAssessmentController/reCalculate' });
          },
          cancelFn: () => {},
        }
      );
      return;
    }
    await dispatch({ type: 'daOfClaimAssessmentController/reCalculate' });
    await dispatch({
      type: 'formCommonController/handleUnSubmited',
    });
  };
  return !taskNotEditable ? (
    <div className={styles.pr}>
      <Button
        onClick={handleReCalculate}
        disabled={lodash.chain(flags).split(',').includes('no_reassessment').value()}
        loading={loadingRef.current || reCalculateLoading}
        id="recalculate"
      >
        {formatMessageApi({
          Label_BPM_Button: 'ReCalculate',
        })}
      </Button>
      {showRequiredError && reCalcTrigger && (
        <ErrorTip
          defaultVisible={true}
          className={styles.errorIcon}
          noForm={true}
          getPopupContainer={(triggerNode) => triggerNode.parentNode.parentNode.parentNode}
          title={formatMessageApi(
            {
              Label_COM_WarningMessage: 'MSG_001296',
            },
            formatMessageApi({
              Label_BPM_Button: 'ReCalculate',
            })
          )}
        />
      )}
    </div>
  ) : null;
};

export default ReCalculateButton;
