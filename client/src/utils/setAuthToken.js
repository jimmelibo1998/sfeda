import myServer from "../apis/myServer";

const setAuthToken = token => {
  if (token) {
    myServer.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete myServer.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
