import React from 'react';
import { connect } from 'dva';
import { Select, Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetCategoryList from 'bpm/pages/Information/_hooks/useGetCategoryList';
import useResetCategoryCode from 'bpm/pages/Information/_hooks/useResetCategoryCode';
import useResetContent from 'bpm/pages/Information/_hooks/useResetContent';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './categoryDropdown.less';

const CategoryDropdown = Form.create({
  onFieldsChange(props: any, changedFields) {
    const { dispatch, item } = props;
    dispatch({
      type: 'navigatorInformationController/addInformationChange',
      payload: {
        changedFields: {
          ...changedFields,
          categoryCode: formUtils.queryValue(changedFields?.categoryCode),
        },
        id: item.id,
      },
    });
  },
  mapPropsToFields(props: any) {
    const { item } = props;
    return formUtils.mapObjectToFields(item, {
      categoryCode: (value: any) => {
        return value || undefined;
      },
    });
  },
})((props: any) => {
  const { form, item, processData }: any = props;
  const categoryList = useGetCategoryList({ processData });
  useResetCategoryCode();
  useResetContent({ item });
  const stopPropagationFn = (ev: any) => {
    ev.stopPropagation();
  };

  const onChange = (selectItems: any) => {
    const { dispatch } = props;
    dispatch({
      type: 'navigatorInformationController/setActiveEditTabs',
      payload: {
        activeEditTabs: [item.id],
      },
    });
    if (selectItems !== 'withdrawReason') {
      dispatch({
        type: 'navigatorInformationController/saveCategoryReasonTemplate',
        payload: {
          categoryReasonTemplate: '',
          id: item.id,
        },
      });
    }
  };
  return (
    <div onClick={stopPropagationFn} className={styles.informationReason}>
      <Form layout="vertical" hideRequiredMark>
        <Form.Item>
          {' '}
          {form.getFieldDecorator('categoryCode', {
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select
              className="category"
              onChange={onChange}
              placeholder={formatMessageApi({ Label_Sider_Information: 'InfoCtgInstruction' })}
            >
              {lodash.map(categoryList, (category) => (
                <Select.Option
                  key={category.dictCode}
                  value={category.dictCode}
                  disabled={category.disabled}
                >
                  {formatMessageApi({ category: category.dictCode })}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Form>
    </div>
  );
});

export default connect(({ navigatorInformationController }: any) => ({
  informationData: navigatorInformationController.informationData,
}))(CategoryDropdown);
