import React from 'react';
import { Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { SectionColumns } from 'process/Components/BussinessControls/Invoice';
import styles from './LYMA.less';

const LYMASectionColumns = ({ expand, setExpand }: any) => {
  return (
    <Row type="flex" gutter={0} className={styles.container}>
      <Col span={10} className={styles.left}>
        <SectionColumns
          showArrow
          onArrow={() => setExpand(!expand)}
          expand={expand}
          render={{
            invoiceNo: {
              render: () => (
                <div className={styles.title}>
                  {formatMessageApi({
                    Label_BIZ_Claim: 'app.navigator.hospitalDetail.table-column.invoice-no',
                  })}
                </div>
              ),
            },
            invoiceDate: {
              render: () => (
                <div className={styles.titleFile}>
                  {formatMessageApi({
                    Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.invoice-date',
                  })}
                </div>
              ),
            },
            expense: {
              required: 'N',
              render: () => (
                <div className={styles.titleFile}>
                  {formatMessageApi({
                    Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.expense',
                  })}
                </div>
              ),
            },
            otherInsurerPaidAmount: {
              visible: 'N',
            },
            isClaimWithOtherInsurer: {
              visible: 'N',
            },
            exchangeDate: {
              visible: 'N',
            },
            summaryOfServiceItem: {
              visible: 'N',
            },
          }}
        />
      </Col>
      <Col span={14} className={styles.right}>
        <></>
      </Col>
    </Row>
  );
};

export default LYMASectionColumns;
