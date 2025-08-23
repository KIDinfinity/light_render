import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { FormLayoutContext } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import ServicePayableItem from './PayableItem';
import { findBooster } from '../_models/functions/findBooster';
import { Link } from '../../../Components';
import { formUtils } from 'basic/components/Form';
import { getPolicyItem } from 'basic/utils/PolicyUtils';
import styles from './ServiceList.less';
import useGetServiceItemPayableListMap from '../_hooks/useGetServiceItemPayableListMap';

const ServicePayableList = ({ serviceItemId }: any) => {
  const serviceItemPayableListMap = useGetServiceItemPayableListMap();

  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
  );

  const data = useMemo(
    () =>
      lodash
        .chain(formUtils.cleanValidateData(serviceItemPayableListMap))
        .filter((item) => {
          const policyItem = getPolicyItem({
            listPolicy,
            ...lodash.pick(item, [
              'policyNo',
              'benefitItemCode',
              'coreProductCode',
              'productPlan',
              'benefitCategory',
              'policyYear',
            ]),
          });
          return (
            item?.serviceItemId === serviceItemId &&
            (item?.booster !== 'Y' || policyItem?.isStandaloneBooster === 'Y')
          );
        })
        .map((item) => {
          const { booster, hasBooster, policyBooster } = findBooster(
            serviceItemPayableListMap,
            item,
            listPolicy
          );
          return {
            id: item?.id,
            invoicePayableId: item?.invoicePayableId,
            booster,
            hasBooster,
            policyBooster,
            payableId: item?.payableId,
          };
        })
        .value(),
    [serviceItemPayableListMap, listPolicy, serviceItemId]
  );

  return (
    lodash.size(data) > 0 && (
      <Link>
        <FormLayoutContext.ExpandProvider>
          <div className={styles.servicePayableList}>
            <FormLayoutContext.ExpandIcon className={styles.expandIcon} />
            {lodash.map(data, (item) => (
              <ServicePayableItem
                key={item?.id}
                serviceItemPayableId={item?.id}
                invoicePayableId={item?.invoicePayableId}
                boosterData={item?.booster}
                hasBooster={item?.hasBooster}
                policyBooster={item?.policyBooster}
                item={item}
              />
            ))}
          </div>
        </FormLayoutContext.ExpandProvider>
      </Link>
    )
  );
};

export default ServicePayableList;
