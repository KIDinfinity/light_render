import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { Icon, Row, Col, Tooltip } from 'antd';

import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { ReactComponent as ErrorSvg } from 'claim/assets/error.svg';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import Empty from '@/components/Empty';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import EditableTable from 'process/NewBusiness/ManualUnderwriting/_components/EditableTable';
import { localConfig } from './Section/Basic';

import AddItem from './AddItem';
import Item from './Item';

import styles from './index.less';

export default ({ showOnly = false, list, renderTooltipKey }: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const config = useGetSectionAtomConfig({
    section: 'CharityOrganization-Table',
    localConfig,
  });

  const total = useMemo(() => {
    return lodash.reduce(
      list,
      (totals: number, { donationPercentage }: any) =>
        totals + Number(formUtils.queryValue(donationPercentage) || 0),

      0
    );
  }, [list]);
  const errorMessage = useMemo(() => {
    return total && Number(total) > 100
      ? formatMessageApi({ Label_COM_WarningMessage: 'MSG_000557' })
      : '';
  }, [total]);

  return (
    <>
      {lodash.isEmpty(list) && showOnly ? (
        <Empty />
      ) : (
        <>
          <EditableTable
            config={config}
            handleDelete={({ id }: any) => {
              dispatch({
                type: `${NAMESPACE}/saveCharityOrganizationList`,
                payload: {
                  type: 'delete',
                  id,
                },
              });
              dispatch({
                type: `${NAMESPACE}/removeErrorLog`,
                payload: { paths: [id] },
              });
            }}
            name="CharityOrganization"
            showOnly={showOnly}
          >
            {lodash.map(list, (item: any, index: number) => {
              return <Item id={item?.id} item={item} key={index} showOnly={showOnly} />;
            })}
            {!showOnly && !!editable ? <AddItem /> : <></>}
          </EditableTable>
          <Row className={styles.totalWrap}>
            <Col span={12} className={styles.title}>
              Total
            </Col>
            <Col span={12} className={styles.total}>
              {total}%
              {!!errorMessage ? (
                <Tooltip
                  arrowPointAtCenter
                  placement="top"
                  title={errorMessage}
                  defaultVisible={true}
                  trigger={'hover'}
                  key={renderTooltipKey}
                >
                  <Icon className={styles.errorIcon} component={ErrorSvg} />
                </Tooltip>
              ) : null}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
