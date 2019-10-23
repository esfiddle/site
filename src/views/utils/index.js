import tokens from './tokens';
import keywords from './keywords';

function id (elm) {
  let id = elm.getAttribute('id');
  if (!id && !!elm.getAttribute('class')) {
    id = elm.parentNode.getAttribute('title');
  } else if (!id) {
    id = elm.getAttribute('title')
  } return Number(id);
}

function edit (elm) {
  return elm.children[elm.children.length - 1];
}

function line (index) {
  return document.getElementById(index);
}

function token (elm) {
  if (!!elm.getAttribute('class')) {
    return elm.getAttribute('title');
  } return null;
}

function os () {
  let OSName = 0;
  if (navigator.appVersion.indexOf("Win") > -1) OSName = 1;
  if (navigator.appVersion.indexOf("Mac") > -1) OSName = 2;
  if (navigator.appVersion.indexOf("X11") > -1) OSName = 3;
  if (navigator.appVersion.indexOf("Linux") > -1) OSName = 4;
  return OSName;
}

export {
  id,
  os,
  edit,
  line,
  token,
  tokens,
  keywords,
};
