import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useDispatch } from 'dva';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import { NAMESPACE } from '../../activity.config';
import Section, { Fields } from './Section';

const ChangePayment = ({ transactionId, form }: any) => {
  const dispatch = useDispatch();

  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <Section form={form} editable={editable} section="ChangeICP" className={'ChangeICP'}>
      <Fields.IcpOption />
      <Fields.IcpEligible />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  changeIcp: modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.changeIcp,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'changeICPUpdate',
          payload: {
            changedFields,
            transactionId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { changeIcp } = props;

      return formUtils.mapObjectToFields(changeIcp);
    },
  })(ChangePayment)
);
