import React, { useRef, useState, useEffect } from 'react';
import { Form, Row, Col, Modal, Tabs } from 'antd';
import lodash from 'lodash';
import { connect } from 'dva';
import ModalWarnMessage from '@/components/ModalWarnMessage';
import { FormItemInput, FormItemSelect } from 'basic/components/Form';
import Git from 'sql/pages/Patch/Git';

const { TabPane } = Tabs;

function DeletePatchModal({
  form,
  dispatch,
  gitAccount,
  showDataPatchModal,
  dataPatchPromise,
  region,
  patchList = [],
}: any) {
  const [visible, setVisible] = useState(false);
  const [pathItems, setPathItems] = useState([]);
  const [itemInfo, setItemInfo] = useState({});
  const [activeKey, setActiveKey] = useState('createNew');

  const Environment = [
    { dictCode: 'presit', dictName: 'presit' },
    { dictCode: 'sit', dictName: 'sit' },
    { dictCode: 'uat', dictName: 'uat' },
    { dictCode: 'dev', dictName: 'dev' },
  ];

  const ref: any = useRef();
  const patch = patchList.map((item: any) => ({
    dictCode: item.patchName,
    dictName: item.patchName,
    patchItems: item.patchItems,
  }));

  const onOk = () => {
    form.validateFields({ force: true }, async (error: any, values: any) => {
      if (error) {
        ref?.current?.hideLoading?.();
        return;
      }
      if (values.patchNameSelect) {
        const { environments, regions, targetDataSource: dataSource } = itemInfo;
        const {
          patchNameSelect: patchName,
          itemNameSelect: patchItemName,
          jiraNum,
          commitMessage,
        } = values;
        dataPatchPromise({
          success: true,
          resultData: {
            environments,
            regions,
            dataSource,
            patchName,
            patchItemName,
            jiraNum,
            commitMessage,
            user: gitAccount.username,
          },
        });
        setVisible(false);
        dispatch({
          type: 'configurationCenter/closeDataPatchModal',
        });
        return;
      }
      const omitValues = lodash.omit(values, ['patchNameSelect', 'itemNameSelect']);
      dataPatchPromise({
        success: true,
        resultData: {
          ...omitValues,
          environments: lodash
            .uniqBy(omitValues.environments, lodash.toLower)
            .join(',')
            .toLocaleLowerCase(),
          regions: lodash.uniqBy(omitValues.regions, lodash.toLower).join(',').toLocaleLowerCase(),
          user: gitAccount.username,
        },
      });
      setVisible(false);
      dispatch({
        type: 'configurationCenter/closeDataPatchModal',
      });
    });
  };

  useEffect(() => {
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: ['Dropdown_COM_Region'],
    });
  }, []);

  useEffect(() => {
    if (gitAccount?.username && showDataPatchModal) {
      dispatch({ type: 'sqlController/getPatchList' });
    }
  }, [gitAccount?.username, showDataPatchModal]);

  useEffect(() => {
    if (showDataPatchModal) {
      Modal.confirm({
        title: 'Confirm',
        content: 'Do you want to add these changes to a data patch?',
        okText: 'OK',
        cancelText: 'Cancel',
        onOk: () => {
          setVisible(true);
        },
        onCancel: () => {
          dataPatchPromise({ success: false });
          dispatch({
            type: 'configurationCenter/closeDataPatchModal',
          });
        },
      });
      setPathItems([]);
    }
  }, [showDataPatchModal]);
  return (
    <>
      {showDataPatchModal && (
        <div>
          {visible && <Git />}
          {visible && (
            <ModalWarnMessage
              ref={ref}
              visible={visible}
              width={800}
              onCancel={() => {
                dataPatchPromise({ success: false });
                setVisible(false);
                dispatch({
                  type: 'configurationCenter/closeDataPatchModal',
                });
              }}
              onOk={onOk}
              okText="OK"
              closable={false}
              cancelText="Cancel"
              hiddenExtraText
              maskClosable={false}
              maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
            >
              <Tabs
                style={{ overflow: 'visible' }}
                activeKey={activeKey}
                onChange={(e) => {
                  setActiveKey(e);
                  setPathItems([]);
                  form.resetFields();
                }}
              >
                <TabPane tab="Create New" key="createNew">
                  <Form>
                    <Row type="flex" gutter={12}>
                      <Col span={24}>
                        <FormItemInput
                          form={form}
                          formName="patchName"
                          labelId="Patch Name"
                          required={activeKey === 'createNew'}
                        />
                      </Col>
                    </Row>
                    <Row type="flex" gutter={12}>
                      <Col span={12}>
                        <FormItemInput
                          form={form}
                          formName="patchItemName"
                          labelId="Item Name"
                          required={activeKey === 'createNew'}
                        />
                      </Col>
                      <Col span={12}>
                        <FormItemInput
                          form={form}
                          formName="dataSource"
                          labelId="Data Source"
                          required={activeKey === 'createNew'}
                        />
                      </Col>
                    </Row>
                    <Row type="flex" gutter={12}>
                      <Col span={12}>
                        <FormItemSelect
                          mode="multiple"
                          form={form}
                          formName="environments"
                          labelId="Environments"
                          required={activeKey === 'createNew'}
                          dicts={Environment}
                        />
                      </Col>
                      <Col span={12}>
                        <FormItemSelect
                          form={form}
                          mode="multiple"
                          formName="regions"
                          labelId="Regions"
                          required={activeKey === 'createNew'}
                          dicts={region}
                        />
                      </Col>
                    </Row>
                    <Row type="flex" gutter={12}>
                      <Col span={12}>
                        <FormItemInput
                          form={form}
                          formName="jiraNum"
                          labelId="JIRA Number"
                          required={activeKey === 'createNew'}
                        />
                      </Col>
                      <Col span={12}>
                        <FormItemInput
                          form={form}
                          formName="commitMessage"
                          labelId="Commit Message"
                          required={activeKey === 'createNew'}
                        />
                      </Col>
                    </Row>
                  </Form>
                </TabPane>
                <TabPane tab="Select Exist" key="selectExist">
                  <Form>
                    <Row type="flex" gutter={12}>
                      <Col span={12}>
                        <FormItemSelect
                          form={form}
                          formName="patchNameSelect"
                          labelId="patch"
                          required={activeKey === 'selectExist'}
                          dicts={patch}
                          onChange={(value, jsxElement) => {
                            setPathItems(
                              jsxElement.props['data-item'].patchItems.map((item: any) => ({
                                dictCode: item.patchItemName,
                                dictName: item.patchItemName,
                                item,
                              }))
                            );
                          }}
                        />
                      </Col>
                      <Col span={12}>
                        <FormItemSelect
                          form={form}
                          formName="itemNameSelect"
                          labelId="item"
                          required={activeKey === 'selectExist'}
                          dicts={pathItems}
                          onChange={(value, jsxElement) => {
                            setItemInfo(jsxElement.props['data-item'].item);
                          }}
                        />
                      </Col>
                    </Row>
                    <Row type="flex" gutter={12}>
                      <Col span={12}>
                        <FormItemInput
                          form={form}
                          formName="jiraNum"
                          labelId="JIRA Number"
                          required={activeKey === 'selectExist'}
                        />
                      </Col>
                      <Col span={12}>
                        <FormItemInput
                          form={form}
                          formName="commitMessage"
                          labelId="Commit Message"
                          required={activeKey === 'selectExist'}
                        />
                      </Col>
                    </Row>
                  </Form>
                </TabPane>
              </Tabs>
            </ModalWarnMessage>
          )}
        </div>
      )}
    </>
  );
}

export default connect(
  ({ sqlController, loading, configurationCenter, dictionaryController }: any) => ({
    patchList: sqlController?.tempDataPatch?.patchList,
    gitAccount: sqlController?.gitAccount,
    loading: loading.effects['sqlController/updateChildPatch'],
    showDataPatchModal: configurationCenter.showDataPatchModal,
    dataPatchPromise: configurationCenter.dataPatchPromise,
    region: dictionaryController.DropDown_COM_Region,
  })
)(Form.create()(DeletePatchModal));
