import React, { Component } from 'react';
import lodash from 'lodash';
import { Button } from 'antd';
import type { Dispatch } from 'redux';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { FunctionDataProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { formUtils } from 'basic/components/Form';
import { getObjectData } from 'configuration/utils';
import styles from './index.less';

interface ComponentProps {
  dispatch: Dispatch;
  functionData: FunctionDataProps;
  taskNotEditable: boolean;
  formData: any;
  type: string;
}

class Save extends Component<ComponentProps> {
  get disableSave() {
    const { formData } = this.props;
    return (
      lodash.isEmpty(getObjectData(formUtils.cleanValidateData(formData))) ||
      !!formUtils.getErrorArray(formData)?.length
    );
  }

  handleSave = async () => {
    const { dispatch, type } = this.props;
    dispatch({
      type: `${type}/addFormData`,
    });
  };

  render() {
    const { taskNotEditable } = this.props;

    const operationList = this.props?.functionData?.operationList || [];

    return (
      <div className={styles.saveBox}>
        {lodash.includes(operationList, 'add') && !taskNotEditable ? (
          <Button
            type="primary"
            className={styles.buttonSave}
            onClick={this.handleSave}
            disabled={this.disableSave}
          >
            {formatMessageApi({
              Label_BPM_Button: 'venus-split_confirm',
            })}
          </Button>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default connect()(Save);
