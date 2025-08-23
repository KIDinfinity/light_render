import React from 'react';
import { useDispatch, useSelector } from 'dva';
import { Button } from 'antd';
import lodash from 'lodash';
import { HNWEnum, TypeEnum } from '@/enum/GolbalAuthority';
import Authorized from '@/utils/Authorized';
import styled from 'styled-components';
import styles from './Header.less';

const StyledTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  text-transform: uppercase;
  margin-bottom: 0;
`;

const StyledBig = styled.span`
  font-size: 3rem;
  display: inline-block;
  margin-left: 0.7143rem;
`;

const AdvancedQueryHeader = ({ title = '' }) => {
  const dispatch = useDispatch();
  const commonAuthorityList = useSelector((state) => state.authController.commonAuthorityList);
  const tabIndex = useSelector((state) => state.advancedQueryController.tabIndex);
  const batchAssignHandle = () => {
    dispatch({
      type: 'advancedQueryBatchAssign/saveUseBatchAssign',
      payload: { useBatchAssign: true },
    });
  };
  const list = lodash
    .chain(commonAuthorityList)
    .filter((item) => item.result && item.type === TypeEnum.Comm)
    .map((item) => item.authorityCode)
    .value();
  return (
    <div className={styles.headerFix}>
      <div className={styles.h1}>
        <StyledTitle>
          {lodash.map(title.split(' '), (item) => {
            return (
              <React.Fragment key={item}>
                {' '}
                <StyledBig>{item.substr(0, 1)}</StyledBig>
                <span>{item.substr(1)}</span>
              </React.Fragment>
            );
          })}
        </StyledTitle>
        {tabIndex === '2' && (
          <Authorized authority={[HNWEnum.RS_BP_BatchAssignButton]} currentAuthority={list}>
            <Button className={styles.batchAssign} onClick={batchAssignHandle}>
              Batch Assign
            </Button>
          </Authorized>
        )}
      </div>
    </div>
  );
};

export default AdvancedQueryHeader;
