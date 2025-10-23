import React from 'react';
import { useDispatch } from 'dva';
import { SectionCard } from 'basic/components/Form';
import TreatmentLayout from './TreatmentLayout';
import Treatment from 'process/Components/BussinessControls/Treatment';
import LTHeader from './LTHeader';
import styles from './LYDC.less';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  incidentId: string;
  treatmentId: string;
  editable: boolean;
  Procedure: Function;
  Invoice: Function;
}

const LYDCItem = ({
  NAMESPACE,
  namespaceType,
  editable,
  incidentId,
  treatmentId,
  Procedure,
  Invoice,
}: IProps) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeTreatmentItem`,
      payload: {
        incidentId,
        treatmentId,
      },
    });
  };
  const defaultProps = {
    NAMESPACE,
    namespaceType,
    editable,
    incidentId,
    treatmentId,
  };

  return (
    <SectionCard
      title={<LTHeader {...defaultProps} />}
      showButton={editable}
      handleClick={onDelete}
      backgroundColorName={'card2BgColor'}
    >
      <TreatmentLayout>
        <TreatmentLayout.Left>
          <div className={styles.dcbasicWrap}>
            <div className={styles.basic}>
              <Treatment.SectionBasic {...defaultProps} />
            </div>
            <Treatment.SectionCheck {...defaultProps} />
          </div>
        </TreatmentLayout.Left>
        <TreatmentLayout.Right>
          <Procedure {...defaultProps} />
        </TreatmentLayout.Right>
        <TreatmentLayout.Bottom>
          <Invoice {...defaultProps} />
        </TreatmentLayout.Bottom>
      </TreatmentLayout>
    </SectionCard>
  );
};

export default LYDCItem;
