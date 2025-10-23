import React from 'react';
import { useSelector } from 'dva';
import LYMASectionColumns from './LYMASectionColumns';
import LYMAItem from './LYMAItem';
import LYMAAdd from './LYMAAdd';
import styles from './LYMA.less';

interface Props {
  NAMESPACE: string;
  namespaceType: string;
  editable: boolean;
  incidentId: string;
  treatmentId: string;
  Service: Function;
}

const LYMA = ({
  NAMESPACE,
  namespaceType,
  editable,
  incidentId,
  treatmentId,
  Service,
  expand,
  setExpand,
}: any) => {
  const invoiceList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.invoiceList
    ) || [];

  const defaultProps = {
    NAMESPACE,
    namespaceType,
    editable,
    incidentId,
    treatmentId,
  };

  return (
    <div className={styles.invoiceList}>
      <LYMASectionColumns expand={expand} setExpand={setExpand} />
      {invoiceList.map((item: any) => (
        <div key={`invoice${item}`}>
          <LYMAItem {...defaultProps} invoiceId={item} />
          <Service {...defaultProps} invoiceId={item} />
        </div>
      ))}
      {!!editable && <LYMAAdd {...defaultProps} />}
    </div>
  );
};

export default LYMA;
