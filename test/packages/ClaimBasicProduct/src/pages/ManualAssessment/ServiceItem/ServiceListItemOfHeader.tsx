import React, { PureComponent } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import { Form } from 'antd';

import { add } from '@/utils/precisionUtils';
import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemNumber, FormItemSelectPlus, formUtils } from 'basic/components/Form';
import { serviceItemHeaderLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'ServiceListItemHeader';

const collectServiceItemPayableListAmount = (curServicePayableList) => {
  let totalPayableAmount = 0;

  totalPayableAmount = curServicePayableList.reduce(
    (total, item) => add(total, item.payableAmount),
    0
  );
  return totalPayableAmount;
};

const mapStateToProps = (
  { bpOfClaimAssessmentController, formCommonController, claimEditable }: any,
  { serviceItemId }: any
) => {
  const { claimEntities } = bpOfClaimAssessmentController;
  const serviceItemPayableListMapEntries = Object.entries(claimEntities.serviceItemPayableListMap);
  const serviceItemPayableList = [];
  lodash.map(serviceItemPayableListMapEntries, (item) => {
    if (item[1].serviceItemId === serviceItemId) {
      serviceItemPayableList.push(item[1]);
    }
  });
  return {
    totalPayableAmount: collectServiceItemPayableListAmount(serviceItemPayableList),
    serviceItem: bpOfClaimAssessmentController.claimEntities.serviceItemListMap[serviceItemId],
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  };
};

@connect(mapStateToProps)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, serviceItemId, invoiceId, validating } = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'bpOfClaimAssessmentController/saveEntry',
            target: 'saveServiceItem',
            payload: {
              changedFields,
              serviceItemId,
              invoiceId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'bpOfClaimAssessmentController/saveFormData',
          target: 'saveServiceItem',
          payload: {
            changedFields,
            serviceItemId,
            invoiceId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { serviceItem, totalPayableAmount } = props;

    return formUtils.mapObjectToFields(serviceItem, {
      serviceItem: (value) => value,
      transId: () => totalPayableAmount,
    });
  },
})
class ServiceListItem extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, serviceItemId }: any = this.props;

    if (serviceItemId) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${serviceItemId}`,
        },
      });
    }
  };

  registeForm = () => {
    const { dispatch, form, serviceItemId }: any = this.props;

    if (serviceItemId) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${serviceItemId}`,
        },
      });
    }
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  handleDelete = () => {
    const { dispatch, invoiceId, serviceItemId }: any = this.props;

    dispatch({
      type: 'bpOfClaimAssessmentController/removeServiceItem',
      payload: {
        invoiceId,
        serviceItemId,
      },
    });
  };

  render() {
    const { form, taskNotEditable }: any = this.props;

    return (
      <Form layout="vertical">
        <FormLayout json={serviceItemHeaderLayout}>
          <FormItemSelectPlus
            form={form}
            disabled={taskNotEditable}
            required
            formName="serviceItem"
            searchName="serviceItem"
            labelId="app.navigator.task-detail-of-data-capture.label.item"
            dropdownCode="claim_dict001"
            optionShowType="both"
          />
          <FormItemNumber
            form={form}
            disabled
            formName="transId"
            labelId="app.navigator.task-detail-of-claim-assessment.label.payable-amount"
            name="fieldOne"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default ServiceListItem;
