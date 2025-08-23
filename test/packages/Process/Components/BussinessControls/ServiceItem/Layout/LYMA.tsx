import React from 'react';
import { useSelector } from 'dva';
import LYMAItem from './LYMAItem';
import LYMAAdd from './LYMAAdd';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  editable: boolean;
  incidentId: string;
  treatmentId: string;
  invoiceId: string;
  Payable: Function;
  ButtonGroup: Function;
}
const LYMA = (props: IProps) => {
  const { editable, invoiceId } = props;
  const serviceItemList =
    useSelector(
      ({ [props.NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.claimEntities?.invoiceListMap?.[invoiceId]?.serviceItemList
    ) || [];
  return (
    <div>
      {serviceItemList.map((item: any) => (
        <LYMAItem {...props} serviceItemId={item} Payable={props.Payable} key={item} />
      ))}
      {editable && <LYMAAdd {...props} />}
    </div>
  );
};

export default LYMA;
