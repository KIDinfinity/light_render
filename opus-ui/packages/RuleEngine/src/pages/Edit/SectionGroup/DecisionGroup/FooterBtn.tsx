import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ButtonType, AddType } from '../../Enum';
import styles from './index.less';

const ButtonList = [
  { key: ButtonType.NEW, labelId: 'New Branch' },
  {
    key: ButtonType.SEARCH,
    disabled: true,
    labelId: ' Existing Branch',
  },
  { key: ButtonType.ADD, labelId: 'venus_claim.ruleEngine.label.button.addToLibrary' },
];

class FooterBtn extends Component {
  handleButtton = async (key: string) => {
    const { dispatch }: any = this.props;
    switch (key) {
      case ButtonType.NEW:
        dispatch({
          type: 'ruleEngineController/addDecisionBranch',
        });
        break;
      case ButtonType.SEARCH:
        await dispatch({
          type: 'ruleEngineController/getSearchQuery',
          payload: {
            activeCode: AddType.RuleSetBranch,
          },
        });
        break;
      case ButtonType.ADD:
        dispatch({
          type: 'ruleEngineController/addDecisionToLibrary',
        });

        break;

      default:
        break;
    }
  };

  render() {
    const { taskNotEditable } = this.props;
    return (
      <div className={styles.fooerWrap}>
        <div className={styles.list}>
          {lodash.map(ButtonList, (item: any) => {
            return (
              <Button
                key={item.key}
                shape="round"
                icon="plus"
                disabled={taskNotEditable}
                onClick={() => {
                  this.handleButtton(item.key);
                }}
              >
                {formatMessageApi({
                  Label_BIZ_Claim: item.labelId,
                })}
              </Button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(({ claimEditable }) => ({
  taskNotEditable: claimEditable.taskNotEditable,
}))(FooterBtn);
