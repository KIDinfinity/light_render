function saveErrorRef(this: any) {
  const { dispatch } = this.props;
  if (this.nodeRef.current) {
    this.saveErrorRef = true;
    dispatch({
      type: 'formCommonController/saveErrorRef',
      payload: {
        ref: this.nodeRef.current,
        errorRefId: this.errorRefId,
      },
    });
  }
}

export default saveErrorRef;
