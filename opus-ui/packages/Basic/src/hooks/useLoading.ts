import { useState } from 'react';

export default () => {
  const [loading, setLoading]: [boolean, any] = useState(false);

  return {
    loading,
    setLoading,
  };
};
