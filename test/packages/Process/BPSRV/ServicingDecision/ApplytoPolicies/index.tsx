import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { FormAntCard, formUtils, Visible } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Item from './Item';
import { localSectionConfig, localConfig, SectionTable } from './Section';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';

const ApplytoPolicies = ({ config, id }: any) => {
  const dispatch = useDispatch();
  const sectionProps: any = localSectionConfig['section-props'];

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const transactionTypeCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[id]?.transactionTypeCode
  );

  const transactionTypeCodeMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.transactionTypeCodeMap
  );

  const policySortList =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.sortApplyListMap?.[id]) ||
    [];

  const applyToPolicyBOList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.entities?.transactionTypesMap?.[id]?.applyToPolicyBOList
    ) || [];

  const applyTo = lodash.find(
    transactionTypeCodeMap,
    (item) => item.transactionTypeCode === formUtils.queryValue(transactionTypeCode)
  )?.applyTo;

  const transactionTypeLevel = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[id]?.transactionTypeLevel
  );

  const visibleConditions =
    (formUtils.queryValue(applyTo) === 'Y' && lodash.size(policySortList) > 1) ||
    (formUtils.queryValue(applyTo) === 'C' && transactionTypeLevel === 'policy');

  const taskStatus = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData.taskStatus
  );

  const check = lodash.size(policySortList) === lodash.size(applyToPolicyBOList);

  const tableDisabled = /complete/i.test(taskStatus) || !editable;

  useEffect(() => {
    if (applyTo !== undefined) {
      if (!/complete/i.test(taskStatus)) {
        dispatch({
          type: `${NAMESPACE}/applytoPoliciesInit`,
          payload: {
            transactionId: id,
            hiddenApplyTo:
              formUtils.queryValue(applyTo) === 'N' ||
              (formUtils.queryValue(applyTo) === 'C' && transactionTypeLevel !== 'policy'),
          },
        });
      }

      return () => {
        dispatch({
          type: `${NAMESPACE}/applytoPoliciesClear`,
          payload: {
            id,
          },
        });
      };
    }
  }, [applyTo, transactionTypeLevel]);

  return (
    <>
      {((config?.visible || sectionProps.visible) === Visible.Conditions
        ? visibleConditions
        : (config?.visible || sectionProps.visible) === Visible.Yes) && (
          <div className={styles.applytoPolicies}>
            <FormAntCard
              title={formatMessageApi({
                Label_BIZ_Policy: 'ApplytoPolicies',
              })}
            >
              <SectionTable
                section="ApplytoPolicies"
                config={localConfig}
                dataSource={policySortList}
                check={check}
                disabled={tableDisabled}
                onChange={(e: any) => {
                  dispatch({
                    type: `${NAMESPACE}/applytoPoliciesAllUpdate`,
                    payload: {
                      isSelect: e.target.checked,
                      transactionId: id,
                    },
                  });
                }}
              >
                <Item transactionId={id} />
              </SectionTable>
            </FormAntCard>
          </div>
        )}
    </>
  );
};

export default ApplytoPolicies;
