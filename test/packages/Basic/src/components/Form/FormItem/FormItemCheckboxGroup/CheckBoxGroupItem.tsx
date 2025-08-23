import React from 'react';
import { Checkbox, Col, Tooltip } from 'antd';
import { map } from 'lodash';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { FormItemCheckboxGroupProps } from '../typing';
import styles from './index.less';

const RenderTooltipCheckbox = ({ title, itemTitle, children }) => {
  return itemTitle || title ? (
    <Tooltip overlayClassName={styles.warningTooltip} title={itemTitle || title}>
      {children}
    </Tooltip>
  ) : (
    children
  );
};

const CheckBoxGroupItem = React.forwardRef<any, FormItemCheckboxGroupProps>((props, ref) => {
  const {
    form,
    formName,
    recoverValue,
    disabled,
    onChange,
    dictCode = '',
    itemOnChange,
    dicts,
    dictName = '',
    dictTypeCode,
    value,
    onBlur,
    setVisible = () => {},
    colSpan,
    tooltip,
    required,
  } = props;
  const formValue = form.getFieldValue(formName);
  const getCompare = !!(recoverValue && recoverValue !== formValue);

  return (
    <Checkbox.Group
      // @ts-ignore
      id={formName}
      disabled={disabled}
      style={colSpan ? {} : { height: 24 }}
      className={classNames(
        {
          [styles.hightLight]: getCompare,
        },
        styles.checkbox
      )}
      onChange={(e: any) => {
        return onChange && onChange(e);
      }}
      // @ts-ignore
      onBlur={(e: any) => {
        setVisible(false);
        return onBlur && onBlur(e);
      }}
      onFocus={() => setVisible(true)}
      value={value}
      required={required}
    >
      {map(dicts, (item: any, index: number): any => {
        return colSpan ? (
          <Col span={colSpan} key={`checkbox_${index}`}>
            <RenderTooltipCheckbox title={tooltip} itemTitle={item?.title}>
              <Checkbox
                key={`${item[dictCode]}-${index}`}
                value={item[dictCode]}
                onChange={(e) => {
                  return itemOnChange && itemOnChange(e);
                }}
                disabled={item.disabled}
                required={required}
                {...(index === 0 ? { ref } : {})}
              >
                {dictTypeCode
                  ? formatMessageApi({ [dictTypeCode]: item[dictCode] })
                  : item[dictName]}
              </Checkbox>
            </RenderTooltipCheckbox>
          </Col>
        ) : (
          <RenderTooltipCheckbox title={tooltip} key={`checkbox_${index}`}>
            <Checkbox
              key={`${item[dictCode]}-${index}`}
              value={item[dictCode]}
              onChange={(e) => {
                return itemOnChange && itemOnChange(e);
              }}
              disabled={item.disabled}
              required={required}
              {...(index === 0 ? { ref } : {})}
            >
              {dictTypeCode ? formatMessageApi({ [dictTypeCode]: item[dictCode] }) : item[dictName]}
            </Checkbox>
          </RenderTooltipCheckbox>
        );
      })}
    </Checkbox.Group>
  );
});

export default CheckBoxGroupItem;
