import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import ListItemfees from './ListItemfees';
import ListItem from './ListItem';
import { SectionColumns } from './Section';
import Add from './Add';
import styles from './ServiceList.less';

const ServiceItemList = ({ invoiceId, incidentId, treatmentId }: any) => {
  const serviceItemList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.invoiceListMap[invoiceId]?.serviceItemList
  );

  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);

  const serviceItemListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.serviceItemListMap
  );

  const serviceItemFeesListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.serviceItemFeesListMap
  );

  const isShowFee = (serviceItemId: any) => {
    const isNoEmptyServiceItemFeesListMap = !lodash.isEmpty(
      serviceItemFeesListMap?.[incidentId]?.[
        formUtils.queryValue(serviceItemListMap?.[serviceItemId]?.serviceItem)
      ] || []
    );

    const isNoEmptyFeeItemList = !lodash.isEmpty(
      serviceItemListMap?.[serviceItemId]?.feeItemList || []
    );

    return isNoEmptyFeeItemList || isNoEmptyServiceItemFeesListMap;
  };

  return (
    <div>
      <div className={styles.columns}>
        <SectionColumns
          render={{
            serviceItem: {
              extra: (
                <>
                  {submited && lodash.isEmpty(serviceItemList) && (
                    <ErrorTooltipManual manualErrorMessage="Service item should not be empty." />
                  )}
                </>
              ),
            },
            netExpense: {
              visible: 'N',
            },
            expense: {
              visible: 'Y',
            },
          }}
          hasMarginRight
        />
      </div>
      {lodash.compact(serviceItemList).map((item) => (
        <>
          {isShowFee(item) ? (
            <ListItemfees
              invoiceId={invoiceId}
              serviceItemId={item}
              incidentId={incidentId}
              treatmentId={treatmentId}
              key={item}
            />
          ) : (
            <ListItem
              invoiceId={invoiceId}
              serviceItemId={item}
              incidentId={incidentId}
              treatmentId={treatmentId}
              key={item}
            />
          )}
        </>
      ))}
      <Add invoiceId={invoiceId} incidentId={incidentId} treatmentId={treatmentId} />
    </div>
  );
};

export default ServiceItemList;
