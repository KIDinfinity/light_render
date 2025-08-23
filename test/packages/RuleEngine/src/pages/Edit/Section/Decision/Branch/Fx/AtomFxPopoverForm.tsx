import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'dva';
import { FormItemSelect, FormItemInput, FormItemNumber } from 'basic/components/Form/FormSection';
import { Button, Form } from 'antd';
import lodash from 'lodash';
import { safeParseUtil } from '@/utils/utils';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import InputType from '../../../../Enum/ParametersInputType';
import styles from './AtomFxPopoverForm.less';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const AtomFxPopoverForm = (props: any) => {
  const {
    form,
    conditionId,
    atomFormulaInfo,
    setFormulaFormItemDisabled,
    setVisible,
    atomName,
    setFormulaAtom,
    setAtomCode,
    dispatch,
  } = props;

  const [formula, setFormula] = useState([]);
  const { formula: _, ...parameter } = form.getFieldsValue();

  const editData = useSelector((state: any) => state.ruleEngineController.editData);
  const condition = lodash.find(editData.conditions, (el: any) => el.id === conditionId);

  const onOk = () => {
    form.validateFields((err) => {
      if (!err) {
        setVisible(false);
        setFormulaFormItemDisabled(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formulaAtom = `${formula?.editFunction}(${lodash
          .values(parameter)
          .map((value) => value)
          .join(',')})`;
        setFormulaAtom(formulaAtom);
      }
    });
  };

  const onDelete = () => {
    setVisible(false);
    setFormulaFormItemDisabled(false);
    setFormulaAtom('');
    dispatch({
      type: 'ruleEngineController/deleteAtomFx',
      payload: {
        conditionId,
      },
    });
  };

  const onAddToLibrary = async () => {
    form.validateFields(async (err) => {
      if (!err) {
        const newAtomCode = await dispatch({
          type: 'ruleEngineController/addAtomToLibrary',
          payload: {
            conditionId,
          },
        });
        setVisible(false);
        setFormulaAtom('');
        // reload
        await dispatch({
          type: 'ruleEngineController/getDropDown',
        });
        // pick option
        setAtomCode(newAtomCode);
        // reset
        dispatch({
          type: 'ruleEngineController/deleteAtomFx',
          payload: {
            conditionId,
          },
        });
      }
    });
  };

  useEffect(() => {
    const formulaCode = form.getFieldValue('formula');
    const formulaItem = (atomFormulaInfo?.ruleFormulaDOList || []).find(
      (item) => item.formulaCode === formulaCode
    );
    const formulaInfo = safeParseUtil(formulaItem?.formulaTemplate);
    setFormula(formulaInfo);
  }, [form.getFieldValue('formula')]);

  return (
    <Form>
      <FormItemSelect
        // initialValue={atomFormulaInfo?.ruleFormulaVO?.formula}
        form={form}
        formName="formula"
        labelId="venus_claim.ruleEngine.label.Formula"
        required
        disabled={atomFormulaInfo?.fxHighLight}
        dicts={atomFormulaInfo?.ruleFormulaDOList || []}
        dictCode="formulaCode"
        dictName="formulaName"
      />

      <div>
        <h4>{formatMessageApi({ Label_BIZ_Claim: 'venus_claim.ruleEngine.label.Parameters' })}</h4>
        {lodash
          .entries(
            atomFormulaInfo?.fxHighLight ? condition?.formulaInfo?.parameter : formula?.parameter
          )
          .map(([key, item]) => {
            if (item.inputType === InputType.number) {
              return (
                <FormItemNumber
                  // initialValue={atomFormulaInfo?.ruleFormulaVO?.parameter?.[key] || item.defaultValue}
                  key={key}
                  formItemLayout={formItemLayout}
                  form={form}
                  formName={`${key}`}
                  labelId={key}
                  precision={0}
                  required
                />
              );
            }
            if (item.inputType === InputType.string) {
              return (
                <FormItemInput
                  // initialValue={atomFormulaInfo?.ruleFormulaVO?.parameter?.[key] || item.defaultValue}
                  key={key}
                  formItemLayout={formItemLayout}
                  form={form}
                  formName={`${key}`}
                  labelId={key}
                  required
                />
              );
            }
            return (
              <FormItemInput
                initialValue={atomName}
                key={key}
                formItemLayout={formItemLayout}
                form={form}
                formName={`${key}`}
                labelId={key}
                disabled
                required
              />
            );
          })}
      </div>

      <div className={styles.buttonbar}>
        <Button shape="round" size="small" onClick={onOk} disabled={atomFormulaInfo?.fxHighLight}>
          {formatMessageApi({ Label_BIZ_Claim: 'venus_claim.ruleEngine.label.OK' })}
        </Button>
        <Button
          shape="round"
          size="small"
          onClick={onDelete}
          disabled={atomFormulaInfo?.fxHighLight}
        >
          {formatMessageApi({ Label_BIZ_Claim: 'venus_claim.ruleEngine.label.Delete' })}
        </Button>
        <Button
          shape="round"
          size="small"
          onClick={onAddToLibrary}
          disabled={atomFormulaInfo?.fxHighLight}
        >
          {formatMessageApi({ Label_BIZ_Claim: 'venus_claim.ruleEngine.label.AddtoLibrary' })}
        </Button>
      </div>
    </Form>
  );
};

export default connect(({ claimEditable, ruleEngineController, dictionaryController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  submitRuleSet: ruleEngineController.submitRuleSet || {},
  currentGroupId: ruleEngineController.currentGroupId,
  atomInputInfo: ruleEngineController.atomInputInfo,
  dropDown: ruleEngineController.dropDown || [],
  judgementMethod: ruleEngineController?.editData?.judgementMethod,
  editData: ruleEngineController.editData || {},
  booleanArray: dictionaryController.boolean,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, conditionId, atomName } = props;
      dispatch({
        type: 'ruleEngineController/saveAtomFx',
        payload: {
          conditionId,
          atomName,
          changedFields,
        },
      });
    },
    mapPropsToFields(props) {
      const { editData, conditionId } = props;
      const condition = lodash.find(editData.conditions, (el: any) => el.id === conditionId);
      let obj = {};
      if (lodash.isPlainObject(condition?.formulaInfo)) {
        obj = {
          formula: condition.formulaInfo.formula,
          ...condition.formulaInfo.parameter,
        };
      }

      return formUtils.mapObjectToFields(obj);
    },
  })(AtomFxPopoverForm)
);
