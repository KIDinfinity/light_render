import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormSection from 'basic/components/Form/FormSection';
import Table from './Table';
import styles from './index.less';

interface IProps {
  dispatch: Dispatch;
  searchLoading: boolean;
  searchDisable: boolean;
}

// @connect(({ claimEditable }: any) => ({
//   taskNotEditable: claimEditable.taskNotEditable,
// }))
// const checkSearchDisable = (claimProcessData: any = {}) => {
//   const temp = lodash.pick(claimProcessData, ['identityId', 'lastName', 'firstName']);
//   return (
//     lodash.values(temp).findIndex((item: any) => {
//       const value = lodash
//         .chain(item)
//         .keys()
//         .some(item =>
//           ['value', 'locale', 'locale_old', 'locale_new', 'format', 'label'].includes(item)
//         )
//         .value()
//         ? item.value
//         : item;
//       return !lodash.isEmpty(lodash.trim(value));
//     }) === -1
//   );
// };

class SearchTable extends Component<IProps> {
  onSearch = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'UnknownDocumentController/search',
    });
  };

  render() {
    const { searchLoading, searchDisable, taskNotEditable } = this.props;
    return (
      <div className={styles.Search}>
        <div className={styles.buttonBox}>
          <Button
            type="primary"
            onClick={this.onSearch}
            loading={searchLoading}
            disabled={searchDisable || taskNotEditable}
          >
            {formatMessageApi({
              Label_BPM_Button: 'venus_claim.button.search',
            })}
          </Button>
        </div>
        <FormSection
          title={formatMessageApi({
            Label_BIZ_Claim: 'venus_claim.label.searchResult',
          })}
        >
          <Table />
        </FormSection>
      </div>
    );
  }
}

export default connect(({ loading, UnknownDocumentController }: any) => ({
  searchLoading: loading.effects['UnknownDocumentController/search'],
  // searchDisable: checkSearchDisable(UnknownDocumentController.claimProcessData),
}))(SearchTable);
