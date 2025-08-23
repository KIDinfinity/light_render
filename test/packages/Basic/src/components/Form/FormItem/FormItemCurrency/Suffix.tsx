import React from 'react';
import { compact, isBoolean, map, find, isFunction } from 'lodash';
import { Select, Icon } from 'antd';
// eslint-disable-next-line import/no-unresolved
import { ReactComponent as CalculationSvg } from 'claim/assets/calculation.svg';
import styles from '../index.less';

const { Option } = Select;
interface SuffixProps {
  currencyCode: string;
  setDefaultCode: Function;
  onSuffixChange?: Function;
  defaultCode: any;
  currencyConfig: any;
  disabled?: boolean;
  suffixEditable?: boolean;
  hiddenDropDown?: any;
  isShowCalculation?: boolean;
  handleOpen?: Function;
  suffixSelect?: boolean;
}

export default ({
  currencyCode,
  setDefaultCode,
  onSuffixChange,
  defaultCode,
  currencyConfig,
  disabled,
  suffixEditable,
  suffixSelect,
  hiddenDropDown,
  isShowCalculation,
  handleOpen,
}: SuffixProps) => {
  const code = currencyCode || defaultCode;
  const suffixChange = (Code: string) => {
    if (onSuffixChange) {
      const currentObject: any = find(currencyConfig, { currencyCode: Code });
      onSuffixChange(currentObject || {});
    }
    setDefaultCode(Code);
  };
  return (
    <>
      {(compact(currencyConfig).length === 1 || hiddenDropDown) && !suffixSelect ? (
        <div className={styles.singleSuffix}>{code}</div>
      ) : (
        <div className={styles.suffix}>
          <Select
            value={code}
            style={{ width: 65 }}
            disabled={isBoolean(suffixEditable) ? !suffixEditable : disabled}
            onChange={suffixChange}
          >
            {map(currencyConfig, (item: any, index: number) => (
              <Option key={`${item.currencyCode}-${index}`} value={item.currencyCode}>
                {item.currencyName}
              </Option>
            ))}
          </Select>
        </div>
      )}
      {isShowCalculation && (
        <Icon
          component={CalculationSvg}
          className="calculationSvg"
          onClick={() => {
            if (isFunction(handleOpen)) {
              handleOpen();
            }
          }}
        />
      )}
    </>
  );
};
