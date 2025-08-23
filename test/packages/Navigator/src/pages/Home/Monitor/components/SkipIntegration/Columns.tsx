import lodash from 'lodash';
import { Input } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const getColunmns = ({ list, setList }: any) => {
  return [
    {
      fieldName: 'caseNo', // configuration match
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'CaseNo',
      dataIndex: 'caseNo',
      render: (text: any) => text,
    },
    {
      fieldName: 'BusinessNo', // configuration match
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'BusinessNo',
      dataIndex: 'inquiryClaimNo',
    },
    {
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'CaseCategory',
      dataIndex: 'caseCategory',
      render: (text: any, item: any) =>
        formatMessageApi({ Label_BPM_CaseCategory: lodash.get(item, 'caseCategory') }) ||
        text ||
        '-',
    },
    {
      fieldName: 'activityKey',
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'Activity',
      dataIndex: 'currentActivityKey',
      render: (text: any) => formatMessageApi({ activity: text }),
    },

    // TODO:需要国际化
    {
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'BoAction',
      dataIndex: 'laFunction',
    },

    {
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'ErrorMessage',
      dataIndex: 'errorMessage',
    },

    {
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'IlClaimNo',
      dataIndex: 'ilClaimRefNo',
      render: (text: any, { ilResult, inquireBusinessNo }: any) => {
        return ilResult !== 0 ? (
          <Input
            onChange={(e) => {
              const ilClaimRefNo = e?.target?.value || '';
              const newList = lodash
                .chain(list)
                .map((el: any) => {
                  return el.inquireBusinessNo === inquireBusinessNo
                    ? {
                        ...el,
                        ilClaimRefNo,
                      }
                    : el;
                })
                .value();
              setList(newList);
            }}
          />
        ) : (
          text
        );
      },
    },

    {
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'IlResult',
      dataIndex: 'ilResult',
    },
    {
      labelTypeCode: 'Label_COM_MonitorCenter',
      id: 'laResult',
      dataIndex: 'laResult',
    },
  ];
};

export default ({ handleHeaderCell, list, setList }: any) => {
  return lodash.map(getColunmns({ list, setList }), (el: any, index: number) => {
    return {
      title: formatMessageApi({ [el?.labelTypeCode]: el?.id }),
      dataIndex: el?.dataIndex,
      key: el?.key || el?.dataIndex,
      render: el?.render,
      className: el?.className,
      sorter: el?.sorter,
      onHeaderCell: (column: any, e) =>
        el?.sorter
          ? {
              onClick: (e: any) => handleHeaderCell(column, e), // 点击表头行
            }
          : {},
    };
  });
};
