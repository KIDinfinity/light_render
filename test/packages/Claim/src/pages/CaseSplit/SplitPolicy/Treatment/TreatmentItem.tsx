import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Checkbox } from 'antd';
import lodash from 'lodash';
import type { ITreatment, ITreatmentPayable } from '@/dtos/claim';
import { withContextData } from '@/components/_store';

import TreatmentInfo from './TreatmentInfo';
import styles from './treatment.less';

interface IProps {
  config: any;
  dispatch: Dispatch<any>;
  treatment: ITreatment;
  treatmentPayable: ITreatmentPayable;
  policyNo: string;
  withData?: any;
}

class TreatmentItem extends PureComponent<IProps> {
  componentDidMount() {
    const { dispatch, config, treatmentPayable, withData } = this.props;
    const {
      policy: { benefit: benefitConfig },
    } = config;

    if (!lodash.get(benefitConfig, 'isOption')) {
      if (withData?.isOrigin) {
        dispatch({
          type: 'caseSplitPolicyController/selectOriginBenefitType',
          payload: { id: treatmentPayable.id, checked: true },
        });
      } else {
        dispatch({
          type: 'caseSplitPolicyController/selectTargetBenefitType',
          payload: { id: treatmentPayable.id, checked: true },
        });
      }
    }
  }

  fnSelectTreatmentPayable = (e: any, id: string) => {
    const {
      target: { checked },
    } = e;
    const { dispatch, withData } = this.props;

    if (withData?.isOrigin) {
      dispatch({
        type: 'caseSplitPolicyController/selectOriginBenefitType',
        payload: { id, checked },
      });
    } else {
      dispatch({
        type: 'caseSplitPolicyController/selectTargetBenefitType',
        payload: { id, checked },
      });
    }
  };

  render() {
    const { treatment, treatmentPayable, config, policyNo, withData }: any = this.props;
    const {
      policy: { benefit: benefitConfig },
    } = config;

    return (
      <div className={styles.split_treatment}>
        <div
          className="treatment_select"
          style={{ display: lodash.get(benefitConfig, 'isOption') ? 'inline' : 'none' }}
          // @ts-ignore
          disabled={!lodash.get(benefitConfig, 'isOption')}
        >
          {withData?.removable ? (
            <Checkbox
              checked={treatmentPayable.selected}
              onChange={(e) => this.fnSelectTreatmentPayable(e, treatmentPayable.id)}
            />
          ) : null}
        </div>
        <div className="treatment_content">
          <TreatmentInfo
            treatment={treatment}
            treatmentPayable={treatmentPayable}
            policyNo={policyNo}
          />
        </div>
      </div>
    );
  }
}

export default connect(({ caseSplitController }: any) => ({
  config: caseSplitController.config,
}))(withContextData(TreatmentItem));
