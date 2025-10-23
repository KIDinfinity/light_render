import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import AddSection from 'process/GeneralPOS/BaseProduct/SectionComponents/CommonNominee/NomineeUserSection/AddSection';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum, OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import CloseButton from '../CloseButton';
import EditItem from './EditItem';
import styles from './index.less';

const Edit = ({ transactionId }: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.CommonNominee);

  const clientInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.clientInfoList
  );

  const addHandle = (value, field) => {
    if (!lodash.isEmpty(value)) {
      dispatch({
        type: `${NAMESPACE}/nomineeUpdate`,
        payload: {
          changedFields: { [field]: value },
          transactionId,
          type: OperationTypeEnum.ADD,
          validating: false,
        },
      });
    }
  };

  const deleteHandle = (index) => {
    dispatch({
      type: `${NAMESPACE}/nomineeUpdate`,
      payload: {
        transactionId,
        type: OperationTypeEnum.DELETE,
        clientIndex: index,
        validating: false,
      },
    });
  };

  return (
    <div className={styles.nomineeList}>
      {lodash.map(clientInfoList, (item: any, clientIndex) => {
        return (
          <div className={styles.commonNomineeItem} key={item?.clientSeq}>
            <EditItem
              transactionId={transactionId}
              clientSeq={item?.clientSeq}
              clientIndex={clientIndex}
            />
            <CloseButton
              className={styles.removeIcon}
              handleClose={() => {
                deleteHandle(clientIndex);
              }}
            />
          </div>
        );
      })}
      {editable && (
        <div className={styles.addNominee}>
          <AddSection transactionId={transactionId} addHandle={addHandle} />
        </div>
      )}
    </div>
  );
};

export default Edit;
