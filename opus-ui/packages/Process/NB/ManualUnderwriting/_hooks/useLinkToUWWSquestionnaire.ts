import { useCallback } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetUWMeLinkAge from 'process/NB/ManualUnderwriting/_hooks/useGetUWMeLinkAge';
export default () => {
  const UWMeLinkAge = useGetUWMeLinkAge();

  const dispatch = useDispatch();
  return useCallback(async () => {
    const data = await dispatch({
      type: `${NAMESPACE}/getDataForSubmit`,
    });
    const response = await dispatch({
      type: 'UWWSQuestionnaire/getUWMEReturnUrlRequestParams',
      payload: {
        MUSubmitData: data,
      },
    });
    const { success, resultData: UWMERequestParams }: any = lodash.pick(response, [
      'success',
      'resultData',
    ]);
    if (success) {
      const newWindow = window.open();
      const { token, json: jsonObject, userId, host } = lodash.pick(UWMERequestParams, [
        'url',
        'json',
        'token',
        'userId',
        'host',
      ]);
      const json = JSON.stringify(jsonObject);
      const url = (() => {
        return lodash.toString(`${UWMeLinkAge}/${host}#`);
      })();

      newWindow?.document.write(
        `<form action='${url}' method="post" name="uwwsForm" style='display:none'>

        <input type="hidden" name="userId" value="${userId}"/>

        <input type="hidden" name="token" value="${token}"/>

        <input type=hidden name=json value='${json}'/>

    </form>`
      );

      newWindow?.document?.uwwsForm.submit();
    }
  }, [dispatch, UWMeLinkAge]);
};
