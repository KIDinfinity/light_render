import type { FunctionComponent, ReactNode, CSSProperties } from 'react';
import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { CapitalizeTitle } from 'bpm/pages/OWBEntrance';
import type { TextType } from './typings';

import styles from './styles.less';

interface IProps {
  className?: string;
  children?: ReactNode | string;
  text?: string;
  textType?: typeof TextType[number];
  barStyle?: CSSProperties;
  style?: CSSProperties;
}

const TitleStyled = styled.div`
  ${({ barStyle }: IProps) =>
    barStyle &&
    `
      &:before{
        width: ${barStyle.width || 2}px;
      }
    `}
`;

const Title: FunctionComponent<IProps> = ({ className, text, textType, children, ...res }) => (
  <TitleStyled
    className={classNames(className, styles.componentTitle, textType && styles[textType])}
    {...res}
  >
    <CapitalizeTitle
      title={formatMessageApi({ Label_BIZ_Claim: text })}
      normalTitleClassName={styles.normalTitle}
      upperTitleClassName={styles.upperTitle}
    >
      {children}
    </CapitalizeTitle>
  </TitleStyled>
);

export default Title;
