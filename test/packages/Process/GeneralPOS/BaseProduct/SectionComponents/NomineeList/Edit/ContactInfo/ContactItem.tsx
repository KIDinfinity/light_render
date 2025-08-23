import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import TableBusinessSection from 'process/GeneralPOS/BaseProduct/SectionComponents/CommonNominee/NomineeContactSection/ContactInfo';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import CloseButton from '../../CloseButton';
import styles from '../index.less';

const ContactItem = ({
  transactionId,
  clientSeq,
  form,
  clientIndex,
  id: contactIndex,
  remove,
  ...res
}: any) => {
  return (
    <div>
      <TableBusinessSection
        icon={null}
        form={form}
        transactionId={transactionId}
        clientSeq={clientSeq}
        clientIndex={clientIndex}
        formId={`NomineeContactItem${clientSeq}${contactIndex}`}
        {...res}
      />
      <CloseButton
        className={styles.childListRemoveIcon}
        handleClose={() => {
          remove(contactIndex);
        }}
      />
    </div>
  );
};
export default connect(
  (
    { [NAMESPACE]: modelnamepsace }: any,
    { transactionId, clientIndex, id: contactIndex }: any
  ) => ({
    contactItem:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.clientInfoList?.[clientIndex]
        ?.contactList?.[contactIndex],
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, clientIndex, id: contactIndex }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'nomineeUpdate',
          payload: {
            changedFields,
            transactionId,
            type: OperationTypeEnum.LISTINFOUPDATE,
            changeType: 'contactList',
            modalType: OperationTypeEnum.LISTINFOUPDATE,
            clientIndex,
            changeTypeIndex: contactIndex,
            section: 'Nominee-Contact',
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { contactItem } = props;

      return formUtils.mapObjectToFields(contactItem);
    },
  })(ContactItem)
);
