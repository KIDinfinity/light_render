import React from 'react';

import { useSelector } from 'dva';
import lodash from 'lodash';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { SectionColumns } from 'process/Components/BussinessControls/ServiceItem';

import styles from './LYDC.less';

interface IProps {
  NAMESPACE: string;
  invoiceId: string;
}
const LYDCSectionColumns = ({ NAMESPACE, invoiceId }: IProps) => {
  const serviceItemList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.claimEntities?.invoiceListMap?.[invoiceId]?.serviceItemList
  );
  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);
  return (
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
  );
};

export default LYDCSectionColumns;
