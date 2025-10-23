import React from 'react';
import { Icon, Checkbox, Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Title from '../Title';
import getRender from './getRender';
import getExtraColumns from './getExtraColumns';
import { Type } from '../../../../Enum';

export default ({
  selectConditions,
  selectResults,
  allRuleAtoms,
  atomInputInfo,
  ruleAtomModule,
  booleanArray,
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
    type: Type.Result,
  });

  const checkboxRows = [
    {
      title: <Checkbox disabled />,
      width: 45,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (el: any, record: any) => {
        return <Checkbox disabled checked={record.checked} />;
      },
    },
  ];

  const editRows = [
    {
      key: 'editRows',
      title: <Button disabled icon="edit" />,
      width: 40,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (el: any, record: any) => {
        return <Icon type="edit" />;
      },
    },
  ];

  const deleteRows = [
    {
      key: 'deleteRows',
      title: '',
      width: 40,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (el: any, record: any) => {
        return <Icon type="edit" />;
      },
    },
  ];

  return [
    ...checkboxRows,
    ...editRows,
    {
      key: 'ruleName',
      width: 160,
      title: <Title labelId="venus_claim.ruleEngine.label.ruleName" editable={false} />,
      dataIndex: 'ruleName',
    },
    {
      key: 'judgementMethod',
      width: 120,
      title: <Title labelId="venus_claim.ruleEngine.label.judgementMethod" editable={false} />,
      dataIndex: 'judgementMethod',
      render: (text) => formatMessageApi({ judgementMethod: text }),
    },
    {
      key: 'conditions',
      width: 320,
      className: conditionsColumns ? 'hasChildren' : '',
      title: <Title labelId="venus_claim.ruleEngine.label.conditions" />,
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
      title: <Title labelId="venus_claim.ruleEngine.label.results" />,
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
