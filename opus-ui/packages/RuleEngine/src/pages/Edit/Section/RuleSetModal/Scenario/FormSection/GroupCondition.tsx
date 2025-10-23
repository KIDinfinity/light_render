import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import moment from 'moment';
import lodash from 'lodash';
import type { Dispatch } from 'redux';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemSelect, formUtils } from 'basic/components/Form';
import getOperators from '../../../../Utils/getOperators';
import { Type, ComponentType } from '../../../../Enum';

import { operatorListLayout } from './Layout';

interface IProps {
  dispatch?: Dispatch<any>;
  form?: any;
  info?: any;
  conditionItem?: any;
  operators?: any;
}

class GroupConditionItem extends Component<IProps> {
  registeForm = () => {
    const { dispatch, form, conditionItem, groupId } = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: `groupRuleSetModalCondition_${groupId}_${conditionItem.id}`,
      },
    });
  };

  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, conditionItem, groupId } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: `groupCondition_${groupId}_${conditionItem.id}`,
      },
    });
  };

  render() {
    const { form, ruleAtoms, operators, FormItem, dictsValue } = this.props;

    return (
      <Form layout="vertical">
        <FormLayout json={operatorListLayout}>
          <FormItemSelect
            form={form}
            dicts={ruleAtoms}
            formName="atomCode"
            dictCode="atomCode"
            labelId="atomCode"
            dictName="formatName"
            required
            disabled
          />
          <FormItemSelect
            form={form}
            labelId="operator"
            dicts={operators}
            required
            formName="operator"
            disabled
          />
          {FormItem ? (
            <FormItem
              form={form}
              formName="value"
              labelId="value"
              required
              disabled
              dicts={dictsValue}
              dictCode="itemCode"
              dictName="itemName"
            />
          ) : (
            <></>
          )}
        </FormLayout>
      </Form>
    );
  }
}

export default connect(
  ({ ruleEngineController, dictionaryController }: any, { conditionItem }: any) => {
    const moduleCode = formUtils.queryValue(
      lodash.get(ruleEngineController, 'ruleSetModalData.ruleSetInfo.moduleCode')
    );

    const ruleAtoms = lodash
      .chain(ruleEngineController)
      .get('dropDown.ruleAtoms')
      .filter((el) => el?.moduleCode === moduleCode)
      .value();
    const ruleAtomModule = ruleAtoms.filter((el) => el.atomType === ComponentType.Date);
    const { isDate, FormType, operators, FormItem, dictsValue }: any = getOperators({
      atomInputInfo: ruleEngineController.atomInputInfo,
      atomCode: formUtils.queryValue(conditionItem.atomCode),
      type: Type.Scenario,
      ruleAtomModule,
      booleanArray: dictionaryController.boolean,
      operator: formUtils.queryValue(conditionItem.operator),
    });

    return {
      ruleAtoms,
      atomInputInfo: ruleEngineController.atomInputInfo,
      isDate,
      FormType,
      operators,
      dictsValue,
      FormItem,
    };
  }
)(
  Form.create({
    mapPropsToFields(props) {
      const { conditionItem, isDate } = props;
      return formUtils.mapObjectToFields(conditionItem, {
        value: (el) => {
          if (isDate) {
            return el ? moment(el) : null;
          }
          return el || null;
        },
      });
    },
  })(GroupConditionItem)
);
