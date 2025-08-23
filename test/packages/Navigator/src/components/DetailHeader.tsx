import React from 'react';
import lodash from 'lodash';
import styled from 'styled-components';
import Label from '@/components/Label/LabelText';
import styles from './DetailHeader.less';
import useExpanderController from 'navigator/hooks/useExpanderController';
import classnames from 'classnames';

const StyledTitle = styled.h1`
  text-align: center;
  font-size: 2.2857rem;
  text-transform: uppercase;
  margin-bottom: 0;
`;

const StyledBig = styled.span`
  font-size: 2.8571rem;
  display: inline-block;
  margin-left: 0.7143rem;
`;

interface Props {
  title: string;
  indicator?: object;
  description?: string;
}

const DetailHeader = ({ title = '', indicator = {}, description }: Props) => {
  const { isSiderToggleOn } = useExpanderController();

  const checkTitle = /[0-9a-z]/i;
  const isCheckTitle = checkTitle.test(title);
  let firstNameOne;
  let firstNameTwo;
  let lastNameOne;
  let lastNameTwo;
  let thirdNameOne;
  let thirdNameTwo;
  if (isCheckTitle) {
    const arr = title.trim().split(' ');
    firstNameOne = arr[0]?.slice(0, 1);
    firstNameTwo = arr[0]?.slice(1);
    lastNameOne = arr[1]?.slice(0, 1);
    lastNameTwo = arr[1]?.slice(1);
    thirdNameOne = arr[2]?.slice(0, 1);
    thirdNameTwo = arr[2]?.slice(1);
  }

  return (
    <div className={styles.fix}>
      <div className={classnames(styles.padding, {
        [styles.compressed]: isSiderToggleOn
      })}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.title}>
              <div className={styles.h1}>
                <span className={styles.text}>
                  {isCheckTitle ? (
                    <StyledTitle>
                      <StyledBig>{firstNameOne} </StyledBig>
                      {firstNameTwo}
                      <StyledBig>{lastNameOne}</StyledBig>
                      {lastNameTwo}
                      {thirdNameOne && thirdNameTwo && (
                        <span>
                          <StyledBig>{thirdNameOne} </StyledBig>
                          {thirdNameTwo}
                        </span>
                      )}
                    </StyledTitle>
                  ) : (
                    <StyledTitle>{title}</StyledTitle>
                  )}
                </span>
                {!lodash.isEmpty(description) && (
                  <span className={styles.description}>{description?.toUpperCase()}</span>
                )}
                <div className={styles.flag}>
                  <Label indicator={indicator} className={styles.label} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
