import React, { useState, useMemo } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ResizeModal from '@/components/ResizeModal';
import { formUtils } from 'basic/components/Form';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import PopUp from '../PopUp';
import styles from './Item.less';

const ExpandExtra = ({ incidentId }: any) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const insured = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.claimProcessData?.insured
  );
  const onOpenModal = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/getPopUpInfo',
      payload: {
        clientId: formUtils.queryValue(insured?.insuredId),
      },
    });
    setVisible(true);
  };

  const klipCaseInfoList = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment?.claimEntities?.incidentListMap?.[incidentId]?.klipCaseInfoList
  );
  const hasErrors = useMemo(() => {
    return !lodash.isEmpty(formUtils.getErrorArray(klipCaseInfoList));
  }, [klipCaseInfoList]);

  return (
    <div className={styles.cardExtra}>
      <Button size="small" onClick={onOpenModal}>
        {formatMessageApi({
          Label_BIZ_Claim: 'ExtSystemInfo',
        })}
        {hasErrors && <ErrorTooltipManual />}
      </Button>
      <ResizeModal visible={visible} setVisible={setVisible}>
        <PopUp incidentId={incidentId} />
      </ResizeModal>
    </div>
  );
};

export default ExpandExtra;
