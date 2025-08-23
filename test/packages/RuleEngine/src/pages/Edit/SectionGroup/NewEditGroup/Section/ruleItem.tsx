import React, { useState, useEffect } from 'react';
import lodash from 'lodash';
import { Icon, Form, Popover, Input, notification } from 'antd';
import type { FormComponentProps } from 'antd/es/form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import type { Dispatch } from 'redux';

import FormSection, { FormItemSelect } from 'basic/components/Form/FormSection';
import classnames from 'classnames';
import { TypeCode, ConfigType, Operator } from '../../../Enum';
import getDropDownFormat from '../../../Utils/getDropDownFormat';
import Atom from '../modal/atom';
import Value from '../modal/value';
import styles from '../index.less';

interface IProps {
  form: any;
  formKey: string;
  item: any;
  type: string;
  onDelete: Function;
  dataLength: number;
  disabled: boolean;
  atomInputInfo: any;
  newModalError: any;
  dispatch: any;
  submitRuleSet: any;
}
interface IFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  validating: boolean;
}

const RuleItem = ({
  formKey,
  item,
  type,
  dataLength,
  onDelete,
  form,
  disabled,
  atomInputInfo,
  newModalError,
  dispatch,
  submitRuleSet,
}: IProps) => {
  const [visibleAtom, setVisibleAtom] = useState(false);
  const [visibleValue, setVisibleValue] = useState(false);

  const moduleCode = formUtils.queryValue(submitRuleSet.ruleSetInfo.moduleCode || '');
  const atomCode = formUtils.queryValue(item.atomCode || '');
  const operator = formUtils.queryValue(item.operator || '');

  const atomInfo = lodash.find(atomInputInfo, { atomCode }) || {};

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

  // TODO:这里需要优化,调用太多次了
  const getOperatorList = () => {
    return !lodash.isEmpty(atomInfo)
      ? lodash
          .chain(atomInfo?.operatorList['Basic Rules'][`01`])
          .map((el: any) => ({
            dictName: getDropDownFormat({
              labelId: el,
              type: TypeCode.Operators,
              defaultName: el,
            }),
            dictCode: el,
          }))
          .value() || []
      : [];
  };

  const handleValueChange = async (value: string) => {
    if (item.allowFreeText !== 'Y') return;
    await dispatch({
      type: `ruleEngineController/updateNewEditRuleModal`,
      payload: {
        type,
        item: {
          ...item,
          value,
          comparisonValueType: 'F',
        },
        valueParam: '',
        optionType: 'value',
      },
    });
    if (lodash.isEmpty(value)) {
      setVisibleValue(true);
    } else {
      setVisibleValue(false);
    }
  };

  const getFormatMessage = (value = '') => {
    return !lodash.isEmpty(value)
      ? formatMessageApi({
          Label_RUL_AtomName: `${value}`,
        })
      : value;
  };

  const rendeName = ({ value = '', urlType }: any) => {
    if (!value || lodash.isEmpty(value)) return '';

    if (urlType === ConfigType.Value && !lodash.isEmpty(item.valueName)) return item.valueName;

    let name = getFormatMessage(value);
    if (!lodash.isEmpty(item?.atomParam)) {
      const formatName = getFormatMessage(item.atomParam);
      // eslint-disable-next-line no-useless-escape
      name = getFormatMessage(name).replace(/\{[^\)]*\}/g, formatName);
    }
    if (!lodash.isEmpty(item?.valueParam)) {
      const formatName = getFormatMessage(item.valueParam);
      // eslint-disable-next-line no-useless-escape
      name = getFormatMessage(name).replace(/\{[^\)]*\}/g, formatName);
    }
    return name;
  };

  // eslint-disable-next-line consistent-return
  const getError = ({ urlType }: any) => {
    if (lodash.isEmpty(newModalError)) return false;

    const errorItem = lodash.find(newModalError, (el: any) => el.id === item?.id);
    if (!errorItem) return false;

    if (urlType === ConfigType.Atom) return errorItem.atomCodeError;
    if (urlType === ConfigType.Value) return errorItem.valueError;
  };

  return (
    <div className={styles.ruleItem}>
      <FormSection
        form={form}
        formId={`FormData_${formKey}_${item.id}`}
        layConf={{
          default: 10,
          operator: 4,
        }}
      >
        <Popover
          placement="bottomLeft"
          content={
            <Atom
              ruleItem={item}
              type={type}
              handleHiddenModal={() => {
                setVisibleAtom(false);
              }}
            />
          }
          visible={visibleAtom}
          onVisibleChange={async () => {
            if (item.binded === '1') return;

            setVisibleAtom(!visibleAtom);
          }}
          trigger="click"
        >
          <div className={classnames(getError({ urlType: ConfigType.Atom }) && styles.hasError)}>
            <Input
              disabled={item.binded === '1' || disabled}
              value={rendeName({ value: item.atomCode, urlType: ConfigType.Atom })}
              autoComplete="disable-chrome-autofill-mark"
              prefix={<div className={styles.require}>*</div>}
            />
          </div>
        </Popover>

        <FormItemSelect
          form={form}
          formName="operator"
          labelId=""
          name="operator"
          required
          disabled={disabled}
          dicts={getOperatorList()}
        />

        {!lodash.includes([Operator.isBlank, Operator.isNotBlank], operator) && (
          <Popover
            placement="bottomRight"
            content={
              <Value
                ruleItem={item}
                type={type}
                handleHiddenModal={() => {
                  setVisibleValue(false);
                }}
              />
            }
            visible={visibleValue}
            onVisibleChange={async () => {
              if (!item.atomCode || lodash.isEmpty(item.atomCode)) {
                notification.error({
                  message: formatMessageApi({
                    Label_COM_ErrorMessage: 'MSG_000437',
                  }),
                });
                return;
              }
              if (item.binded === '1') return;
              // 这里有歧义
              if (!visibleValue) {
                const list = await await dispatch({
                  type: 'ruleEngineController/getValueConfig',
                  payload: {
                    atomCode: item.atomCode || '',
                    type,
                  },
                });
                if (list.length > 0) {
                  await setVisibleValue(!visibleValue);
                }
              } else {
                await setVisibleValue(!visibleValue);
              }
            }}
            trigger="click"
          >
            <div className={classnames(getError({ urlType: ConfigType.Value }) && styles.hasError)}>
              <Input
                disabled={item.binded === '1' || disabled}
                value={rendeName({ value: item.value, urlType: ConfigType.Value })}
                onChange={(e) => {
                  handleValueChange(e.target.value);
                }}
                prefix={<div className={styles.require}>*</div>}
                autoComplete="disable-chrome-autofill-mark"
              />
            </div>
          </Popover>
        )}
      </FormSection>
      {dataLength > 1 && (
        <div
          className={styles.close}
          onClick={() => {
            onDelete(item);
          }}
        >
          <Icon type="close-circle" />
        </div>
      )}
    </div>
  );
};

export default connect(({ claimEditable, ruleEngineController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  submitRuleSet: ruleEngineController.submitRuleSet || {},
  atomInputInfo: ruleEngineController.atomInputInfo || [],
  newModalError: ruleEngineController.newModalError || [],
}))(
  Form.create<IFormProps>({
    async onFieldsChange(props, changedFields) {
      const { item, type, dispatch }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `ruleEngineController/updateNewEditRuleForm`,
          payload: {
            changedFields,
            id: item.id,
            type,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item }: any = props;
      return formUtils.mapObjectToFields(item, {});
    },
  })(RuleItem)
);
