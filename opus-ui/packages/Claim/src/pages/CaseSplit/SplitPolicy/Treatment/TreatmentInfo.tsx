import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Card } from 'antd';
import type { Dispatch } from 'redux';
import memo from 'memoize-one';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/es/form';
import { FormItemSelect, FormItemNumber, formUtils } from 'basic/components/Form';

import type { ITreatment, ITreatmentPayable } from '@/dtos/claim';
import { tenant } from '@/components/Tenant';
import FormLayout from 'basic/components/Form/FormLayout';
import getProdutsByPolicies from 'claim/pages/CaseSplit/_models/functions/getProdutsByPolicies';
import FormRegist from '@/components/FormRegistComponent';
import { withContextData } from '@/components/_store';

import { treatmentInfoLayout } from '../FormLayout.json';
import styles from '../../caseSplit.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  treatment: ITreatment;
  treatmentPayable: ITreatmentPayable;
  withData?: any;
  policyNo: string;
}

const memoGetProdutsByPolicies = memo(getProdutsByPolicies);

class IncidentFormSplit extends PureComponent<IProps> {
  render() {
    const { form, withData, policyNo, treatment } = this.props;
    const listPolicy = withData?.listPolicy;

    const formCtrls = [
      {
        show: tenant.isTH(),
        component: (
          <FormItemSelect
            form={form}
            disabled
            dicts={memoGetProdutsByPolicies(listPolicy, policyNo)}
            dictCode="benefitTypeCode"
            dictName="benefitTypeName"
            formName="benefitTypeCode"
            labelId="venus.claim.product-name"
          />
        ),
      },
      {
        show: !tenant.isTH(),
        component: (
          <FormItemSelect
            form={form}
            disabled
            formName="productCode"
            dicts={listPolicy}
            dictCode="coreProductCode"
            dictName="productName"
            labelId="app.navigator.task-detail-of-claim-assessment.label.product"
            icon={true}
          />
        ),
      },
      {
        show: !tenant.isTH(),
        component: (
          <FormItemSelect
            form={form}
            disabled
            formName="benefitTypeCode"
            dicts={listPolicy}
            dictCode="benefitTypeCode"
            dictName="benefitTypeName"
            labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-type"
            icon={true}
          />
        ),
      },
      {
        show: true,
        component: (
          <FormItemNumber
            form={form}
            disabled
            formName="payableAmount"
            key="payableAmount"
            labelId="app.navigator.task-detail-of-claim-assessment.label.claim-payment-amount"
          />
        ),
      },
    ];

    const filterd = lodash.map(formCtrls, (item) => (item.show ? item.component : null));

    return (
      <Card
        title={`${formatMessageApi({ Label_CLM_Opus: 'treatmentNo' })}.${treatment.treatmentNo}`}
        className={styles.treatmentCard}
        headStyle={{ display: 'flex', alignItems: 'center', paddingLeft: '12px' }}
      >
        <Form layout="horizontal" className={styles.split_form}>
          <FormLayout json={treatmentInfoLayout}>{filterd}</FormLayout>
        </Form>
      </Card>
    );
  }
}

const FormWrapped = Form.create<IProps>({
  mapPropsToFields(props) {
    const { treatment, treatmentPayable } = props;

    const { treatmentNo = null } = treatment;
    const { productCode, benefitTypeCode, payableAmount } = treatmentPayable;
    return formUtils.mapObjectToFields(
      { treatmentNo, productCode, benefitTypeCode, payableAmount },
      {
        treatmentNo: (value: any) => value,
        productCode: (value: any) => value,
        benefitTypeCode: (value: any) => value,
        payableAmount: (value: any) => value,
      }
    );
  },
})(FormRegist({ nameSpace: 'caseSplitController' })(IncidentFormSplit));

export default connect()(withContextData(FormWrapped));
