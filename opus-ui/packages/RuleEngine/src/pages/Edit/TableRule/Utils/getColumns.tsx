import React from 'react';
import { Icon, Checkbox, Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Title from '../Title';
import SelectRender from '../SelectRender';
import getRender from './getRender';
import getExtraColumns from './getExtraColumns';
import { AtomType, Type } from '../../Enum';
import ButtonLink from '../../components/Button/Link';

export default ({
  selectConditions,
  selectResults,
  onEdit,
  onDelete,
  editable,
  toggleEditable,
  onSave,
  taskNotEditable,
  allRuleAtoms,
  atomInputInfo,
  ruleAtomModule,
  booleanArray,
  toggleCheckbox,
  onCheckBox,
  onUnBind,
  dataSource,
}: any) => {
  const conditionsColumns = getExtraColumns({
    options: selectConditions.requiredConditions,
    key: 'conditions',
    allRuleAtoms,
    atomInputInfo,
    ruleAtomModule,
    booleanArray,
    dataSource,
    editable,
    type: Type.BasicRule,
  });
  const resultsColumns = getExtraColumns({
    options: selectResults.requiredResults,
    key: 'results',
    allRuleAtoms,
    atomInputInfo,
    ruleAtomModule,
    booleanArray,
    dataSource,
    editable,
    type: Type.Result,
  });

  const checkboxRows = [
    {
      title: <Checkbox disabled={taskNotEditable} onChange={toggleCheckbox} />,
      key: 'checkRows',
      width: 45,
      render: (el: any, record: any) => {
        return record.binded === '1' ? (
          <ButtonLink
            taskNotEditable={taskNotEditable}
            onUnBind={() => {
              onUnBind(record);
            }}
          >
            {' '}
          </ButtonLink>
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

  const editRows = [
    {
      key: 'editRows',
      title: (
        <Button
          disabled={taskNotEditable}
          icon={editable ? 'check' : 'edit'}
          onClick={toggleEditable}
        />
      ),
      width: 40,
      render: (el: any, record: any) => {
        return record.binded === '0' && !taskNotEditable ? (
          <Icon type="edit" onClick={() => onEdit(record)} />
        ) : null;
      },
    },
  ];

  const deleteRows = [
    {
      key: 'deleteRows',
      title: '',
      width: 40,
      render: (el: any, record: any) => {
        return !taskNotEditable ? (
          <Icon type="close-circle" onClick={() => onDelete(record)} />
        ) : null;
      },
    },
  ];

  return [
    ...checkboxRows,
    ...editRows,
    {
      key: 'ruleName',
      width: 160,
      title: <Title labelId="venus_claim.ruleEngine.label.ruleName" editable={editable} />,
      dataIndex: 'ruleName',
    },
    {
      key: 'judgementMethod',
      width: 120,
      title: <Title labelId="venus_claim.ruleEngine.label.judgementMethod" editable={editable} />,
      dataIndex: 'judgementMethod',
      render: (text) => formatMessageApi({ judgementMethod: text }),
    },
    {
      key: 'conditions',
      width: 320,
      className: conditionsColumns ? 'hasChildren' : '',
      title: editable ? (
        <SelectRender
          title={formatMessageApi({
            Label_BIZ_Claim: 'venus_claim.ruleEngine.label.conditions',
          })}
          onSave={onSave}
          AtomType={AtomType.conditions}
          options={selectConditions.conditions}
          setOptions={selectConditions.setConditions}
          dataSource={selectConditions.selectConditions}
          propsOptions={selectConditions.requiredConditions}
        />
      ) : (
        <Title labelId="venus_claim.ruleEngine.label.conditions" />
      ),
      children: conditionsColumns,
      render: (text, record) => {
        return getRender({
          record,
          key: 'conditions',
          match: false,
          options: selectConditions.requiredConditions,
          allRuleAtoms,
          atomInputInfo,
          ruleAtomModule,
          booleanArray,
          type: Type.BasicRule,
        });
      },
    },
    {
      key: 'results',
      width: 320,
      className: resultsColumns ? 'hasChildren' : '',
      title: editable ? (
        <SelectRender
          title={formatMessageApi({
            Label_BIZ_Claim: 'venus_claim.ruleEngine.label.results',
          })}
          onSave={onSave}
          AtomType={AtomType.results}
          options={selectResults.results}
          setOptions={selectResults.setResults}
          dataSource={selectResults.selectResults}
          propsOptions={selectResults.requiredResults}
        />
      ) : (
        <Title labelId="venus_claim.ruleEngine.label.results" />
      ),
      children: resultsColumns,
      render: (text, record) => {
        return getRender({
          record,
          key: 'results',
          match: false,
          options: selectResults.requiredResults,
          allRuleAtoms,
          atomInputInfo,
          ruleAtomModule,
          booleanArray,
          type: Type.Result,
        });
      },
    },
    ...deleteRows,
  ];
};
