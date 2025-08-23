import React, { Component } from 'react';
import { connect } from 'dva';
import mapprops from '@/utils/mapprops';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/es/form';
import { getSearchItem } from 'configuration/pages/ConfigurationCenter/Utils/FormUtils';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import DnDCard from '@/components/DnDCard';
import styles from './index.less';
import { getSearchComponent } from '../../../_utils/getFormatField';

interface ComponetProps {
  dispatch: Dispatch;
  reportMetadata: any;
  form: FormComponentProps;
  searchDefault: any;
  functionLoading: boolean;
  activeTabKey: string;
  reportCode: string;
}
const isAllowEmptySearch = (dropdownCode: string) => {
  const reg = /^business_/g;
  return !reg.test(dropdownCode);
};

class SearchField extends Component<ComponetProps> {
  search: any;

  get searchFieldList() {
    const { reportMetadata, activeTabKey } = this.props;
    return reportMetadata[activeTabKey]?.searchFieldList;
  }

  componentDidMount() {
    const { dispatch, form } = this.props;
    dispatch({
      type: 'reportCenterController/saveForm',
      payload: {
        form,
      },
    });
  }

  onSort = (searchFieldList: any[]) => {
    const { dispatch, reportCode } = this.props;
    dispatch({
      type: 'reportCenterController/saveSearchFieldList',
      payload: {
        reportCode,
        searchFieldList,
      },
    });
  };

  onRemove = ({ id, fieldName }: any) => {
    const { dispatch, searchDefault, activeTabKey, reportCode } = this.props;
    dispatch({
      type: 'reportCenterController/saveSearchFieldList',
      payload: {
        reportCode,
        searchFieldList: lodash.map(this.searchFieldList, (item: any) =>
          item?.id === id
            ? {
                ...item,
                visible: false,
              }
            : item
        ),
      },
    });
    dispatch({
      type: 'reportCenterController/saveSearchDefault',
      payload: {
        searchDefault: {
          ...searchDefault?.[activeTabKey],
          params: {
            ...(searchDefault?.[activeTabKey]?.params || {}),
            [fieldName]: null,
          },
        },
        reportCode: activeTabKey,
      },
    });
  };

  render() {
    const { searchDefault, form, activeTabKey } = this.props;
    const params = lodash.get(searchDefault, `${activeTabKey}.params`, {});
    const newSearch = getSearchComponent(
      lodash.filter(this.searchFieldList, (item) => item.visible && item.visible !== 2)
    );

    return (
      <div className={styles.searchForm}>
        <Form layout="vertical">
          {lodash.map(newSearch, (item: any, index: number) => (
            <DnDCard
              key={item.fieldName}
              record={item}
              index={index}
              array={this.searchFieldList}
              onSort={this.onSort}
              onRemove={this.onRemove}
              showBtn={!item.required}
            >
              {mapprops(
                getSearchItem(
                  [item],
                  { ...params },
                  {
                    getCalendarContainer: '',
                    getPopupContainer: '',
                    isShowAll: true,
                    allowEmptySearch: isAllowEmptySearch(item.dropdownCode),
                    form,
                    ...(item.componentType === 'text' ? { allowClear: true } : {}),
                  },
                  'componentSequence'
                ),
                { form }
              )}
            </DnDCard>
          ))}
        </Form>
      </div>
    );
  }
}

export default connect(({ reportCenterController }: any) => ({
  reportMetadata: reportCenterController.reportMetadata,
  searchDefault: reportCenterController.searchDefault,
  activeTabKey: reportCenterController.activeTabKey,
}))(
  Form.create({
    onFieldsChange(props: any, changedValues) {
      const { searchDefault, dispatch, activeTabKey } = props;
      dispatch({
        type: 'reportCenterController/saveSearchDefault',
        payload: {
          searchDefault: {
            ...searchDefault?.[activeTabKey],
            params: {
              ...(searchDefault?.[activeTabKey]?.params || {}),
              ...changedValues,
            },
          },
          reportCode: activeTabKey,
        },
      });
    },
    mapPropsToFields(props) {
      const { searchDefault, activeTabKey } = props;
      return formUtils.mapObjectToFields({ ...searchDefault?.[activeTabKey]?.params }, {});
    },
  })(SearchField)
);
