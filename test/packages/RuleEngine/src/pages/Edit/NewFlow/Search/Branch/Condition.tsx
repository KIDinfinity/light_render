import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemSelect } from 'basic/components/Form/FormSection';
import Operator from './Operator';
import Value from './Value';
import { Type } from '../../../Enum';
import { OptionType } from '../../Enum';

interface IProps {
  form?: any;
  taskNotEditable: boolean;
  ruleAtoms: any;
  submitRuleSet: any;
  atomInputInfo: any;
  item: any;
  dispatch: any;
}

const ConditionItem = ({
  form,
  item,
  submitRuleSet,
  ruleAtoms,
  taskNotEditable,
  atomInputInfo,
  dispatch,
}: IProps) => {
  const moduleCode = formUtils.queryValue(submitRuleSet.ruleSetInfo.moduleCode || '');

  const atomCode = formUtils.queryValue(item.atomCode) || '';

  const atomList = lodash.filter(ruleAtoms, (el: any) => el?.moduleCode === moduleCode);
  const atomInfo = lodash.chain(atomInputInfo).find({ atomCode }).value() || {};

  useEffect(() => {
    if (!lodash.isEmpty(atomCode) && !lodash.isEmpty(moduleCode)) {
      const existObj = lodash.find(atomInputInfo, { atomCode });
      if (existObj) return;
      dispatch({
        type: 'ruleEngineController/getAtomInputInfo',
        payload: {
          atomCode,
          moduleCode,
        },
      });
    }
  }, [atomCode, moduleCode]);

  return (
    <FormSection
      form={form}
      formId={`FormData_${item.id}`}
      title=""
      layConf={{
        default: 8,
      }}
      isMargin
    >
      <FormItemSelect
        form={form}
        dicts={atomList}
        formName="atomCode"
        dictCode="atomCode"
        labelId=""
        dictName="formatName"
        required
        disabled={taskNotEditable}
      />
      <Operator
        form={form}
        taskNotEditable={taskNotEditable}
        atomInfo={atomInfo}
        type={Type.BasicRule}
      />
      <Value form={form} taskNotEditable={taskNotEditable} atomInfo={atomInfo} item={item} />
    </FormSection>
  );
};

export default connect(({ claimEditable, ruleEngineController, dictionaryController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  submitRuleSet: ruleEngineController.submitRuleSet || {},
  ruleAtoms: ruleEngineController.dropDown?.ruleAtoms || [],
  atomInputInfo: ruleEngineController.atomInputInfo || [],
  booleanArray: dictionaryController.boolean,
}))(
  Form.create<IProps>({
    onFieldsChange(props: IProps, changedFields: any) {
      if (formUtils.shouldUpdateState(changedFields)) {
        const { dispatch, item }: any = props;
        dispatch({
          type: 'ruleEngineController/updateNewRuleFlowConditions',
          payload: {
            type: OptionType.UPDATE,
            id: item.id,
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields({
        ...item,
        timePick: '',
      });
    },
  })(ConditionItem)
);
