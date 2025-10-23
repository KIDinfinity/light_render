import React from 'react';

import { useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import { Procedure } from 'process/Components/BussinessControls';
import styles from './index.less';

interface Props {
  NAMESPACE: string;
  treatmentItem: any;
  treatmentId: string;
  editable: boolean;
}
const LTDPICUItem = (props: Props) => {
  const { NAMESPACE, editable, treatmentItem, treatmentId } = props;
  const dispatch = useDispatch();

  const therapiesType = formUtils.queryValue(treatmentItem?.therapiesType);
  const icu = formUtils.queryValue(treatmentItem?.icu);
  return (
    <>
      {(!!icu || !!therapiesType) && (
        <FormBorderCard
          marginBottom
          className={styles.itemCard}
          button={{
            visiable: editable,
            callback: () => {
              dispatch({
                type: `${NAMESPACE}/removeICUItem`,
                payload: {
                  treatmentId,
                },
              });
            },
          }}
        >
          <Procedure.SectionICU {...props} />
        </FormBorderCard>
      )}
    </>
  );
};

export default LTDPICUItem;
