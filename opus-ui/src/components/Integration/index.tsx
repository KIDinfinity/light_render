/* eslint-disable @typescript-eslint/no-throw-literal */
import React, { useState } from 'react';
import { Card, Form, Button, Spin, notification } from 'antd';
import JSONView from 'react-json-view';
import { callService } from '@/services/integrationTestControllerService';
import { serviceType } from '@/enum/IntegrationType';
import { FormItemInput, FormItemSelect, FormItemTextArea } from 'basic/components/Form';
import styles from './index.less';

const Integration = ({ form }: any) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [showData, setShowData] = useState(<div />);
  const { ws, restful, get } = serviceType;

  const copyResponse = () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', JSON.stringify(data));
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
    }
    document.body.removeChild(input);
  };

  const XMLtoPrettier = (xml: string) => {
    let format = '';
    let indent = '';
    const tab = '    ';
    try {
      xml.split(/>\s*</).forEach((item) => {
        if (item.match(/^\/\w/)) indent = indent.substring(tab.length);
        format += `${indent}<${item}>\n\r`;
        if (item.match(/^<?\w[^>]*[^/]$/)) indent += tab;
      });
    } catch (error) {
      return xml;
    }
    return format.substring(1, format.length - 3);
  };

  const submitRequset = async () => {
    const params = form.getFieldsValue();
    if (loading) {
      return;
    }

    const isGet = params.serviceType === get;

    const isEmpty = Object.entries(params)
      .filter((item) => !['proxyServer'].includes(item[0]))
      .map((item) => item[1])
      .some((item) => {
        return item === '' || item === undefined;
      });

    if (isEmpty && !isGet) {
      notification.error({ message: `传入的参数不得为空！` });
      form.validateFields();
      return;
    }

    setLoading(true);
    try {
      const isWs = params.serviceType === ws;

      if (params.proxyServer === '' || params.proxyServer === undefined) {
        delete params.proxyServer;
      }

      if (params.headMap === '' || params.headMap === undefined) {
        delete params.headMap;
      } else {
        params.headMap = JSON.parse(params.headMap);
      }

      if (params.requestData === '' || params.requestData === undefined) {
        delete params.requestData;
      } else if (!isWs) {
        params.requestData = JSON.parse(params.requestData);
      }

      if (isWs) {
        let paraphrase = params.requestData.replaceAll('\\', '');
        paraphrase = paraphrase.replaceAll('\n', '');
        params.requestData = paraphrase;
      }

      let response = await callService(params);
      setData(response);
      try {
        const json = <JSONView enableClipboard={false} src={response} theme="google" />;
        setShowData(json);
        if (typeof json.props.src !== 'object') {
          throw 'nojson';
        }
      } catch (err) {
        response = XMLtoPrettier(response);
        setShowData(response);
      }
    } catch (error) {
      notification.error({ message: `传入的参数格式不正确！` });
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.request}>
        {loading && <Spin className={styles.spin} size="large" />}
        <Form>
          <FormItemInput required labelId="serviceUrl" form={form} formName="serviceUrl" />
          <FormItemSelect
            required
            labelId="serviceType"
            form={form}
            formName="serviceType"
            dicts={[
              { dictName: ws, dictCode: ws },
              { dictName: restful, dictCode: restful },
              { dictName: get, dictCode: get },
            ]}
          />

          <FormItemInput labelId="proxyServer" form={form} formName="proxyServer" />

          <FormItemTextArea row={5} required labelId="headMap" form={form} formName="headMap" />
          <FormItemTextArea
            row={8}
            required
            labelId="requestData"
            form={form}
            formName="requestData"
          />
          <Button onClick={submitRequset}>提交</Button>
          <Button style={{ float: 'right' }} onClick={copyResponse}>
            复制response
          </Button>
        </Form>
      </Card>
      <Card className={styles.response}>
        <pre>{showData}</pre>
      </Card>
    </div>
  );
};

const FormWrapped = Form.create({})(Integration);

export default FormWrapped;
