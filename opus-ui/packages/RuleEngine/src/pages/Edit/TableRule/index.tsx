import React, { useState, useEffect } from 'react';
import lodash from 'lodash';
import { Table } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';
import getRequired from './Utils/getRequired';
import { getIsNewRule } from '../Utils';
import { Action, ComponentType, ModalType } from '../Enum';
import Header from '../Section/Header';
import getColumns from './Utils/getColumns';

export default ({ groupId }: { groupId: string }) => {
  const dispatch = useDispatch();

  const submitRuleSet = useSelector((state: any) => state.ruleEngineController.submitRuleSet);
  const ruleAtoms = useSelector((state: any) => state.ruleEngineController.dropDown.ruleAtoms);
  const atomInputInfo = useSelector((state: any) => state.ruleEngineController.atomInputInfo);

  const taskNotEditable = useSelector((state: any) => state.claimEditable.taskNotEditable);
  const booleanArray = useSelector((state: any) => state.dictionaryController.boolean);

  const ruleModules = useSelector(
    (state: any) => state.ruleEngineController?.dropDown?.ruleModules
  );

  const moduleCode = formUtils.queryValue(submitRuleSet?.ruleSetInfo?.moduleCode) || '';
  const groupItem = lodash.find(submitRuleSet.groups, (el: any) => el.groupId === groupId);
  const dataSource = groupItem?.rules;
  const requiredAtoms = groupItem?.requiredAtoms;

  const ruleAtomModule = ruleAtoms?.filter((el: any) => el.moduleCode === moduleCode);
  const ruleAtomTypes = ruleAtomModule?.filter((el: any) => el.atomType === ComponentType.Date);

  const { requiredConditions, requiredResults } = getRequired(requiredAtoms);
  const [conditions, setConditions] = useState(requiredConditions);
  const [results, setResults] = useState(requiredResults);
  const [editable, setEditable] = useState(false);

  const onSave = (options: any, propsOptions: any) => {
    dispatch({
      type: 'ruleEngineController/saveRequireAtoms',
      payload: {
        groupId,
        requiredAtoms: options,
        oldRequiredAtoms: propsOptions,
      },
    });
  };

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const onEdit = async (record: any) => {
    if (getIsNewRule(moduleCode, ruleModules)) {
      await dispatch({
        type: 'ruleEngineController/showRuleNewEditData',
        payload: {
          actionType: Action.Update,
          editData: record,
          groupId,
          moduleCode,
        },
      });
    } else {
      await dispatch({
        type: 'ruleEngineController/saveInitEditData',
        payload: {
          action: Action.Update,
          editData: record,
          groupId,
        },
      });
      await dispatch({
        type: 'ruleEngineController/saveModalOptions',
        payload: {
          edit: {
            show: true,
            type: getIsNewRule(moduleCode, ruleModules) ? ModalType.NewEdit : ModalType.EditDefault,
          },
        },
      });
    }
  };

  const onDelete = (record: any) => {
    dispatch({
      type: `ruleEngineController/removeRules`,
      payload: {
        groupId,
        id: record.id,
      },
    });
  };

  const toggleCheckbox = (e: any) => {
    dispatch({
      type: 'ruleEngineController/toggleRuleBind',
      payload: {
        groupId,
        checked: e?.target.checked || false,
      },
    });
  };
  const onCheckBox = (record: any) => {
    dispatch({
      type: 'ruleEngineController/saveRuleChecked',
      payload: {
        groupId,
        id: record.id,
      },
    });
  };
  const onUnBind = (record: any) => {
    dispatch({
      type: 'ruleEngineController/saveRuleUnBind',
      payload: {
        data: { groupId, id: record.id },
      },
    });
  };

  useEffect(() => {
    // TODO：这里应该抽成hook的方式去写
    const atomCodes = lodash
      .chain(dataSource || [])
      .reduce((arr: any, item: any) => {
        const conditionsAtomCode = lodash.map(item.conditions || [], (el: any) => el.atomCode);
        const resultAtomCode = lodash.map(item.results || [], (el: any) => el.atomCode);
        return [...new Set([...arr, ...conditionsAtomCode, ...resultAtomCode])];
      }, [])
      .reduce((arr: any, atomCode: any) => {
        const existObj = lodash.find(atomInputInfo, { atomCode });
        return !existObj ? [...arr, atomCode] : arr;
      }, [])
      .value();
    if (!lodash.isEmpty(atomCodes) && !lodash.isEmpty(moduleCode)) {
      dispatch({
        type: 'ruleEngineController/getAtomInputInfo',
        payload: {
          atomCode: atomCodes,
          moduleCode,
        },
      });
    }
  }, [dataSource, moduleCode]);

  return (
    <div className={styles.tablBox}>
      <Header.TableRule groupId={groupId} />
      <Table
        dataSource={dataSource}
        rowKey="id"
        // @ts-ignore
        columns={getColumns({
          taskNotEditable,
          allRuleAtoms: ruleAtoms,
          atomInputInfo,
          ruleAtomModule: ruleAtomTypes,
          booleanArray,
          dataSource,
          selectConditions: {
            conditions,
            setConditions,
            requiredConditions,
            selectConditions: ruleAtomModule,
          },
          selectResults: {
            results,
            setResults,
            requiredResults,
            selectResults: ruleAtomModule,
          },
          editable,
          toggleEditable,
          toggleCheckbox,
          onUnBind,
          onCheckBox,

          onEdit,
          onDelete,
          onSave,
        })}
        scroll={{ x: '100%' }}
      />
    </div>
  );
};
