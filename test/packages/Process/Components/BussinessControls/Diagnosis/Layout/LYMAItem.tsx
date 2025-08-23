import React from 'react';
import { useDispatch } from 'dva';
import { FormBorderCard } from 'basic/components/Form';
import Diagnosis from 'process/Components/BussinessControls/Diagnosis';

interface IProps {
  editable?: boolean;
  namespaceType: string;
  NAMESPACE: string;
  incidentId: string;
  diagnosisId: string;
}
const Item = (props: IProps) => {
  const { NAMESPACE, editable, incidentId, diagnosisId } = props;
  const dispatch = useDispatch();

  return (
    <FormBorderCard
      marginBottom
      button={{
        visiable: editable,
        callback: () => {
          dispatch({
            type: `${NAMESPACE}/removeDiagnosisItem`,
            payload: {
              incidentId,
              diagnosisId,
            },
          });
        },
      }}
    >
      <Diagnosis.SectionBasic {...props} diagnosisId={diagnosisId} />
    </FormBorderCard>
  );
};

export default Item;
