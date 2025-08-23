import React, { useContext, useState, useRef, useMemo, useEffect } from 'react';
import { Form } from 'antd';
import classnames from 'classnames';
import context from './Context';
import useErrorRef from './useErrorRef';
import type { CommonFormItemProps } from './typing';
import { getPlaceholder, getRules } from './utils';
import Label from './Label';
import styles from './index.less';

const FormOld = Form;

const FormItem = (props: CommonFormItemProps) => {
  const {
    className,
    labelId,
    labelTypeCode,
    warningMessage = [],
    formName = '',
    form,
    initialValue: propsInitialValue,
    triggerEvent,
    required,
    children,
    placeholder,
    labelType,
    rules = [],
    isInline: propsIsInline,
    hideRequired,
    bordered,
    valuePropName = 'value',
    extra,
    prefix,
    disabled,
    propChildren,
    propsDefaultValue,
    tipMsg: propsTipMsg,
    formItemLayout,
    noFormItemAppend,
    title,
    requiredTriggerValidate,
  } = props;
  const nodeRef = useRef();
  const prevRequiredRef = useRef(required);
  const { isHideRequireIcon = false, isDecorator = true } = useContext(context);
  const [visible, setVisible] = useState(false);
  const [tipMsg, setTipMsg] = useState(propsTipMsg);
  const [extraWarningMessage, setExtraWarningMessage] = useState([]);
  const isInline = propsIsInline || labelType === 'inline';

  const ChildComponent = React.cloneElement(children, {
    ...props,
    isInline,
    children: propChildren,
    placeholder: getPlaceholder({ isInline, labelId, labelTypeCode, placeholder }),
    ref: nodeRef,
    setVisible: (flag: boolean) => {
      if (!flag && visible) setVisible(flag);
      if (flag && !visible) setVisible(flag);
    },
    setTipMsg,
    setExtraWarningMessage,
    isDecorator,
    required,
  });

  const formProps = {
    initialValue: propsInitialValue || propsDefaultValue,
    validateTrigger: triggerEvent,
    rules: getRules({ required, isHideRequireIcon, isDecorator, rules, disabled }),
    valuePropName,
  };

  const defaultProps = {
    ...formItemLayout,
    className: classnames(
      {
        [styles.inline]: isInline,
        [styles.hideRequired]: hideRequired,
        [styles.bordered]: bordered,
      },
      className
    ),
    wrapperCol: {
      'data-id': formName,
    },
    label: (labelId || title) && (
      <Label
        {...props}
        visible={visible}
        tipMsg={tipMsg}
        warningMessage={[
          ...(Array.isArray(warningMessage) && warningMessage ? warningMessage : []),
          ...extraWarningMessage,
        ]}
      />
    ),
  };

  useErrorRef({ form, formName, nodeRef, disabled });

  useEffect(() => {
    if (
      requiredTriggerValidate &&
      prevRequiredRef.current === true &&
      required === false &&
      form.getFieldError(formName)
    ) {
      // 当 required 从 true 变 false 时，执行逻辑
      form.validateFields([formName], {
        force: true,
      });
    }
    prevRequiredRef.current = required; // 更新上一次的值
  }, [requiredTriggerValidate, required]);

  const Item: any = useMemo(() => (isDecorator ? FormOld.Item : Form.Item), [isDecorator]);
  return (
    <Item {...(isDecorator ? { ...defaultProps } : { noStyle: true })}>
      {!noFormItemAppend && prefix}
      {isDecorator ? (
        form.getFieldDecorator(formName, {
          ...formProps,
        })(ChildComponent)
      ) : (
        <Item name={formName} {...defaultProps} {...formProps}>
          {ChildComponent}
        </Item>
      )}
      {!noFormItemAppend && extra}
    </Item>
  );
};

export default FormItem;
