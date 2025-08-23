import { useState, useEffect } from 'react';
import { useSelector } from 'dva';
import { getAuth } from '@/auth/Utils';

// todo: support (string | object): boolean, object[]: { k: boolean }
export default (authCode: string[]) => {
  const commonAuthorityList = useSelector((state: any) => state.authController.commonAuthorityList);
  const [auth, setAuth] = useState<Record<string, boolean>>({});
  useEffect(() => {
    setAuth(
      Object.fromEntries(
        authCode.map((authorityCode) => [
          authorityCode,
          getAuth(commonAuthorityList, {
            authorityCode,
          }),
        ])
      )
    );
  }, authCode);

  return auth;
};
