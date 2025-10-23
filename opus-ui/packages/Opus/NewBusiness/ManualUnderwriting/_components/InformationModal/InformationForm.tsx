import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import { NAMESPACE } from '../../activity.config';
import React, { useEffect } from 'react';
import Section, { Fields } from './Section';
import InformationCategory from 'opus/NewBusiness/Enum/InformationCategory';

const InformationForm = ({ form, setForm }: any) => {
  const category = useSelector(({ [NAMESPACE]: state }: any) => state?.informationModalCategory);
  const categoryReasons = useSelector(({ [NAMESPACE]: state }: any) => state?.categoryReasons);
  const showErrorField = categoryReasons?.some(({ fieldName }: any) =>
    ['QCErrorOccured', 'QAErrorOccured'].includes(fieldName)
  );

  useEffect(() => {
    setForm(form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const CategoryContents: any = {
    [InformationCategory.Escalate]: (
      <Section form={form} editable={editable} section="InformationModal">
        <Fields.TeamOrUser />
        <Fields.Reason />
        {showErrorField ? <Fields.Error /> : <></>}
        <Fields.Comment />
      </Section>
    ),
    [InformationCategory.Withdraw]: (
      <Section form={form} editable={editable} section="InformationModal">
        <Fields.Reason />
        {showErrorField ? <Fields.Error /> : <></>}
        <Fields.Comment />
      </Section>
    ),
    [InformationCategory.Reject]: (
      <Section form={form} editable={editable} section="InformationModal">
        <Fields.Reason />
        {showErrorField ? <Fields.Error /> : <></>}
        <Fields.Comment />
      </Section>
    ),
    [InformationCategory.Cancel]: (
      <Section form={form} editable={editable} section="InformationModal">
        <Fields.CancelReason />
        {showErrorField ? <Fields.Error /> : <></>}
        <Fields.Comment />
      </Section>
    ),
    [InformationCategory.QAFail]: (
      <Section form={form} editable={editable} section="InformationModal">
        <Fields.Reason />
        {showErrorField ? <Fields.Error /> : <></>}
        <Fields.Comment />
      </Section>
    ),
    [InformationCategory.QCFail]: (
      <Section form={form} editable={editable} section="InformationModal">
        <Fields.Reason />
        {showErrorField ? <Fields.Error /> : <></>}
        <Fields.Comment />
      </Section>
    ),
    [InformationCategory.AppealNote]: (
      <Section form={form} editable={editable} section="InformationModal">
        <Fields.Reason />
        {showErrorField ? <Fields.Error /> : <></>}
        <Fields.Comment />
      </Section>
    ),
  };

  return <>{CategoryContents[category] || ''}</>;
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveInformationForm`,
          payload: {
            changedFields,
          },
        });
      }
    },
  })(InformationForm)
);
