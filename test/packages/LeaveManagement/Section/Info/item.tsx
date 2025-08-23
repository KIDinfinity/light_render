import React, { useEffect, useState } from 'react';
import lodash from 'lodash';
import { Form, Icon } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/es/form';
import { getLeaveRequestUserInfo } from '@/services/userCenterUserLeaveRequestControllerService';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import RangeTwoPicker from 'navigator/components/RangePicker';
import Select, { Option } from 'basic/components/Form/FormItem/Items/Select';
import moment from 'moment';
import FormSection, { FormItemTextArea } from 'basic/components/Form/FormSection';
import { useAuth } from '@/auth/Utils';
import styles from './index.less';
import { tenant } from '@/components/Tenant';

interface IItem {
  id: string;
  caseNo: string;
  sortOrder: number;
  startTime: string;
  endTime: string;
  reason: string;
}

interface IProps {
  form: any;
  taskNotEditable: boolean;
  item: IItem;
  index: number;
  handlClose: any;
}
interface IFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  validating: boolean;
  item: IItem;
}

type TUser = {
  userId: string;
  userName: string;
};

const InfoItem: React.FC<IProps> = ({ item, index, form, taskNotEditable, handlClose }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<any[]>([]);
  const { RS_LP_ApplyLeave_AllUsers, RS_LP_ApplyLeave_Subordinates, RS_LP_ApplyLeave_CurrentUser } =
    useAuth([
      'RS_LP_ApplyLeave_AllUsers',
      'RS_LP_ApplyLeave_Subordinates',
      'RS_LP_ApplyLeave_CurrentUser',
    ]);
  const userLeaveRequestTabName = useSelector(
    (state: any) => state.leaveManagement.userLeaveRequestTabName
  );

  console.log('item1111', item)

  const showModal = useSelector((state: any) => state.leaveManagement.showModal);

  const isPersonal = userLeaveRequestTabName === 'personalActive';
  const { userId: currentUserId, userName: currentUserName } = useSelector(
    (state: any) => state.user.currentUser
  );
  const disabledDate = (dateItem: any) => {
    // TODO:之所以减一是因为antd会把当前日期也disable了
    const currentDate = moment().endOf('day').subtract(1, 'day');
    return dateItem < currentDate;
  };

  const getUsers = async () => {
    const response = await getLeaveRequestUserInfo(currentUserId);
    const userList = response?.resultData || [];

    if (RS_LP_ApplyLeave_AllUsers) {
      setUsers(userList);
      return;
    }
    if (RS_LP_ApplyLeave_Subordinates) {
      setUsers(userList.filter((u: any) => u.subordinate));
      return;
    }
    if (RS_LP_ApplyLeave_CurrentUser) {
      setUsers(userList.filter((u: any) => u.userId === currentUserId));
    }
  };

  useEffect(() => {
    getUsers();
  }, [
    currentUserId,
    RS_LP_ApplyLeave_AllUsers,
    RS_LP_ApplyLeave_Subordinates,
    RS_LP_ApplyLeave_CurrentUser,
  ]);

  useEffect(() => {
    if (isPersonal) {
      // WHY
      dispatch({
        type: 'leaveManagement/updateInfoList',
        payload: {
          changedFields: {
            users: [
              {
                userId: currentUserId,
                userName: currentUserName,
              },
            ],
          },
          id: item.id,
        },
      });
    }
  }, [isPersonal, showModal]);

  return (
    <div className={styles.item} key={item.id}>
      <FormSection
        form={form}
        formId="info_form"
        layConf={{
          default: 18,
          reason: 24,
          users:
            RS_LP_ApplyLeave_CurrentUser &&
            !RS_LP_ApplyLeave_Subordinates &&
            !RS_LP_ApplyLeave_AllUsers
              ? 0
              : 18,
        }}
        isMargin={false}
      >
        <Form.Item label="User Name" name="users">
          {form.getFieldDecorator('users', {
            rules: [
              {
                required: true,
                message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
              },
            ],
          })(
            <Select
              disabled={taskNotEditable}
              mode="multiple"
              valueFormat={(v: TUser[] | undefined) => lodash.map(v, (u) => u.userName)}
              valueChangeFormat={(v) =>
                (v as string[]).map((uid) =>
                  (({ userId, userName }: TUser) => ({ userId, userName }))(
                    users.find((u) => u.userName === uid) || {}
                  )
                )
              }
            >
              {lodash.map(users, (user: any) => {
                return (
                  <Option key={user.userId} value={user.userName}>
                    {user.userName}
                  </Option>
                );
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Leave Time">
          {form.getFieldDecorator('allTime', {
            initialValue:
              !lodash.isEmpty(item.startTime) || !lodash.isEmpty(item.endTime)
                ? [
                    !lodash.isEmpty(item.startTime) ? moment(item.startTime) : '',
                    !lodash.isEmpty(item.endTime) ? moment(item.endTime) : '',
                  ]
                : [],
            rules: [
              {
                required: true,
                message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
              },
            ],
          })(
            <RangeTwoPicker
              format="L LT"
              // style={{ width: '100%' }}
              disabled={taskNotEditable}
              // todo: 请过的日期disabled
              disabledDate={disabledDate}
              allowClear={false}
              flex
              formProps={{
                showTime: {
                  hideDisabledOptions: true,
                  defaultValue: moment('08:30', 'HH:mm'),
                },
              }}
              toProps={{
                showTime: {
                  hideDisabledOptions: true,
                  defaultValue: moment('18:30', 'HH:mm'),
                },
              }}
            />
          )}
        </Form.Item>
        <FormItemTextArea
          form={form}
          labelId={formatMessageApi({
            Label_Sider_UserCenter: 'Reason ',
          })}
          formName="reason"
          required={tenant.isTH()}
          // @ts-ignore
          name="reason"
          disabled={taskNotEditable}
        />
      </FormSection>
      {index > 0 && (
        <p
          className={styles.closeIcon}
          onClick={() => {
            handlClose(item.id);
          }}
        >
          <Icon style={{ fontSize: '16px' }} type="close-circle" />
        </p>
      )}
    </div>
  );
};

export default connect(({ formCommonController, claimEditable }: any) => ({
  validating: formCommonController.validating,
  taskNotEditable: claimEditable.taskNotEditable,
}))(
  Form.create<IFormProps>({
    async onFieldsChange(props, changedFields) {
      const { dispatch, validating, item }: IFormProps = props;
      console.log('item', item)
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'leaveManagement/saveEntry',
              target: 'updateInfoList',
              payload: {
                changedFields,
                id: item.id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'leaveManagement/saveFormData',
            target: 'updateInfoList',
            payload: {
              changedFields,
              id: item.id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields(item, {});
    },
  })(InfoItem)
);
