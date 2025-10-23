import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import useHandleExtraConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleExtraConfigCallback';
import useGetAddressInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetAddressInfoList';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { Fields, localConfig } from './Section';
import styles from './edit.less';

const Contactinfofield = ({ form, id, isSubCard, isDropEmptyData, addressInfoId }: any) => {
  const addressInfoList = useGetAddressInfoList({ id });
  const gateway = useHandleExtraConfigCallback({ id, isSubCard });
  return (
    <Section
      section="ContactInfo-Field"
      localConfig={localConfig}
      form={form}
      placeholder
      className={styles.sectionContainer}
      gateway={gateway}
    >
      <Fields.AddressType id={id} isDropEmptyData={isDropEmptyData} addressInfoId={addressInfoId}/>
      <Fields.Address7 id={id} isDropEmptyData={isDropEmptyData} />
      <Fields.Address6 id={id} isDropEmptyData={isDropEmptyData} addressInfoList={addressInfoList} />
      <Fields.Address5 id={id} isDropEmptyData={isDropEmptyData} addressInfoList={addressInfoList} />
      <Fields.Address4 id={id} isDropEmptyData={isDropEmptyData} addressInfoList={addressInfoList} addressInfoId={addressInfoId} />
      <Fields.Address3 id={id} isDropEmptyData={isDropEmptyData} addressInfoList={addressInfoList} />
      <Fields.Address2 id={id} isDropEmptyData={isDropEmptyData} />
      <Fields.Address1 id={id} isDropEmptyData={isDropEmptyData} />
      <Fields.Zipcode id={id} isDropEmptyData={isDropEmptyData} />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id, addressInfoId } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'handleChangeContactAddressInfoField',
              payload: {
                changedFields,
                id,
                addressInfoId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'handleChangeContactAddressInfoField',
            payload: {
              changedFields,
              id,
              addressInfoId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { addressInfo } = props;
      return formUtils.mapObjectToFields(addressInfo);
    },
  })(Contactinfofield)
);
