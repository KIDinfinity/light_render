import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Table } from 'antd';
import lodash from 'lodash';
import Columns from './Columns';
import OPDForm from '../OPDForm/OPDForm';
import styles from './index.less';

interface IProps {
  invoiceInforData: any[];
}
// @ts-ignore
@connect(({ hospitalDetailController }: any) => ({
  invoiceInforData: hospitalDetailController.invoiceInforData,
}))
class InvoiceInformation extends PureComponent<IProps> {
  expandedRowRender = (record: any, idx: number) => {
    const { type } = record;
    return type === 'OPD' ? <OPDForm idx={idx} /> : null;
  };

  render() {
    const { invoiceInforData } = this.props;

    const expandedRowKeys = lodash.map(invoiceInforData, (item: any) => {
      if (item.isShowMore) {
        return item.key;
      }
    });
    return (
      <Card title="Invoice Information">
        <Table
          className={styles.invoiceInformationTable}
          columns={Columns(this.props)}
          expandedRowRender={this.expandedRowRender}
          expandedRowKeys={expandedRowKeys}
          dataSource={invoiceInforData}
          pagination={false}
        />
      </Card>
    );
  }
}

export default InvoiceInformation;
