import React, { useMemo, useContext } from 'react';
import { useSelector } from 'dva';
import { Row, Col } from 'opus/Components/Antd';
import { Icon } from 'antd';
import lodash from 'lodash';

import { NAMESPACE } from '../../../activity.config';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormLayoutContext } from 'basic/components/Form';
import { BenefitCategoryEnum } from 'process/Utils/benefitCategoryUtils';
import { BenefitSubCategory } from 'claim/pages/utils/claim';
import { ReactComponent as IconFullscreen } from 'opus/Assets/icon-fullscreen.svg';

import { getPayableList } from 'claim/pages/utils/selector';

import Item from './Item';
import classnames from 'classnames';
import styles from './index.less';

const Main = ({ treatmentId, index }: any) => {
  const treatmentPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimEntities?.treatmentPayableListMap
  );
  const claimPayableListMap =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimEntities?.claimPayableListMap
    ) || {};

  const list = useMemo(() => {
    return lodash
      .chain(getPayableList('treatmentId', treatmentId, treatmentPayableListMap) || [])
      .map((el: any) => ({
        ...el,
        benefitCategory:
          lodash
            .chain(lodash.values(claimPayableListMap) || [])
            .find((claimPayableItem: any) => claimPayableItem.id === el.payableId)
            .get('benefitCategory')
            .value() || '',
      }))
      .filter(({ benefitCategory, benefitSubCategory }: any) => {
        // 筛选需要展示的类型
        const showType = [BenefitCategoryEnum.Cashless, BenefitCategoryEnum.LumpSum];
        return (
          lodash.includes(showType, benefitCategory) && benefitSubCategory !== BenefitSubCategory.OP
        );
      })
      .value();
  }, [treatmentPayableListMap, claimPayableListMap]);

  const { setOverrideExpand, overrideExpand } = useContext(FormLayoutContext.Context);

  return (
    <div
      className={classnames({
        [styles.treatmentPayableWrap]: true,
        [styles.followingWrap]: index !== 0,
      })}
    >
      {index === 0 ? (
        <Row className={styles.titleWrap}>
          <Col span="8">
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.benefit-item',
            })}
          </Col>
          <Col span="4">
            {formatMessageApi({
              Label_CLM_Opus: 'payableAmount',
            })}
          </Col>
          <Col span="4">
            {formatMessageApi({
              Label_CLM_Opus: 'payableDays',
            })}
          </Col>
          <Col span="4">
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.percentage',
            })}
          </Col>
          <Col
            span="4"
            className={styles.expandAll}
            onClick={() => {
              setOverrideExpand(!overrideExpand);
            }}
          >
            <Icon component={IconFullscreen} />
          </Col>
        </Row>
      ) : null}
      <div className={styles.listWrap}>
        {lodash.map(list, (item: any) => (
          <Item key={item?.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Main;
