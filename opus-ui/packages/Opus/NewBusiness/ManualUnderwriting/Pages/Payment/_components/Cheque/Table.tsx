import React from 'react';
import { useDispatch } from 'dva';
import { Table } from 'antd';
import lodash from 'lodash';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import transTableRowsConfigEditable from 'basic/utils/transTableRowsConfigEditable';

import { useGetEnableEditTable, useGetTableSectionConfigObject } from './_hooks';

interface IParams {
  showOnly: boolean;
  chequeInfoList: any;
  payType?: string;
}
const ChequeTable = ({ showOnly, chequeInfoList, payType }: IParams) => {
  const dispatch = useDispatch();

  // TODO:这个配置应该用section的方式去写
  const config = useGetSectionAtomConfig(useGetTableSectionConfigObject());

  // 获取不可编辑
  const enableEdit = useGetEnableEditTable({ showOnly, payType });

  const handlechngeField = ({ id, field, value, policyId, label }: any) => {
    dispatch({
      type: `${NAMESPACE}/saveChequeInfoList`,
      payload: {
        id,
        changedFields: {
          [field]: value,
        },
      },
    });
    dispatch({
      type: 'auditLogController/saveChangedFields',
      payload: {
        changedFields: {
          [field]: {
            value,
            label: `${label} - ${policyId}`,
            name: field,
          },
        },
      },
    });
  };

  return (
    <Table
      columns={transTableRowsConfigEditable({
        config,
        editable: true,
        operations: {
          chequeAllocationAmount: {
            onChange: (value: any, record: any, field: string, label: string) => {
              handlechngeField({ value, field, id: record?.id, label, policyId: record?.policyId });
            },
            onBlur: (e: any, record: any, field: string, label: string) => {
              const value = e.target.value;
              if (lodash.isEmpty(value)) {
                handlechngeField({
                  value: 0,
                  id: record?.id,
                  field,
                  label,
                  policyId: record?.policyId,
                });
              }
            },
            disabled: !enableEdit,
          },
        },
      })}
      rowKey="id"
      dataSource={chequeInfoList}
      pagination={false}
    />
  );
};

ChequeTable.displayName = 'ChequeTable';

export default ChequeTable;
