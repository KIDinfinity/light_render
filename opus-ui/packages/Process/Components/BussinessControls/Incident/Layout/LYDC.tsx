import React from 'react';
import { useSelector } from 'dva';
import LYDCTitle from './LYDCTitle';
import LYDCItem from './LYDCItem';
import LYDCAdd from './LYDCAdd';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  Diagnosis: Function;
  Treatment: Function;
  PopUpInvoice: Function;
}
const LYDC = ({ NAMESPACE, namespaceType, Diagnosis, Treatment, PopUpInvoice }: IProps) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const incidentList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimProcessData?.incidentList
    ) || [];
  const defaultProps = {
    NAMESPACE,
    namespaceType,
    editable,
  };

  return (
    <div>
      <LYDCTitle NAMESPACE={NAMESPACE} />

      {incidentList.map((item: any, index: number) => (
        <LYDCItem
          {...defaultProps}
          editable={editable}
          incidentId={item}
          key={item}
          Diagnosis={Diagnosis}
          Treatment={Treatment}
          PopUpInvoice={PopUpInvoice}
        />
      ))}
      <LYDCAdd {...defaultProps} />
    </div>
  );
};

export default LYDC;
