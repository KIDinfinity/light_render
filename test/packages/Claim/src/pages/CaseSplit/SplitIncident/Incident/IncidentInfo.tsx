import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/es/form';

import moment from 'moment';
import lodash, { isArray, chain } from 'lodash';
import { Form } from 'antd';
import {
  FormItemSelect,
  FormItemDatePicker,
  formUtils,
  FormLayout,
  FormItemInput,
} from 'basic/components/Form';
import FormRegist from '@/components/FormRegistComponent';

import type { IIncident } from '@/dtos/claim';
import type { IDictionary } from '@/dtos/dicts';
import { withContextData } from '@/components/_store';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import styles from '../../caseSplit.less';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  incident: IIncident;
  dictsCauseOfIncident: IDictionary[];
  loadingCauseOfIncident: boolean;
  eriesNoData: any[];
  id: string;
  withData?: any;
  targetIncident: any;
  originIncident: any;
}

interface IState {}
class IncidentFormSplit extends PureComponent<IProps, IState> {
  buildClaimTypeData = (dictCodes?: string[]): any[] => {
    if (!isArray(dictCodes)) return [];
    const { withData } = this.props;
    return chain(withData?.claimTypes)
      .filter((claimType: IDictionary) => dictCodes.includes(claimType.dictCode))
      .map((item: IDictionary) => ({ barId: item.dictCode, barName: item.dictName }))
      .value();
  };

  get claimTypeArray() {
    const { withData, targetIncident, originIncident } = this.props;
    if (withData?.isOrigin) {
      return formUtils.queryValue(targetIncident?.claimTypeArray) || [];
    } else {
      return formUtils.queryValue(originIncident?.claimTypeArray) || [];
    }
  }

  render() {
    const { form,withData } = this.props;
    const { taskDetail } = withData || {};
    const { caseCategory } = taskDetail || {};
    const dictsClaimType = getDrowDownList('ClaimType').filter(item => {
      if (caseCategory === 'BP_CLM_CTG007') {
        return item.dictCode !== 'DTH';
      }else if( caseCategory === 'BP_CLM_CTG008'){
        return item.dictCode === 'DTH';
      }else {
        return true;
      };
    });
    const dictsCauseOfIncident = getDrowDownList('CauseOfIncident') || dictsClaimType;

    return (
      <Form layout="horizontal" className={styles.split_form}>
        <FormLayout>
          <FormItemSelect
            form={form}
            required
            mode="multiple"
            formName="claimTypeArray"
            dicts={dictsClaimType}
            labelId="app.navigator.task-detail-of-data-capture.label.claim-type"
            existCodes={this.claimTypeArray}
          />
        </FormLayout>
        <FormLayout>
          <FormItemSelect
            form={form}
            disabled
            formName="causeOfIncident"
            dicts={dictsCauseOfIncident}
            labelId="app.navigator.task-detail-of-data-capture.label.case-of-incident"
          />
          <FormItemDatePicker
            form={form}
            disabled
            formName="firstConsultationDate"
            labelId="FirstConsultationDate"
          />
          <FormItemInput
            form={form}
            disabled
            formName="diagnosisCode"
            labelId="app.navigator.task-detail-of-data-capture.label.diagnosis-code-name"
          />
        </FormLayout>
      </Form>
    );
  }
}

const FormWrapped = Form.create<IProps>({
  mapPropsToFields(props) {
    const { incident } = props;
    const temp = {
      firstConsultationDate: incident?.firstConsultationDate,
      causeOfIncident: incident.causeOfIncident,
      claimTypeArray: incident.claimTypeArray,
      diagnosisCode: lodash.find(incident.diagnosisList, { diagnosisType: 'P' })?.diagnosisName,
    };
    return formUtils.mapObjectToFields(temp, {
      firstConsultationDate: (value: any) => (value ? moment(value) : null),
      causeOfIncident: (value: any) => value,
      claimTypeArray: (value: any) => value,
    });
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, incident, withData } = props;
    dispatch({
      type: `caseSplitIncidentController/updateClaimType`,
      payload: {
        changedFields: changedFields,
        incidentId: incident.id,
        isOrigin: withData?.isOrigin,
      },
    });
  },
})(FormRegist({ nameSpace: 'caseSplitController' })(IncidentFormSplit));

export default connect(({ caseSplitIncidentController }: any, { incident }: any) => ({
  targetIncident: caseSplitIncidentController.targetClaimEntities.incidentListMap?.[incident.id],
  originIncident: caseSplitIncidentController.originClaimEntities.incidentListMap?.[incident.id],
}))(withContextData(FormWrapped));
