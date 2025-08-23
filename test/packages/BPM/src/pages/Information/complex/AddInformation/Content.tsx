import React, { memo, useEffect } from 'react';
import { connect, useDispatch } from 'dva';
import { Form } from 'antd';
import moment from 'moment';
import lodash from 'lodash';
import { Validator, formUtils } from 'basic/components/Form';
import Editor from 'bpm/pages/Information/complex/Editor';
import ErrorTooltip from '@/components/ErrorTooltip';
import useGetContentPlaceholder from 'bpm/pages/Information/_hooks/useGetContentPlaceholder';
import { SS, SSKey } from '@/utils/cache';
import styles from './index.less';

const Content = Form.create({
  onFieldsChange: (props, changedFields) => {
    const { dispatch, item } = props;
    dispatch({
      type: 'navigatorInformationController/addInformationChange',
      payload: {
        changedFields,
        id: item.id,
      },
    });
  },
  mapPropsToFields: (props: any) => {
    const { item } = props;
    return formUtils.mapObjectToFields(item);
  },
})((props) => {
  const {
    form,
    lockInformationData,
    informationDataContactContent,
    categoryReasonTemplate,
    editorClassName,
    item,
    specialCharList,
    checkSpecialChar,
  } = props;

  const { getFieldDecorator } = form;
  const taskSkipVaildate = SS.getItem(SSKey.TASKSKIPVAILDATE);

  const placeholder = useGetContentPlaceholder({
    item,
  });
  const dispatch = useDispatch();
  const FORMID = 'Content';
  useEffect(() => {
    dispatch({
      type: 'navigatorInformationController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
    return () => {
      dispatch({
        type: 'navigatorInformationController/unRegisterForm',
        payload: {
          form,
          formId: FORMID,
        },
      });
    };
  }, []);
  const { id }: any = item;
  const template = lodash
    .chain(categoryReasonTemplate)
    .find((e: any) => e?.id === id)
    .get('template')
    .value();
  const contentError = form?.getFieldError?.('content');

  return (
    <Form layout="vertical" hideRequiredMark>
      <div className={styles.contentBox}>
        {lockInformationData ? (
          <div className={styles.content}>
            {lodash.map(lodash.entries(informationDataContactContent), (content, index) => {
              const time = content[0];

              return (
                <div key={`time-${index}`}>
                  <div className={styles.time}>{time}</div>
                  {lodash.map(lodash.get(content, '[1]', []), (ctx, idx) => (
                    <div className={styles.item} key={`conten-${idx}`}>
                      <div className={styles.title}>
                        <span>{ctx.srcId}</span>
                        <span className={styles.time}>{moment(ctx.time).format('LT')}</span>
                      </div>
                      {ctx.content}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <Form.Item>
            {getFieldDecorator('content', {
              rules: !!taskSkipVaildate
                ? []
                : [Validator.VLD_001121(specialCharList, checkSpecialChar)],
              validateTrigger: 'onChange',
            })(
              <Editor
                className={editorClassName}
                placeholder={placeholder}
                item={item}
                template={template}
                form={form}
              />
            )}
          </Form.Item>
        )}
      </div>
      <ErrorTooltip form={form} errors={contentError} specifyPlacement={'right'} />
    </Form>
  );
});

export default connect(({ navigatorInformationController, global }: any) => ({
  lockInformationData: navigatorInformationController?.lockInformationData,
  informationDataContactContent: navigatorInformationController?.informationDataContactContent,
  categoryReasonTemplate: navigatorInformationController?.categoryReasonTemplate,
  specialCharList: global?.golbalConfig?.specialCharList,
}))(
  memo(Content, (pre, next) => {
    const keys = [
      'lockInformationData',
      'informationDataContactContent',
      'categoryReasonTemplate',
      'item',
      'checkSpecialChar',
      'form',
    ];
    return lodash.isEqual(lodash.pick(pre, keys), lodash.pick(next, keys));
  })
);
