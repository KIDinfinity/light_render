import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import useHandleExtraConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleExtraConfigCallback';
import useSetContactInfoTabledefault from 'process/NB/ManualUnderwriting/_hooks/useSetContactInfoTabledefault';
import useHandleChangeContactTypeCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleChangeContactTypeCallback';
import useHandleChangeContactNoCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleChangeContactNoCallback';
import useHandleChangeContactCountryCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleChangeContactCountryCallback';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { Fields, localConfig } from './Section';

const Contactinfotable = ({
  form,
  id,
  contactItemId,
  contactSeqNum,
  contactType,
  isSubCard,
  isLast,
}: any) => {
  const gateway = useHandleExtraConfigCallback({ id, isSubCard });
  useSetContactInfoTabledefault({ id, contactItemId, contactSeqNum });
  // const handleFocus = useAutoAddContactInfoWhencChangeCallback({
  //   id,
  //   contactItemId,
  // });
  const handleChangeContactType = useHandleChangeContactTypeCallback({
    clientId: id,
    contactId: contactItemId,
    isLast: isLast,
  });
  const handleChangeContactNo = useHandleChangeContactNoCallback({
    clientId: id,
    contactId: contactItemId,
  });
  const handleChangeContactCountry = useHandleChangeContactCountryCallback({
    clientId: id,
    contactId: contactItemId,
  });
  return (
    <div>
      <Section section="ContactInfo-Table" form={form} localConfig={localConfig} gateway={gateway}>
        <Fields.Contacttype
          id={id}
          isLast={isLast}
          contactItemId={contactItemId}
          contactSeqNum={contactSeqNum}
          handleChange={handleChangeContactType}
        />
        <Fields.CountryName isLast={isLast} />
        <Fields.Countrycode isLast={isLast} handleChange={handleChangeContactCountry} />
        <Fields.Contactno isLast={isLast} handleChange={handleChangeContactNo} />
        <Fields.AreaCode isLast={isLast} contactSeqNum={contactSeqNum} contactType={contactType} />
      </Section>
    </div>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id, contactItemId } = props;
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: `${NAMESPACE}/saveEntry`,
            target: 'changeContactInfoFields',
            payload: {
              changedFields,
              id,
              contactItemId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'changeContactInfoFields',
          payload: {
            changedFields,
            id,
            contactItemId,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(Contactinfotable)
);
