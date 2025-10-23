import React from 'react';
import { useSelector } from 'dva';
import LYMAItem from './LYMAItem';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  Diagnosis: Function;
  Treatment: Function;
  ButtonGroup: Function;
  SummaryPayable: Function;
  LabelSection: Function;
}
const LYMA = ({
  NAMESPACE,
  namespaceType,
  Diagnosis,
  Treatment,
  ButtonGroup,
  SummaryPayable,
  LabelSection,
}: IProps) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const incidentList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.incidentList
    ) || [];
  const defaultProps = {
    NAMESPACE,
    namespaceType,
    editable,
  };

  return (
    <div>
      {incidentList.map((item: any, index: number) => (
        <LYMAItem
          {...defaultProps}
          editable={editable}
          incidentId={item}
          index={index}
          key={item}
          Treatment={Treatment}
          Diagnosis={Diagnosis}
          ButtonGroup={ButtonGroup}
          SummaryPayable={SummaryPayable}
          LabelSection={LabelSection}
        />
      ))}
    </div>
  );
};

export default LYMA;
