export default ({ app }) => {
  const getCookies = () => {
    return document.cookie.split(';').map(function(c) {
      return c.trim().split('=').map(decodeURIComponent);
    }).reduce(function(a, b) {
      try {
        a[b[0]] = JSON.parse(b[1]);
      } catch (e) {
        a[b[0]] = b[1];
      }
      return a;
    }, {});
  }

  const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  window.onload = () => {
    let { sglid } = getCookies()
    if (!sglid) {
      sglid = uuidv4()
      var exdate=new Date()
      exdate.setDate(exdate.getDate() + 3650)
      document.cookie=`sglid=${sglid}; domain=.supergreenlab.com; path=/; expires=${exdate.toUTCString()}`;
    }
    app.$matomo && app.$matomo.setUserId(sglid)
  }
}
