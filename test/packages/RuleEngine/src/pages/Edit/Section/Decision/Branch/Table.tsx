import React, { useEffect } from 'react';
import lodash from 'lodash';
import { Form, Table } from 'antd';
import { connect, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import type { Dispatch } from 'redux';
import Condition from './Condition';
import { BranchField } from '../../../Enum';
import styles from './index.less';

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  taskNotEditable?: boolean;
  fundList: object[];
  totalWithdrawAmount: number;
  validating: boolean;
  taskDefKey: string;
  item: any;
}

const BranchTable = ({
  form,
  item,
  list,
  submitRuleSet,
  ruleAtoms,
  atomInputInfo,
  taskNotEditable,
}: any) => {
  const dispatch = useDispatch();

  const moduleCode = formUtils.queryValue(submitRuleSet.ruleSetInfo.moduleCode || '');

  const atomList = lodash.filter(ruleAtoms, (el: any) => el?.moduleCode === moduleCode);

  useEffect(() => {
    if (!lodash.isEmpty(list) && !lodash.isEmpty(moduleCode)) {
      list.forEach((el: any) => {
        const atomCode = formUtils.queryValue(el.atomCode);
        if (!lodash.isEmpty(atomCode)) {
          const existObj = lodash.find(atomInputInfo, { atomCode });
          if (existObj) return;
          // TODO:这里会触发两次
          dispatch({
            type: 'ruleEngineController/getAtomInputInfo',
            payload: {
              atomCode,
              moduleCode,
            },
          });
        }
      });
    }
  }, [list]);
  const onDelete = (record: any) => {
    dispatch({
      type: 'ruleEngineController/removeDecisionCondition',
      payload: {
        id: record.id,
        branchId: item.id,
      },
    });
  };
  const onCheckBox = (record: any) => {
    dispatch({
      type: 'ruleEngineController/saveDecisionConditionChecked',
      payload: {
        branchId: item.id,
        id: record.id,
      },
    });
  };
  const onUnBind = (record: any) => {
    dispatch({
      type: 'ruleEngineController/saveDecisionConditionUnbind',
      payload: {
        branchId: item.id,
        conditionId: record.id,
      },
    });
  };

  return (
    <div className={styles.tableWrap}>
      <Table
        rowKey={(record: any) => record.conditionId}
        dataSource={list}
        columns={Condition({
          form,
          list,
          atomInputInfo,
          item,
          atomList,
          moduleCode,
          taskNotEditable,
          onCheckBox,
          onDelete,
          onUnBind,
        })}
        pagination={false}
      />
    </div>
  );
};

export default connect(({ ruleEngineController }: any) => ({
  submitRuleSet: ruleEngineController.submitRuleSet || {},
  ruleAtoms: ruleEngineController.dropDown?.ruleAtoms || [],
  atomInputInfo: ruleEngineController.atomInputInfo || [],
}))(
  Form.create({
    onFieldsChange(props: IProps, changedFields: any) {
      const { dispatch, item }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        let newChangedFields = changedFields;
        const key = Object.keys(changedFields)[0];
        const values = changedFields[key];

        if (key.indexOf('-') > 0) {
          newChangedFields = {
            [key.substring(0, key.indexOf('-'))]: {
              ...values,
              name: key.substring(0, key.indexOf('-')),
            },
          };
        }
        dispatch({
          type: 'ruleEngineController/saveDecisionConditionData',
          payload: {
            changedFields: newChangedFields,
            index: Number(key.substring(key.indexOf('-') + 1, key.length)),
            branchId: item.id,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { list }: any = props;

      const newArr = lodash.map(lodash.compact(list), (paramsItem) =>
        lodash.pick(paramsItem, [
          BranchField.ConditionName,
          BranchField.AtomCode,
          BranchField.Operator,
          BranchField.Value,
          BranchField.timePick,
        ])
      );

      const newObj = lodash.reduce(
        newArr,
        (obj: any, param: any, index) => {
          // eslint-disable-next-line no-param-reassign
          obj[`${BranchField.ConditionName}-${index}`] = param.conditionName || '';
          // eslint-disable-next-line no-param-reassign
          obj[`${BranchField.AtomCode}-${index}`] = param.atomCode || '';
          // eslint-disable-next-line no-param-reassign
          obj[`${BranchField.Operator}-${index}`] = param.operator || '';
          // eslint-disable-next-line no-param-reassign
          obj[`${BranchField.Value}-${index}`] = lodash.isString(param.value)
            ? lodash
                .chain(param.value.split(','))
                .filter((el: any) => !lodash.isEmpty(el))
                .value() || []
            : param.value;
          // eslint-disable-next-line no-param-reassign
          obj[`${BranchField.timePick}-${index}`] = '';
          return obj;
        },
        {}
      );
      return formUtils.mapObjectToFields(newObj);
    },
  })(BranchTable)
);
