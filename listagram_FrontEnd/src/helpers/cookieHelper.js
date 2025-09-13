const host = window.location.hostname;

export const environmentTypes = {
  STAGING: "staging",
  PRODUCTION: "production",
};

export const getDomain = () => {
  switch (host) {
    case "localhost":
    case "127.0.0.1":
      return "localhost";
    case "shreehkj.netlify.app":
      return ".netlify.app";
    default:
      return "localhost";
  }
};

export const cookieOptions = {
  path: "/",
  // domain: getDomain(),
};

export const getEnvironment = () => {
  switch (host) {
    case "localhost":
      return environmentTypes.STAGING;

    default:
      return environmentTypes.STAGING;
  }
};
