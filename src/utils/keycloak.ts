import Keycloak, { KeycloakOnLoad } from "keycloak-js";

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

/**
 * Initialize Keycloak and silently checking for an existing login.
 * @description Should be called before render() of app.
 */
export const initialize = () => {
  const config = {
    checkLoginIframe: false,
    onLoad: "check-sso" as KeycloakOnLoad, // overwrite inexplicable TS error
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
  };
  return keycloak.init(config);
};

/** @type { Keycloak } keycloak */
export default keycloak;
