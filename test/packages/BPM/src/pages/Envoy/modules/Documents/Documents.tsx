import React, { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import SelectGroup from 'bpm/components/SelectGroup';
import { notAuthOrDraftReason } from 'bpm/pages/Envoy/_utils/getDisabled';
import { EGlobalAuthCode, ESelfAuthCode } from 'bpm/pages/Envoy/enum';

const ViewUI: any = Form.create({
  mapPropsToFields: (props: any) => {
    const mapDocGroup = {};
    lodash.forEach(lodash.get(props, 'data.reasonDocs'), (doc: any) => {
      const { docGroupCode, docTypeCode, copies, comment } = doc;
      if (!mapDocGroup[docGroupCode]) {
        mapDocGroup[docGroupCode] = [];
      }
      mapDocGroup[docGroupCode].push(docTypeCode);
      mapDocGroup[`${docGroupCode}_${docTypeCode}_number`] = copies;
      mapDocGroup[`${docGroupCode}_${docTypeCode}_comment`] = comment;
    });
    return formUtils.mapObjectToFields(mapDocGroup);
  },
})(({ editable, data, form }: any) => {
  const { envoyAuth, status, reasonCode, reasonDocs, docGroupCodes } = data;

  const dispatch = useDispatch();
  const {
    globalEditAuth,
    caseCategoryReasonDocConfigs,
    caseCategory,
    allDocumentTypes,
  } = useSelector((state: any) => ({
    globalEditAuth: lodash.get(state.authController, EGlobalAuthCode.EDIT),
    ...lodash.pick(state.envoyController, [
      'caseCategoryReasonDocConfigs',
      'caseCategory',
      'allDocumentTypes',
    ]),
  }));

  useEffect(() => {
    if (lodash.isEmpty(allDocumentTypes)) {
      dispatch({
        type: 'envoyController/getDocumentTypes',
      });
    }
  }, []);

  const saveReasonDocuments = useCallback(
    async (obj: any) => {
      await dispatch({
        type: 'envoyController/saveReasonDocuments',
        payload: {
          data,
          documentObj: obj,
        },
      });
    },
    [data]
  );

  const changeCopiesFn = useCallback(
    async (obj: any) => {
      await dispatch({
        type: 'envoyController/saveReasonDocumentCopies',
        payload: {
          data,
          copiesObj: obj,
        },
      });
    },
    [data]
  );

  const changeCommentFn = useCallback(
    async (obj: any) => {
      await dispatch({
        type: 'envoyController/saveReasonDocumentComment',
        payload: {
          data,
          commentObj: obj,
        },
      });
    },
    [data]
  );

  return useMemo(() => {
    const reasonDocConfig = lodash.get(
      caseCategoryReasonDocConfigs,
      `${caseCategory}.${reasonCode}`,
      {}
    );
    const docButtonArr = lodash.map(docGroupCodes, (item: any) =>
      lodash.find(allDocumentTypes, { dictCode: item })
    );
    return (
      <>
        {lodash.map(lodash.compact(docButtonArr), (item: any) => {
          const { dictCode, dictName, dicts } = item;

          let docConfig;
          if (reasonDocs.length) {
            docConfig = lodash
              .chain(reasonDocs)
              .find({
                docGroupCode: dictCode,
              })
              .value();
            if (!docConfig) {
              docConfig = lodash
                .chain(reasonDocConfig)
                .find({
                  docGroupCode: dictCode,
                })
                .value();
            }
          } else {
            docConfig = lodash
              .chain(reasonDocConfig)
              .find({
                docGroupCode: dictCode,
              })
              .value();
          }

          if (!docConfig) {
            return null;
          }
          const { enableCopies, enableComment } = docConfig;

          return (
            <SelectGroup
              key={dictCode}
              form={form}
              disabled={
                !editable ||
                notAuthOrDraftReason({
                  globalAuth: globalEditAuth,
                  selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
                  status,
                })
              }
              buttonLabel={dictName}
              fieldName={dictCode}
              onChange={saveReasonDocuments}
              dicts={dicts}
              hideEmptyBtn
              minNumber={1}
              enableNumber={enableCopies}
              changeNumberFn={changeCopiesFn}
              enableComment={enableComment}
              changeCommentFn={changeCommentFn}
            />
          );
        })}
      </>
    );
  }, [
    caseCategoryReasonDocConfigs,
    caseCategory,
    reasonCode,
    allDocumentTypes,
    status,
    docGroupCodes,
    reasonDocs,
  ]);
});

export default function Documents(props: any) {
  return <ViewUI {...props} />;
}
