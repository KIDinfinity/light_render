import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import FormSection, { FormItemSelect } from 'basic/components/Form/FormSection';
import Operator from './Operator';
import Value from '../../../components/Value';

interface IProps {
  form?: any;
  item?: any;
  groupId: string;
  taskNotEditable: boolean;
  ruleAtoms: any;
  submitRuleSet: any;
  atomInputInfo: any;
  type?: string;
}

const ConditionItem = ({
  form,
  groupId,
  item,
  submitRuleSet,
  ruleAtoms,
  taskNotEditable,
  atomInputInfo,
  type,
}: IProps) => {
  const dispatch = useDispatch();

  const moduleCode = formUtils.queryValue(submitRuleSet.ruleSetInfo.moduleCode || '');
  const atomCode = formUtils.queryValue(item.atomCode || '');

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
      formId={`groupCondition_${groupId}_${item.id}`}
      title=" "
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
        labelId="atomCode"
        dictName="formatName"
        required
        disabled={taskNotEditable}
      />
      <Operator form={form} taskNotEditable={taskNotEditable} atomInfo={atomInfo} type={type} />
      <Value form={form} taskNotEditable={taskNotEditable} atomInfo={atomInfo} item={item} />
    </FormSection>
  );
};

export default connect(({ claimEditable, ruleEngineController, dictionaryController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  submitRuleSet: ruleEngineController.submitRuleSet || {},
  ruleAtoms: ruleEngineController.dropDown?.ruleAtoms || [],
  atomInputInfo: ruleEngineController.atomInputInfo || [],
  currentGroupId: ruleEngineController.currentGroupId,
  judgementMethod: ruleEngineController?.editData?.judgementMethod,
  editData: ruleEngineController.editData || {},
  booleanArray: dictionaryController.boolean,
}))(
  Form.create<IProps>({
    onFieldsChange(props: IProps, changedFields: any) {
      if (formUtils.shouldUpdateState(changedFields)) {
        const { dispatch, item, groupId } = props;
        dispatch({
          type: 'ruleEngineController/saveScenarioConditionData',
          payload: {
            changedFields,
            id: item.id,
            groupId,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item } = props;
      const newValue = lodash.isString(item.value)
        ? lodash
            .chain(item.value.split(','))
            .filter((el: any) => !lodash.isEmpty(el))
            .value() || []
        : item.value;
      return formUtils.mapObjectToFields({
        ...item,
        value: newValue,
        timePick: '',
      });
    },
  })(ConditionItem)
);
