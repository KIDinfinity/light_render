import React from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormSection, { FormItemSelect } from 'basic/components/Form/FormSection';
import { messageModal } from '@/utils/commonMessage';
import { formUtils } from 'basic/components/Form';
import { ButtonType, JudgementMethod } from '../../../Enum';
import { getIsNewRule } from '../../../Utils';
import { headerLayout } from './layout';

import styles from './index.less';

const ButtonList = [
  { key: ButtonType.ADD, labelId: 'venus_claim.ruleEngine.label.button.addToLibrary' },
  {
    key: ButtonType.SEARCH,
    disabled: true,
    labelId: 'venus_claim.ruleEngine.label.button.existingCondition',
  },
  { key: ButtonType.NEW, labelId: 'venus_claim.ruleEngine.label.newCondition' },
  { key: ButtonType.FREE, labelId: 'Free' },
];

function Header({
  form,
  taskNotEditable,
  onAdd,
  judgementMethod,
  judgementMethodDicts,
  ruleSetInfo,
  dispatch,
  ruleModules,
}: any) {
  const onBlur = () => {
    const judgementMethodTemp = form.getFieldValue('judgementMethod');
    if (judgementMethodTemp === JudgementMethod['04']) {
      messageModal(
        {
          typeCode: 'Label_COM_WarningMessage',
          dictCode: 'ERR_000263',
        },
        {
          okFn: async () => {
            dispatch({
              type: 'ruleEngineController/updateEditData',
              payload: {
                changedFields: {
                  judgementMethod: judgementMethodTemp,
                },
              },
            });
          },
          cancelFn: async () => {
            dispatch({
              type: 'ruleEngineController/updateEditData',
              payload: {
                changedFields: {
                  judgementMethod,
                },
              },
            });
          },
        }
      );
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <FormSection layout={headerLayout} isMargin={false} isPadding={false}>
          <FormItemSelect
            form={form}
            formName="judgementMethod"
            labelId="venus_claim.ruleEngine.label.judgementMethod"
            required
            onBlur={onBlur}
            disabled={taskNotEditable}
            dicts={judgementMethodDicts}
          />
        </FormSection>
      </div>
      <div className={styles.headerRight}>
        {lodash.map(ButtonList, (item: any) => {
          if (
            item.labelId === 'Free' &&
            !getIsNewRule(formUtils.queryValue(ruleSetInfo?.moduleCode), ruleModules)
          ) {
            return null;
          }
          return (
            <Button
              key={item.key}
              shape="round"
              icon="plus"
              disabled={taskNotEditable}
              onClick={() => {
                onAdd(item.key);
              }}
            >
              {formatMessageApi({
                Label_BIZ_Claim: item.labelId,
              })}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default connect(({ dictionaryController, ruleEngineController, claimEditable }: any) => ({
  ruleSetInfo: ruleEngineController.submitRuleSet?.ruleSetInfo,
  judgementMethodDicts: dictionaryController.judgementMethod,
  judgementMethod: ruleEngineController?.editData?.judgementMethod,
  ruleModules: ruleEngineController?.dropDown?.ruleModules,
  taskNotEditable: claimEditable.taskNotEditable,
}))(Header);
