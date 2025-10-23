import React, { useContext, useState, useRef, useMemo, useEffect } from 'react';
import { Form } from 'antd';
import classnames from 'classnames';
import context from './Context';
import useErrorRef from './useErrorRef';
import type { CommonFormItemProps } from './typing';
import { getPlaceholder, getRules } from './utils';
import Label from './Label';
import FormItemConfig from './FormItemConfig';
import styles from './index.less';

import sectionContext from 'opus/Components/SectionComponents/Context';

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
    errorTooltip,
    emphasized,
  } = props;
  const nodeRef = useRef();
  const { isHideRequireIcon = false, isDecorator = true } = useContext(context);
  const { registerField } = useContext<any>(sectionContext);
  const [visible, setVisible] = useState(errorTooltip || false);
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
    label: labelId && (
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

  useEffect(() => {
    // 注册表单项到sectionContext
    if (registerField && formName) {
      registerField(formName, true);
    }
    return () => {
      if (registerField && formName) {
        // 卸载时取消注册
        registerField(formName, false);
      }
    };
  }, [registerField, formName]);

  useErrorRef({ form, formName, nodeRef, disabled });

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

const EnhancedComponentFormItem = FormItemConfig(FormItem);

export default EnhancedComponentFormItem;
