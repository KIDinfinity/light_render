import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import handleMessageModal from '@/utils/commonMessage';
import EditFlag from '@/enum/editFlag';
import { LS, LSKey } from '@/utils/cache';
import lodash from 'lodash';

const eSubmimnssionValidation: Function = (NAMESPACE: any) => (WrappedComponent: any) => {
  const currentUser = LS.getItem(LSKey.CURRENTUSER);
  const userId = lodash.get(currentUser, 'userId', '');

  return class extends React.Component<any> {
    componentDidMount = () => setTimeout(async () => {
      const { dispatch, taskDetail: { snapshotData, editFlag, assignee } }: any = this.props;
      if (assignee === userId && editFlag === EditFlag.bussinessError && !snapshotData) {
        await dispatch({
          type: `${NAMESPACE}/saveSnapshot`
        })
        handleMessageModal([{
          code: formatMessageApi({ Label_COM_Message: 'MSG_000587' }),
          content: formatMessageApi({ Label_COM_Message: 'MSG_000587' }),
        }])
      }
    }, 0)

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default eSubmimnssionValidation;
