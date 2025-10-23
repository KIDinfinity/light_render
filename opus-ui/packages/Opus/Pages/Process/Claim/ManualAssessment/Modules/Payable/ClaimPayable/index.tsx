import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { FormAntCard } from 'basic/components/Form';
import { useGetDeleteClaimPaybleCallback } from '../../../_hooks';
import useGetPolicyList from './useGetPolicyList';
import { BenefitCategory } from 'claim/pages/utils/claim';
import Basic from './Basic';
import BenefitType from './BenefitType';
import ClaimIncident from './ClaimIncident';
import Life from './Life';

import styles from './index.less';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';

const Main = ({ incidentId }: any) => {
  const list = useGetPolicyList({ incidentId });
  const deleteClaimPayble = useGetDeleteClaimPaybleCallback();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.claimPayableWrap}>
      <FormAntCard>
        {lodash.map(list, (item: any) => (
          <div key={item?.policyNo} className={styles.policyWrap}>
            <div className={styles.title}>
              {item?.policyNo}

              {!!editable && (
                <DeleteButton
                  className={styles.deleteIcon}
                  disabled={!editable}
                  handleDelete={() => item?.benefitTypeList?.map(deleteClaimPayble)}
                />
              )}
            </div>
            <Basic item={item} incidentId={incidentId} />
            <div className={styles.benefitTypeWrap}>
              {lodash.map(item?.benefitTypeList || [], (benefitTypeItem: any, index: number) => {
                if (
                  benefitTypeItem.benefitCategory !== BenefitCategory.MajorIllnessCashBenefit &&
                  benefitTypeItem.benefitCategory !== BenefitCategory.life
                ) {
                  return (
                    <BenefitType
                      key={benefitTypeItem?.id}
                      item={benefitTypeItem}
                      incidentId={incidentId}
                      mapIndex={index}
                    />
                  );
                }

                if (
                  benefitTypeItem.benefitCategory === BenefitCategory.life &&
                  benefitTypeItem.lifePayable
                ) {
                  return <Life incidentPayableItem={benefitTypeItem} />;
                }

                if (benefitTypeItem.benefitCategory === BenefitCategory.MajorIllnessCashBenefit) {
                  return lodash.map(
                    benefitTypeItem?.claimIncidentPayableList,
                    (claimIncidentPayableId) => (
                      <ClaimIncident
                        claimIncidentPayableId={claimIncidentPayableId}
                        item={benefitTypeItem}
                      />
                    )
                  );
                }
                return <></>;
              })}
            </div>
          </div>
        ))}
      </FormAntCard>
    </div>
  );
};

export default Main;
