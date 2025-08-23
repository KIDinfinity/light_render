import React, { PureComponent } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import styles from './index.less';

interface IProps {
  documentIdList: string[];
  bpoFormDataList: any;
}

class DocumentTitleList extends PureComponent<IProps> {
  get List() {
    const { documentIdList, bpoFormDataList } = this.props;
    const list = lodash.map(documentIdList, (item: string) => (
      <div className={styles.item} key={item}>
        {lodash.get(bpoFormDataList, `${item}.formData.bpmDocumentId`)}
      </div>
    ));
    return <>{list}</>;
  }

  render() {
    return this.List;
  }
}

export default connect(({ JPCLMOfQualityController }: any) => ({
  bpoFormDataList: JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList,
}))(DocumentTitleList);
