import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
// import { ReactComponent as CopyIcon } from '@/assets/copy.svg';

import { Section, Fields } from '../../../../_section/UBOInfoField';
import CompanyCode from 'opus/NewBusiness/Enum/CompanyCode';

const UBOInfoItem = ({ clientId, form, id }: any) => {
  return (
    <Section form={form} editable={false} clientId={clientId} uboId={id} itemTable readOnly>
      <Fields.CustomerType />
      <Fields.CustomerEnFirstName />
      <Fields.CustomerEnSurname />
      <Fields.IdentityNo />
      <Fields.DateOfBirth />
      <Fields.Gender />
      <Fields.CustomerRole />
      <Fields.Percentage />
      <Fields.Nationality />
      <Fields.Country />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { clientId, id }: any) => ({
  uboInfo: modelnamepsace.entities?.clientMap?.[id],
  addressInfoMap: modelnamepsace.entities?.addressInfoMap,
  companyLegalForm: modelnamepsace.entities?.clientMap?.[clientId]?.companyLegalForm,
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { uboInfo, companyLegalForm, addressInfoMap, taskDetail } = props;
      const { personalInfo, nationalityInfo, backgroundInfo, addressInfoList } = uboInfo;
      const addressItem = addressInfoMap[addressInfoList?.[0]] ?? {};
      return formUtils.mapObjectToFields({
        companyLegalForm,
        ...personalInfo,
        ...nationalityInfo,
        ...backgroundInfo,
        ...addressItem,
        companyCode: taskDetail?.companyCode || CompanyCode.LA,
      });
    },
  })(UBOInfoItem)
);
