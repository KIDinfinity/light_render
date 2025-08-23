import React, { Component } from 'react';
import lodash from 'lodash';
import { Modal } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import BasicInfo from '../Section/RuleSetModal/BasciInfo';
import RuleSet from '../Section/RuleSetModal/RuleSet';
import RuleFlow from '../Section/FlowModal/RuleFlow';
import { RuleSetType } from '../Enum';
import styles from './RuleSet.less';

interface IProps {
  form: any;
  dispatch: Dispatch;
  isRuleSet: boolean;
  ruleSetType: string;
}

class ModalRuleSet extends Component<IProps> {
  onCancel = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'ruleEngineController/updateModalStatus',
      payload: {
        isRuleSet: false,
      },
    });

    await dispatch({
      type: 'ruleEngineController/clearRuleSetModalData',
    });
  };

  render() {
    const { isRuleSet, ruleSetType } = this.props;

    return (
      <div className={styles.ruleSetModal}>
        {isRuleSet ? (
          <Modal
            width="80%"
            onCancel={this.onCancel}
            footer={null}
            // maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
          >
            <BasicInfo />

            {
              // eslint-disable-next-line no-nested-ternary
              formUtils.queryValue(ruleSetType) === RuleSetType.RuleSet ? (
                // @ts-ignore
                <RuleSet />
              ) : formUtils.queryValue(ruleSetType) === RuleSetType.RuleFlow ? (
                <RuleFlow />
              ) : null
            }
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default connect(({ ruleEngineController }: any) => ({
  ruleSetType: lodash.get(ruleEngineController, 'ruleSetModalData.ruleSetInfo.ruleSetType', ''),
  isRuleSet: ruleEngineController.modalStatus?.isRuleSet || false,
  ruleSetModalData: ruleEngineController.ruleSetModalData,
}))(ModalRuleSet);
