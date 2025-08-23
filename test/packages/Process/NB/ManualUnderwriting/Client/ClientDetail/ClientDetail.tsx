import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import useIsClientDetailExpand from 'process/NB/ManualUnderwriting/_hooks/useIsClientDetailExpand';
import useGetPolicyOwnerExpand from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyOwnerExpand';
import useLoadCurrentcyRate from 'process/NB/ManualUnderwriting/_hooks/useLoadCurrentcyRate';
import useDeleteClientDetail from 'process/NB/ManualUnderwriting/_hooks/useDeleteClientDetail';
import useAutoSetCustomerTypeByRole from 'process/NB/ManualUnderwriting/_hooks/useAutoSetCustomerTypeByRole';
import Mode from 'process/NB/ManualUnderwriting/Enum/Mode';
import BasicInfo from './BasicInfo';
import IdentitySider from './IdentitySider';
import styles from './clientDetail.less';
import ExpandButton from './ExpandButton';
import useJudgeDeleteClientButtonHide from 'process/NB/ManualUnderwriting/_hooks/useJudgeDeleteClientButtonHide';
import useGetProcessInfo from 'basic/components/Elements/hooks/useGetProcessInfo';
import ExpandableContainer from 'basic/components/ExpandableContainer';

const Client = ({ item, mode, isSubCard, expendStatus }: any) => {

  const expand = useIsClientDetailExpand({ id: item?.id, expendStatus });
  const policyOwnerExpand = useGetPolicyOwnerExpand();
  const deleteClient = useDeleteClientDetail({
    id: item?.id,
  });
  useLoadCurrentcyRate({ annualIncomeCurrency: item?.annualIncomeCurrency, id: item?.id });
  useAutoSetCustomerTypeByRole({ id: item?.id });

  // 如果是最后一个客人，不显示删除按钮
  const displayDeleteButton = useJudgeDeleteClientButtonHide({
    mode,
    clientItem: item,
  });
  const { caseCategory } = useGetProcessInfo();

  return (
    <>
      {
        <div
          className={classnames(
            {
              [styles.clientDetail]: true,
              [styles.subCard]: isSubCard,
            },
            styles[caseCategory]
          )}
        >
          <div className={styles.container}>
            <div
              className={classnames(styles.siderWrap, styles.leftWrap, {
                [styles.expandLeftWrap]: isSubCard ? policyOwnerExpand : expand,
                [styles.notExpandLeftWrap]: !expand,
                [styles.editLeftWrap]: mode === Mode.Edit,
              })}
            >
              <IdentitySider item={item} mode={mode} isSubCard={isSubCard} />
            </div>
            <div className={styles.infoWrap}>
              <BasicInfo
                mode={mode}
                expand={isSubCard ? policyOwnerExpand : expand}
                id={item?.id}
                item={item}
                isSubCard={isSubCard}
              />
            </div>
          </div>
          {mode === Mode.Show && !isSubCard && !expendStatus && (
            <ExpandButton id={item?.id} expand={expand} expendStatus={expendStatus} />
          )}
          {displayDeleteButton && (
            <div className={styles.close} onClick={() => deleteClient()}>
              <Icon type="close" />
            </div>
          )}
        </div>
      }
    </>
  );
};

const ClientDetail = (props: any) => {
  return (
    <ExpandableContainer sectionId="client">
      <Client {...props} />
    </ExpandableContainer>
  );
};

export default ClientDetail;
