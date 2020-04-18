import mixpanelLibrary from "mixpanel-browser";
import { config } from "./config";

let hasInitialised = false;

export const init = () => {
  if (hasInitialised) {
    return;
  }

  const enabled = config.get("mixpanel.enabled", false);
  const token = config.get("mixpanel.token");

  if (!enabled) {
    console.log(
      "Services/Mixpanel: Initialisation failed as mixpanel is not enabled in the config."
    );

    return;
  }

  if (!token) {
    console.log(
      "Services/Mixpanel: Initialisation failed as there is no TOKEN found in the config."
    );

    return;
  }

  hasInitialised = true;
  mixpanelLibrary.init(token);
};

export const track = (...args) => {
  init();
  mixpanelLibrary.track(...args);
};

export const mixpanel = {
  init,
  track,
};
