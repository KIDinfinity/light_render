import React, { PureComponent } from 'react';
import lodash from 'lodash';
import DocumentTitle from '../DocumentTitle';

interface IProps {
  applicationNo: string;
  documentIdList: string[];
}

class DocumentTitleList extends PureComponent<IProps> {
  get documentTitleList() {
    const { applicationNo, documentIdList } = this.props;
    const documentTitleList = lodash.map(documentIdList, (item, index) => (
      <DocumentTitle applicationNo={applicationNo} documentId={item} key={item} indexKey={index} />
    ));
    return <>{documentTitleList}</>;
  }

  render() {
    return this.documentTitleList;
  }
}

export default DocumentTitleList;
