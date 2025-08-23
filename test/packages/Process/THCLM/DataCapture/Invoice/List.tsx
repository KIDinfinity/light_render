import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import { SectionCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ListItem from './ListItem';
import Add from './Add';

const InvoiceList = ({ treatmentId, incidentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const invoiceList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId].invoiceList
  );

  return (
    <>
      <SectionCard
        backgroundColorName={'card3BgColor'}
        title={
          <>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.invoice',
            })}
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
