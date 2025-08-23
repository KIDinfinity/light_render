import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash, { get } from 'lodash';
import { Checkbox } from 'antd';
import type { ITreatment } from '@/dtos/claim';
import { withContextData } from '@/components/_store';
import TreatmentInfo from './TreatmentInfo';

import styles from './treatment.less';

interface IProps {
  dispatch: Dispatch<any>;
  treatment: ITreatment;
  config: any;
  treatmentNo: number;
  id: string;
  withData?: any;
}

class Treatment extends PureComponent<IProps> {
  componentDidMount() {
    const { dispatch, config, id, withData } = this.props;
    const {
      incident: { treatment: treatmentConfig },
    } = config;
    if (!get(treatmentConfig, 'isOption')) {
      if (withData?.isOrigin) {
        dispatch({
          type: 'caseSplitIncidentController/selectOriginTreatment',
          payload: { id, checked: true },
        });
      } else {
        dispatch({
          type: 'caseSplitIncidentController/selectTargetTreatment',
          payload: { id, checked: true },
        });
      }
    }
  }

  fnSelectTreatment = (e: any, id: string) => {
    const {
      target: { checked },
    } = e;
    const { dispatch, withData } = this.props;

    if (withData?.isOrigin) {
      dispatch({
        type: 'caseSplitIncidentController/selectOriginTreatment',
        payload: { id, checked },
      });
    } else {
      dispatch({
        type: 'caseSplitIncidentController/selectTargetTreatment',
        payload: { id, checked },
      });
    }
  };

  render() {
    const { treatment, config, splitByIncidentIds } = this.props;
    const {
      incident: { treatment: treatmentConfig },
    } = config;

    return (
      <div className={styles.split_treatment}>
        <div
          className="treatment_select"
          style={{ display: get(treatmentConfig, 'isOption') ? 'inline' : 'none' }}
        >
          <Checkbox
            checked={treatment.selected}
            onChange={(e) => this.fnSelectTreatment(e, treatment.id)}
            disabled={!get(treatmentConfig, 'isOption') || lodash.includes(splitByIncidentIds, treatment.incidentId)}
          />
        </div>
        <div className="treatment_content">
          <TreatmentInfo treatment={treatment} />
        </div>
      </div>
    );
  }
}

export default withContextData(
  connect(({ caseSplitController, caseSplitIncidentController }: any, { withData, id }: any) => ({
    config: caseSplitController.config,
    treatment: withData?.treatmentListMap[id],
    splitByIncidentIds: caseSplitIncidentController.splitByIncidentIds
  }))(Treatment)
);
