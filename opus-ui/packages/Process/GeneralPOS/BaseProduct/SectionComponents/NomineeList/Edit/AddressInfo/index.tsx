import { formUtils } from 'basic/components/Form';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { NomineeAddressAddSection } from 'process/GeneralPOS/BaseProduct/SectionComponents/CommonNominee/NomineeAddressSection';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum, OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import CloseButton from '../../CloseButton';
import styles from '../index.less';
import NomineeAddressItemSection from './AddressItem';
import NomineeAddressHeaderSection from './Header';

const AddressInfo = ({ transactionId, clientSeq, clientIndex }: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.CommonNominee);

  const addressList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.clientInfoList?.[clientIndex]
        ?.addressList
  );

  const addressListKey = lodash.map(
    addressList,
    (item, index) => `${formUtils.queryValue(item?.addressType)}-${index}`
  );

  const addHandle = (value, field) => {
    if (!lodash.isEmpty(value)) {
      dispatch({
        type: `${NAMESPACE}/nomineeUpdate`,
        payload: {
          changedFields: { [field]: value },
          transactionId,
          type: OperationTypeEnum.LISTINFOUPDATE,
          changeType: 'addressList',
          modalType: OperationTypeEnum.ADD,
          validating: false,
          clientIndex,
        },
      });
    }
  };

  const removeHandle = (addressIndex) => {
    dispatch({
      type: `${NAMESPACE}/nomineeUpdate`,
      payload: {
        transactionId,
        type: OperationTypeEnum.LISTINFOUPDATE,
        changeType: 'addressList',
        modalType: OperationTypeEnum.DELETE,
        validating: false,
        clientIndex,
        changeTypeIndex: addressIndex,
      },
    });
  };

  const params = {
    transactionId,
    clientIndex,
    clientSeq,
  };

  return (
    <div>
      <NomineeAddressHeaderSection formId={`NomineeAddressHeader${clientSeq}`} {...params} />
      <div className={styles.addressBox}>
        <div className={styles.addressLabel}>Address Infomation</div>
        {lodash.map(addressListKey, (item, addressIndex) => (
          <div key={item} className={classnames(styles.relativeBox, styles.addressItem)}>
            <NomineeAddressItemSection
              {...params}
              formId={`NomineeAddressItem${clientSeq}${addressIndex}`}
              addressIndex={addressIndex}
              removeHandle={removeHandle}
            />
            <CloseButton
              className={styles.addressListRemoveIcon}
              handleClose={() => {
                removeHandle(addressIndex);
              }}
            />
          </div>
        ))}
        {editable && (
          <div className={classnames(styles.addressItem)}>
            <NomineeAddressAddSection
              {...params}
              formId={`NomineeAddressAdd${clientSeq}`}
              addHandle={addHandle}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default AddressInfo;
