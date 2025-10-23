import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import Item from './Item';
import { NAMESPACE } from '../../activity.config';

const MailsCertificatesCorrespondences = ({ transactionId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/mailsCertificatesCorrespondencesInit`,
      payload: {
        transactionId,
      },
    });
  }, []);

  return <Item transactionId={transactionId} />;
};
export default MailsCertificatesCorrespondences;
