import React from 'react';
import lodash from 'lodash';
import { Row, Col } from 'antd';
import classnames from 'classnames';
import useGetWaiveLoadingData from 'process/NB/ManualUnderwriting/_hooks/useGetWaiveLoadingData';
import useGetTableColumnsByPageConfig from 'basic/hooks/useGetTableColumnsByPageConfig';
import { getFieldDisplayAmount } from '@/utils/accuracy';
import ClientNames from 'process/NB/ManualUnderwriting/Decision/Benefit/Show/CoverageItem/ClientNames';
import Ellipsis from '@/components/Ellipsis';
import Loading from './Loading';
import styles from './waiveLoadingScreen.less';

const WaiveLoadingScreen = () => {
  const sectionConfig = useGetTableColumnsByPageConfig({
    section: 'WaiveLoading-Table',
    localConfig: {},
  });
  const waiveLoadingData = useGetWaiveLoadingData();
  return (
    <div className={styles.warp}>
      <div className={styles.waiveLoadingScreen}>
        <div className={styles.column}>
          <Row gutter={[24, 24]} className={styles.columnRow}>
            {lodash.map(sectionConfig, (config) => (
              <Col span={config.span || 4} data-id={config.id}>
                {config.title}
              </Col>
            ))}
          </Row>
        </div>
        {lodash.map(waiveLoadingData, (dataItem) => (
          <>
            <div className={styles.row}>
              <Row gutter={[24, 24]} className={styles.rowRow}>
                {lodash.map(dataItem, (item) => (
                  <Col
                    span={item.span || 4}
                    data-id={item.fieldName}
                    className={classnames({ [styles.highlight]: item.highlight })}
                  >
                    {item.fieldName === 'name' ? (
                      <ClientNames item={item} />
                    ) : item.fieldName === 'coreCode' ? (
                      <Ellipsis lines={1} tooltip forceTooltip>
                        {item.value}
                      </Ellipsis>
                    ) : (
                      getFieldDisplayAmount(item.value, '')
                    )}
                  </Col>
                ))}
              </Row>
            </div>
            <Loading record={lodash.first(dataItem)} />
          </>
        ))}
      </div>
    </div>
  );
};

WaiveLoadingScreen.displayName = 'waiveLoadingScreen';

export default WaiveLoadingScreen;
