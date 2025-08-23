import React, { useEffect, useMemo } from 'react';
import { Form } from 'antd';
import { connect, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import FormSection, {
  FormCard,
  FormItemInput,
  FormItemCheckbox,
} from 'basic/components/Form/FormSection';
import AtomFxFormItem from '../Fx/AtomFxFormItem';
import ButtonLink from '../../../../components/Button/Link';
import Value from '../../../../components/Value';
import Operator from './Operator';
import styles from '../index.less';

interface IProps {
  form?: any;
  item?: any;
  currentGroupId?: string;
  taskNotEditable: boolean;
  ruleAtoms: any;
  submitRuleSet?: any;
  atomInputInfo: any;
  type?: string;
  judgementMethod: string;
  dataLength: number;
  onDelete: any;
  onUnBind: any;
}

const ConditionItem = ({
  form,
  currentGroupId,
  item,
  submitRuleSet,
  ruleAtoms,
  taskNotEditable,
  atomInputInfo,
  type,
  judgementMethod,
  dataLength,
  onDelete,
  onUnBind,
}: IProps) => {
  const dispatch = useDispatch();

  const moduleCode = formUtils.queryValue(submitRuleSet.ruleSetInfo.moduleCode || '');

  const atomCode = formUtils.queryValue(item.atomCode || '');
  const atomInfo = lodash.find(atomInputInfo, { atomCode }) || {};

  const requiredAtoms =
    lodash
      .chain(submitRuleSet?.groups)
      .find((el: any) => el.groupId === currentGroupId)
      .get('requiredAtoms')
      .value() || '';

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

  const atomList = useMemo(() => {
    return lodash.chain(ruleAtoms).filter({ moduleCode }).uniqBy('atomCode').value();
  }, [ruleAtoms, moduleCode]);

  const isRequireCode = lodash.some(requiredAtoms, (el) => el.atomCode === atomCode);
  const isBinded = item.binded === '1';

  return (
    <div className={styles.item}>
      <FormCard
        handleClick={() => onDelete(item)}
        showButton={!taskNotEditable && !isRequireCode && dataLength > 1}
      >
        <div className={styles.condition}>
          <div className={styles.left}>
            {item.binded === '1' ? (
              <ButtonLink
                onUnBind={() => {
                  onUnBind(item);
                }}
              />
            ) : (
              <FormItemCheckbox form={form} name="checked" formName="checked" />
            )}
          </div>
          <div className={styles.right}>
            <FormSection
              form={form}
              formId={`FormData_condition_${item.id}`}
              layConf={{
                default: 8,
                checked: 1,
                operator: 4,
                value: 11,
                description: 16,
              }}
              isMargin={false}
            >
              <AtomFxFormItem
                form={form}
                formName="atomCode"
                labelId="venus_claim.ruleEngine.label.atomName"
                required
                disabled={taskNotEditable || isRequireCode || isBinded}
                dicts={atomList}
                name="atomCode"
                dictCode="atomCode"
                dictName="formatName"
                conditionId={item.id}
                itemConditionId={item.conditionId}
              />

              <Operator
                form={form}
                taskNotEditable={taskNotEditable}
                atomInfo={atomInfo}
                item={item}
                type={type}
                judgementMethod={formUtils.queryValue(judgementMethod || '')}
              />
              <Value
                form={form}
                taskNotEditable={taskNotEditable}
                atomInfo={atomInfo}
                item={item}
              />
              <FormItemInput
                form={form}
                formName="conditionName"
                labelId="venus_claim.ruleEngine.label.conditionName"
                required
                disabled={taskNotEditable}
              />
              <FormItemInput
                form={form}
                formName="conditionDescription"
                labelId="venus_claim.ruleEngine.label.conditionDescription"
                name="description"
                disabled={taskNotEditable}
              />
            </FormSection>
          </div>
        </div>
      </FormCard>
    </div>
  );
};

export default connect(({ claimEditable, ruleEngineController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  submitRuleSet: ruleEngineController.submitRuleSet || {},
  ruleAtoms: ruleEngineController.dropDown?.ruleAtoms || [],
  atomInputInfo: ruleEngineController.atomInputInfo || [],
  currentGroupId: ruleEngineController.currentGroupId,
  judgementMethod: ruleEngineController?.editData?.judgementMethod,
}))(
  Form.create<IProps>({
    onFieldsChange(props: IProps, changedFields: any) {
      if (formUtils.shouldUpdateState(changedFields)) {
        const { dispatch, item, currentGroupId } = props;
        dispatch({
          type: 'ruleEngineController/saveConditionsData',
          payload: {
            changedFields,
            id: item.id,
            groupId: currentGroupId,
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
