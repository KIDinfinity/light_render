import React from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { Tabs, Card } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ScenarioInfo from '../../Section/scenarioInfo';
import TableRule from '../../TableRule';

import styles from './index.less';

const { TabPane } = Tabs;

export default () => {
  const dispatch = useDispatch();

  const taskNotEditable: boolean = useSelector((state: any) => state.claimEditable.taskNotEditable);
  const groups: any[] = useSelector(
    (state: any) => state.ruleEngineController.submitRuleSet.groups || []
  );
  const scenarioCurrentTab: string = useSelector(
    (state: any) => state.ruleEngineController?.scenarioCurrentTab
  );

  const handleTabClick = (key: string) => {
    if (key !== '+') {
      dispatch({
        type: 'ruleEngineController/saveScenarioCurrentTab',
        payload: {
          scenarioCurrentTab: key,
        },
      });
    }
    if (key === '+') {
      dispatch({
        type: 'ruleEngineController/addGroup',
      });
    }
  };

  return (
    <div className={styles.ruleSetWrap}>
      <Tabs type="card" onTabClick={handleTabClick} activeKey={scenarioCurrentTab}>
        {lodash.isArray(groups) &&
          lodash.map(lodash.compact(groups), (item: any, index: number) => {
            return (
              <TabPane
                data-id={item.groupId}
                tab={`Scenario ${index + 1}`}
                key={item.groupId || index}
                className={styles.tabPane}
              >
                <ScenarioInfo
                  groupId={item.groupId}
                  groupConditions={item.groupConditions}
                  index={Number(index) + 1}
                  name={item.name}
                  description={item.description}
                />
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
        {!taskNotEditable && <TabPane tab="+" key="+" />}
      </Tabs>
    </div>
  );
};
