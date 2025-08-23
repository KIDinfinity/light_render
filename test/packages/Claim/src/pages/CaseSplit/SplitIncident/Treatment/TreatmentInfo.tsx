import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/es/form';
import { Form } from 'antd';
import {
  FormItemSelect,
  FormItemInput,
  FormItemSelectPlus,
  formUtils,
} from 'basic/components/Form';

import type { ITreatment } from '@/dtos/claim';
import FormLayout from 'basic/components/Form/FormLayout';
import styles from '../../caseSplit.less';
import { treatmentInfoLayout } from '../FormLayout.json';
import { getDrowDownList } from '@/utils/dictFormatMessage';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  treatment: ITreatment;
}

class TreatmentInfo extends PureComponent<IProps> {
  render() {
    const { form } = this.props;
    const dictsTreatmentType =
      getDrowDownList('TreatmentType') || getDrowDownList('TreatmentType_jp');
    return (
      <Form layout="horizontal" className={styles.split_form}>
        <FormLayout json={treatmentInfoLayout}>
          <FormItemInput
            form={form}
            disabled
            formName="treatmentNo"
            name="treatmentNo"
            labelId="app.navigator.task-detail-of-data-capture.label.treatment-no"
          />
          <FormItemSelect
            form={form}
            disabled
            formName="treatmentType"
            dicts={dictsTreatmentType}
            labelId="app.navigator.task-detail-of-data-capture.label.treatment-type"
          />
          <FormItemSelectPlus
            form={form}
            disabled
            formName="medicalProvider"
            searchName="medicalProvider"
            labelId="app.navigator.task-detail-of-data-capture.label.medical-provider"
            dropdownCode="claim_dict005"
            optionShowType="both"
          />
        </FormLayout>
      </Form>
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
