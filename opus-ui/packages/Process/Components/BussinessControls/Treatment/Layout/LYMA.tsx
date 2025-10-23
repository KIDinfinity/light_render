import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import LYMAItem from './LYMAItem';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  incidentId: string;
  editable: any;
  Procedure: Function;
  ButtonGroup: Function;
  Invoice: Function;
  ShrinkInvoiceList: Function;
  SummaryTreatmentPayable: Function;
}
const LYMA = ({
  NAMESPACE,
  namespaceType,
  editable,
  incidentId,
  Procedure,
  ButtonGroup,
  Invoice,
  ShrinkInvoiceList,
  SummaryTreatmentPayable,
}: IProps) => {
  const treatmentList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.claimEntities?.incidentListMap?.[incidentId]?.treatmentList
    ) || [];

  const defaultProps = {
    NAMESPACE,
    namespaceType,
    editable,
    incidentId,
  };

  return (
    <>
      {lodash.isArray(treatmentList) &&
        treatmentList.map((item) => (
          <LYMAItem
            {...defaultProps}
            key={item}
            treatmentId={item}
            Procedure={Procedure}
            ButtonGroup={ButtonGroup}
            Invoice={Invoice}
            ShrinkInvoiceList={ShrinkInvoiceList}
            SummaryTreatmentPayable={SummaryTreatmentPayable}
          />
        ))}
    </>
  );
};

export default LYMA;
