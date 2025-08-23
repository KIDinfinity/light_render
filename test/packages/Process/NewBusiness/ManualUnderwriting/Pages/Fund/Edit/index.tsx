import React, { useMemo, useState } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import FundBaseInfo from './FundBaseInfo';
//@ts-ignore
import { ReactComponent as ErrorSvg } from 'claim/assets/error.svg';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import FundTableItem from './FundTable/FundTableItem';
import EditableTablePanel from 'process/NewBusiness/ManualUnderwriting/_components/EditableTablePanel';
import { localConfig } from 'process/NewBusiness/ManualUnderwriting/Pages/Fund/_config/FundTableField';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import {
  useModalFundList,
  useModalFundBaseInfo,
  useAutoAttachFundStatus,
  useFundTableConfigWithFilter,
} from '../hooks';

import { Row, Col, Tooltip, Icon } from 'antd';
import styles from './index.less';

type ITotalProps = {
  config: any;
};
const getLayoutByField = (configList: any[], field: string) => {
  if (configList?.length > 0) {
    const resultConfig = configList.find((config) => config.field === field);
    if (resultConfig) {
      return {
        span: lodash.get(resultConfig, 'field-props.x-layout.md.span'),
        order: lodash.get(resultConfig, 'field-props.x-layout.md.order'),
      };
    }
  }
  return {
    span: 1,
    order: 1,
  };
};
const ErrorTooltip = ({ errorMessage }: { errorMessage: string }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className={styles.ErrorTooltip}
      onMouseOver={() => {
        setVisible(true);
      }}
      onMouseOut={() => {
        setVisible(false);
      }}
    >
      <Tooltip
        arrowPointAtCenter
        placement="topLeft"
        title={errorMessage}
        visible={visible && Boolean(errorMessage)}
      >
        <Icon className={styles.icon} component={ErrorSvg} />
      </Tooltip>
    </div>
  );
};
const Total = (props: ITotalProps) => {
  const { config } = props;
  const fundTotal = useSelector(({ [NAMESPACE]: modelNamespace }: any) => {
    return modelNamespace.modalData.fund.fundTotal;
  }) as any;

  return (
    <div className={styles.totalWrap}>
      <Row gutter={[24, 24]} className={styles.total}>
        <Col span={8} />
        <Col span={4}> Total </Col>
        {Object.entries(fundTotal)
          .filter(([key]) => key != 'id')
          .map(([key, total]: [string, any]) => {
            const { span, order } = getLayoutByField(config, key);
            const error = total?.errors?.[0]?.message;
            const value = total?.errors ? total?.value : total;

            return {
              value,
              error,
              key,
              span,
              order,
            };
          })
          .sort((a, b) => a.order - b.order)
          .map((item) => {
            const { span, error, value, key } = item;
            return (
              <Col span={span} key={key}>
                {value}
                {error && <ErrorTooltip errorMessage={error} />}
              </Col>
            );
          })}
      </Row>
    </div>
  );
};
const FundEdit = () => {
  const dispatch = useDispatch();
  const baseInfoData = useModalFundBaseInfo();
  const autoAttachFundStatus = useAutoAttachFundStatus();
  const fundList = useModalFundList();
  const config = useGetSectionAtomConfig({ localConfig, section: 'Fund-Table' });

  const configWithAllocationFilter = useFundTableConfigWithFilter(Object.values(fundList), config);

  const fundInfoList = useMemo(() => Object.values(fundList), [fundList]);
  const deleteFundItem = ({ id }: any) => {
    dispatch({
      type: `${NAMESPACE}/deleteFundItem`,
      payload: {
        id,
      },
    });
    dispatch({
      type: `${NAMESPACE}/removeErrorLog`,
      payload: { paths: [id] },
    });
    dispatch({
      type: `${NAMESPACE}/alignFundTotal`,
      payload: {
        config: configWithAllocationFilter,
      },
    });
  };

  return (
    <div
      style={{
        padding: '20px',
      }}
    >
      <EditableTablePanel
        title={<FundBaseInfo data={baseInfoData} />}
        sectionConfig={configWithAllocationFilter}
        itemList={fundInfoList}
        onDeleteItem={deleteFundItem}
        disableDeleteItem={() => autoAttachFundStatus}
        disableAdd={autoAttachFundStatus}
        itemRender={(itemData: any) => (
          <FundTableItem
            key={itemData.id}
            itemData={itemData}
            config={configWithAllocationFilter}
          />
        )}
        extraLine={<Total config={configWithAllocationFilter} />}
      />
    </div>
  );
};

export default FundEdit;
