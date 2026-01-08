// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/submissionFileInfo/reUploadSubmissionDoc */
export async function reUploadSubmissionDoc(
  body: API.SubmissionFileInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/registration/submissionFileInfo/reUploadSubmissionDoc',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/registration/submissionFileInfo/reUploadSubmissionSignature */
export async function reUploadSubmissionSignature(
  body: API.SubmissionFileInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/registration/submissionFileInfo/reUploadSubmissionSignature',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
