import React, { Component } from 'react';
import { connect } from 'dva';
import mapprops from '@/utils/mapprops';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/es/form';
import Buttons from './Buttons';

import { tarckInquiryPoint, eEventOperation } from '@/components/TarckPoint';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { getSearchItem } from 'configuration/pages/ConfigurationCenter/Utils/FormUtils';
import { Form } from 'opus/Components/Antd';
import { formUtils } from 'basic/components/Form';
import SelectList from './SelectList';
import styles from './index.less';
import { getSearchComponent } from '../../_utils/getFormatField';

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

  handleSearch = async () => {
    const { dispatch, form, activeTabKey: reportCode, reportMetadata } = this.props;
    const searchFieldList = reportMetadata?.[reportCode]?.searchFieldList;
    const dictionary = reportMetadata?.[reportCode]?.dictionary;
    const validateKey = lodash
      .chain(searchFieldList)
      .filter((el) => el.visible)
      .map((item: any) => item.fieldName)
      .value();
    form.validateFields(validateKey, { force: true }).then(async () => {
      const result: any = await dispatch({
        type: 'reportCenterController/getReport',
        payload: {
          manualRefresh: true,
        },
      });
      if (!result) {
        return;
      }
      if (result.response.resultData.total > 0) {
        const remarks = lodash.reduce(
          result.reportParams?.whereConditions,
          (result: any, item: any, key) => {
            result = [...result, { ...item }];
            if (lodash.indexOf(item.firstFieldValue, ',') !== -1) {
              result[key].firstFieldValue = lodash
                .chain(item.firstFieldValue)
                .split(',')
                .map((self: any) => {
                  return formatMessageApi({ [dictionary?.[item.fieldName]]: self });
                })
                .join(',')
                .value();
            } else {
              result[key].firstFieldValue = formatMessageApi({
                [dictionary?.[item.fieldName]]: item.firstFieldValue,
              });
            }
            return result;
          },
          []
        );
        tarckInquiryPoint(dispatch, {
          eventName:
            result.reportName ||
            formatMessageApi({ Label_COM_ReportCenter: result.reportParams?.reportCode }),
          eventOperation: eEventOperation.preView,
          remarks: remarks,
        });
      }
    });
  };

  render() {
    const { searchDefault, dispatch, form, activeTabKey } = this.props;
    const params = lodash.get(searchDefault, `${activeTabKey}.params`, {});
    const newSearch = getSearchComponent(
      lodash.filter(this.searchFieldList, (item) => item.visible && item.visible !== 2)
    );

    return (
      <div className={styles.searchForm}>
        <Buttons
          handleApply={() => {
            this.handleSearch();
          }}
          handleClear={() => {
            dispatch({
              type: 'reportCenterController/saveSearchDefault',
              payload: {
                searchDefault,
                reportCode: activeTabKey,
              },
            });
          }}
        />
        <div className={styles.searchFormInput}>
          {lodash.map(newSearch, (item: any) => (
            <div className={styles.formItem} key={item.fieldName}>
              <div className={styles.item}>
              <span className={styles.label}>{item.fieldCaption || item.componentCaption}</span>

                {mapprops(
                  getSearchItem(
                    [item],
                    { ...params },
                    {
                      getCalendarContainer: '',
                      getPopupContainer: '',
                      isShowAll: true,
                      allowEmptySearch: isAllowEmptySearch(item.dropdownCode),
                    },
                    'componentSequence'
                  ),
                  { form }
                )}
              </div>
              <SelectList
                params={params}
                searchDefault={searchDefault}
                activeTabKey={activeTabKey}
                {...lodash.pick(item, ['dropdownDatas', 'componentType', 'fieldName'])}
              />
            </div>
          ))}
        </div>
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
