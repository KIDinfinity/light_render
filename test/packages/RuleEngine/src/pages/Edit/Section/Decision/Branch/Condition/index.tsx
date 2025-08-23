import React from 'react';
import lodash from 'lodash';
import { Icon, Checkbox } from 'antd';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormItemInput } from 'basic/components/Form/FormSection';
import AtomFxFormItem from '../Fx/AtomFxFormItem';
import Operator from './Operator';
import Value from './Value';
import Link from '../../../../components/Button/Link';

export default ({
  form,
  list,
  branchItem,
  atomList,
  atomInputInfo,
  moduleCode,
  taskNotEditable,
  onDelete,
  onUnBind,
  onCheckBox,
}: any) => {
  const checkboxRows = [
    {
      title: '',
      width: 45,
      render: (el: any, record: any) => {
        return record.binded === '1' ? (
          <Link
            taskNotEditable={taskNotEditable}
            onUnBind={() => {
              onUnBind(record);
            }}
          >
            {' '}
          </Link>
        ) : (
          <Checkbox
            disabled={taskNotEditable}
            checked={record.checked}
            onClick={() => onCheckBox(record)}
          />
        );
      },
    },
  ];
  const deleteRows = [
    {
      key: 'deleteRows',
      title: '',
      width: 40,
      render: (el: any, record: any) => {
        return !taskNotEditable && list.length > 1 ? (
          <Icon type="close-circle" onClick={() => onDelete(record)} />
        ) : null;
      },
    },
  ];
  return [
    ...checkboxRows,
    {
      title: formatMessageApi({
        Label_BIZ_Claim: 'venus_claim.ruleEngine.label.conditionName',
      }),
      dataIndex: 'conditionName',
      key: 'conditionName',
      align: 'left',
      render: (el: any, record: any, index: number) => {
        return (
          <FormItemInput
            form={form}
            labelId={formatMessageApi({
              Label_BIZ_Claim: 'venus_claim.ruleEngine.label.conditionName',
            })}
            disabled={record.binded === '1' || taskNotEditable}
            formName={`conditionName-${index}`}
          />
        );
      },
    },
    {
      key: 'atomCode',
      title: formatMessageApi({
        Label_BIZ_Claim: 'venus_claim.ruleEngine.label.atomName',
      }),
      dataIndex: 'atomCode',
      render: (el: any, record: any, index: number) => {
        return (
          <AtomFxFormItem
            form={form}
            formName={`atomCode-${index}`}
            labelId={formatMessageApi({
              Label_BIZ_Claim: 'venus_claim.ruleEngine.label.atomName',
            })}
            required
            disabled={record.binded === '1' || taskNotEditable}
            dicts={atomList}
            dictCode="atomCode"
            dictName="formatName"
            branchItem={branchItem}
            conditionId={record.conditionId}
            itemConditionId={record.conditionId}
          />
        );
      },
    },
    {
      key: 'operator',
      title: formatMessageApi({
        Label_BIZ_Claim: 'venus_claim.ruleEngine.label.operator',
      }),
      dataIndex: 'operator',
      width: 200,
      render: (el: any, record: any, index: number) => {
        const atomCode = formUtils.queryValue(record.atomCode || '');
        const atomInfo = lodash.chain(atomInputInfo).find({ atomCode, moduleCode }).value() || {};
        return (
          <Operator
            form={form}
            atomInfo={atomInfo}
            taskNotEditable={taskNotEditable}
            index={index}
            item={record}
          />
        );
      },
    },
    {
      key: 'value',
      title: formatMessageApi({
        Label_BIZ_Claim: 'venus_claim.ruleEngine.label.value',
      }),
      dataIndex: 'value',
      render: (el: any, record: any, index: number) => {
        const atomCode = formUtils.queryValue(record.atomCode || '');
        const atomInfo = lodash.chain(atomInputInfo).find({ atomCode, moduleCode }).value() || {};
        return (
          <Value
            form={form}
            atomInfo={atomInfo}
            taskNotEditable={taskNotEditable}
            index={index}
            item={record}
          />
        );
      },
    },
    ...deleteRows,
  ];
};
