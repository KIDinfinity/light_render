import { useCallback } from 'react';
import { getRecordVoiceFile, getEnrollVoiceFile } from '@/services/owbNbProposalControllerService';
import { notification } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

type Deps = enrollType | recordType;

type enrollType = {
  recordingType: 'enroll';
  applicationNo: string;
  enrollId: string;
  fieldName: string;
};

type recordType = {
  recordingType: 'record';
  applicationNo: string;
  voiceRecordingLink: string;
  fieldName: string;
};

function isEnroll(deps: Deps): deps is enrollType {
  if (deps.recordingType === 'enroll') return true;
  return false;
}

async function getVoiceFile(deps: Deps) {
  const { applicationNo } = deps;
  if (isEnroll(deps)) {
    return getEnrollVoiceFile({
      enrollId: deps.enrollId,
    });
  } else {
    return getRecordVoiceFile({
      applicationNo,
      voiceRecordingLink: deps.voiceRecordingLink,
    });
  }
}

export default (deps: Deps) => {
  const handler = useCallback(async () => {
    const result = await getVoiceFile(deps);
    const fieldName = deps.fieldName;
    if (!(result instanceof Blob)) {
      // 通用apiError
      const promptMessages = lodash.get(result, 'promptMessages', []);
      if (promptMessages.length > 0) {
        notification.error({
          message: formatMessageApi({
            Label_COM_ErrorMessage: promptMessages[0]?.content || 'Error',
          }),
        });
      }
      // 对家apiError
      if (lodash.isEmpty(result)) {
        notification.error({
          message: formatMessageApi(
            {
              Label_COM_WarningMessage: 'MSG_001131',
            },
            fieldName,
            '404',
            ''
          ),
        });
      }

      const { code, message } = result;
      if (!!code) {
        notification.error({
          message: formatMessageApi(
            {
              Label_COM_WarningMessage: 'MSG_001131',
            },
            fieldName,
            code,
            message || ''
          ),
        });
      }
    }
  }, [deps]);
  return handler;
};
