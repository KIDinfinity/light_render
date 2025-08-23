import React, { useState, useMemo } from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { TREATMENTITEM } from '@/utils/claimConstant';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import ResizeModal from '@/components/ResizeModal';
import PopUp from '../PopUp';
import { formUtils } from 'basic/components/Form';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import styles from './Item.less';

const ExpandExtra = ({ incidentId, incidentItemExpandStatus, hasTreatment }: any) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const editable = !useSelector(({ claimEditable }: any) => claimEditable?.taskNotEditable);

  const claimNo = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimProcessData?.claimNo
  );
  const insured = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimProcessData?.insured
  );
  const handleAdd = () => {
    const treatmentId = uuidv4();
    const treatmentAdd = {
      ...TREATMENTITEM,
      claimNo,
      id: treatmentId,
      incidentId,
      treatmentNo: 1,
    };
    dispatch({
      type: 'JPCLMOfDataCapture/treatmentAdd',
      payload: {
        incidentId,
        treatmentAdd,
      },
    });
  };
  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfDataCapture/incidentDelete',
      payload: {
        incidentId,
      },
    });
  };
  const onClose = () => {
    dispatch({
      type: 'JPCLMOfDataCapture/setIncidentItemExpandStatus',
      payload: {
        id: incidentId,
        status: false,
      },
    });
  };

  const onOpenModal = () => {
    dispatch({
      type: 'JPCLMOfDataCapture/getPopUpInfo',
      payload: {
        clientId: formUtils.queryValue(insured?.insuredId),
      },
    });
    setVisible(true);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     onOpenModal();
  //   }, 2000);
  // }, []);

  const klipCaseInfoList = useSelector(
    ({ JPCLMOfDataCapture }: any) =>
      JPCLMOfDataCapture?.claimEntities?.incidentListMap?.[incidentId]?.klipCaseInfoList
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
      {incidentItemExpandStatus && !hasTreatment && editable && (
        <Button size="small" onClick={handleAdd}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
          })}
        </Button>
      )}
      <ButtonOfSmall icon="minus" handleClick={onClose} />
      {editable && <ButtonOfSmall icon="close" handleClick={handleDelete} />}
      <ResizeModal visible={visible} setVisible={setVisible}>
        <PopUp incidentId={incidentId} />
      </ResizeModal>
    </div>
  );
};

export default ExpandExtra;
