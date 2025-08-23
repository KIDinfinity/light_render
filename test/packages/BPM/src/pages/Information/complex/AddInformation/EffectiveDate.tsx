import React from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Form, DatePicker } from 'antd';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const EffectiveDate = Form.create({
  mapPropsToFields(props) {
    const { item }: any = props;
    return formUtils.mapObjectToFields(item, {
      effectiveDate: (value: any) => (value ? moment(value) : null),
      expiryDate: (value: any) => (value ? moment(value) : null),
    });
  },
  onValuesChange(props, changedFields) {
    const { dispatch, item }: any = props;
    dispatch({
      type: 'navigatorInformationController/addInformationChange',
      payload: {
        changedFields,
        id: item.id,
      },
    });
  },
})((props) => {
  const { form, item } = props;
  const { getFieldDecorator } = form;

  return (
    <div style={{ marginBottom: '12px' }}>
      <span>
        {formatMessageApi({
          Label_BIZ_POS: 'Applyto',
        })}
      </span>
      <div style={{ display: 'flex', marginTop: '4px' }}>
        <Form.Item>
          {getFieldDecorator(
            'effectiveDate',
            {}
          )(
            <DatePicker
              format="L"
              allowClear={false}
              disabledDate={(date) => date.valueOf() > moment(item.expiryDate).valueOf()}
              placeholder=""
            />
          )}
        </Form.Item>
        <span>
          {formatMessageApi({
            Label_BIZ_Claim: 'form.to',
          })}
        </span>
        <Form.Item>
          {getFieldDecorator(
            'expiryDate',
            {}
          )(
            <DatePicker
              format="L"
              allowClear={false}
              disabledDate={(date) => {
                if (item.effectiveDate === undefined) {
                  return date.valueOf() < moment().startOf('day').valueOf();
                }
                return date.valueOf() < moment(item.effectiveDate).valueOf();
              }}
              placeholder=""
            />
          )}
        </Form.Item>
      </div>
    </div>
  );
});

export default connect(({ navigatorInformationController }: any) => ({
  informationData: lodash.get(navigatorInformationController, 'informationData', {}),
}))(EffectiveDate);
