import React, { useMemo } from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import { Row, Col } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { validateServiceItem } from 'claimBasicProduct/pages/validators';
import ServiceList from '../ServiceItem/List';
import ExpandItem from './ExpandItem';
import Item from './Item';
import Add from './Add';
import { SectionColumns } from './Section';
import styles from './InvoiceList.less';

const InvoiceList = ({ treatmentId, incidentId, invoiceExpand, arrowCallBack }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const data = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.invoiceList
  );

  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);
  const procedureList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId].procedureList
  );
  const invoiceListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.invoiceListMap
  );
  const serviceItemListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.serviceItemListMap
  );

  const isEqual = useMemo(() => {
    return validateServiceItem({
      treatmentId,
      serviceItemListMap,
      invoiceListMap,
      procedureList,
    });
  }, [serviceItemListMap, procedureList, invoiceListMap, treatmentId]);

  return (
    <div className={styles.invoiceList}>
      <Row type="flex" gutter={0} className={styles.container}>
        <Col span={10} className={styles.left}>
          <SectionColumns
            showArrow
            onArrow={() => {
              arrowCallBack();
            }}
            invoiceExpand={invoiceExpand}
            render={{
              invoiceNo: {
                render: () => (
                  <div className={styles.title}>
                    {formatMessageApi({
                      Label_BIZ_Claim: 'app.navigator.hospitalDetail.table-column.invoice-no',
                    })}
                    {submited && !isEqual && (
                      <ErrorTooltipManual
                        manualErrorMessage={formatMessageApi(
                          { Label_COM_WarningMessage: 'MSG_000475' },
                          lodash.size(procedureList)
                        )}
                      />
                    )}
                  </div>
                ),
              },
              expense: {
                required: 'N',
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
            }}
          />
        </Col>
        <Col span={14} className={styles.right}>
          <></>
        </Col>
      </Row>

      {lodash.map(data, (item) => (
        <div key={`invoice${item}`}>
          {!invoiceExpand && <Item invoiceId={item} treatmentId={treatmentId} />}
          {invoiceExpand && <ExpandItem invoiceId={item} treatmentId={treatmentId} />}

          {invoiceExpand && (
            <ServiceList incidentId={incidentId} treatmentId={treatmentId} invoiceId={item} />
          )}
        </div>
      ))}
      {!!editable && <Add data={data} treatmentId={treatmentId} />}
    </div>
  );
};

export default InvoiceList;
