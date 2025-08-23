import lodash, { toUpper } from 'lodash';
import moment from 'moment';
import { filterConfig } from '@/utils/configUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formattingMoney } from '@/utils/utils';
import { sorts } from '../TitleMap';

export default (orders: any, config: any, statusList: any, saveSort: any) => {
  const params = [
    {
      fieldName: 'Cover Page No.',
      id: 'app.navigator.hospitalDetail.table-column.cover-page-no',
      dataIndex: 'coverPageNo',
    },
    {
      fieldName: 'Receive Date',
      id: 'app.navigator.hospitalDetail.table-column.receive-date',
      render: (text, item) => {
        const receiveDate = item?.receiveDate;
        return receiveDate ? moment(receiveDate).format('L') : '-';
      },
    },
    {
      fieldName: 'Hospital Name',
      id: 'app.navigator.hospitalDetail.table-column.hosp-name',
      dataIndex: 'hospitalName',
    },

    {
      fieldName: 'Scan Date',
      id: 'app.navigator.hospitalDetail.table-column.scan-date',
      dataIndex: 'scanDate',
      render: (text, item) => {
        const scanDate = item?.scanDate;
        return scanDate ? moment(scanDate).format('L') : '-';
      },
    },
    {
      fieldName: 'Request Amount',
      id: 'app.navigator.hospitalDetail.table-column.amount',
      dataIndex: 'amount',
      render: (text, item) => {
        const totalInvoiceAmount = item?.totalInvoiceAmount;
        return totalInvoiceAmount ? formattingMoney(totalInvoiceAmount) : '-';
      },
    },
    {
      fieldName: 'Final Amount',
      id: 'app.navigator.hospitalDetail.table-column.final-amount',
      dataIndex: 'totalFinalAmount',
      render: (text, item) => {
        const totalFinalAmount = item?.totalFinalAmount;
        return totalFinalAmount ? formattingMoney(totalFinalAmount) : '-';
      },
    },
    {
      fieldName: 'No.Of Cases',
      id: 'app.navigator.hospitalDetail.table-column.no-cases',
      dataIndex: 'totalNoOfInvoice',
    },

    {
      fieldName: 'Status',
      id: 'app.navigator.hospitalDetail.table-column.status',
      dataIndex: 'status',
      render: (text, item) => {
        const status = lodash.get(item, 'status');
        let name = '-';
        if (status) {
          const index = statusList.findIndex((valus) => status === valus.dictCode);
          name = statusList[index].dictName;
        }

        return name;
      },
    },
  ];

  const columns = filterConfig(params, config);

  return (
    lodash.isArray(columns) &&
    lodash.map(columns, (el) => {
      const tempParams = params.find((ele) => toUpper(ele.fieldName) === toUpper(el.fieldName));
      let sortOrder =
        lodash.get(tempParams, 'defaultSortOrder') ||
        lodash.get(orders, 'temp.dataIndex.sortOrder');
      if (tempParams?.dataIndex === saveSort.sortName) {
        sortOrder = sorts[saveSort.sortOrder];
      }
      return {
        title: formatMessageApi({
          Label_BIZ_Claim: tempParams.id,
        }),
        dataIndex: tempParams.dataIndex,
        key: tempParams.key || tempParams.dataIndex,
        sorter: el.sortable,
        sortOrder,
        render: tempParams.render,
      };
    })
  );
};
