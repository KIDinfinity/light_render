import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default class More extends PureComponent {
  render() {
    const { rows, children } = this.props; // children必须是方法

    return (
      rows.length > 0 && (
        <Dropdown overlay={children({ rows })}>
          <Button>
            {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.moreOperator' })}{' '}
            <Icon type="down" />
          </Button>
        </Dropdown>
      )
    );
  }
}

More.propTypes = {
  children: PropTypes.func,
  rows: PropTypes.array,
};

More.defaultProps = {
  children: () => {},
  rows: [],
};
