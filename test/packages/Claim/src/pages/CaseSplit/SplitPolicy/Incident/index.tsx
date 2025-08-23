import React, { PureComponent } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { IIncident } from '@/dtos/claim';
import { Checkbox } from 'antd';
import { withContextData } from '@/components/_store';

import styles from './incident.less';

interface IProps {
  incident: IIncident;
  withData?: any;
  dispatch: Dispatch<any>;
}

class Incident extends PureComponent<IProps> {
  get getClaimTypes(): string {
    const { incident = {}, withData }: any = this.props;

    const dictNames = lodash.map(lodash.compact(incident.claimTypeArray), (item) => {
      const current = lodash.find(
        withData?.claimTypes,
        (claimType: any) => claimType.dictCode === item
      );
      return lodash.get(current, 'dictName') || lodash.get(current, 'dictCode');
    });
    return lodash.compact(dictNames).join(`, `);
  }


  fnSelectPolicy = (e: any, policyNo: string) => {
    const {
      target: { checked },
    } = e;
    const { dispatch, withData } = this.props;
    console.log(policyNo,withData?.isOrigin, checked, e )
    if (withData?.isOrigin) {
      dispatch({
        type: 'caseSplitPolicyController/selectOriginPolicyNo',
        payload: { policyNo, checked },
      });
    } else {
      dispatch({
        type: 'caseSplitPolicyController/selectTargetPolicyNo',
        payload: { policyNo, checked },
      });
    }
  };

  render() {
    const { incident }: any = this.props;
    const { config, policyNo, treatmentPayables } = this.props;

    const selectAll = lodash.every(treatmentPayables, (item) => item.selected);
    const selectParts = lodash.some(treatmentPayables, (item) => item.selected);

    const {
      policy: { policy: policyConfig, benefit: benefitConfig },
    } = config;

    const enabled = lodash.get(policyConfig, 'isOption') && lodash.get(benefitConfig, 'isOption');
    let checked;
    let indeterminate;
    if (lodash.get(policyConfig, 'isOption') && !lodash.get(benefitConfig, 'isOption')) {
      checked = true;
      indeterminate = false;
    } else {
      checked = selectAll;
      indeterminate = selectAll ? false : selectParts;
    }

    return (
      <div className={styles.split_incident}>
        <Checkbox
          className={styles.incidentTitle}
          checked={checked}
          indeterminate={indeterminate}
          onChange={(e) => this.fnSelectPolicy(e, policyNo)}
          disabled={!enabled}
          style={{ display: enabled ? 'inline' : 'none' }}
        />
        {formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
        })}
        {` No.${incident.incidentNo}`}
      </div>
    );
  }
}

export default connect(({ caseSplitController }: any) => ({
  config: caseSplitController.config
}))(withContextData(Incident));
