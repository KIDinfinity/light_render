import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { ReactComponent as BackgroundInfoIcon } from 'opus/Assets/background.svg';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import { Section, Fields } from '../../../../_section/UBOInfoField';
import styles from './index.less';
import CompanyCode from 'opus/NewBusiness/Enum/CompanyCode';

const UBOInfo = ({ clientId, form }: any) => {
  return (
    <div className={styles.tableSection}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <BackgroundInfoIcon />
        </div>
      </div>
      <Section form={form} editable={false} clientId={clientId} readOnly>
        <Fields.UBOShareholder />
      </Section>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamespace }: any, { clientId }: any) => ({
  companyLegalForm: modelnamespace.entities?.clientMap?.[clientId]?.companyLegalForm,
  taskDetail: modelnamespace.taskDetail,
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { companyLegalForm, taskDetail } = props;
      return formUtils.mapObjectToFields({
        companyLegalForm,
        companyCode: taskDetail?.companyCode || CompanyCode.LA,
      });
    },
  })(UBOInfo)
);
