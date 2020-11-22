import { createStoreon, StoreonModule } from "storeon";
import { EmptySettings, StoreEvents, StoreState } from "../../../types";

const { ipcRenderer } = window.require("electron");

const globalStore: StoreonModule<StoreState, StoreEvents> = store => {
  store.on("@init", () => {
    store.dispatch("settings/asyncTask/get");
    return {
      settings: EmptySettings,
      errorMessage: "",
      successMessage: "",
      activeProcesses: {
        save: false,
        bot: false,
      },
    };
  });
  store.on("@changed", () => store.dispatch("settings/asyncTask/set", store.get().settings));

  store.on("settings/asyncTask/get", async () => {
    try {
      const settings = await ipcRenderer.invoke("bot/getSettings");
      store.dispatch("settings/set", settings);
    } catch (error) {
      store.dispatch("errorMessage/set", "Ошибка чтения настроек бота");
    }
  });
  store.on("settings/asyncTask/set", async state => {
    store.dispatch("activeProcesses/save/set", true);

    try {
      await ipcRenderer.invoke("bot/setSettings", state.settings);
    } catch (error) {
      store.dispatch("errorMessage/set", "Ошибка сохранения изменений");
    }

    store.dispatch("activeProcesses/save/set", false);
  });
  store.on("settings/set", (state, settings) => {
    return { ...state, settings };
  });
  store.on("settings/auth/setUserName", (state, username) => {
    state.settings.auth.username = username;
    return state;
  });
  store.on("settings/auth/setPassword", (state, password) => {
    state.settings.auth.password = password;
    return state;
  });
  store.on("settings/dayLimits/setComments", (state, limit) => {
    state.settings.dayLimits.comments = limit;
    return state;
  });
  store.on("settings/dayLimits/setLikes", (state, limit) => {
    state.settings.dayLimits.likes = limit;
    return state;
  });
  store.on("settings/dayLimits/setSubscribes", (state, limit) => {
    state.settings.dayLimits.subscribes = limit;
    return state;
  });
  store.on("settings/sourcesList/set", (state, sources) => {
    state.settings.sourcesList = sources;
    return state;
  });
  store.on("settings/commentsList/set", (state, comments) => {
    state.settings.commentsList = comments;
    return state;
  });
  store.on("settings/delays/setComments", (state, delay) => {
    state.settings.delays.afterWriteComment = delay;
    return state;
  });
  store.on("settings/delays/setChangeSource", (state, delay) => {
    state.settings.delays.afterChangeSource = delay;
    return state;
  });
  store.on("settings/delays/setIteration", (state, delay) => {
    state.settings.delays.afterEndIteration = delay;
    return state;
  });
  store.on("settings/delays/setLikes", (state, delay) => {
    state.settings.delays.afterClickLike = delay;
    return state;
  });
  store.on("settings/delays/setSubscribes", (state, delay) => {
    state.settings.delays.afterClickSubscribe = delay;
    return state;
  });
  store.on("settings/browser/setArgs", (state, args) => {
    state.settings.browser.args = args;
    return state;
  });
  store.on("settings/browser/setHeadless", (state, isHeadless) => {
    state.settings.browser.headless = isHeadless;
    return state;
  });
  store.on("errorMessage/set", (state, errorMessage) => {
    return { ...state, errorMessage };
  });
  store.on("successMessage/set", (state, successMessage) => {
    return { ...state, successMessage };
  });
};

export const store = createStoreon<StoreState, StoreEvents>([globalStore]);
