import React from 'react';
import { Button } from 'antd';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { FormAntCard, Visible, formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Item from './Item';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';
import { localSectionConfig, localConfig, SectionTable } from './Section';

const BeneficiaryChange = ({ id, config }: any) => {
  const dispatch = useDispatch();
  const sectionProps: any = localSectionConfig['section-props'];
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const transactionTypeCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[id]?.transactionTypeCode
  );
  const beneficiaryList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.entities?.transactionTypesMap?.[id]?.beneficiaryChange?.beneficiaryList
    ) || [];

  const visibleConditions = formUtils.queryValue(transactionTypeCode) === 'SRV009';

  const addList = () => {
    dispatch({
      type: `${NAMESPACE}/beneficiaryChangeInfoAdd`,
      payload: {
        transactionId: id,
      },
    });
  };
  return (
    <>
      {((config?.visible || sectionProps.visible) === Visible.Conditions
        ? visibleConditions
        : (config?.visible || sectionProps.visible) === Visible.Yes) && (
        <div className={styles.addressChangeInfo}>
          <FormAntCard
            title={formatMessageApi({
              Label_BIZ_SRV: 'beneficiaryChange',
            })}
            extra={
              <Button
                onClick={addList}
                className={styles.addButton}
                disabled={!editable || lodash.size(beneficiaryList) > 4}
              >
                {formatMessageApi({
                  Label_BPM_Button: 'AddBeneficiary',
                })}
              </Button>
            }
          >
            <SectionTable
              section="BeneficiaryChange"
              config={localConfig}
              dataSource={beneficiaryList.map((item) => item.id)}
              className={styles.hiddencolor}
              classNameHeader={styles.selfTableHeader}
            >
              <Item transactionId={id} />
            </SectionTable>
          </FormAntCard>
        </div>
      )}
    </>
  );
};

export default BeneficiaryChange;
