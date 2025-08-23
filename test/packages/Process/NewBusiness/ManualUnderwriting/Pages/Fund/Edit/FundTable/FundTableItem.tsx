import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';

import { formUtils } from 'basic/components/Form';
import { Fields } from './Fields';
import Section from 'process/NewBusiness/ManualUnderwriting/_components/EditableSection';
import { localConfig } from '../../_config/FundTableField';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { v4 as uuid } from 'uuid';

const FundTableItem = ({ form, config }: any) => {
  const formId = `Fund-Table_${uuid()}`;
  return (
    <Section
      section="Fund-Table"
      formId={formId}
      form={form}
      tableHeaderConfig={config}
      localConfig={localConfig}
    >
      <Fields.Fundcode />
      <Fields.Fundname />
      <Fields.Fundcurrency />
      <Fields.Fundallocation />
      <Fields.TPARCDAllocation />
      <Fields.TPAAllocation />
      <Fields.EPAAllocation />
      <Fields.AdhocTopUpAllocation />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, itemData, config } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (itemData.isLast && !!formUtils.queryValue(changedFields?.fundCode)) {
          dispatch({
            type: `${NAMESPACE}/addFundItem`,
            payload: {
              newId: uuid(),
              isLast: true,
            },
          });
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'updateFundItem',
            payload: {
              changedFields: {
                ...itemData,
                ...changedFields,
                isLast: false,
              },
              errorId: itemData.id,
            },
          });
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'updateFundItem',
            payload: {
              changedFields: {
                ...itemData,
                ...changedFields,
              },
              errorId: itemData.id,
            },
          });
        }
        dispatch({
          type: `${NAMESPACE}/alignFundTotal`,
          payload: {
            config,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { itemData } = props;
      return formUtils.mapObjectToFields(itemData);
    },
  })(FundTableItem)
);
