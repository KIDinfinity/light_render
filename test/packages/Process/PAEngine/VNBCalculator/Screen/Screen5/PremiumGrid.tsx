import classNames from 'classnames';
import styles from './PremiumGrid.less';
import React from 'react';
import { useMemo, Fragment } from 'react';
import { chain, entries } from 'lodash';
import { Form } from 'antd';
import { connect } from 'dva';
import { setVNBCalculatorData } from 'process/PAEngine/VNBCalculator/_models/actions';
import { formUtils, FormItemNumber } from 'basic/components/Form';

interface IProps {
  className?: string;
  maxPremiumConfig?: Record<string, Record<string, number[]>>;
  minPremiumConfig?: Record<string, Record<string, number[]>>;
  occClassAgePremium?: Record<string, number>;
  editable?: boolean;
  prefix?: string;
  prefixLabel?: string;
  description?: string;
  form: any;
}

const Basic = (props: IProps) => {
  const {
    className,
    minPremiumConfig,
    maxPremiumConfig,
    occClassAgePremium,
    editable,
    prefix,
    prefixLabel,
    form,
    description,
  } = props;
  const premiumConfig = minPremiumConfig || maxPremiumConfig || {};

  const PlanHeaders = useMemo(
    () => ({ prefixKey }: any) => (
      <>
        {Array(10)
          .fill(0)
          .map((_, index) => {
            const id = index;
            return (
              <th key={`${prefixKey}_plan_${id}`} className={styles.topHeader}>
                plan{index + 1}
              </th>
            );
          })}
      </>
    ),
    []
  );

  const premiumAgeGroup = (
    occKey: string,
    ageGroups: Record<string, number[]>,
    isEditable?: boolean,
    prefixKey?: string
  ) =>
    chain(Object.entries(ageGroups || {}))
      .map(([groupKey, groupPlans]) => (
        <tr key={`${prefixKey}_${occKey}_${groupKey}`} className={classNames(styles.subHeader)}>
          <td
            key={`${prefixKey}_${occKey}_${groupKey}_head`}
            className={classNames(styles.headerLeft, styles.subHeaderLeft)}
          >
            {groupKey}
          </td>
          {Array(10)
            .fill(0)
            .map((_, index) => {
              const id = index + 1;
              return (
                <td
                  key={`${prefixKey}_${occKey}_${groupKey}_plan_input_${id}`}
                  className={classNames(styles.cell, isEditable && styles.noBorder)}
                >
                  {!!isEditable ? (
                    <div className={styles.premInput}>
                      <FormItemNumber
                        formName={`${occKey}_${groupKey}_premium${id}`}
                        form={form}
                        min={minPremiumConfig?.[occKey]?.[groupKey]?.[index]}
                        max={maxPremiumConfig?.[occKey]?.[groupKey]?.[index]}
                        className={styles.inputCell}
                        initialValue={occClassAgePremium?.[`${occKey}_${groupKey}_premium${id}`]}
                      />
                    </div>
                  ) : (
                    groupPlans[index]
                  )}
                </td>
              );
            })}
        </tr>
      ))
      .value();

  const renderPremiumTable = (
    premiumTable: Record<string, Record<string, number[]>>,
    prefixKey?: string,
    isEditable?: boolean
  ) =>
    chain(Object.entries(premiumTable || {}))
      .map(([key, ageGroups]) => (
        <Fragment key={`${prefixKey}_${key}`}>
          <tr key={`${prefixKey}_${key}_head`} className={styles.headerLeft}>
            <td>{key}</td>
            <td colSpan={10}> </td>
          </tr>
          {premiumAgeGroup(key, ageGroups, isEditable, prefixKey)}
        </Fragment>
      ))
      .value();

  return (
    <div className={classNames(styles.premiumGrid, className)}>
      <p>{prefixLabel}:</p>
      <p>{description}</p>
      <table border="1" className={editable && styles.tableBgColor}>
        <thead>
          <tr>
            <th className={styles.topLeftHeader} rowSpan={2}>
              Premium
            </th>
            <th colSpan={10} className={styles.topHeader}>
              Sum Assured
            </th>
          </tr>
          <tr>
            <PlanHeaders prefixKey={prefix} />
          </tr>
        </thead>
        <tbody>{renderPremiumTable(premiumConfig, prefix, editable)}</tbody>
      </table>
    </div>
  );
};

const PremiumGridStatic = (props: IProps) => {
  return <Basic {...props} editable={false} />;
};

const PremiumGrid = (props: IProps) => {
  return <Basic {...props} editable={true} />;
};

export { PremiumGridStatic };

export default connect(({ vnbCalculator }: any) => {
  const { occClassAgePremium } = vnbCalculator;
  return { occClassAgePremium };
})(
  Form.create({
    onValuesChange(props: any, changedValues) {
      const { dispatch } = props;
      entries(changedValues).forEach(([key, val]) => {
        dispatch(setVNBCalculatorData(`occClassAgePremium.${key}`, val || undefined));
      });
    },
    mapPropsToFields(props) {
      const { occClassAgePremium } = props;
      return formUtils.mapObjectToFields({ ...occClassAgePremium });
    },
  })(PremiumGrid)
);
