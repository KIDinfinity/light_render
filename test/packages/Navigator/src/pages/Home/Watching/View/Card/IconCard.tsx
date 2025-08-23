import React, { PureComponent } from 'react';
import CardModeIcon from 'navigator/assets/icon-mode-card.svg';
import CardListIcon from 'navigator/assets/icon-mode-table.svg';
import ModeSearchIcon from 'navigator/assets/icon-mode-inquiry.svg';
import ModeFlowIcon from 'navigator/assets/navigator-filter-search.svg';

class IconCard extends PureComponent {
  render() {
    const { type, size = [20, 20] } = this.props;

    let src = CardListIcon;
    if (type === 'list') {
      src = CardListIcon;
    } else if (type === 'card') {
      src = CardModeIcon;
    } else if (type === 'search') {
      src = ModeSearchIcon;

      return (
        <img src={src} width={size[0]} height={size[1]} style={{ verticalAlign: 'sub' }} alt="" />
      );
    } else if (type === 'flow') {
      src = ModeFlowIcon;
    }

    return <img src={src} width={size[0]} height={size[1]} alt="" />;
  }
}

export default IconCard;
