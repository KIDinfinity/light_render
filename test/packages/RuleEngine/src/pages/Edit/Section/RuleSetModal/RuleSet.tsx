import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import { Tabs, Card } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Scenario from './Scenario';
import TableRule from './TableRule';
import styles from './RuleSet.less';

const { TabPane } = Tabs;

interface IProps {
  dispatch: any;
  submitRuleSet: object;
  taskNotEditable: boolean;
  currentRuleSetModalTab: string;
  groups: any[];
  groupId: string;
}
class Rules extends Component<IProps> {
  handleAddGroup = (key: any) => {
    const { dispatch } = this.props;

    if (key !== '+') return;
    dispatch({
      type: 'ruleEngineController/addGroup',
    });
  };

  onTabChange = (currentRuleSetModalTab: string) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'ruleEngineController/saveCurrentRuleSetModalTab',
      payload: {
        currentRuleSetModalTab,
      },
    });
  };

  render() {
    const { groups, currentRuleSetModalTab } = this.props;

    return (
      <div className={styles.ruleSetModal}>
        <Tabs
          onChange={this.onTabChange}
          type="card"
          onTabClick={this.handleAddGroup}
          activeKey={currentRuleSetModalTab}
        >
          {lodash.isArray(groups) &&
            lodash.map(lodash.compact(groups), (item: any, index: number) => {
              return (
                <TabPane
                  data-id={item.groupId}
                  tab={`Scenario ${index + 1}`}
                  key={item.groupId || index}
                >
                  <Scenario info={item} groupId={item.groupId} />
                  <Card
                    title={formatMessageApi({
                      Label_BIZ_Claim: 'venus_claim.rules.basicRule.label.title',
                    })}
                  >
                    <TableRule groupId={item.groupId} />
                  </Card>
                </TabPane>
              );
            })}
        </Tabs>
      </div>
    );
  }
}

export default connect(({ ruleEngineController, claimEditable }: any) => ({
  groups: lodash.get(ruleEngineController, 'ruleSetModalData.groups', []),
  ruleSetModalData: lodash.get(ruleEngineController, 'ruleSetModalData'),
  taskNotEditable: claimEditable.taskNotEditable,
  currentRuleSetModalTab: ruleEngineController?.currentRuleSetModalTab,
}))(Rules);
