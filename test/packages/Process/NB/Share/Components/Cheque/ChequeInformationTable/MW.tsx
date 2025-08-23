import React, { useMemo } from 'react';
import { Table } from 'antd';
import lodash from 'lodash';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import transTableRowsConfigEditable from 'basic/utils/transTableRowsConfigEditable';
import useGetChequeInfoList from 'process/NB/Share/hooks/useGetChequeInfoList';
import useHandleChangeChequeInfo from 'process/NB/Share/hooks/useHandleChangeChequeInfo';
import useJudgeChequeAllocationAmountDisabledCallback from 'process/NB/Share/hooks/useJudgeChequeAllocationAmountDisabledCallback';
import useGetSectionConfigObject from 'process/NB/Share/hooks/useGetTableSectionConfigObject';

const ChequeTable = () => {
  const handleChange = useHandleChangeChequeInfo();
  const config = useGetSectionAtomConfig(useGetSectionConfigObject());
  const dataSource = useGetChequeInfoList();

  const handleJudgeDisabled = useJudgeChequeAllocationAmountDisabledCallback();

  const columns = useMemo(() => {
    return transTableRowsConfigEditable({
      config,
      editable: true,
      operations: {
        chequeAllocationAmount: {
          onChange: (value: any, record: any, field: string, label: string) => {
            handleChange(value, record, field, label);
          },
          onBlur: (e: any, record: any, field: string, label: string) => {
            const value = e.target.value;
            if (lodash.isEmpty(value)) {
              handleChange(0, record, field, label);
            }
          },
          disabledCallback: handleJudgeDisabled,
          precision: 2,
        },
      },
    });
  }, [config, handleChange, handleJudgeDisabled]);

  return <Table columns={columns} dataSource={dataSource} />;
};

ChequeTable.displayName = 'ChequeTable';

export default ChequeTable;
