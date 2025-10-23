import React from 'react';
import { FormBorderCard } from 'basic/components/Form';
import { Procedure } from 'process/Components/BussinessControls';
import styles from './index.less';

interface Props {
  NAMESPACE: string;
  treatmentId: string;
  editable: boolean;
}
const LTAdd = (props: Props) => {
  return (
    <FormBorderCard className={styles.itemCard} marginBottom>
      <Procedure.SectionAdd {...props} />
    </FormBorderCard>
  );
};

export default LTAdd;
