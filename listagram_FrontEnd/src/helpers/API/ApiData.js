import axios from "axios";
import { getToken } from "../utils/auth.util";

export const getHost = () => {

        return "http://localhost:5000/"
      // return import.meta.env.VITE_APP_API_PROD;

};

export const BaseURL = getHost();

const params = new Proxy(new URLSearchParams(window?.location?.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const defaultHeaders = {
  isAuth: true,
  AdditionalParams: {},
  isJsonRequest: true,
  api_key: true,
};

const handleError = (error) => {
  if (
    error &&
    error.hasOwnProperty("response") &&
    error.response &&
    error.response.hasOwnProperty("data") &&
    error.response.data &&
    error.response.data.hasOwnProperty("error") &&
    error.response.data.error
  ) {
    return error.response.data.error;
  } else {
    return error;
  }
};

export const ApiPostNoAuth = (type, userData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BaseURL + type, userData, getHttpOptions({ ...defaultHeaders, isAuth: false }))
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(handleError(error));
      });
  });
};

export const ApiPutNoAuth = (type, userData) => {
  return new Promise((resolve, reject) => {
    axios
      .put(BaseURL + type, userData, getHttpOptions({ ...defaultHeaders, isAuth: false }))
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(handleError(error));
      });
  });
};

export const ApiGetNoAuth = (type) => {
  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + type, getHttpOptions({ ...defaultHeaders, isAuth: false }))
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(handleError(error));
      });
  });
};

export const ApiGet = (type, AdditionalHeader) => {
  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + type, getHeaderData(AdditionalHeader))
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(handleError(error));
      });
  });
};

export const ApiGetNoPid = (type, AdditionalHeader) => {
  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + type, getHeaderData(AdditionalHeader))
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(handleError(error));
      });
  });
};

export const ApiPost = (type, userData, AdditionalHeader) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BaseURL + type, userData, getHeaderData(AdditionalHeader))
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(handleError(error));
      });
  });
};

export const ApiPut = (type, userData, AdditionalHeader) => {
  return new Promise((resolve, reject) => {
    axios
      .put(BaseURL + type, userData, getHeaderData(AdditionalHeader))
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(handleError(error));
      });
  });
};

export const ApiDelete = (type, AdditionalHeader) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(BaseURL + type, getHeaderData(AdditionalHeader))
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(handleError(error));
      });
  });
};

export const getHttpOptions = (options = defaultHeaders) => {
  let headers = {};
  if (options.hasOwnProperty("isAuth") && options.isAuth) {
    if (getToken()) {
      headers["Authorization"] = "Bearer " + getToken();
    } else {
      headers["Authorization"] = "Bearer " + params.token;
    }
  }

  if (options.hasOwnProperty("api_key") && options.api_key) {
    headers["api_key"] = "6QSy49rUTH";
  }
  if (options.hasOwnProperty("isJsonRequest") && options.isJsonRequest) {
    headers["Content-Type"] = "application/json";
  }

  if (options.hasOwnProperty("AdditionalParams") && options.AdditionalParams) {
    headers = { ...headers, ...options.AdditionalParams };
  }

  headers["ngrok-skip-browser-warning"] = "true";

  return { headers };
};

export const getHeaderData = (AdditionalHeader) => {
  let header = {
    ...getHttpOptions(),
  };
  if (AdditionalHeader) {
    header.headers = {
      ...header.headers,
      ...AdditionalHeader.headers,
    };
  }

  return header;
};

export const formDataHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};


export const urlEncodedHeader = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};
