import React from 'react';
import { NAMESPACE } from '../activity.config';
import { useSelector } from 'dva';
import { Row, Col } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ServiceList from '../ServiceItem/List';
import InvoiceItem from './Item';
import Add from './Add';
import { SectionColumns } from './Section';
import styles from './InvoiceList.less';

const InvoiceList = ({ treatmentId, incidentId, expand, setExpand }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const data = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.invoiceList
  );

  return (
    <div className={styles.invoiceList}>
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
                      Label_BIZ_Claim:
                        'app.navigator.task-detail-of-data-capture.label.invoice-date',
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
      {lodash.map(data, (item) => (
        <div key={`invoice${item}`}>
          <InvoiceItem invoiceId={item} treatmentId={treatmentId} incidentId={incidentId} />
          <ServiceList incidentId={incidentId} treatmentId={treatmentId} invoiceId={item} />
        </div>
      ))}
      {!!editable && <Add data={data} treatmentId={treatmentId} />}
    </div>
  );
};

export default InvoiceList;
