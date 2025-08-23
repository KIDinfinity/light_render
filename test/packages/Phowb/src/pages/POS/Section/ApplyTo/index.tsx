import React, { PureComponent } from 'react';
import { Checkbox, Row, Col, Form } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltip from '@/components/ErrorTooltip';
import { messageModal } from '@/utils/commonMessage';
import { applyToList } from '../../_models/functions/getChangeInfoOption';
import { ApplyTo as ApplyToEnum } from '../../Enum';
import styles from './index.less';

interface IProps {
  disabled: undefined | boolean;
  checkboxDisabled: undefined | boolean;
}

class ApplyTo extends PureComponent<IProps> {
  onChange = (event: any) => {
    const isPersonalCheck = event?.target?.value === ApplyToEnum.P && event?.target?.checked;
    if (isPersonalCheck) {
      messageModal(
        {
          typeCode: 'Label_COM_Message',
          dictCode: 'MSG_000401',
        },
        {
          hiddenExtraText: true,
          cancelText: formatMessageApi({
            Label_BIZ_Claim: 'venus_claim.ruleEngine.label.OK',
          }),
          hideOkButton: true,
          okFn: async () => {},
        }
      );
    }
  };

  render() {
    const {
      form,
      form: { getFieldDecorator },
      labelId,
      formName,
      required,
      labelTypeCode = 'Label_BIZ_POS',
    } = this.props;
    const { disabled } = this.props;
    return (
      <Form.Item
        className={styles.ApplyTo}
        label={
          labelId && (
            <ErrorTooltip
              labelId="Applyto"
              form={form}
              formName={formName}
              labelTypeCode={labelTypeCode}
              // visible={focused}
            />
          )
        }
      >
        {getFieldDecorator('applyTo', {
          rules: [
            {
              required,
              message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
            },
          ],
        })(
          <Checkbox.Group style={{ width: '100%' }} className={styles.checkbox} disabled={disabled}>
            <Row>
              {lodash.map(applyToList, (item: any, key: number): any => {
                return (
                  <Col span={6} key={key}>
                    <Checkbox value={item.value} onChange={this.onChange}>
                      {formatMessageApi({ Dropdown_POS_ChangeApplyTo: item.dictCode })}
                    </Checkbox>
                  </Col>
                );
              })}
            </Row>
          </Checkbox.Group>
        )}
      </Form.Item>
    );
  }
}

export default ApplyTo;
