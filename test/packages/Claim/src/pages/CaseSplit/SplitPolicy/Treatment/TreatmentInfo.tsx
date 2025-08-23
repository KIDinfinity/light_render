import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import type { Dispatch } from 'redux';
import memo from 'memoize-one';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/es/form';
import { FormItemSelect, FormItemNumber, FormItemInput, formUtils } from 'basic/components/Form';

import type { ITreatment, ITreatmentPayable } from '@/dtos/claim';
import Tenant from '@/components/Tenant';
import { tenant } from '@/components/Tenant';
import FormLayout from 'basic/components/Form/FormLayout';
import getProdutsByPolicies from 'claim/pages/CaseSplit/_models/functions/getProdutsByPolicies';
import FormRegist from '@/components/FormRegistComponent';
import { withContextData } from '@/components/_store';

import { treatmentInfoLayout, policyInfoLayout } from '../FormLayout.json';
import styles from '../../caseSplit.less';

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
    const { form, withData, policyNo } = this.props;
    const listPolicy = withData?.listPolicy;

    const formCtrls = [
      {
        show: true,
        component: (
          <FormItemInput
            form={form}
            disabled
            formName="treatmentNo"
            key="treatmentNo"
            labelId="app.navigator.task-detail-of-data-capture.label.treatment-no"
          />
        ),
      },
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
      <Form layout="horizontal" className={styles.split_form}>
        <Tenant.TH>
          <FormLayout json={policyInfoLayout}>{filterd}</FormLayout>
        </Tenant.TH>
        <Tenant.TH match={false}>
          <FormLayout json={treatmentInfoLayout}>{filterd}</FormLayout>
        </Tenant.TH>
      </Form>
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
