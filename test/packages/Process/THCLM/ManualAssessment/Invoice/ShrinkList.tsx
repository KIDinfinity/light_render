import React, { useEffect } from 'react';
import { NAMESPACE } from '../activity.config';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ShrinkInvoiceItem from './ShrinkItem';
import { SectionColumns } from './Section';
import styles from './InvoiceList.less';

const ShrinkList = ({ treatmentId, incidentId, setExpand, expand }: any) => {
  const data = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.invoiceList
  );

  useEffect(() => {
    if (!lodash.size(data)) {
      setExpand(!expand);
    }
  }, []);

  return (
    <div className={styles.shrinkInvoiceList}>
      {lodash.size(data) > 0 && (
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
      )}
      {lodash.map(data, (item) => (
        <div className={styles.item} key={item}>
          <ShrinkInvoiceItem
            invoiceId={item}
            incidentId={incidentId}
            treatmentId={treatmentId}
            key={`shrinkInvoice${item}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ShrinkList;
