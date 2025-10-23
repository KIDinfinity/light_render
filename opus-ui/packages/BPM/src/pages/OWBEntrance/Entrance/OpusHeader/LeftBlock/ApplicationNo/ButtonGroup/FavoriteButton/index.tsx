import { ReactComponent as FavoriteIcon } from './favorite.svg';
import { ReactComponent as FavoritedIcon } from './favorited.svg';
import createFavoriteTask from './createFavoriteTask';
import getInitFavoritStatus from './getInitFavoritStatus';
import React, { useState, useEffect } from 'react';
import styles from '../index.less';

const FavoriteButton = ({ newShow, taskId, userId }: any) => {
  const [favoriteStatus, setFavoriteStatus] = useState(0);

  const getStatus = async () => {
    const currentStatus = await getInitFavoritStatus({ userId, taskId });
    setFavoriteStatus(currentStatus);
  };

  useEffect(() => {
    if (!!newShow) {
      getStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newShow]);

  return (
    <>
      <span
        className={styles.favorite}
        onClick={async () => {
          await createFavoriteTask({ userId, taskId });
          getStatus();
        }}
      >
        {!favoriteStatus ? <FavoriteIcon /> : <FavoritedIcon />}
      </span>
    </>
  );
};
export default FavoriteButton;
