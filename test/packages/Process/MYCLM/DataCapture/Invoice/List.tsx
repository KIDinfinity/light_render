import React, { useMemo } from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import { SectionCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { validateServiceItem } from 'claimBasicProduct/pages/validators';
import ListItem from './ListItem';
import Add from './Add';

const InvoiceList = ({ treatmentId, incidentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const invoiceList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId].invoiceList
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
    <>
      <SectionCard
        backgroundColorName={'card3BgColor'}
        title={
          <>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.invoice',
            })}
            {submited && !isEqual && (
              <ErrorTooltipManual
                manualErrorMessage={formatMessageApi(
                  { Label_COM_WarningMessage: 'MSG_000475' },
                  lodash.size(procedureList)
                )}
              />
            )}
          </>
        }
        deep
      >
        {lodash.isArray(invoiceList) &&
          invoiceList.map((item: any, index: number) => (
            <ListItem
              treatmentId={treatmentId}
              invoiceId={item}
              incidentId={incidentId}
              key={item}
              invoiceNo={index + 1}
            />
          ))}
        {!!editable && (
          <Add
            treatmentId={treatmentId}
            incidentId={incidentId}
            invoiceNo={lodash.size(invoiceList) + 1}
          />
        )}
      </SectionCard>
    </>
  );
};

export default InvoiceList;
