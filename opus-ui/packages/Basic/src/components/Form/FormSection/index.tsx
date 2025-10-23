import type { ReactNode } from 'react';
import React, { Component } from 'react';
import { Card as AntCard, Form } from 'antd';
import type { Dispatch } from 'redux';
import { connect } from 'dva';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import FormButton from '../FormButton';
import FormCard from '../FormCard';
import FormBorder from '../FormBorder';
import FormLayout from '../FormLayout';
import getLayout from '../getLayout';
import {
  FormItemRadioGroup,
  FormItemCheckbox,
  FormItemTimePicker,
  FormItemDatePicker,
  FormItemInput,
  FormItemNumber,
  FormItemCurrency,
  FormItemSelect,
  FormItemSelectAuto,
  FormItemSelectPlus,
  FormItemNumberSelect,
  FormItemPhone,
  FormItemTextArea,
  FormItemCascader,
} from '../FormItem';

interface Iprops {
  form?: any;
  dispatch: Dispatch;
  formId?: string | symbol;
  name?: string;
  layout?: any;
  title?: string | ReactNode;
  isHideBgColor?: boolean;
  formatType?: string;
  isMargin?: boolean;
  isPadding?: boolean;
  showBgColor?: boolean;
  children?: any;
  disableLayout?: boolean;
  layConf?: any;
  formItemLayout?: any;
  sectionTitle?: any;
  className?: any;
}

class FormSection extends Component<Iprops> {
  get ChildrenDom() {
    const { form, formId, layout, disableLayout, layConf, formItemLayout = {} } = this.props;
    const newLayout = layConf ? getLayout(layConf) : layout;

    const MapDom = {
      form: (
        <Form layout="vertical" {...formItemLayout}>
          <FormLayout json={newLayout}>{this.props.children}</FormLayout>
        </Form>
      ),
      layout: <FormLayout json={newLayout}>{this.props.children}</FormLayout>,
      default: <>{this.props.children}</>,
    };
    if (form && formId && !disableLayout) {
      return MapDom.form;
    }
    if (newLayout && !form && !formId) return MapDom.layout;
    return MapDom.default;
  }

  componentDidMount = () => {
    if (this.props.formId) this.registeForm();
  };

  componentWillUnmount = () => {
    if (this.props.formId) this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, formId } = this.props;
    if (formId) {
      setTimeout(() => {
        dispatch({
          type: 'formCommonController/registerForm',
          payload: {
            form,
            formId,
          },
        });
      }, 0);
    }
  };

  unRegisterForm = () => {
    const { dispatch, form, formId } = this.props;

    if (formId) {
      setTimeout(() => {
        dispatch({
          type: 'formCommonController/unRegisterForm',
          payload: {
            form,
            formId,
          },
        });
      }, 0);
    }
  };

  static Card: ({
    handleClick,
    cardStyle,
    showButton,
    extraButton,
    children,
  }: {
    handleClick: any;
    cardStyle: any;
    showButton: any;
    extraButton: any;
    children: any;
  }) => JSX.Element;

  static Button: ({
    handleClick,
    buttonText,
    buttonStyle,
  }: {
    handleClick: any;
    buttonText: any;
    buttonStyle: any;
  }) => JSX.Element;

  static Border: ({ children }: any) => JSX.Element;

  get title() {
    const { title, formatType = 'Label_BIZ_Claim' } = this.props;
    return typeof title === 'string' ? formatMessageApi({ [formatType]: title }) : title;
  }

  get sectionTitle() {
    const { sectionTitle, title, formId } = this.props;

    const titleProps =
      title && typeof title === 'string' ? title.substring(title.lastIndexOf('.') + 1) : '';

    return titleProps || sectionTitle || formId;
  }

  render() {
    const {
      isHideBgColor,
      showBgColor = false,
      isPadding = true,
      isMargin = true,
      className,
    } = this.props;

    return (
      <div
        className={classnames(className, {
          [styles.formSection]: true,
          [styles.isHideBgColor]: isHideBgColor,
          [styles.isMargin]: isMargin,
          [styles.showBgColor]: showBgColor,
          sectionTitle: !!this.sectionTitle,
          [this.sectionTitle]: !!this.sectionTitle,
        })}
      >
        <AntCard
          title={this.title}
          className={classnames({
            formSectionIsNoPadding: !isPadding,
            formSectionIsPadding: isPadding,
          })}
        >
          {this.ChildrenDom}
        </AntCard>
      </div>
    );
  }
}

// @ts-ignore
FormSection.Button = FormButton;
// @ts-ignore
FormSection.Card = FormCard;
FormSection.Border = FormBorder;

export default connect()(FormSection);

export {
  FormButton,
  FormCard,
  FormBorder,
  FormItemRadioGroup,
  FormItemCheckbox,
  FormItemTimePicker,
  FormItemDatePicker,
  FormItemInput,
  FormItemNumber,
  FormItemCurrency,
  FormItemSelect,
  FormItemSelectAuto,
  FormItemSelectPlus,
  FormItemNumberSelect,
  FormItemPhone,
  FormItemTextArea,
  FormLayout,
  FormItemCascader,
};

export { Row as FormRow, Col as FormCol } from 'antd';
