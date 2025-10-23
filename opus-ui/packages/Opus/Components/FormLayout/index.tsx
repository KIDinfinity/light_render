import { formatMessageApi } from '@/utils/dictFormatMessage';
import classNames from 'classnames';
import lodash from 'lodash';
import { DatePicker, Form, Tooltip, Icon, Input, InputNumber, Select } from 'opus/Components/Antd';
import React, { useRef } from 'react';
import styles from './index.less';
import { ReactComponent as IconDropdown } from 'opus/Assets/icon-select-dropdown.svg';
import { ReactComponent as ErrorSvg } from 'claim/assets/error.svg';
import { Region, tenant } from '@/components/Tenant';
const { RangePicker } = DatePicker;
const { Option } = Select;

export default ({ fields, form, extraClassName }: any) => {
  const { getFieldDecorator } = form;
  const ref = useRef(null);
  const format = tenant.region({
    [Region.TH]: () => ['DD/MM/YYYY', 'DD/MM/YYYY'],
    [Region.JP]: () => ['YYYY/MM/DD', 'YYYY/MM/DD'],
    [Region.HK]: () => ['DD/MM/YYYY', 'DD/MM/YYYY'],
  });
  return (
    <Form
      layout="vertical"
      className={classNames(styles.formLayout, { [extraClassName]: !!extraClassName })}
    >
      {lodash.map(
        fields,
        ({
          title,
          field,
          config,
          selectOptions,
          type,
          labelTypeCode,
          dictCode,
          disabled,
          disabledDate,
          placeholder,
          require,
        }: any) => {
          const selectOpt = selectOptions;
          const errors = form.getFieldError(field);

          return (
            <div className={styles.item} key={field} ref={ref}>
              <label className={styles.label}>
                <div className={styles.ErrorTooltip}>
                  {!!errors && (
                    <Tooltip
                      arrowPointAtCenter
                      placement="top"
                      overflow="auto"
                      overlayClassName={styles.myErrorTooltip}
                      title={formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' })}
                    >
                      <Icon className={styles.errorIcon} component={ErrorSvg} />
                    </Tooltip>
                  )}
                </div>
                {!!dictCode ? formatMessageApi({ [labelTypeCode]: dictCode }) : title}
                <span className={styles.requireIcon}>{!!require ? '*' : ''}</span>
              </label>
              <Form.Item label="">
                {getFieldDecorator(field, {
                  ...config,
                  rules: [
                    {
                      required: true,
                      message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
                    },
                  ],
                })(
                  type === 'date' ? (
                    <DatePicker
                      placeholder={placeholder || format?.[0]}
                      format={format}
                      className={styles.text}
                      disabled={disabled}
                      disabledDate={disabledDate}
                    />
                  ) : type === 'dateRange' ? (
                    <RangePicker
                      placeholder={format}
                      className={styles.text}
                      disabled={disabled}
                      format={format}
                      disabledDate={disabledDate}
                    />
                  ) : type === 'select' ? (
                    <Select
                      showSearch
                      placeholder={placeholder || formatMessageApi({ Label_COM_General: 'select' })}
                      className={styles.select}
                      getPopupContainer={(triggerNode) => ref?.current || triggerNode.parentNode}
                      disabled={disabled}
                      optionFilterProp={'title'}
                    >
                      {selectOpt?.map((item: any) => {
                        const { key, value, title: optionTitle, disabled: optionDisabled } = item;
                        return (
                          <Option
                            value={value}
                            key={key}
                            title={optionTitle}
                            disabled={optionDisabled}
                          >
                            {optionTitle}
                          </Option>
                        );
                      })}
                    </Select>
                  ) : type === 'number' ? (
                    <InputNumber
                      className={styles.text}
                      formatter={(value: any) =>
                        `${value} ${formatMessageApi({
                          Label_COM_Opus: `${value > 1 ? 'day.plural' : 'day.singular'}`,
                        })}`
                      }
                      parser={(value: any) => value.replace('Day', '').replace('Days', '')}
                      disabled={disabled}
                    />
                  ) : (
                    <Input
                      disabled={disabled}
                      placeholder={placeholder || 'Input Text'}
                      className={styles.text}
                    />
                  )
                )}
              </Form.Item>
              {type === 'dateRange' && (
                <div className={styles.dateRangeExtra}>{format?.join?.(' ~ ')}</div>
              )}
              {type === 'date' && !!placeholder && (
                <div className={styles.dateRangeExtra}>{format?.[0]}</div>
              )}
              {type === 'select' && (
                <Icon className={styles.dropdownIcon} component={IconDropdown} />
              )}
            </div>
          );
        }
      )}
    </Form>
  );
};
