import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from 'decision/SectionFields/UWDecision-Table';
import styles from './index.less';

const FacultativeOption = ({ form, coverage, id }: any) => {
  return (
    <Section form={form} showOnly editable={false}>
      <Fields.FacultativePackageCode
        id={id}
        coverageItem={coverage}
        colClassName={styles.facultativeCol}
      />
    </Section>
  );
};

const FacultativeOptionSection = Form.create<any>({
  mapPropsToFields(props) {
    const { coverage } = props;
    return formUtils.mapObjectToFields({
      facultativePackageCode: coverage?.coverageDecision?.facultativePackageCode,
    });
  },
})(FacultativeOption);
FacultativeOptionSection.displayName = 'facultativeOptionSection';

export default FacultativeOptionSection;
