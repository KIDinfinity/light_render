import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import memorizeOne from 'memoize-one';
import { Button, notification } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { ITreatmentPayable } from '@/dtos/claim';
import { payableSumByPolicy, groupByIncidentId } from 'claim/pages/CaseSplit/_models/functions';
import Treatment from '../Treatment';
import Incident from '../Incident';
import { withContextData } from '@/components/_store';

import styles from '../../caseSplit.less';
import VectorrightIcon from '@/assets/Vectorright.svg';
import VectorleftIcon from '@/assets/Vectorleft.svg';

interface IProps {
  dispatch: Dispatch<any>;
  treatmentPayables: ITreatmentPayable[];
  policyNo: string;
  policyIndex: number;
  withData?: any;
  incidentListMap: any;
  originIncidentList: string[];
  config: any;
  originPolicyLength: number;
}
const payableSumByPolicyMemorized = memorizeOne(payableSumByPolicy);
const groupByIncidentIdMemorized = memorizeOne(groupByIncidentId);

class PolicyItem extends Component<IProps> {
  treatmentList = [];

  componentDidUpdate() {
    const { config, dispatch, policyNo, withData } = this.props;
    const isOrigin = withData?.isOrigin;

    const {
      policy: { policy: policyConfig, benefit: benefitConfig },
    } = config;

    if (
      !lodash.get(policyConfig, 'isOption') ||
      (lodash.get(policyConfig, 'isOption') && !lodash.get(benefitConfig, 'isOption'))
    ) {
      if (isOrigin) {
        dispatch({
          type: 'caseSplitPolicyController/selectOriginPolicyNo',
          payload: { policyNo, checked: true },
        });
      } else {
        dispatch({
          type: 'caseSplitPolicyController/selectTargetPolicyNo',
          payload: { policyNo, checked: true },
        });
      }
    }
  }

  componentWillUnmount() {
    notification.destroy();
  }

  get renderCardTitle(): React.ReactNode {
    const { policyNo } = this.props;

    return (
      <div>
        <span>{`${formatMessageApi({
          Label_BIZ_Claim: 'venus_claim.label.policyNo',
        })} ${policyNo}`}</span>
      </div>
    );
  }

  get renderExtraManual() {
    const { withData, treatmentPayables } = this.props;

    return withData?.isOrigin
      ? [
          <Button
            key="move"
            onClick={this.fnMove}
            disabled={lodash.every(treatmentPayables, (item) => !item.selected)}
          >
            <img src={VectorrightIcon} style={{ paddingRight: '8px' }} />
            <span style={{ color: '#E87722' }}>{formatMessageApi({ Label_CLM_Opus: 'move' })}</span>
          </Button>,
        ]
      : [
          <Button
            key="reverse"
            onClick={this.fnReverse}
            disabled={lodash.every(treatmentPayables, (item) => !item.selected)}
          >
            <img src={VectorleftIcon} style={{ paddingRight: '8px' }} />
            <span style={{ color: '#E87722' }}>{formatMessageApi({ Label_CLM_Opus: 'move' })}</span>
          </Button>,
        ];
  }

  fnSelectPolicy = (e: any, policyNo: string) => {
    const {
      target: { checked },
    } = e;
    const { dispatch, withData } = this.props;
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

  fnMove = async () => {
    const { dispatch, treatmentPayables, policyNo, originPolicyLength } = this.props;
    if (lodash.every(treatmentPayables, (item) => !item.selected)) {
      notification.warning({
        message: formatMessageApi({
          Label_COM_WarningMessage: 'venus.claim.select-move-item-necessary',
        }),
      });
      return;
    }

    if (originPolicyLength === 1 && lodash.every(treatmentPayables, (item) => item.selected)) {
      notification.warning({
        message: formatMessageApi({
          Label_COM_WarningMessage: 'ERR_000133',
        }),
      });
      return;
    }

    await dispatch({
      type: 'caseSplitPolicyController/addTargetClaimData',
      payload: {
        policyNo,
      },
    });
    await dispatch({
      type: 'caseSplitPolicyController/deleteOriginClaimData',
      payload: {
        policyNo,
      },
    });
  };

  fnReverse = async () => {
    const { dispatch, treatmentPayables, policyNo } = this.props;
    if (lodash.every(treatmentPayables, (item) => !item.selected)) {
      notification.warning({
        message: formatMessageApi({
          Label_COM_WarningMessage: 'venus.claim.select-reverse-item-necessary',
        }),
      });
      return;
    }
    await dispatch({
      type: 'caseSplitPolicyController/addOriginClaimData',
      payload: {
        policyNo,
      },
    });
    await dispatch({
      type: 'caseSplitPolicyController/deleteTargetClaimData',
      payload: {
        policyNo,
      },
    });
  };

  render() {
    const { policyNo, treatmentPayables, withData }: any = this.props;
    const listGroupIncidentId = groupByIncidentIdMemorized(
      treatmentPayables,
      withData?.incidentListMap
    );

    return (
      <div className={styles.split_card}>
        {lodash
          .chain(listGroupIncidentId)
          .sortBy('incidentNo')
          .map((grouptreatmentPayable: any) => {
            const { treatmentPayables: payables, incident, incidentId } = grouptreatmentPayable;

            return (
              <div key={incidentId}>
                <Incident
                  incident={incident}
                  treatmentPayables={treatmentPayables}
                  policyNo={policyNo}
                  extra={withData?.removable ? this.renderExtraManual : null}
                />
                <Treatment treatmentPayables={payables} policyNo={policyNo} />
              </div>
            );
          })
          .value()}
      </div>
    );
  }
}

export default connect(({ caseSplitController, caseSplitPolicyController }: any) => ({
  config: caseSplitController.config,
  originPolicyLength: caseSplitPolicyController.originPolicyLength,
}))(withContextData(PolicyItem));
