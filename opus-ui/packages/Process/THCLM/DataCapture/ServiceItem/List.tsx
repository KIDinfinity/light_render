import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import ListItem from './ListItem';
import { SectionColumns } from './Section';
import Add from './Add';
import styles from './ServiceList.less';

const ServiceItemList = ({ invoiceId, treatmentId }: any) => {
  const serviceItemList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.invoiceListMap[invoiceId]?.serviceItemList
  );
  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);

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
          }}
          hasMarginRight
        />
      </div>
      {lodash.compact(serviceItemList).map((item) => (
        <ListItem invoiceId={invoiceId} serviceItemId={item} treatmentId={treatmentId} key={item} />
      ))}
      <Add invoiceId={invoiceId} />
    </div>
  );
};

export default ServiceItemList;
