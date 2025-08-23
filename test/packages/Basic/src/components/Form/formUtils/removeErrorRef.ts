function removeErrorRef(this: any) {
  const { dispatch } = this.props;
  if (this.nodeRef.current) {
    this.saveErrorRef = false;
    dispatch({
      type: 'formCommonController/removeErrorRef',
      payload: {
        ref: this.nodeRef.current,
        errorRefId: this.errorRefId,
      },
    });
  }
}

export default removeErrorRef;
