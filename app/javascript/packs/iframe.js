import { iframeResize } from 'iframe-resizer'
const element_id = document.currentScript.getAttribute('data-container-id');
const path = document.currentScript.getAttribute('data-pathname');
const element = document.getElementById(element_id);

const iframe = document.createElement('iframe');
iframe.id = 'showChart'
iframe.src = path;
iframe.style.width = 100+'%'
element.appendChild(iframe);

iframeResize({}, iframe);
