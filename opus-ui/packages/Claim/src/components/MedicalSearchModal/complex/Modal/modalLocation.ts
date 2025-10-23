import lodash from 'lodash';
import { LS, LSKey } from '@/utils/cache';

class ModalLocation {
  constructor(location: any) {
    this.setLocation(location);
    this.setLastMove(lodash.pick(location, ['moveLeft', 'moveRight', 'moveTop', 'moveBottom']));
  }

  moveStartLocation = {};

  resizeType = '';

  resizeStartLocation = {};

  location = {
    left: '30vw',
    right: '30vw',
    top: '10vh',
    moveX: 0,
    moveY: 0,
    xSignLeft: '',
    xSignRight: '',
    ySignTop: '',
    ySignBottom: '',
  };

  lastMove = {
    moveX: 0,
    moveY: 0,
    moveLeft: 0,
    moveRight: 0,
    moveTop: 0,
    moveBottom: 0,
  };

  setLocation = (location: any) => {
    this.location = location;
    LS.setItem(LSKey.TBLSEARCH_LOCATION, location);
  };

  setLastMove = (lastMove: any) => {
    this.lastMove = lastMove;
  };

  caculationMove = (startLocation: any, endLocation: any) => {
    const { lastMove } = this;
    const { pageX, pageY } = endLocation;
    const moveX = pageX - startLocation.pageX;
    const moveY = pageY - startLocation.pageY;
    const moveLeft = moveX + lastMove.moveLeft || 0;
    const moveRight = moveX + lastMove.moveRight || 0;
    const moveTop = moveY + lastMove.moveTop || 0;
    const moveBottom = moveY + lastMove.moveBottom || 0;
    const xSignLeft = moveLeft < 0 ? '-' : '+';
    const xSignRight = moveRight < 0 ? '+' : '-';
    const ySignTop = moveTop < 0 ? '-' : '+';
    const left = `calc(30vw ${xSignLeft} ${Math.abs(moveLeft)}px)`;
    const right = `calc(30vw ${xSignRight} ${Math.abs(moveRight)}px)`;
    const top = `calc(10vh ${ySignTop} ${Math.abs(moveTop)}px)`;
    return {
      left,
      right,
      top,
      moveX,
      moveY,
      moveLeft,
      moveRight,
      moveTop,
      moveBottom,
    };
  };

  generateNewLocationStyle = (newLocation: any) => {
    const { left, right, top } = newLocation;
    const style = `left:${left};right:${right};top:${top};`;
    return style;
  };

  handleMove = (e: any) => {
    const { pageX, pageY } = e;
    const result = this.caculationMove(this.moveStartLocation, { pageX, pageY });
    const dom = document.getElementById('tblSearhModal');
    // eslint-disable-next-line no-unused-expressions
    dom?.setAttribute('style', this.generateNewLocationStyle(result));
    this.setLocation(result);
  };

  handleMouseUp = (e: any) => {
    const { location, handleMove, handleMouseUp, setLastMove } = this;
    const { pageX, pageY } = e;
    this.moveStartLocation = { pageX, pageY };
    setLastMove(
      lodash.pick(location, ['moveX', 'moveY', 'moveLeft', 'moveRight', 'moveTop', 'moveBottom'])
    );
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  handleResize = (e: any) => {
    const { pageX, pageY } = e;
    const {
      location,
      generateNewLocationStyle,
      caculationMove,
      resizeStartLocation,
      setLocation,
    } = this;

    const { right, left, moveX, moveRight, moveLeft } = caculationMove(resizeStartLocation, {
      pageX,
      pageY,
    });
    const dom = document.getElementById('tblSearhModal');
    switch (this.resizeType) {
      case 'right':
        setLocation({
          ...location,
          moveX,
          right,
          moveRight,
        });
        // eslint-disable-next-line no-unused-expressions
        dom?.setAttribute('style', generateNewLocationStyle(location));
        break;
      case 'left':
        setLocation({
          ...location,
          moveX,
          left,
          moveLeft,
        });
        // eslint-disable-next-line no-unused-expressions
        dom?.setAttribute('style', generateNewLocationStyle(location));
        break;
      default:
        break;
    }
    const antTabsContentW = document.querySelector('#tblSearhModal .ant-tabs')?.clientWidth;
    const ele: any = document.querySelector('#tblSearhModal .ant-pagination');
    if (ele) {
      ele.style.width = `${antTabsContentW}px`;
    }
  };

  handleEndResize = (e: any) => {
    e.stopPropagation();
    const { pageX, pageY } = e;
    const { location, handleResize, handleEndResize, setLastMove } = this;
    this.resizeStartLocation = {
      pageX,
      pageY,
    };
    setLastMove(
      lodash.pick(location, ['moveX', 'moveY', 'moveLeft', 'moveRight', 'moveTop', 'moveBottom'])
    );
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', handleEndResize);
  };

  handleStartResize = (e: any, type: any) => {
    e.stopPropagation();
    const { pageX, pageY } = e;
    this.resizeStartLocation = {
      pageX,
      pageY,
    };
    this.resizeType = type;
    document.addEventListener('mousemove', this.handleResize);
    document.addEventListener('mouseup', this.handleEndResize);
  };

  handleStartMove = (e: any) => {
    const { pageX, pageY } = e;
    this.moveStartLocation = {
      pageX,
      pageY,
    };
    document.addEventListener('mousemove', this.handleMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  };
}

export default ModalLocation;
