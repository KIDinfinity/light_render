import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import SelectGroup from 'bpm/components/SelectGroup';
import { notAuthOrDraftReason } from 'bpm/pages/Envoy/_utils/getDisabled';
import { EGlobalAuthCode, ESelfAuthCode } from 'bpm/pages/Envoy/enum';

const ViewUI: any = Form.create({
  mapPropsToFields: (props: any) => {
    return formUtils.mapObjectToFields({
      attachDocs: lodash.map(
        lodash.get(props, 'data.attachDocs'),
        (item: any) => item.externalDocId
      ),
    });
  },
})(({ editable, data, form }: any) => {
  const { envoyAuth, status, attachDocs } = data;
  const dispatch = useDispatch();
  const { globalEditAuth, caseNo, attachDocArr } = useSelector((state: any) => ({
    globalEditAuth: lodash.get(state.authController, EGlobalAuthCode.EDIT),
    ...lodash.pick(state.envoyController, ['caseNo', 'attachDocArr']),
  }));
  useEffect(() => {
    dispatch({
      type: 'envoyController/getAttachDocArr',
    });
  }, caseNo);

  const saveReasonAttachDocument = (obj: any) => {
    dispatch({
      type: 'envoyController/saveReasonAttachDocument',
      payload: {
        data,
        attachDocsObj: obj,
      },
    });
  };

  return useMemo(
    () => (
      <SelectGroup
        form={form}
        disabled={
          !editable ||
          notAuthOrDraftReason({
            globalAuth: globalEditAuth,
            selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
            status,
          })
        }
        buttonLabelKey="Label_Envoy_attachdocument"
        fieldName="attachDocs"
        onChange={saveReasonAttachDocument}
        dicts={attachDocArr}
        dictName="docName"
        dictValue="externalDocId"
      />
    ),
    [attachDocArr, status, attachDocs]
  );
});

export default function Documents(props: any) {
  return <ViewUI {...props} />;
}
