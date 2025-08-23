import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useDispatch } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FormSection, {
  FormCard,
  FormItemInput,
  FormItemCheckbox,
  FormItemSelect,
} from 'basic/components/Form/FormSection';
import ButtonLink from '../../../../components/Button/Link';
import Operator from './Operator';
import Value from '../../../../components/Value';
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
  dataLength,
  onDelete,
  onUnBind,
}: IProps) => {
  const dispatch = useDispatch();

  const moduleCode = formUtils.queryValue(submitRuleSet.ruleSetInfo.moduleCode || '');
  const atomCode = formUtils.queryValue(item.atomCode || '');

  const atomList = lodash.filter(ruleAtoms, (el: any) => el?.moduleCode === moduleCode);
  const atomInfo = lodash.chain(atomInputInfo).find({ atomCode }).value() || {};
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
              <FormItemSelect
                form={form}
                dicts={atomList}
                formName="atomCode"
                dictCode="atomCode"
                labelId="atomCode"
                dictName="formatName"
                required
                disabled={taskNotEditable || isRequireCode || isBinded}
              />

              <Operator
                form={form}
                taskNotEditable={taskNotEditable || isRequireCode || isBinded}
                atomInfo={atomInfo}
                type={type}
              />
              <Value
                form={form}
                taskNotEditable={taskNotEditable || isRequireCode || isBinded}
                atomInfo={atomInfo}
                item={item}
              />
              <FormItemInput
                form={form}
                formName="resultName"
                labelId="venus_claim.ruleEngine.label.resultName"
                required
                disabled={taskNotEditable}
              />
              <FormItemInput
                form={form}
                formName="resultDescription"
                labelId="venus_claim.ruleEngine.label.resultDescription"
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
}))(
  Form.create<IProps>({
    onFieldsChange(props: IProps, changedFields: any) {
      if (formUtils.shouldUpdateState(changedFields)) {
        const { dispatch, item, currentGroupId } = props;
        dispatch({
          type: 'ruleEngineController/saveResultData',
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
      return formUtils.mapObjectToFields({
        ...item,
        timePick: '',
      });
    },
  })(ConditionItem)
);
