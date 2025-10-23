import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/es/form';
import { Form, Card } from 'antd';
import {
  FormItemSelect,
  FormItemSelectPlus,
  formUtils,
} from 'basic/components/Form';

import type { ITreatment } from '@/dtos/claim';
import FormLayout from 'basic/components/Form/FormLayout';
import styles from '../../caseSplit.less';
import { treatmentInfoLayout } from '../FormLayout.json';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  treatment: ITreatment;
}

class TreatmentInfo extends PureComponent<IProps> {
  render() {
    const { form, treatment } = this.props;
    const dictsTreatmentType =
      getDrowDownList('TreatmentType') || getDrowDownList('TreatmentType_jp');
    return (
      <>
        <Card
          title={`${formatMessageApi({ Label_CLM_Opus: 'treatmentNo' })}.${treatment.treatmentNo}`}
          className={styles.treatmentCard}
          headStyle={{ display: 'flex', alignItems: 'center', paddingLeft: '12px' }}
        >
          <Form layout="horizontal" className={styles.split_form}>
            <FormLayout json={treatmentInfoLayout}>
              <FormItemSelect
                form={form}
                disabled
                formName="treatmentType"
                dicts={dictsTreatmentType}
                labelId="app.navigator.task-detail-of-data-capture.label.treatment-type"
                icon={true}
              />
              <FormItemSelectPlus
                form={form}
                disabled
                formName="medicalProvider"
                searchName="medicalProvider"
                labelId="app.navigator.task-detail-of-data-capture.label.medical-provider"
                dropdownCode="claim_dict005"
                optionShowType="both"
                icon={true}
              />
            </FormLayout>
          </Form>
        </Card>
      </>
    );
  }
}

const FormWrapped = Form.create<IProps>({
  mapPropsToFields(props) {
    const { treatment } = props;

    return formUtils.mapObjectToFields(treatment, {
      treatmentNo: (value: any) => value,
      treatmentType: (value: any) => value,
      medicalProvider: (value: any) => value,
    });
  },
})(TreatmentInfo);
export default connect()(FormWrapped);
