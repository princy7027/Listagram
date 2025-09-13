class Auth {
  static deauthenticateLocalUser() {
    localStorage.clear();
    return true;
  }
}

export default Auth;
