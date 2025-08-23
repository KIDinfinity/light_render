import React from 'react';

import { useDispatch } from 'dva';
import { FormBorderCard } from 'basic/components/Form';
import { Procedure } from 'process/Components/BussinessControls';
import styles from './index.less';

interface Props {
  NAMESPACE: string;
  procedureId: string;
  treatmentId: string;
  editable: boolean;
}
const LTBasicItem = (props: Props) => {
  const { editable, procedureId, treatmentId, NAMESPACE } = props;
  const dispatch = useDispatch();

  return (
    <FormBorderCard
      marginBottom
      className={styles.itemCard}
      button={{
        visiable: editable,
        callback: () => {
          dispatch({
            type: `${NAMESPACE}/removeProcedureItem`,
            payload: {
              treatmentId,
              procedureId,
            },
          });
        },
      }}
    >
      <Procedure.SectionBasic {...props} />
    </FormBorderCard>
  );
};

export default LTBasicItem;
