import React from 'react';

import lodash from 'lodash';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { TreamentFields as Fields } from './Section';
import styles from './index.less';

const Basic = ({ form, treatmentItem }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const TreatmentType = useSelector(
    ({ dictionaryController }: any) => dictionaryController.TreatmentType
  );
  const treatmentTypeName =
    lodash
      .chain(TreatmentType || [])
      .find((el: any) => el.dictCode === formUtils.queryValue(treatmentItem?.treatmentType))
      .get('dictName')
      .value() || '';
  return (
    <div className={styles.treamentItem}>
      <span className={styles.treatmentType}>{[treatmentTypeName]}</span>
      <Section form={form} editable={editable} section="PopUpEditPayable.Treament">
        <Fields.DateOfConsultation />
        <Fields.DateOfAdmission />
        <Fields.DateOfDischarge />
      </Section>
    </div>
  );
};

export default connect()(
  Form.create<any>({
    mapPropsToFields(props: any) {
      const { treatmentItem } = props;
      return formUtils.mapObjectToFields(treatmentItem);
    },
  })(Basic)
);
