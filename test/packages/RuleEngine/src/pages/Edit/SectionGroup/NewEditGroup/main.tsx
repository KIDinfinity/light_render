import React from 'react';
import { useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SectionBorder from '../../components/SectionBorder';
import Header from './Section/header';
import RuleList from './Section/ruleList';
import { RuleType } from '../../Enum';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();

  const handleAdd = (type: string) => {
    switch (type) {
      case RuleType.Results:
        dispatch({
          type: `ruleEngineController/addResult`,
        });
        break;

      default:
      case RuleType.Conditions:
        dispatch({
          type: `ruleEngineController/addCondition`,
        });
        break;
    }
  };

  return (
    <div className={styles.main}>
      <SectionBorder
        title={formatMessageApi({
          Label_RUL_Rule: 'ConditionSet',
        })}
      >
        <Header type={RuleType.Conditions} handleButton={handleAdd} />
        <RuleList type={RuleType.Conditions} />
      </SectionBorder>
      <SectionBorder
        title={formatMessageApi({
          Label_RUL_Rule: 'ResultSet',
        })}
      >
        <Header type={RuleType.Results} handleButton={handleAdd} />
        <RuleList type={RuleType.Results} />
      </SectionBorder>
    </div>
  );
};
