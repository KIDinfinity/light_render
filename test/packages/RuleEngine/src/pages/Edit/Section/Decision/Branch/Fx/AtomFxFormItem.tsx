import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import AtomSelect from './AtomSelect';
import AtomFx from './AtomFx';
import styles from './AtomFxFormItem.less';

export default (props: any) => {
  const { form, conditionId, itemConditionId, formName, dicts, dictCode, dictName } = props;
  const dispatch = useDispatch();
  const [formulaAtom, setFormulaAtom] = useState('');
  // AtomSelect -> AtomFx
  const [atomFormulaInfo, saveAtomFormulaInfo] = useState({});
  // AtomSelect|AtomFx|AtomFxPopover-button disabled
  const [formulaFormItemDisabled, setFormulaFormItemDisabled] = useState(false);

  const editData = useSelector((state: any) => state.ruleEngineController.editData);
  const condition = lodash.find(editData.conditions, (el: any) => el.id === conditionId);
  const isBinded = condition?.binded === '1';

  const setAtomCode = (value) => {
    dispatch({
      type: 'ruleEngineController/saveAtomCode',
      payload: {
        conditionId,
        atomCode: value,
      },
    });
  };
  const getAtomInfo = async () => {
    await dispatch({
      type: 'ruleEngineController/deleteAtomFx',
      payload: {
        conditionId,
      },
    });
    const info = await dispatch({
      type: 'ruleEngineController/getAtomFormulaInfo',
      payload: {
        atomCode: form.getFieldValue(formName),
        conditionId: itemConditionId,
      },
    });
    if (info.ruleFormulaVO || condition.formulaInfo) {
      await dispatch({
        type: 'ruleEngineController/initAtomFx',
        payload: {
          conditionId,
          formulaInfo: info.ruleFormulaVO || condition.formulaInfo,
        },
      });
      // 显示FX高亮
      setFormulaFormItemDisabled(true);
    }
    saveAtomFormulaInfo(info);
  };
  useEffect(() => {
    if (condition?.atomCode && !lodash.isEmpty(condition?.atomCode)) {
      getAtomInfo();
    }
  }, [form.getFieldValue(formName)]);

  useEffect(() => {
    if (!condition?.atomCode && !lodash.isEmpty(condition?.atomCode))return;

    const parameter = condition?.formulaInfo?.parameter;
    const formula = condition?.formulaInfo?.formula;
    const isFlagF = condition?.atomFlag === 'F';
    if (
      !isFlagF &&
      formula &&
      parameter &&
      !lodash.isEmpty(formula) &&
      !lodash.isEmpty(parameter)
    ) {
      const formulaAtom = `${formula.substring(formula.indexOf('.') + 1, formula.length)}(${lodash
        .values(parameter)
        .map((value) => value)
        .join(',')})`;
      setFormulaAtom(formulaAtom);
    }
  }, []);

  return (
    <div className={styles.atomfx}>
      <AtomSelect
        {...props}
        disabled={formulaFormItemDisabled || isBinded}
        formulaAtom={formulaAtom}
      />

      {atomFormulaInfo.fxStatus ? (
        <AtomFx
          atomCode={form.getFieldValue(formName)}
          atomName={
            (dicts.find((item) => item[dictCode] === form.getFieldValue(formName)) || {})[dictName]
          }
          conditionId={conditionId}
          required
          atomFormulaInfo={atomFormulaInfo}
          formulaFormItemDisabled={formulaFormItemDisabled}
          setFormulaFormItemDisabled={setFormulaFormItemDisabled}
          setFormulaAtom={setFormulaAtom}
          setAtomCode={setAtomCode}
        />
      ) : null}
    </div>
  );
};
