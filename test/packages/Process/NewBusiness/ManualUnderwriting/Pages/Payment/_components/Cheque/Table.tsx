import React from 'react';
import { useDispatch, useSelector } from 'dva';
import { Table } from 'antd';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import ChequeEditStatus from 'process/NewBusiness/Enum/ChequeEditStatus';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import transTableRowsConfigEditable from 'basic/utils/transTableRowsConfigEditable';
import useJudgeChequeAllocationAmountDisabledCallback from './_hooks/useJudgeChequeAllocationAmountDisabledCallback';

import { useGetTableSectionConfigObject } from './_hooks';

interface IParams {
  showOnly: boolean;
  chequeInfoList: any;
  payType?: string;
}
const ChequeTable = ({ showOnly, chequeInfoList, payType }: IParams) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const chequeEditStatus: any = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.chequeEditStatus
  );
  const disabledCallback = useJudgeChequeAllocationAmountDisabledCallback();
  // TODO:这个配置应该用section的方式去写
  const config = useGetSectionAtomConfig(useGetTableSectionConfigObject());

  // 获取不可编辑

  const handlechngeField = ({ id, field, value, policyId, label }: any) => {
    dispatch({
      type: `${NAMESPACE}/saveChequeInfo`,
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
        editable: editable && chequeEditStatus !== ChequeEditStatus.Verified,
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
            disabledCallback,
            precision: 2,
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
