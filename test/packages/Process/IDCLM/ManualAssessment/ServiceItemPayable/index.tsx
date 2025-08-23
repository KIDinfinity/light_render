import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils, FormLayoutContext } from 'basic/components/Form';
import ServicePayableItem from './Item';

import Link from './Link';
import styles from './index.less';

const ServicePayableList = ({ serviceItemId }: any) => {
  const claimPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.claimEntities?.claimPayableListMap
  );
  const serviceItemPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap
  );

  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
  );

  const data = lodash
    .chain(serviceItemPayableListMap)
    .filter((item) => item?.serviceItemId === serviceItemId && item?.booster !== 'Y')
    .map((item) => {
      const {
        policyNo,
        benefitItemCode,
        productCode,
        productPlan,
        policyCurrency,
      } = lodash.pick(formUtils.cleanValidateData(item), [
        'policyNo',
        'benefitItemCode',
        'productCode',
        'productPlan',
        'policyCurrency',
      ]);
      const claimDecision = formUtils.queryValue(
        claimPayableListMap?.[item?.payableId]?.claimDecision
      );
      const booster =
        lodash.find(serviceItemPayableListMap, {
          policyNo,
          benefitItemCode,
          productCode,
          productPlan,
          booster: 'Y',
          policyCurrency,
          serviceItemId,
        }) || {};
      let hasBooster = {};
      if (lodash.isEmpty(booster)) {
        hasBooster = lodash.find(listPolicy, {
          policyNo,
          benefitItemCode,
          productCode,
          productPlan,
          booster: 'Y',
          policyCurrency,
        });
      }
      return {
        id: item?.id,
        invoicePayableId: item?.invoicePayableId,
        booster,
        hasBooster,
        claimDecision,
      };
    })
    .value();

  return (
    lodash.some(data, (item) => formUtils.queryValue(item.claimDecision) !== 'D') &&
    lodash.size(data) > 0 && (
      <Link>
        <FormLayoutContext.ExpandProvider>
          <div className={styles.servicePayableList}>
            <FormLayoutContext.ExpandIcon className={styles.expandIcon} />
            {lodash.map(
              data,
              (item) =>
                item.claimDecision !== 'D' && (
                  <ServicePayableItem
                    key={item?.id}
                    serviceItemPayableId={item?.id}
                    invoicePayableId={item?.invoicePayableId}
                    booster={item?.booster}
                    hasBooster={item?.hasBooster}
                    item={item}
                  />
                )
            )}
          </div>
        </FormLayoutContext.ExpandProvider>
      </Link>
    )
  );
};

export default ServicePayableList;
