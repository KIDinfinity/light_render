import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Card, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Info, GroupCondition } from './FormSection';
import styles from './index.less';

interface IProps {
  info: any;
  groups: any;
  dispatch: any;
  conditionItem: any;
  taskNotEditable: any;
}
class Scenario extends Component<IProps> {
  render() {
    const { info, groupId }: any = this.props;

    return (
      <div className={styles.scenarioWrap}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim: 'venus_claim.rules.scenarioConditions.label.title',
          })}
        >
          <Info info={info} />
          <div className={styles.groupTitle}>Scenario Conditions：</div>
          {info?.groupConditions &&
            lodash.isArray(info.groupConditions) &&
            lodash.map(lodash.compact(info.groupConditions), (conditionItem, index): any => (
              <div
                className={styles.groupConditionWrap}
                key={conditionItem.atomCode || `key_${index}`}
              >
                <div className={styles.reduceWrap}>
                  <Icon type="minus-circle" />
                </div>

                <div className={styles.formItem}>
                  eee
                  <GroupCondition conditionItem={conditionItem} info={info} groupId={groupId} />
                </div>
                <div className={styles.addWrap}>
                  <Icon type="plus-circle" />
                </div>
              </div>
            ))}
        </Card>
      </div>
    );
  }
}

export default connect(({ ruleEngineController }: any) => ({
  atomInputInfo: lodash.get(ruleEngineController, 'atomInputInfo', {}),
}))(Scenario);
