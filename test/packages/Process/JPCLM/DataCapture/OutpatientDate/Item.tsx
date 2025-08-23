import React, { useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { Button, Icon } from 'antd';
import { FormCard } from 'basic/components/Form';
import OutpatientDate from './OutpatientDate';
import DiagnosisNames from './DiagnosisNames';
import { formUtils } from 'basic/components/Form';
import styles from './Item.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const Item = ({ treatmentId, diagnosisIdList, outpatientDateList, group, incidentId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const [datepickerOpen, setDatepickerOpen] = useState(false);

  const diagnosisListMap = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimEntities.diagnosisListMap
  );

  const incidentDiagnosisIdList =
    useSelector(
      ({ JPCLMOfDataCapture }: any) =>
        JPCLMOfDataCapture.claimEntities.incidentListMap?.[incidentId]?.diagnosisList
    ) || [];

  const diagnosisList =
    lodash.filter(
      diagnosisListMap,
      (dictionasis) =>
        lodash.some(incidentDiagnosisIdList, (id) => id === dictionasis.id) &&
        formUtils.queryValue(dictionasis.diagnosisName) &&
        formUtils.queryValue(dictionasis.diagnosisName) !== ''
    ) || [];

  const deleteDates = (deleteDate: Date) => () => {
    if (deleteDate) {
      dispatch({
        type: 'JPCLMOfDataCapture/opTreatmentListDelete',
        payload: {
          treatmentId,
          deleteDate,
        },
      });
    } else {
      dispatch({
        type: 'JPCLMOfDataCapture/opTreatmentListDelete',
        payload: {
          treatmentId,
          group,
        },
      });
    }
  };

  const addDiagnosisItem = () => () => {
    dispatch({
      type: 'JPCLMOfDataCapture/opTreatmentListDiagnosisListAdd',
      payload: {
        treatmentId,
        group,
      },
    });
  };

  const deleteDiagnosis = (diagnosisNameId: any) => () => {
    dispatch({
      type: 'JPCLMOfDataCapture/opTreatmentListDiagnosisListDelete',
      payload: {
        treatmentId,
        group,
        diagnosisNameId,
      },
    });
  };

  return (
    <FormCard showButton={!!editable} handleClick={deleteDates()}>
      <p>
        {formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.diagnosis-code-name',
        })}
      </p>
      <div className={styles.diagnosisIdList}>
        {lodash.map(diagnosisIdList, (diagnosisName, index) => (
          <div className={styles.diagnosisNameItem} key={index}>
            <DiagnosisNames
              diagnosisName={diagnosisName}
              group={group}
              treatmentId={treatmentId}
              incidentId={incidentId}
              diagnosisIdList={diagnosisIdList}
            />
            {diagnosisIdList.length > 1 && !!editable && (
              <span className={styles.deleteDiagnosisButton}>
                <Icon type="minus-circle" theme="filled" onClick={deleteDiagnosis(diagnosisName)} />
              </span>
            )}
          </div>
        ))}
        {diagnosisIdList.length < diagnosisList.length && !!editable && (
          <Icon type="plus-circle" theme="filled" onClick={addDiagnosisItem()} />
        )}
      </div>
      <div className={styles.outpatient}>
        <div className={styles.title}>
          通院 <span>{lodash.size(outpatientDateList)}</span> 日
        </div>
        <div className={styles.chooseDate}>
          <Button onClick={() => setDatepickerOpen(!!editable)}>choose date</Button>
        </div>
        <div className={styles.OutpatientDate}>
          <OutpatientDate
            groupId={group}
            treatmentId={treatmentId}
            datepickerOpen={datepickerOpen}
            setDatepickerOpen={(flag) => setDatepickerOpen(flag)}
          />
        </div>
      </div>
      <div className={styles.datelist}>
        {lodash.map(outpatientDateList, (item) => (
          <div className={styles.item} key={item}>
            <div className={styles.checkCircle}>
              <Icon type="check-circle" theme="filled" />
            </div>
            <div className={styles.date}>{moment(item).format('YYYY/MM/DD')}</div>
            {lodash.size(outpatientDateList) > 1 && !!editable && (
              <div className={styles.close}>
                <Icon type="close" onClick={deleteDates(item)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </FormCard>
  );
};

export default Item;
