import type { ReactNode } from 'react';
import React from 'react';
import { Tag, Table, Tooltip } from 'antd';
import lodash from 'lodash';
import { safeParseUtil } from '@/utils/utils';
import type { DataFieldProps, DataVersionProps } from './Typings';
import { getColumns } from './FormUtils';
import { Tabs, ChangeContentField, VersionJsonField } from './Constant';
import Operation from '../Operation';
import styles from './index.less';

class DataVersionUtils {
  get defaultChangeContent() {
    return {
      fieldName: '',
      oldValue: '',
      newValue: '',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  get status() {
    return {
      Active: (el: string): ReactNode => <Tag color="#87d068">{el}</Tag>,
      Submit: (el: string): ReactNode => <div className={styles.submit}>{el}</div>,
      Draft: (el: string): ReactNode => <div className={styles.draft}>{el}</div>,
      Approved: (el: string): ReactNode => <div className={styles.approved}>{el}</div>,
      Reject: (el: string): ReactNode => <div className={styles.reject}>{el}</div>,
      Default: (el: string): ReactNode => <div>{el}</div>,
    };
  }

  isVersionTab = (currentTab: string): boolean => {
    return currentTab === Tabs[1];
  };

  // 获取version列
  getVersionColumns = (props: any) => {
    const {
      dataFieldList = [],
      columnsFilter,
      isVersionTable = false,
      isNeedEdit = true,
      isRenderTitle = true,
    } = props;
    const temp = [
      ...getColumns({
        dataFieldList,
        columnsFilter,
        camelCase: !isVersionTable,
      }),
      {
        title: '', // 处理占位
      },
    ];
    const columns = isNeedEdit
      ? [
          {
            title: 'Data Versions',
            key: 'operate',
            render: (record: any): ReactNode => (
              <Operation.VersionUpdate
                record={record}
                isNeedEdit={isNeedEdit}
                disabled={isVersionTable ? record.status !== 'Draft' : false}
              />
            ),
          },
          ...temp,
        ]
      : temp;

    lodash.map(columns, (el: any) => {
      this.setVersionRender(el, dataFieldList, isRenderTitle);
    });
    return columns;
  };

  setVersionRender = (el: any, dataField: DataFieldProps[], renderTitle: boolean = false) => {
    renderTitle && lodash.set(el, 'title', this.getTitle(el.title));
    if (el.key === 'status') {
      lodash.set(el, 'render', (text: string): ReactNode => this.getStatus(text));
    } else if (lodash.includes(ChangeContentField, el.key)) {
      lodash.set(el, 'title', this.getChangeContentTitle(el.title, renderTitle));
      lodash.set(el, 'render', (text: string): ReactNode => this.getChangeContent(text, dataField));
    } else if (lodash.includes(VersionJsonField, el.key)) {
      lodash.set(el, 'render', (text: string): ReactNode => this.renderJson(text));
    }
    return el;
  };

  renderJson = (content: string) => {
    return (
      <Tooltip
        title={this.getJsonContent(content, false)}
        getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
      >
        {this.getJsonContent(content, true)}
      </Tooltip>
    );
  };

  getJsonContent = (content: string, limit: boolean = false) => {
    const contentText =
      content && content !== 'null' ? JSON.stringify(safeParseUtil(content), null, '\t') : content;
    return <div className={`${styles.jsonField} ${limit && styles.limit}`}>{contentText}</div>;
  };

  // 设置标题样式
  getTitle = (content: string): ReactNode => <div className={styles.title}>{content}</div>;

  // 设置changeContent 标题
  getChangeContentTitle = (content: string, renderTitle: boolean = false): ReactNode => {
    return (
      <div className={`${styles.center} ${renderTitle ? styles.title : ''}`}>
        <div>{content}</div>
        <div className={styles.changeContentTitle}>
          {lodash.map(lodash.keys(this.defaultChangeContent), (item) => (
            <div key={item} className={styles.changeContentChild}>
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 获取changeContent 子列
  getChangeContentHeader = (): Record<string, any>[] =>
    lodash.map(lodash.keys(this.defaultChangeContent), (item: any, idx: number) => ({
      title: item,
      dataIndex: item,
      key: item,
      className: styles.changeContentColumn,
      render: (text: any): ReactNode => {
        if (item === 'oldValue') {
          return <div className={styles.oldValue}>{`${text || ''}`}</div>;
        }
        return `${text}`;
      },
    }));

  // 处理changeContent内容
  setChangeContentWithDataField = (
    newContent: Record<string, any>[] = [],
    dataField: DataFieldProps[] = []
  ) => {
    const newList =
      lodash.isArray(newContent) &&
      lodash.map(newContent, (item: any) => {
        const { fieldCaption = '' } =
          lodash.find(dataField, (el: any) => el.fieldName === item.fieldName) || {};
        if (fieldCaption) {
          lodash.set(item, 'fieldName', fieldCaption);
        }
        return item;
      });
    return newList || [];
  };

  // 获取changeContent表
  getChangeContent = (content: string, dataField: DataFieldProps[]): ReactNode => {
    const newContent: Record<string, any>[] =
      typeof content === 'string' ? safeParseUtil(content) : [];
    if (!lodash.isArray(newContent) || (newContent && newContent.length < 1)) {
      return <></>;
    }
    const columns = this.getChangeContentHeader();
    const contentList = this.setChangeContentWithDataField(newContent, dataField);
    return (
      <Table
        className={styles.versionTable}
        rowKey="fieldName"
        columns={columns}
        showHeader={false}
        dataSource={contentList}
        pagination={false}
      />
    );
  };

  // 状态按钮样式
  getStatus = (type: string): ReactNode => {
    const currentType = this.status[type] || this.status.Default;
    return currentType(type);
  };

  // 处理version数据
  handlerVersionData = (data: DataVersionProps[] = []) =>
    lodash.map(data, (item) => {
      lodash.set(item, 'disabled', item.status !== 'Draft');
      return item;
    });

  // 处理version树层级
  getDataVersionTree = (data: DataVersionProps[]) => {
    const newTree = lodash.map(data, (item: any) => {
      const children = data.filter((el: any) => el.parentVersionNo === item.versionNo);
      if (children && children.length) {
        lodash.set(item, 'children', children);
      }
      return item;
    });
    return newTree.filter((el: any) => !el.parentVersionNo);
  };
}

export const {
  getStatus,
  setVersionRender,
  getVersionColumns,
  getChangeContent,
  isVersionTab,
  handlerVersionData,
  getDataVersionTree,
} = new DataVersionUtils();
