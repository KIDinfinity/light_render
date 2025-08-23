import React from 'react';
import { useDispatch } from 'dva';
import { FormBorderCard } from 'basic/components/Form';
import { Procedure } from 'process/Components/BussinessControls';

import styles from './index.less';

interface IProps {
  namespaceType: string;
  NAMESPACE: string;
  incidentId: string;
  treatmentId: string;
  mainBenefitId: string;
  editable: boolean;
}
const MainBenefitListItem = (props: IProps) => {
  const { editable, namespaceType, mainBenefitId, treatmentId, NAMESPACE } = props;
  const dispatch = useDispatch();

  const configs = {
    DataCapture: () => {
      return {
        className: styles.itemCard,
      };
    },
    Assessment: () => {
      return { border: { type: 'weight', visiable: true } };
    },
  };
  return (
    <FormBorderCard
      {...configs[namespaceType]()}
      className={styles.itemCard}
      marginBottom
      button={{
        visiable: editable,
        callback: () => {
          dispatch({
            type: `${NAMESPACE}/removeMainBenefitItem`,
            payload: {
              treatmentId,
              mainBenefitId,
            },
          });
        },
      }}
    >
      <Procedure.SectionMainBenefit {...props} />
    </FormBorderCard>
  );
};

export default MainBenefitListItem;
