/* eslint-disable no-underscore-dangle */
/* eslint-disable-next-line no-underscore-dangle */
export default (store) => {
  if (!window.__MOBX_DEVTOOLS_STORE) {
    window.__MOBX_DEVTOOLS_STORE = store;
  }
}