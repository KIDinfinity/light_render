import React, { useMemo } from 'react';
import { FormAntCard, formUtils } from 'basic/components/Form';
import { useSelector, connect } from 'dva';
import lodash from 'lodash';
import { Form } from 'antd';
import { tenant, Region } from '@/components/Tenant';
import Section, { Fields, SectionTitle } from './Section';
import AddressChangeInfo from '../AddressChangeInfo';
import ApplytoPolicies from '../ApplytoPolicies';
import ContactChangeInfo from '../ContactChangeInfo';
import ChangeOfEmail from '../ChangeOfEmail';
import PaymentMode from '../PaymentMode';
import BeneficiaryChange from '../BeneficiaryChange';
import ChangeOfName from '../ChangeOfName';
import Item from './Item';
import Add from './Add';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';

const ServicingRequestInfo = ({ form }: any) => {
  const transactionTypes = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.transactionTypes
  );
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const region = tenant.region();
  const renderTrancation = useMemo(() => {
    const children = tenant.region({
      [Region.ID]: () => (id: string, index: number) => (
        <>
          <Item id={id} index={index} />
          <div className={styles.sectionBox}>
            <ContactChangeInfo id={id} className={styles.IDstyle} />
            <ChangeOfEmail id={id} />
          </div>
          <BeneficiaryChange id={id} />
          <ChangeOfName id={id} />
          <AddressChangeInfo id={id} />
          <PaymentMode id={id} />
          <ApplytoPolicies id={id} />
        </>
      ),
      notMatch: () => (id: string, index: number) => (
        <>
          <Item id={id} index={index} />
          <ContactChangeInfo id={id} />
          <AddressChangeInfo id={id} />
          <PaymentMode id={id} />
          <ApplytoPolicies id={id} />
        </>
      ),
    });
    return (
      <>
        {lodash.compact(transactionTypes).map((id: any, index) => (
          <div key={id} className={styles.transactionTypeSection}>
            {children(id, index)}
          </div>
        ))}
      </>
    );
  }, [transactionTypes, region]);

  return (
    <div className={styles.servicingRequestInfo}>
      <FormAntCard
        title={
          <SectionTitle
            suffix={
              <Section form={form} editable={editable} section="ServicingRequestInfo">
                <Fields.ServicingRequestInfo />
              </Section>
            }
          />
        }
      >
        {renderTrancation}
        {editable && <Add />}
      </FormAntCard>
    </div>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { id }: any) => ({
    validating: formCommonController.validating,
    transcationType: modelnamepsace.entities?.transactionTypesMap?.[id],
    servicingRequestInfo: modelnamepsace.processData?.servicingRequestInfo,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'servicingRequestInfoUpdate',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'servicingRequestInfoUpdate',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { transcationType, servicingRequestInfo } = props;

      return formUtils.mapObjectToFields({ transcationType, servicingRequestInfo });
    },
  })(ServicingRequestInfo)
);
