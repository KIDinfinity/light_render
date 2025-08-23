import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import { Card, Form, Checkbox } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { VLD_000065 } from '@/utils/validations';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
// import { formUtils } from 'basic/components/Form';
import styles from './CheckList.less';

@connect(({ JPDPOfDocumentDispatchController, claimEditable }) => ({
  submited: JPDPOfDocumentDispatchController?.submited,
  taskNotEditable: claimEditable.taskNotEditable,
  dispatchDocs: lodash.get(JPDPOfDocumentDispatchController, 'businessData.dispatchDocs'),
}))
class CheckList extends Component {
  state = {};

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'JPDPOfDocumentDispatchController/loadDocumentTypes',
    });
  };

  createBarExtraContent = () => {
    const { submited, dispatchDocs } = this.props;
    return (
      <div className={styles.applicationContainer}>
        <h3>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.claim.ProcessOfJPDP.checkList',
          })}
          {!VLD_000065(dispatchDocs) && submited && (
            <ErrorTooltipManual
              manualErrorMessage={
                <>
                  <p>
                    {formatMessageApi({
                      Label_COM_WarningMessage: 'ERR_000138',
                    })}
                  </p>
                </>
              }
            />
          )}
        </h3>
      </div>
    );
  };

  handleChangeCheckbox = ({ value, name }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'JPDPOfDocumentDispatchController/updateDocument',
      payload: {
        name,
        value,
      },
    });
  };

  render() {
    const { taskStatus, taskNotEditable, dispatchDocs } = this.props;
    const isDisabled = taskStatus === 'completed' || taskNotEditable;
    return (
      <div className={styles.check_list}>
        <Card title={this.createBarExtraContent()}>
          <div className="treatment_list">
            <Form layout="vertical">
              <Form.Item>
                <Checkbox.Group
                  value={lodash
                    .chain(dispatchDocs)
                    ?.filter((doc: any) => lodash.get(doc, 'checked'))
                    ?.map((doc: any) => lodash.get(doc, 'idx'))
                    .value()}
                  onChange={(selVal: string) => {
                    this.handleChangeCheckbox({ value: selVal });
                  }}
                  options={lodash.map(dispatchDocs, (doc: any) => ({
                    label: formatMessageApi({ documentType_i18n: doc.docTypeCode }),
                    value: lodash.get(doc, 'idx'),
                  }))}
                  disabled={isDisabled}
                />
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    );
  }
}

export default CheckList;
