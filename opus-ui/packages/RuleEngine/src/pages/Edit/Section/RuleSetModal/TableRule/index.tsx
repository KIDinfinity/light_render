import React, { useState } from 'react';
import lodash from 'lodash';
import { Table } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';
import getRequired from './Utils/getRequired';
import { ComponentType } from '../../../Enum';
import getColumns from './Utils/getColumns';

const TableList = ({
  dataSource,
  requiredAtoms,
  ruleAtoms,
  allRuleAtoms,
  atomInputInfo,
  taskNotEditable,
  ruleAtomModule,
  booleanArray,
}: any) => {
  const { requiredConditions, requiredResults } = getRequired(requiredAtoms);
  const [conditions, setConditions] = useState(requiredConditions);
  const [results, setResults] = useState(requiredResults);

  return (
    <div className={styles.tablBox}>
      <Table
        dataSource={dataSource}
        rowKey="id"
        columns={getColumns({
          taskNotEditable,
          allRuleAtoms,
          atomInputInfo,
          ruleAtomModule,
          booleanArray,
          dataSource,
          selectConditions: {
            conditions,
            setConditions,
            requiredConditions,
            selectConditions: ruleAtoms,
          },
          selectResults: {
            results,
            setResults,
            requiredResults,
            selectResults: ruleAtoms,
          },
        })}
        scroll={{ x: '100%' }}
      />
    </div>
  );
};

export default connect(({ ruleEngineController, dictionaryController }, { groupId }: any) => {
  const { requiredAtoms, rules } =
    lodash
      .chain(ruleEngineController)
      .get('ruleSetModalData.groups')
      .find((el) => el.groupId === groupId)
      .value() || {};
  const moduleCode = formUtils.queryValue(
    lodash.get(ruleEngineController, 'ruleSetModalData.ruleSetInfo.moduleCode')
  );

  const ruleAtoms = lodash
    .chain(ruleEngineController)
    .get('dropDown.ruleAtoms')
    .filter((el: any) => el?.moduleCode === moduleCode)
    .value();

  const ruleAtomModule = ruleAtoms.filter((el) => el.atomType === ComponentType.Date);
  return {
    dataSource: rules,
    requiredAtoms,
    allRuleAtoms: ruleEngineController?.dropDown?.ruleAtoms || [],
    ruleAtoms,
    atomInputInfo: ruleEngineController?.atomInputInfo || [],
    ruleAtomModule,
    booleanArray: dictionaryController.boolean,
  };
})(TableList);
