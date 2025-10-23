import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import type { Dispatch } from 'redux';
import { Icon } from 'antd';
import styles from './index.less';
import DocumentItem from './DocumentItem';
import ArrowSvg from './SvgArrow';

interface IProps {
  dispatch: Dispatch;
  documentList: string[];
  applicationNo: string;
  taskDetail: any;
}

class List extends Component<IProps> {
  container: HTMLDivElement | null | undefined;

  scrollToLeft = () => {
    if (this.container) {
      this.container.scrollLeft = 0;
    }
  };

  scrollToRight = () => {
    if (this.container) {
      this.container.scrollLeft = this.container.clientWidth;
    }
  };

  render() {
    const { documentList = [], applicationNo } = this.props;
    return (
      <div className={styles.List}>
        <div
          className={styles.ListContent}
          ref={(container) => {
            this.container = container;
          }}
        >
          {lodash.map(documentList, (documentId: string) => (
            <DocumentItem
              applicationNo={applicationNo}
              documentId={documentId}
              key={documentId}
              taskDetail={this.props.taskDetail}
            />
          ))}
        </div>
        <div className={styles.ButtonList}>
          <div className={`${styles.btnLeft} ${styles.btnIcon}`} onClick={this.scrollToLeft}>
            <Icon component={ArrowSvg} />
          </div>
          <div className={`${styles.btnRight} ${styles.btnIcon}`} onClick={this.scrollToRight}>
            <Icon component={ArrowSvg} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ JPCLMOfQualityController }: any, { applicationNo }: any) => ({
  documentList: (lodash.chain(JPCLMOfQualityController) as any)
    .get(`applicationList`)
    .find({ applicationNo })
    .get('documentList')
    .value(),
}))(List);
