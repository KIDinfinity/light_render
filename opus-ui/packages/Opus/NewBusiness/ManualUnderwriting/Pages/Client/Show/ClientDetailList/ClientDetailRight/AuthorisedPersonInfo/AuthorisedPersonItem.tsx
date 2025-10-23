import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import { Section, Fields } from '../../../../_section/AuthorisedPersonField';
import CompanyCode from 'opus/NewBusiness/Enum/CompanyCode';

const AuthorisedPersonItem = ({ clientId, form }: any) => {
  return (
    <Section form={form} editable={false} clientId={clientId} itemTable readOnly>
      <Fields.CustomerRole />
      <Fields.CustomerEnFirstName />
      <Fields.CustomerEnSurname />
      <Fields.IdentityNo />
      <Fields.DateOfBirth />
      <Fields.Nationality />
      <Fields.AddressType />
      <Fields.Residentialaddress />
      <Fields.Zipcode />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { id }: any) => ({
  authorisedPerson: modelnamepsace.entities?.clientMap?.[id],
  addressInfoMap: modelnamepsace.entities?.addressInfoMap,
  loadingStatus: login.loadingStatus,
  taskDetail: modelnamepsace.taskDetail,
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { authorisedPerson, addressInfoMap, taskDetail } = props;
      const { personalInfo, addressInfoList, nationalityInfo } = authorisedPerson;
      const addressItem = addressInfoMap[addressInfoList[0]];
      return formUtils.mapObjectToFields({
        ...personalInfo,
        ...addressItem,
        ...nationalityInfo,
        residentialAddress: addressItem?.fullAddress,
        companyCode: taskDetail?.companyCode || CompanyCode.LA,
      });
    },
  })(AuthorisedPersonItem)
);
