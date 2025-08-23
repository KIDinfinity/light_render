import React, { useCallback } from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormAntCard } from 'basic/components/Form';
import Mode from 'process/NB/ManualUnderwriting/Enum/Mode';
import ShortcutOf360 from 'basic/components/ShortcutOf360';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import useGetClientDetailErrors from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailErrors';
import useGetNameByClientInfo from 'process/NB/ManualUnderwriting/_hooks/useGetNameByClientInfo';
import useGetProcessInfo from 'basic/components/Elements/hooks/useGetProcessInfo';
import styles from './item.less';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

import InsertSpin, { removeLoading } from 'process/NB/ManualUnderwriting/Proposal/Loading';

export default ({ info, mode }: any) => {
  const dispatch = useDispatch();
  const errors = useGetClientDetailErrors(info);
  const name = useGetNameByClientInfo({ clientInfo: info });
  const { caseCategory } = useGetProcessInfo();

  const hasJointLife = useSelector((state) => {
    return state[NAMESPACE].businessData.policyList?.some((policy) =>
      policy.coverageList?.some((coverage) =>
        coverage?.coverageInsuredList?.some(
          (coverageInsured) =>
            Number(coverageInsured?.unionInsuredSeqNum) > 1 &&
            coverageInsured?.unionClientId === info?.id &&
            info?.id
        )
      )
    );
  });

  const onClientSelect = useCallback(() => {
    if (mode === Mode.Edit) {
      const container = InsertSpin();
      setTimeout(async () => {
        const errors = await dispatch({
          type: `${NAMESPACE}/validateForms`,
        });
        removeLoading(container);
        if (errors?.length > 0) {
          return;
        }
        dispatch({
          type: `${NAMESPACE}/selectClient`,
          payload: {
            id: info?.id,
          },
        });
      }, 0);
      return;
    }

    dispatch({
      type: `${NAMESPACE}/selectClient`,
      payload: {
        id: info?.id,
      },
    });
  }, [info?.id, mode]);

  return (
    <div onClick={onClientSelect}>
      <FormAntCard className={classnames(styles.container, styles[caseCategory])}>
        <span className={styles.name}>
          {errors && (
            <div className={styles.error}>
              <ErrorTooltipManual
                manualErrorMessage={formatMessageApi({ Label_COM_Message: 'MSG_000591' })}
              />
            </div>
          )}
          <ShortcutOf360
            activeClientId={info.systemClientId}
            activeCustomerType={lodash
              .map(info?.roleList, (item: any) => item?.customerRole)
              ?.join(',')}
          >
            {name}
          </ShortcutOf360>
        </span>
        <div className={styles.roles}>
          {lodash.map(info?.roleList, (role: any, index) => {
            if (role.customerRole === 'CUS001' && hasJointLife) {
              return (
                <div className={classnames(styles.role, styles.jointLife)} key={role.id}>
                  {formatMessageApi({
                    Dropdown_CLM_CustomerRole: 'CUS001',
                  })}
                  <span className={styles.jointLifeRole}>
                    (
                    {formatMessageApi({
                      Dropdown_POL_InsuredRole: 'UI',
                    })}
                    )
                  </span>
                </div>
              );
            }
            return (
              <span key={index} className={styles.role}>
                {formatMessageApi({
                  Dropdown_CLM_CustomerRole: role.customerRole,
                })}
              </span>
            );
          })}
        </div>
      </FormAntCard>
    </div>
  );
};
