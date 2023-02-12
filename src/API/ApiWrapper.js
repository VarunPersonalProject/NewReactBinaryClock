const ACCESS_KEY = "zI7te_x9ps0qObBNww-DA65hyMopoXrRCWN_hiRFSE4",
  /**
   * SECRET_KEY = "q8uaVkxFh39iAEItCO3oomtGmnDrZIY17lvdyJwXIJo",
   * */
  UNSPLASH_BASEURL = "https://api.unsplash.com",
  ICON_BASEURL = "https://icons.duckduckgo.com",
  isMOBILE = /Android|iPhone/.test(navigator.userAgent);

class ServiceWrapper {
  imgRequest({ url }) {
    return this.request({
      url: `${UNSPLASH_BASEURL}${url}?query=Animals&orientation=${
        isMOBILE ? "squarish" : "landscape"
      }&client_id=${ACCESS_KEY}`,
    }).then((oResponse) => oResponse.json());
  }

  iconRequest({ url }) {
    return this.request({
      url: `${ICON_BASEURL}/ip2/${url.host.slice(4)}.ico`,
      mode: "no-cors",
    }).then((oResponse) => oResponse.blob());
  }

  request({ url, mode }) {
    return fetch(url, { mode });
  }

  setWithExpiry(sKey, sValue, nExtra) {
    const dNow = new Date(),
      oItem = {
        value: sValue,
        expiry: dNow.getTime() + nExtra,
      };
    this.setStorage(sKey, JSON.stringify(oItem));
  }

  getWithExpiry(sKey) {
    const sItemStr = this.getStorage(sKey);
    if (!sItemStr) {
      return null;
    }
    const oItem = JSON.parse(sItemStr),
      dNow = new Date();
    if (dNow.getTime() > oItem.expiry) {
      localStorage.removeItem(sKey);
      return null;
    }
    return oItem.value;
  }

  setStorage(sKey, sValue) {
    localStorage.setItem(sKey, sValue);
  }

  getStorage(sKey) {
    return localStorage.getItem(sKey);
  }

  setBackground(sKey) {
    const sLink = this.getWithExpiry(sKey),
      oStyle = document.body.style;

    oStyle.backgroundImage = `url('${sLink}')`;
    oStyle.backgroundSize = "cover";
  }
}
export default ServiceWrapper;
