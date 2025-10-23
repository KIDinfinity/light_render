function openCustomWindow(url: string, title: string) {
  const win = window.open();
  if (win === null) return;
  win.document.title = title;
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.width = '100%';
  iframe.style.height = '100vh';
  iframe.style.margin = '0';
  iframe.style.padding = '0';
  iframe.style.overflow = 'hidden';
  iframe.style.border = 'none';
  win.document.body.style.margin = '0';
  win.document.body.appendChild(iframe);
}

export default openCustomWindow;
