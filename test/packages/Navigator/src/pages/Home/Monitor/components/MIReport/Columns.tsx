import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
import type { AnyAction } from 'redux';

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
        render: (text: AnyAction) => formatMessageApi({ Dropdown_IDN_miUploadStatus: text }),
      },
    ])
    .map((el: any) => {
      return {
        title: formatMessageApi({ [el?.labelTypeCode]: el?.id }),
        dataIndex: el?.dataIndex,
        key: el?.key || el?.dataIndex,
        render: el?.render,
        className: el?.className,
        width: el?.width,
        sorter: el?.sorter,
        onHeaderCell: (column: any) =>
          el?.sorter
            ? {
                onClick: (e: any) => handleHeaderCell(column, e), // 点击表头行
              }
            : {},
      };
    })
    .value();
};
