import React from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils, FormAntCard } from 'basic/components/Form';

import { connect, useSelector } from 'dva';
import { calcAge } from '@/utils/utils';
import SectionTitle from './SectionTitle';
import Section, { Fields } from './Section';

const Insured = ({ form, incidentListMap }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const claimTypeList = !lodash.isEmpty(incidentListMap)
    ? lodash.reduce(
        incidentListMap,
        (arr: any, item: any) => {
          return item?.claimTypeArray && formUtils.queryValue(item?.claimTypeArray)
            ? [...arr, ...formUtils.queryValue(item?.claimTypeArray)]
            : arr;
        },
        []
      )
    : [];

  return (
    <FormAntCard title={<SectionTitle />}>
      <Section form={form} editable={editable}>
        <Fields.Address />
        <Fields.Age />
        <Fields.DateOfBirth />
        <Fields.DateTimeOfDeath claimTypeList={claimTypeList} />
        <Fields.Email />
        <Fields.FirstName />
        <Fields.Gender />
        <Fields.InsuredId />
        <Fields.Occupation />
        <Fields.PhoneNo />
        <Fields.PolicyId />
        <Fields.PostCode />
        <Fields.SurName />
      </Section>
    </FormAntCard>
  );
};

export default connect(({ formCommonController, JPCLMOfDataCapture, processTask }: any) => ({
  validating: formCommonController.validating,
  insured: JPCLMOfDataCapture.claimProcessData?.insured,
  incidentListMap: JPCLMOfDataCapture.claimEntities.incidentListMap || {},
  taskDetail: processTask.getTask,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfDataCapture/saveEntry',
              target: 'insuredUpdate',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfDataCapture/saveFormData',
            target: 'insuredUpdate',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { insured, taskDetail = {} }: any = props;

      const { submissionDate } = taskDetail;
      const { dateOfBirth } = insured || {};

      return formUtils.mapObjectToFields({
        ...insured,
        age: calcAge(dateOfBirth, submissionDate),
      });
    },
  })(Insured)
);
