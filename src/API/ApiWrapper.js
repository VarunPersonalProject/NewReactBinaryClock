let ACCESS_KEY = "zI7te_x9ps0qObBNww-DA65hyMopoXrRCWN_hiRFSE4",
  /**
   * SECRET_KEY = "q8uaVkxFh39iAEItCO3oomtGmnDrZIY17lvdyJwXIJo",
   * */
  BASEURL = "https://api.unsplash.com",
  isMOBILE = /Android|iPhone/.test(navigator.userAgent);

class ServiceWrapper {
  imgRequest({ url }) {
    return this.request({
      url: `${BASEURL}${url}?query=Animals&orientation=${
        isMOBILE ? "squarish" : "landscape"
      }&client_id=${ACCESS_KEY}`,
    }).then((oResponse) => oResponse.json());
  }

  request({ url }) {
    return fetch(url);
  }

  setWithExpiry(sKey, sValue, nExtra) {
    const dNow = new Date(),
      oItem = {
        value: sValue,
        expiry: dNow.getTime() + nExtra,
      };
    localStorage.setItem(sKey, JSON.stringify(oItem));
  }

  getWithExpiry(sKey) {
    const sItemStr = localStorage.getItem(sKey);
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

  setBackground(sKey) {
    const sLink = this.getWithExpiry(sKey),
      oStyle = document.body.style;

    oStyle.backgroundImage = `url('${sLink}')`;
    oStyle.backgroundSize = "cover";
  }
}
export default ServiceWrapper;
