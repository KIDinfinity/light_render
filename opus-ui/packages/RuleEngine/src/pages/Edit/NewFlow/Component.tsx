import React from 'react';
import {
  Item,
  ItemPanel,
  RULEENGINENODEENHANCE_PREFIX,
  RuleEngineNodeEnhanceNodeType,
} from '@ctc/g6-editor';
import lodash from 'lodash';
import classnames from 'classnames';
import { ComponentType } from './Enum';
import RuleIcon from './assets/rule-icon.png';
import ConditionIcon from './assets/condition-icon.png';
import EndIcon from './assets/end-icon.png';

import styles from './index.less';

interface IProps {
  handleClick: Function;
  taskNotEditable: boolean;
}

export default ({ taskNotEditable, handleClick }: IProps) => {
  const config = [
    {
      type: `${RULEENGINENODEENHANCE_PREFIX}-${RuleEngineNodeEnhanceNodeType.RuleSetNode}`,
      text: 'RuleSet',
      componentType: ComponentType.Rule,
      icon: RuleIcon,
    },
    {
      type: `${RULEENGINENODEENHANCE_PREFIX}-${RuleEngineNodeEnhanceNodeType.BranchNode}`,
      text: 'Condition',
      componentType: ComponentType.Decision,
      icon: ConditionIcon,
    },
    {
      type: `${RULEENGINENODEENHANCE_PREFIX}-${RuleEngineNodeEnhanceNodeType.EndNode}`,
      text: 'End',
      componentType: ComponentType.End,
      icon: EndIcon,
    },
  ];

  return (
    <ItemPanel className={styles.component}>
      <p className={styles.title}>Component</p>

      {lodash.map(config, (item: any) => {
        return (
          <div
            key={item.type}
            onClick={() => {
              handleClick(item.componentType);
            }}
            className={taskNotEditable && styles.disabled}
          >
            <Item
              className={styles.item}
              shapeType="rect"
              model={{
                type: item.type,
                size: [280, 48],
              }}
            >
              <div
                className={classnames(
                  styles.icon,
                  item.componentType === ComponentType.Rule && styles.rule,
                  item.componentType === ComponentType.Decision && styles.condition,
                  item.componentType === ComponentType.End && styles.end
                )}
              >
                {}
                <img src={item.icon} alt="" />
              </div>
              <div className={styles.text}>{item.text}</div>
            </Item>
          </div>
        );
      })}
    </ItemPanel>
  );
};
