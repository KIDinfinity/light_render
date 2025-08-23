import { Icon } from 'antd';
import useGetSectionAtomConfigByRemote from 'basic/components/Elements/hooks/useGetSectionAtomConfigByRemote';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { NomineeContactAddSection } from 'process/GeneralPOS/BaseProduct/SectionComponents/CommonNominee/NomineeContactSection';
import { localConfig } from 'process/GeneralPOS/BaseProduct/SectionComponents/CommonNominee/NomineeContactSection/Section';
import { TableSection } from 'process/GeneralPOS/BaseProduct/SectionComponents/CommonNominee/Section';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum, OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import styles from '../index.less';
import ContactItem from './ContactItem';

const ContactInfo = ({ transactionId, clientSeq, clientIndex }: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.CommonNominee);

  const contactList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.clientInfoList?.[clientIndex]
        ?.contactList
  );
  const config = useGetSectionAtomConfigByRemote({
    section: 'Nominee-Contact',
    localConfig,
  });
  const addHandle = (value, field) => {
    if (!lodash.isEmpty(value)) {
      dispatch({
        type: `${NAMESPACE}/nomineeUpdate`,
        payload: {
          changedFields: { [field]: value },
          transactionId,
          type: OperationTypeEnum.LISTINFOUPDATE,
          changeType: 'contactList',
          modalType: OperationTypeEnum.ADD,
          validating: false,
          clientIndex,
        },
      });
    }
  };

  const remove = (contactIndex) => {
    dispatch({
      type: `${NAMESPACE}/nomineeUpdate`,
      payload: {
        transactionId,
        type: OperationTypeEnum.LISTINFOUPDATE,
        changeType: 'contactList',
        modalType: OperationTypeEnum.DELETE,
        validating: false,
        clientIndex,
        changeTypeIndex: contactIndex,
      },
    });
  };
  const params = {
    transactionId,
    clientIndex,
    clientSeq,
  };

  return (
    <div className={styles.contactBox}>
      <div className={styles.contactIcon}>
        <Icon type="contacts" />
      </div>
      <div className={styles.contactLabel}>Contact Infomation</div>
      <div className={styles.relativeBox}>
        <TableSection
          section="Nominee-Contact"
          config={config}
          dataSource={lodash.map(contactList, (item, contactIndex) => contactIndex)}
        >
          <ContactItem {...params} remove={remove} />
        </TableSection>
      </div>
      {editable && (
        <div className={styles.contactAdd}>
          <NomineeContactAddSection
            {...params}
            formId={`NomineeAddressAdd${clientSeq}`}
            addHandle={addHandle}
          />
        </div>
      )}
    </div>
  );
};
export default ContactInfo;
