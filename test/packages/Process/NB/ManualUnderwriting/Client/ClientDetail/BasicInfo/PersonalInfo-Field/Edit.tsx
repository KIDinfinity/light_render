import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import useHandleExtraConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleExtraConfigCallback';
import useAutoAddCtrInfoItem from 'process/NB/ManualUnderwriting/_hooks/useAutoAddCtrInfoItem';
import useAutoChangeTitleByGender from 'process/NB/ManualUnderwriting/_hooks/useAutoChangeTitleByGender';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { Fields, localConfig } from './Section';

const PersonalInfo = ({ form, id, isSubCard }: any) => {
  const gateway = useHandleExtraConfigCallback({ id, isSubCard });
  useAutoAddCtrInfoItem({ clientId: id });
  useAutoChangeTitleByGender({ clientId: id });
  return (
    <>
      <Section
        section="PersonalInfo-Field"
        form={form}
        localConfig={localConfig}
        icon="user"
        clientId={id}
        gateway={gateway}
        id={id}
      >
        <Fields.Gender id={id} />
        <Fields.Customerage id={id} />
        <Fields.Dateofbirth id={id} />
        <Fields.Title />
        <Fields.Customerenfirstname />
        <Fields.Customerensurname />
        <Fields.Preferredname />
        <Fields.MotherMaidenName />
        <Fields.Identitytype id={id} />
        <Fields.Identityno />
        <Fields.Height />
        <Fields.Weight />
        <Fields.Bmi />
        <Fields.IsOCRIdCard id={id} />
        <Fields.Smokinghabit />
        <Fields.CustomerMrgStatus />
        <Fields.Race />
        <Fields.Ethnic />
        <Fields.Beneficiaryseqnum />
        <Fields.Beneficiarytype />
        <Fields.Share id={id} />
        <Fields.Customerenname />
        <Fields.Name />
        <Fields.EntityPolicyOwnerName />
        <Fields.Customerenmiddlename />
        <Fields.Expirydate id={id} />
        <Fields.Secondaryidentitytype />
        <Fields.Secondaryidentityno />
        <Fields.Secondaryidentityexpirydate />
        <Fields.Designation />
        <Fields.Tinsssgsis id={id} />
        <Fields.Tinsssgsisno />
        <Fields.Customerentitle />
        <Fields.Customerenextensionname />
        <Fields.Firstname id={id} />
        <Fields.Middlename id={id} />
        <Fields.Surname id={id} />
        <Fields.Extensionname id={id} />
        <Fields.Trusteename id={id} />
        <Fields.NPWP />
        <Fields.Religion />
        <Fields.CtfStartDate id={id} />
        <Fields.CompanyRegistrationNumber />
        <Fields.CompanyRegistrationNoOld />
        <Fields.DateOfRegistration />
        <Fields.AdditionalIdentificationNumber />
        <Fields.AdditionalIdentificationType />
        <Fields.Ctfexpirydate />
      </Section>
    </>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'handleChangePersonalInfoField',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'manualUnderwriting/saveFormData',
            target: 'handleChangePersonalInfoField',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    onValuesChange(props: any, changedFields: any) {
      const { dispatch, id } = props;
      dispatch({
        type: `${NAMESPACE}/handleChangePersaonalFieldsValue`,
        payload: {
          changedFields,
          id,
        },
      });
    },
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(PersonalInfo)
);
