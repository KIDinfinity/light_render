import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { SectionCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import LYDCItem from './LYDCItem';
import LYDCAdd from './LYDCAdd';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  editable: boolean;
  incidentId: string;
  treatmentId: string;
  Service: Function;
  PopUpInvoice: Function;
}
const LYDC = ({
  NAMESPACE,
  namespaceType,
  editable,
  incidentId,
  treatmentId,
  Service,
  PopUpInvoice,
}: IProps) => {
  const invoiceList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.claimEntities.treatmentListMap[treatmentId].invoiceList
    ) || [];
  const defaultProps = {
    NAMESPACE,
    namespaceType,
    incidentId,
    treatmentId,
    editable,
  };

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
        {invoiceList.map((item: any, index: number) => (
          <LYDCItem
            {...defaultProps}
            nextInvoiceNo={lodash.size(invoiceList) + 1}
            invoiceId={item}
            key={item}
            Service={Service}
          />
        ))}
        {!!editable && <LYDCAdd {...defaultProps} nextInvoiceNo={lodash.size(invoiceList) + 1} />}
      </SectionCard>
    </>
  );
};

export default LYDC;
