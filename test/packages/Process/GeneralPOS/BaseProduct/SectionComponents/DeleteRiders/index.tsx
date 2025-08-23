import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { Icon, Row, Col } from 'antd';

import { formUtils } from 'basic/components/Form';

import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { NAMESPACE } from '../../activity.config';

import Item from './Item';
import Add from './Add';

import styles from './index.less';

const Main = ({ transactionId }: any) => {
  const dispatch = useDispatch();

  const editable = useSectionEditable(EditSectionCodeEnum.DeleteRiders);

  const riderList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.deleteRider?.riderList
  );

  const policyCoverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.policyInfo?.policyCoverageList
  );

  const dicts = useMemo(() => {
    return lodash
      .chain(policyCoverageList || [])
      .map(({ productName: dictName, productCode: dictCode }: any) => ({ dictName, dictCode }))
      .uniqBy('dictCode')
      .value();
  }, [policyCoverageList]);

  const existCodes = useMemo(() => {
    return (
      lodash
        .chain(dicts || [])

        .filter(
          ({ dictCode }: any) =>
            !!lodash.find(
              riderList,
              ({ productCode }: any) => dictCode === formUtils.queryValue(productCode)
            )
        )
        .map(({ dictCode }: any) => dictCode)
        .value() || []
    );
  }, [dicts, riderList]);

  return (
    <div className={styles.delectRiderWrap}>
      {lodash.map(riderList, (item: any) => (
        <div className={styles.item}>
          <Row>
            <Col span={22}>
              <Item
                key={item.id}
                item={item}
                transactionId={transactionId}
                dicts={dicts}
                existCodes={existCodes}
                editable={editable}
              />
            </Col>
            {!!editable && (
              <Col
                span={2}
                className={styles.iconWrap}
                onClick={() => {
                  dispatch({
                    type: `${NAMESPACE}/DeleteRidersRiderListDelect`,
                    payload: {
                      id: item.id,
                      transactionId,
                    },
                  });
                }}
              >
                <Icon type="close-circle" />
              </Col>
            )}
          </Row>
        </div>
      ))}
      {!!editable && (
        <div className={styles.addItem}>
          <Add transactionId={transactionId} dicts={dicts} existCodes={existCodes} />
        </div>
      )}
    </div>
  );
};

export default Main;
