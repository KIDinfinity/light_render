import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../../activity.config';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Item = ({ form }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <>
      <Section form={form} editable={editable} section="MailsCertificatesCorrespondences">
        <Fields.MailType />
        <Fields.SendTo />
        <Fields.BranchCode />
      </Section>
    </>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  mailCertificateCorrespondence:
    modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.mailCertificateCorrespondence,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'mailsCertificatesCorrespondencesUpdate',
          payload: {
            changedFields,
            transactionId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { mailCertificateCorrespondence } = props;

      return formUtils.mapObjectToFields(mailCertificateCorrespondence);
    },
  })(Item)
);
