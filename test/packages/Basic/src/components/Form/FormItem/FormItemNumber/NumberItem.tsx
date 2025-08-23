import React, { useEffect, useState } from 'react';
import { InputNumber, Icon } from 'antd';
import classNames from 'classnames';
import lodash, { isNumber, isFunction, isEqual, has, toNumber } from 'lodash';
import { AccuracyConfigTool, FormateTools } from '@/utils/accuracy';
import checkHighLight from './checkHighLight';
import { transferData } from '../utils';
import type { FormItemNumberProps } from '../typing';
import styles from './index.less';

interface MoreNumberProps extends FormItemNumberProps {
  editIcon: any;
  handleEdit: (e: any) => void;
}

const NumberItem = React.forwardRef<any, MoreNumberProps>((props, ref) => {
  const {
    form,
    formName,
    recoverValue,
    disabled,
    placeholder,
    onBlur,
    setVisible = () => {},
    cusTitle,
    min,
    max,
    formatter,
    parser,
    precision,
    objectName,
    objectFieldName,
    objectFieldValueType,
    onHover,
    onChange,
    value,
    setTipMsg,
    editIcon,
    handleEdit,
    isShowType,
    className,
    freePrecision = false,
    onFocus,
    required,
  } = props;

  const [NewFormateTools, setNewFormateTools]: any = useState(null);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [hoverEditIcon, setHoverEditIcon] = useState(false);
  // const [tempState, setTempState] = useState<number | undefined>();

  useEffect(() => {
    const accuracyItem = objectName
      ? AccuracyConfigTool.getAccuaryItem({
          objectFieldName: objectFieldName
            ? `${objectName}.${objectFieldName}`
            : `${objectName}.${formName}`,
          objectFieldValueType,
        })
      : {};
    setNewFormateTools(
      new FormateTools({
        formatter,
        parser,
        precision: isNumber(precision) ? precision : 2,
        accuracyItem,
        freePrecision,
      })
    );
  }, []);

  const formValue = form.getFieldValue(formName);
  const hightLight = checkHighLight({ props, formValue, recoverValue });

  const mouseOver = () => {
    if (!onHover && !has(props, 'recoverValue')) return;
    setShowEditIcon(true);
    const isNotEqual =
      has(props, 'recoverValue') &&
      lodash.isNumber(formValue) &&
      !isEqual(transferData(recoverValue), transferData(formValue));
    if (isNotEqual) {
      const precisionTemp = NewFormateTools ? NewFormateTools?.getDecimalDigits() : 2;
      const formatValue =
        recoverValue > 0
          ? NewFormateTools?.getFormatter(recoverValue.toFixed(precisionTemp))
          : recoverValue;
      setVisible(true);
      setTipMsg(isNumber(formatValue) ? formatValue.toFixed(precisionTemp) : formatValue);
    }
  };

  const mouseOut = () => {
    if (!onHover || !has(props, 'recoverValue')) return;
    setShowEditIcon(false);
    setTipMsg('');
    setVisible(false);
  };

  // const handleChange = (e: number | undefined) => {
  //   setTempState(e);
  // };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const queryNum = `${e.target?.value ?? 0}`.replace(new RegExp(/\$\s?|(,*)/g), '');
    onChange(
      lodash.isNil(e.target?.value) || e?.target?.value === '' ? e.target.value : toNumber(queryNum)
    );
  };

  // useEffect(() => {
  //   // if (value === tempState) return;
  //   setTempState(value);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [value]);

  const extra = freePrecision
    ? {
        min: 0,
      }
    : {
        precision: NewFormateTools ? NewFormateTools?.getDecimalDigits() : precision || 2,
        min,
        max,
      };

  return (
    <div
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
      className={classNames(styles.numberWrap, showEditIcon && editIcon && styles.editHover, {
        [className]: className,
      })}
    >
      <InputNumber
        id={formName}
        className={classNames({
          [styles.suffixVisible]: hightLight,
          [className]: className,
        })}
        style={{ width: '100%', padding: 0 }}
        disabled={disabled}
        title={cusTitle ? formValue : ''}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        onBlur={(e: any) => {
          setVisible(false);
          handleBlur(e);
          return onBlur && onBlur(e);
        }}
        ref={ref}
        onFocus={(e) => {
          if (onHover) return;
          lodash.isFunction(onFocus) && onFocus(e);
          setVisible(true);
        }}
        formatter={(val: any) => NewFormateTools?.getFormatter(val) || val}
        parser={(val: any) => NewFormateTools?.getParser(val) || val}
        required={required}
        {...extra}
      />
      {isShowType && <div className={styles.isShowType}>{isShowType}</div>}

      {showEditIcon && editIcon && (
        <div
          className={classNames(styles.iconWrap, hoverEditIcon && styles.hoverEditIcon)}
          onMouseEnter={() => {
            setHoverEditIcon(true);
          }}
          onMouseLeave={() => {
            setHoverEditIcon(false);
          }}
        >
          <Icon
            type="edit"
            theme="filled"
            onClick={(e) => {
              if (isFunction(handleEdit)) handleEdit(e);
            }}
          />
        </div>
      )}
    </div>
  );
});

export default NumberItem;
