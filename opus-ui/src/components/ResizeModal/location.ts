import lodash from 'lodash';

const limit = {
  minWidth: 300,
  maxWidth: document.body.clientWidth,
  maxHeight: document.body.clientHeight,
  minHeight: 400,
};

class location {
  constructor({ id, height, width, moveLeft, moveTop, authHeight }: any) {
    this.id = id;

    this.initData({ height, width, moveLeft, moveTop, authHeight });
  }

  id = '';

  moveStartLocation = {};

  resizeType = '';

  resizeStartLocation = {};

  location: any = {
    height: 400,
    width: 400,
    moveX: 0,
    moveY: 0,
  };

  lastMove = {
    moveLeft: 0,
    moveTop: 0,
    height: 0,
    width: 0,
  };

  Location: any;

  setLastMove = (lastMove: any) => {
    this.lastMove = lastMove;
  };

  caculationMove = (startLocation: any, endLocation: any) => {
    const { pageX, pageY } = endLocation;
    const moveX = pageX - startLocation.pageX;
    const moveY = pageY - startLocation.pageY;
    let moveLeft = moveX + (this.lastMove.moveLeft || 0);
    let moveTop = moveY + (this.lastMove.moveTop || 0);

    let height = this.lastMove.height || this.location.height;
    let width = this.lastMove.width || this.location.width;
    if (this.resizeType) {
      height += this.resizeType === 'top' ? -moveY : moveY;
      width += this.resizeType === 'left' ? -moveX : moveX;
      if (height >= limit.maxHeight) {
        height = limit.maxHeight;
        moveTop = this.location.moveTop;
      }
      if (height < limit.minHeight) {
        height = limit.minHeight;
        moveTop = this.location.moveTop;
      }
      if (width >= limit.maxWidth) {
        moveLeft = this.location.moveLeft;
        width = limit.maxWidth;
      }
      if (width < limit.minWidth) {
        moveLeft = this.location.moveLeft;
        width = limit.minWidth;
      }
    }
    return {
      ...this.location,
      moveX,
      moveY,
      width,
      moveLeft,
      moveTop,
      height,
    };
  };

  generateNewLocationStyle = (newLocation: any) => {
    const { authHeight } = this.location;
    const { moveLeft, moveTop, height, width } = newLocation;
    const setSizeVal = (size: string | number) =>
      lodash.includes(`${size}`, '%') ? size : `${size || 0}px`;

    const style = `left:${setSizeVal(moveLeft)};top:${setSizeVal(moveTop)};display:block;height:${
      authHeight ? 'auto' : setSizeVal(height)
    };width:${setSizeVal(width)};`;

    return style;
  };

  handleMove = (e: any) => {
    e.stopPropagation();
    const { pageX, pageY } = e;
    const result = this.caculationMove(this.moveStartLocation, { pageX, pageY });
    const dom = document.getElementById(this.id);

    const { srcElement } = e;
    if (lodash.includes(srcElement.className, 'ant-')) return;

    dom?.setAttribute('style', this.generateNewLocationStyle(result));

    this.location = result;
  };

  handleMouseUp = (e: any) => {
    e.stopPropagation();
    const { handleMove, handleMouseUp, setLastMove } = this;
    const { pageX, pageY } = e;
    this.moveStartLocation = { pageX, pageY };
    setLastMove(lodash.pick(this.location, ['moveLeft', 'height', 'width', 'moveTop']));
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  handleResize = (e: any) => {
    e.stopPropagation();
    const { pageX, pageY } = e;
    const { generateNewLocationStyle, caculationMove, resizeStartLocation } = this;

    const { height, moveTop, width, moveLeft } = caculationMove(resizeStartLocation, {
      pageX,
      pageY,
    });

    const mapConfig = {
      top: {
        height,
        moveTop,
      },
      bottom: {
        height,
      },
      left: {
        width,
        moveLeft,
      },
      right: {
        width,
      },
    };

    const extra =
      lodash.isString(this.resizeType) && mapConfig[this.resizeType]
        ? mapConfig[this.resizeType]
        : {};

    this.location = {
      ...this.location,
      ...extra,
    };

    document
      .getElementById(this.id)
      ?.setAttribute('style', generateNewLocationStyle(this.location));
  };

  handleEndResize = (e: any) => {
    e.stopPropagation();
    const { pageX, pageY } = e;
    const { handleResize, handleEndResize, setLastMove } = this;
    this.resizeStartLocation = {
      pageX,
      pageY,
    };
    setLastMove(lodash.pick(this.location, ['moveLeft', 'height', 'width', 'moveTop']));
    this.resizeType = '';
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
    this.setLastMove(lodash.pick(this.location, ['moveLeft', 'height', 'width', 'moveTop']));
    this.resizeType = type;
    document.addEventListener('mousemove', this.handleResize);
    document.addEventListener('mouseup', this.handleEndResize);
  };

  handleStartMove = (e: any) => {
    e.stopPropagation();
    const { pageX, pageY } = e;
    this.moveStartLocation = {
      pageX,
      pageY,
    };

    document.addEventListener('mousemove', this.handleMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  };

  initData = ({ height, width, moveLeft, moveTop, authHeight }: any) => {
    const defaultLocation = {
      height: height || 800,
      width: width || 600,
      moveLeft: moveLeft || this.getInitMarginLeft(width || 600),
      moveTop: moveTop || 200,
      authHeight: authHeight || false,
    };

    this.location = defaultLocation;

    this.setLastMove(
      lodash.pick(defaultLocation, ['moveLeft', 'height', 'width', 'moveTop', 'authHeight'])
    );
    setTimeout(() => {
      document
        .getElementById(this.id)
        ?.setAttribute('style', `${this.generateNewLocationStyle(defaultLocation)}`);
    }, 0);
  };

  getInitMarginLeft = (width: any) => {
    const { clientWidth } = document.body;

    let newWidth = width;
    if (width && String(width).indexOf('%') > 0)
      newWidth = (clientWidth * Number(width.replace('%', ''))) / 100;

    return (Number(clientWidth) - Number(newWidth)) / 2;
  };
}

export default location;
