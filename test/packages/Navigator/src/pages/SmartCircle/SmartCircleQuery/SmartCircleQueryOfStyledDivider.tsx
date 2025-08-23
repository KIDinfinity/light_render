import React from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';

const StyledDivider = styled(Divider)`
  &.ant-divider-horizontal.ant-divider-with-text-left:after {
    border-top: 1px solid #6f6f6f;
  }
  &.ant-divider-horizontal.ant-divider-with-text-left:before {
    width: 0;
  }
  // .ant-divider-inner-text {
  //   position: fixed;
  //   background: #2e2e2e;
  // }
`;

const StyledDivider2 = ({ children }) => (
  <StyledDivider orientation="left">{children}</StyledDivider>
);

export default StyledDivider2;
