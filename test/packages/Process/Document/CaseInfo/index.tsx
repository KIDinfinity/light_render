import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Section, { BasicFields as Fields } from './Section';

const Basic = ({ form, NAMESPACE }: any) => {
  return (
    <Section form={form} editable={true} section="CaseInfo" NAMESPACE={NAMESPACE}>
      <Fields.BusinessNo />
      <Fields.CaseCategory />
      <Fields.CaseNo />
      <Fields.CurrentActivity />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  relatedCaseInfo: modelnamepsace.businessData.relatedCaseInfo || {},
}))(
  Form.create<any>({
    mapPropsToFields(props: any) {
      const { relatedCaseInfo } = props;
      console.log(
        'caseCategory',
        formatMessageApi({ Label_BPM_CaseCategory: relatedCaseInfo?.caseCategory })
      );

      return formUtils.mapObjectToFields({
        ...relatedCaseInfo,
        caseCategory: formatMessageApi({ Label_BPM_CaseCategory: relatedCaseInfo?.caseCategory }),

        currentActivity: formatMessageApi({ activity: relatedCaseInfo?.currentActivity }),
      });
    },
  })(Basic)
);
