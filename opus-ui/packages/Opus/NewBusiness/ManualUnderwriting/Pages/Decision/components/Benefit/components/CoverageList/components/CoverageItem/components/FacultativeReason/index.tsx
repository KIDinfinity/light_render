import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from 'decision/SectionFields/UWDecision-Table';
import styles from './index.less';

const FacultativeReason = ({ form, coverage, id }: any) => {
  return (
    <Section form={form} showOnly editable={false}>
      <Fields.FacultativeReason
        id={id}
        coverageItem={coverage}
        colClassName={styles.facultativeCol}
      />
    </Section>
  );
};

const FacultativeReasonSection = Form.create<any>({
  mapPropsToFields(props) {
    const { coverage } = props;
    return formUtils.mapObjectToFields({
      facultativeReason: coverage?.coverageDecision?.facultativeReason,
    });
  },
})(FacultativeReason);
FacultativeReasonSection.displayName = 'facultativeReasonSection';

export default FacultativeReasonSection;
