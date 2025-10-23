import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';

export default ({ handleHeaderCell }: any) => {
  return lodash
    .chain([
      {
        labelTypeCode: 'Label_COM_MonitorCenter',
        id: 'enquiryId',
        dataIndex: 'enquiryId',
        sorter: true,
        sortable: true,
        width: 250,
        render: (text: any) => text,
      },
      {
        labelTypeCode: 'Label_COM_MonitorCenter',
        id: 'creationDate',
        dataIndex: 'creationDate',
        sorter: true,
        sortable: true,
        render: (text: any) => (text ? moment(text).format('YYYY/MM/DD HH:mm:ss') : ''),
      },
      {
        labelTypeCode: 'Label_COM_MonitorCenter',
        id: 'businessNo',
        dataIndex: 'businessNo',
        sorter: true,
        sortable: true,
        render: (text: any) => text,
      },
      {
        labelTypeCode: 'Label_COM_MonitorCenter',
        id: 'uploadStatus',
        dataIndex: 'uploadStatus',
        render: (text: any, item: any) => text,
      },
    ])
    .map((el: any, index: number) => {
      return {
        title: formatMessageApi({ [el?.labelTypeCode]: el?.id }),
        dataIndex: el?.dataIndex,
        key: el?.key || el?.dataIndex,
        render: el?.render,
        className: el?.className,
        width: el?.width,
        sorter: el?.sorter,
        onHeaderCell: (column: any, e) =>
          el?.sorter
            ? {
                onClick: (e: any) => handleHeaderCell(column, e), // 点击表头行
              }
            : {},
      };
    })
    .value();
};
