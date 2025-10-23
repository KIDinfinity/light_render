import React from 'react';
import { Row, Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import DataLayout from '@/components/DataLayout';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Visible } from 'basic/components/Form';
import Status from '../Status';
import { formatDate, formatCurrency } from '../../_functions';

const { DataItem } = DataLayout;

export default ({
  sectionId,
  transConfig,
  data = {},
  overrideConfig,
  hideTitle,
  titleOnly,
  overrideSpan,
}: any) => {
  const fullConfig = useSelector(({ insured360 }) => insured360.fieldConfig) || [];
  const sectionConfig =
    overrideConfig || fullConfig.filter((config) => config.sectionId === sectionId);
  return (
    <Row type="flex" gutter={16} data-sectionId={sectionId}>
      {
        // antd 自己的order在col超过24个后不生效（原因不明），第二十五条数据会被排在第一个，所以需要自己排序
        lodash.compact(
          lodash.orderBy(sectionConfig, ['order']).map((config) => {
            const { visibleRule, render, type, currencyField, nameField, codeField } =
              transConfig?.[config.fieldId] || {};
            if (config?.applicable === Visible.No) {
              return null;
            }
            if (config?.applicable === Visible.Conditions && visibleRule && !visibleRule(data)) {
              return null;
            }

            const layout = lodash.pick(config, ['span', 'offset', 'pull']);
            if (overrideSpan) layout.span = overrideSpan;
            if (titleOnly)
              return (
                <Col
                  {...layout}
                  key={config.fieldId}
                  style={{ marginBottom: '15px' }}
                  data-field_id={config.fieldId}
                  data-section_id={config.sectionId}
                >
                  <DataItem
                    style={{ minHeight: 0 }}
                    title={formatMessageApi({ [config.typeCode]: config.dictCode })}
                  />
                </Col>
              );

            const value = lodash.get(data, config.fieldId);
            const content =
              type === 'date' ? (
                formatDate(value)
              ) : type === 'currency' && currencyField ? (
                formatCurrency({ currency: data[currencyField], value })
              ) : type === 'status' ? (
                <Status type={'policyStatus'} status={value} typeCode={config.dropdownTypeCode} />
              ) : type === 'pair' ? (
                `${data[codeField] || ''} ${
                  (config.dropdownTypeCode
                    ? formatMessageApi({ [config.dropdownTypeCode]: data[codeField] })
                    : data[nameField]) || ''
                }`
              ) : type === 'dropdownWithCode' ? (
                `${value}-${formatMessageApi({ [config.dropdownTypeCode]: value })}`
              ) : config.dropdownTypeCode ? (
                formatMessageApi({ [config.dropdownTypeCode]: value })
              ) : (
                value
              );

            if (hideTitle)
              return (
                <Col
                  {...layout}
                  key={config.fieldId}
                  style={{ marginBottom: '15px' }}
                  data-field_id={config.fieldId}
                  data-section_id={config.sectionId}
                >
                  {render ? render({ config, value, data, content }) : content}
                </Col>
              );

            return (
              <Col
                {...layout}
                key={config.fieldId}
                style={{ marginBottom: '15px' }}
                data-field_id={config.fieldId}
              >
                <DataItem title={formatMessageApi({ [config.typeCode]: config.dictCode })}>
                  {render ? render({ config, value, data, content }) : content}
                </DataItem>
              </Col>
            );
          })
        )
      }
    </Row>
  );
};
