import React, { PureComponent } from 'react';
import { connect } from 'dva';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { Card, Button } from 'antd';
import { TREATMENTITEM, INVOICEITEM, SERVICEITEM } from '@/utils/claimConstant';
import rulesOfDataCaptrue from '@/utils/rulesOfDataCaptrue';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import IncidentListItemOfBasicInfo from './IncidentListItemOfBasicInfo';
import DiagnosisList from '../Diagnosis/DiagnosisList';
import styles from './IncidentListItem.less';

@connect(({ PHCLMOfDataCaptureController, claimEditable }: any) => ({
  submited: PHCLMOfDataCaptureController.submited,
  claimNo: lodash.get(PHCLMOfDataCaptureController, 'claimProcessData.claimNo'),
  taskNotEditable: claimEditable.taskNotEditable,
}))
class IncidentItem extends PureComponent {
  handleDelete = () => {
    const { dispatch, incidentId }: any = this.props;

    dispatch({
      type: 'PHCLMOfDataCaptureController/removeIncidentItem',
      payload: {
        incidentId,
      },
    });
  };

  handleAdd = () => {
    const { claimNo, incidentId, dispatch }: any = this.props;
    const treatmentId = uuidv4();
    const invoiceId = uuidv4();
    const serviceItemId = uuidv4();

    const addTreatmentItem = {
      ...TREATMENTITEM,
      claimNo,
      id: treatmentId,
      incidentId,
      invoiceList: [invoiceId],
      treatmentNo: 1,
    };
    const addInvoiceItem = {
      ...INVOICEITEM,
      claimNo,
      id: invoiceId,
      serviceItemList: [serviceItemId],
      treatmentId,
    };
    const addServiceItem = {
      ...SERVICEITEM,
      claimNo,
      id: serviceItemId,
      invoiceId,
    };

    dispatch({
      type: 'PHCLMOfDataCaptureController/addTreatmentItem',
      payload: {
        incidentId,
        addTreatmentItem,
        addInvoiceItem,
        addServiceItem,
      },
    });
  };

  onClose = () => {
    const { dispatch, incidentId }: any = this.props;

    dispatch({
      type: 'PHCLMOfDataCaptureController/setIncidentItemExpandStatus',
      payload: {
        id: incidentId,
        status: false,
      },
    });
  };

  render() {
    const {
      incidentId,
      incidentItem,
      incidentItemExpandStatus,
      submited,
      taskNotEditable,
    }: any = this.props;
    const showOutPatientHint =
      !rulesOfDataCaptrue.calcTreatmentTypeOK(incidentItem, 'OP').isOK === true;
    const showInPatientHint =
      !rulesOfDataCaptrue.calcTreatmentTypeOK(incidentItem, 'IP').isOK === true;
    const hasTreatment = !lodash.isEmpty(incidentItem.treatmentList);

    return (
      <Card
        title={
          <div>
            <div className={styles.errorTooltipWrapper}>
              {showOutPatientHint && submited && (
                <ErrorTooltipManual manualErrorMessage="[treatment] should at least have one outPatient treatment record when claimType contain outPatient." />
              )}
              {showInPatientHint && submited && (
                <ErrorTooltipManual manualErrorMessage="[treatment] should at least have one inPatient treatment record when claimType contain inPatient." />
              )}
            </div>
            {`${formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
            })} No. ${incidentItem.incidentNo}`}
          </div>
        }
        bordered={false}
        extra={
          <div className={styles.cardExtra}>
            {incidentItemExpandStatus && !hasTreatment && !taskNotEditable && (
              <Button size="small" onClick={this.handleAdd}>
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
                })}
              </Button>
            )}
            <ButtonOfSmall icon="minus" handleClick={this.onClose} />
            {!taskNotEditable && <ButtonOfSmall icon="close" handleClick={this.handleDelete} />}
          </div>
        }
      >
        <IncidentListItemOfBasicInfo
          incidentId={incidentId}
          incidentItem={incidentItem}
          incidentItemExpandStatus={incidentItemExpandStatus}
          // {...this.props}
        />
        <DiagnosisList incidentId={incidentId} hasTreatment={hasTreatment} />
      </Card>
    );
  }
}

export default IncidentItem;
