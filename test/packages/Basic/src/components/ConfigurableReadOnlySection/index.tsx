import React from 'react';
import lodash from 'lodash';
import { Row, Col, Tooltip, Icon, Radio } from 'antd';
import { formUtils, RuleFun } from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useFormatSectionData from 'basic/hooks/useFormatSectionData';
import styles from './index.less';

const ConfigurableReadOnlySection = ({
  data,
  config,
  localConfig,
  section,
  extraConfig,
  multipleDropdown,
  NAMESPACE,
}: any) => {
  const list = useFormatSectionData({
    section,
    config,
    data,
    currencyConfig: {
      annualPrem: {
        objectFieldName: 'nb.policyList.clientInfo.annualIncome',
      },
      policyInitialPremium: {
        objectFieldName: 'nb.policyList.policyInitialPremium',
      },
    },
    extraConfig,
    multipleDropdown,
    NAMESPACE,
  });

  if (!lodash.isPlainObject(data)) {
    return null;
  }

  return (
    <div className={styles.wrap}>
      <Row className={styles.infoList} gutter={[8, 8]}>
        {lodash
          .chain(list)
          .map((item: any, index: number) => {
            const layout = {
              className: styles.info,
              key: index,
              span: item.span || 6,
              'data-id': `col-${item.field}`
            };
            // 这是专门为了这个功能做的读取condition的逻辑，但rule之前不支持根据数据去算condition，只能根据redux或者form。但这里没有form，而且nb的编辑和展示的数据对应的redux路径不同
            // 因此需要新增一种配置，根据实际数据去读。之前不会有这种配置，所以加了条件，免得影响到了之前的field，如果其他的field走了这个condition逻辑，可能会根据不存在的form算出了错误的结果
            // 比方说它的条件取form下面的某个field并且判断其为Y，form不存在时，会取出空，导致condition为N，即便实际上对应的field是Y
            const currentConfig = localConfig?.configs?.find(configItem => configItem.field === item.field);
            const visibleConditions = config?.['field-props']?.visibleCondition || currentConfig?.['field-props']?.['visible-condition'];
            const notReduxOrForm = value => typeof value !== 'object' || value?.domain === 'code';
            const isNewCondition = visibleConditions && visibleConditions.conditions?.every(condition => {
              return notReduxOrForm(condition?.left) && notReduxOrForm(condition?.right);
            })
            if(isNewCondition && !RuleFun(visibleConditions, null, '', data)) {
              return null;
            }

            return (
              <Col {...layout}>
                <span className={styles.label} title={item.label} data-id={`label-${item.field}`}>
                  {item.showWarning && (
                    <Tooltip overlayClassName={styles.warningTooltip} title={item.warningMessage}>
                      <Icon type="exclamation-circle" className={styles.icon} theme="filled" />
                    </Tooltip>
                  )}
                  {item.label}
                </span>
                <span
                  data-datakey={item.key}
                  className={styles.value}
                  title={item.value}
                  data-id={`value-${item.field}`}
                >
                  {item.value}
                </span>
              </Col>
            );
          })
          .value()}
      </Row>
    </div>
  );
};

export default ConfigurableReadOnlySection;
