import base64 from "./base64";

const isJWT = (jwt: string) => {
  return String(jwt)
    .match(/eyJ[A-Za-z0-9-_]+\.eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/]*/g);
};


export default function parseJwt(token: string): { header: string | null; payload: string | null } {
  if (isJWT(token) === null) {
    return {
      header: null,
      payload: null
    }
  }
  var [headerBase64Url, payloadBase64Url] = token.split(".");
  var headerStr = headerBase64Url.replace(/-/g, "+").replace(/_/g, "/");
  var payloadStr = payloadBase64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    base64(payloadStr, "decode")
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  return {
    header: base64(headerStr, "decode"),
    payload: jsonPayload
  };
}
