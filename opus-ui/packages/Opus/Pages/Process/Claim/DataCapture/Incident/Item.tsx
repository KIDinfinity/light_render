import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Icon, Button } from 'antd';
import { formUtils } from 'basic/components/Form';
import { ReactComponent as incidentSvg } from 'opus/Pages/Process/Claim/Assets/AssessmentTitleIncident.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import Expand from './Expand';
import TreatmentList from '../Treatment/List';
import styles from './Item.less';
import { NAMESPACE } from '../activity.config';
import PopUp from '../PopUp';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';

const Item = ({
  incidentId,
  total,
  index,
}: {
  incidentId: string;
  total: number;
  index: number;
}) => {
  const [visible, setVisible] = useState(false);
  const incidentItem = useSelector(
    ({ opusClaimDataCapture }: any) =>
      opusClaimDataCapture.claimEntities?.incidentListMap?.[incidentId]
  );
  const dispatch = useDispatch();
  const insured = useSelector(
    ({ opusClaimDataCapture }: any) => opusClaimDataCapture.claimProcessData?.insured
  );
  const onOpenModal = () => {
    dispatch({
      type: 'opusClaimDataCapture/getPopUpInfo',
      payload: {
        clientId: formUtils.queryValue(insured?.insuredId),
      },
    });
    dispatch({
      type: `${NAMESPACE}/initIntegration`,
      payload: {
        incidentId,
      },
    });
    setVisible(true);
  };

  const klipCaseInfoList = useSelector(
    ({ opusClaimDataCapture }: any) =>
      opusClaimDataCapture?.claimEntities?.incidentListMap?.[incidentId]?.klipCaseInfoList
  );
  const hasErrors = useMemo(() => {
    return !lodash.isEmpty(formUtils.getErrorArray(klipCaseInfoList));
  }, [klipCaseInfoList]);

  return (
    <div className={styles.incidentHeader} id={incidentId}>
      <div className={styles.titleRow}>
        <Icon component={incidentSvg} className={styles.titleIcon} />
        {formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.incidentInformation' })}
        <div className={styles.gap} />
        <Button onClick={onOpenModal}>
          {formatMessageApi({
            Label_BIZ_Claim: 'KLIPCaseInfo',
          })}
          {hasErrors && <ErrorTooltipManual />}
        </Button>
      </div>
      <div className={styles.innerCard}>
        <Expand {...{ incidentId, incidentItem, index, disableDelete: total === 1 }} />
        <TreatmentList incidentId={incidentId} />
      </div>
      <PopUp incidentId={incidentId} switchOn={visible} setSwitchOn={setVisible} />
    </div>
  );
};

export default Item;
