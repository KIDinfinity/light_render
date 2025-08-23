import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormItemNumber } from 'basic/components/Form/FormSection';
import { WithdrawalOptionCode } from '../../Enum';
import { calculationPrecisionFormat } from '../../_models/functions/calculatAmount';

export default ({ form, taskNotEditable, withdrawalOption }: any) => {
  const percentageDisabled = () => {
    return taskNotEditable || withdrawalOption !== WithdrawalOptionCode.Percentage;
  };
  const unitsDisabled = () => {
    return taskNotEditable || withdrawalOption !== WithdrawalOptionCode.Units;
  };
  const amountDisabled = () => {
    return taskNotEditable || withdrawalOption !== WithdrawalOptionCode.Amount;
  };

  return [
    {
      title: formatMessageApi({
        Label_BIZ_POS: 'FundName',
      }),
      dataIndex: 'fundName',
      key: 'fundName',
      fixed: true,
    },
    {
      title: formatMessageApi({
        Label_BIZ_POS: 'FundCode',
      }),
      dataIndex: 'fundCode',
      key: 'fundCode',
      fixed: true,
    },
    {
      title: formatMessageApi({
        Label_BIZ_POS: 'Currency',
      }),
      dataIndex: 'currency',
      key: 'currency',
    },

    {
      title: formatMessageApi({
        Label_BIZ_POS: 'FundPrice',
      }),
      dataIndex: 'pricePerUnit',
      key: 'pricePerUnit',
      align: 'right',
      render: (text: any) => {
        return <>{calculationPrecisionFormat(text)}</>;
      },
    },
    {
      title: formatMessageApi({
        Label_BIZ_POS: 'NumberOfUnits',
      }),
      dataIndex: 'numberOfUnits',
      key: 'numberOfUnits',
      align: 'right',
      render: (text: any) => {
        return <>{calculationPrecisionFormat(text)}</>;
      },
    },
    {
      title: formatMessageApi({
        Label_BIZ_POS: 'TotalFundValue',
      }),
      dataIndex: 'totalFundValue',
      key: 'totalFundValue',
      align: 'right',
      render: (text: any) => {
        return <>{calculationPrecisionFormat(text)}</>;
      },
    },

    {
      title: formatMessageApi({
        Label_BIZ_POS: 'WDPercentage',
      }),
      dataIndex: 'withdrawPercentage',
      key: 'withdrawPercentage',
      align: 'right',
      render: (el: any, record: any, index: number) => {
        return (
          <FormItemNumber
            // @ts-ignore
            mix={0}
            max={100}
            form={form}
            labelId={formatMessageApi({
              Label_BIZ_POS: 'WDPercentage',
            })}
            disabled={percentageDisabled()}
            formName={`withdrawPercentage_${index}`}
            objectName="Pos.Fund"
            objectFieldName="withdrawPercentage"
          />
        );
      },
    },
    {
      title: formatMessageApi({
        Label_BIZ_POS: 'WDNumberOfUnits',
      }),
      dataIndex: 'withdrawNumberOfUnits',
      key: 'withdrawNumberOfUnits',
      align: 'right',
      render: (el: any, record: any, index: number) => {
        return (
          <FormItemNumber
            // @ts-ignore
            form={form}
            labelId={formatMessageApi({
              Label_BIZ_POS: 'WDNumberOfUnits',
            })}
            disabled={unitsDisabled()}
            pattern={/^\d+$|(^\d+\.\d)|(^\d+\.)+$/g}
            formName={`withdrawNumberOfUnits_${index}`}
            objectName="Pos.Fund"
            objectFieldName="withdrawNumberOfUnits"
            // rules={[
            //   {
            //     // @ts-ignore
            //     validator: VLD_000291({ ...record }),
            //   },
            // ]}
          />
        );
      },
    },
    {
      title: formatMessageApi({
        Label_BIZ_POS: 'WDAmt',
      }),
      dataIndex: 'withdrawAmount',
      key: 'withdrawAmount',
      align: 'right',
      render: (el: any, record: any, index: number) => {
        return (
          <FormItemNumber
            // @ts-ignore
            form={form}
            labelId={formatMessageApi({
              Label_BIZ_POS: 'WDAmt',
            })}
            disabled={amountDisabled()}
            pattern={/^\d+$|(^\d+\.\d)|(^\d+\.)+$/g}
            formName={`withdrawAmount_${index}`}
            objectName="Pos.Fund"
            objectFieldName="withdrawAmount"
            // rules={[
            //   {
            //     // @ts-ignore
            //     validator: VLD_000292({ ...record }),
            //   },
            // ]}
          />
        );
      },
    },
    {
      title: formatMessageApi({
        Label_BIZ_POS: 'EstCalAmt',
      }),
      dataIndex: 'calculationAmount',
      key: 'calculationAmount',
      align: 'right',
    },
  ];
};
