import React, { Component } from 'react';
import styled from 'styled-components';
import lodash from 'lodash';

const StyledTitle = styled.div`
  text-align: center;
  font-size: 1.4286rem;
  text-transform: uppercase;
  margin-bottom: 1.4286rem;
`;

const StyledBig = styled.span`
  font-size: 1.8571rem;
  display: inline-block;
  margin-left: 0.3571rem;
`;
class Index extends Component {
  state = {};

  handleWord = (item: any) => {
    const nameOne = item?.slice?.(0, 1);
    const nameTwo = item?.slice?.(1);
    return (
      <>
        <StyledBig>{nameOne} </StyledBig>
        {nameTwo}
      </>
    );
  };

  render() {
    const { children }: any = this.props;
    const checkTitle = /[0-9a-z]/gi;
    const isCheckTitle = checkTitle.test(children);

    let arr = [];
    if (isCheckTitle) {
      arr = children.trim().split(/\s/);
    }

    return isCheckTitle ? (
      <StyledTitle>
        {lodash.map(arr, (item: any, idx: number) => (
          <span key={`${idx}`}>{this.handleWord(item)}</span>
        ))}
      </StyledTitle>
    ) : (
      <StyledTitle>{children}</StyledTitle>
    );
  }
}

export default Index;
