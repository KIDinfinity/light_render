import { useState, useEffect } from 'react';

export default (timing: any[]) => {
  const [abortController, setAbortController] = useState(new AbortController());
  useEffect(() => {
    abortController.abort();
    setAbortController(new AbortController());
    return () => {
      abortController.abort();
    };
  }, timing);

  return abortController.signal;
};
