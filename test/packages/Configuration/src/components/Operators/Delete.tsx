import React, { Component } from 'react';
import { Icon } from 'antd';
import { ReactComponent as deleteSvg } from 'configuration/assets/delete.svg';

interface ComponentProps {
  handleDelete: Function;
  record: any
}

class Delete extends Component<ComponentProps> {

  render() {
    const { handleDelete,record } = this.props;
    return <Icon component={deleteSvg} onClick={(event)=>{handleDelete(record,event)}} />;
  }
}

export default Delete;
