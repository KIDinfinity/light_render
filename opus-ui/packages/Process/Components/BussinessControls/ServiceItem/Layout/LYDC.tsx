import React from 'react';

import { useSelector } from 'dva';
import { FormBorderCard } from 'basic/components/Form';
import ServiceItem from 'process/Components/BussinessControls/ServiceItem';
import LYDCSectionColumns from './LYDCSectionColumns';
import LYDCItem from './LYDCItem';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  editable: boolean;
  incidentId: string;
  treatmentId: string;
  invoiceId: string;
}
const LYDC = (props: IProps) => {
  const { editable, invoiceId } = props;
  const serviceItemList =
    useSelector(
      ({ [props.NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.claimEntities?.invoiceListMap?.[invoiceId]?.serviceItemList
    ) || [];
  return (
    <div>
      <LYDCSectionColumns {...props} />

      {serviceItemList.map((item: any, index: number) => (
        <LYDCItem {...props} serviceItemId={item} key={item} />
      ))}
      {
        <FormBorderCard backgroundColorName={'card4BgColor'} marginBottom type="weight">
          <ServiceItem.SectionAdd {...props} />
        </FormBorderCard>
      }
    </div>
  );
};

export default LYDC;
