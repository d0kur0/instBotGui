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

    setTimeout(() => {
      store.dispatch("activeProcesses/save/set", false);
    }, 1000);
  });
  store.on("settings/set", (state, settings) => {
    return { ...state, settings };
  });
  store.on("settings/auth/setUserName", (state, username) => {
    state.settings.auth.username = username;
    store.dispatch("settings/asyncTask/set", state.settings);
    return state;
  });
  store.on("settings/auth/setPassword", (state, password) => {
    state.settings.auth.password = password;
    store.dispatch("settings/asyncTask/set", state.settings);
    return state;
  });
  store.on("settings/dayLimits/setComments", (state, limit) => {
    state.settings.dayLimits.comments = limit;
    store.dispatch("settings/asyncTask/set", state.settings);
    return state;
  });
  store.on("settings/dayLimits/setLikes", (state, limit) => {
    state.settings.dayLimits.likes = limit;
    store.dispatch("settings/asyncTask/set", state.settings);
    return state;
  });
  store.on("settings/dayLimits/setSubscribes", (state, limit) => {
    state.settings.dayLimits.subscribes = limit;
    store.dispatch("settings/asyncTask/set", state.settings);
    return state;
  });
  store.on("settings/sourcesList/set", (state, sources) => {
    state.settings.sourcesList = sources;
    store.dispatch("settings/asyncTask/set", state.settings);
    return state;
  });
  store.on("settings/commentsList/set", (state, comments) => {
    state.settings.commentsList = comments;
    store.dispatch("settings/asyncTask/set", state.settings);
    return state;
  });
  store.on("settings/delays/setComments", (state, delay) => {
    state.settings.delays.afterWriteComment = delay;
    store.dispatch("settings/asyncTask/set", state.settings);
    return state;
  });
  store.on("settings/delays/setChangeSource", (state, delay) => {
    state.settings.delays.afterChangeSource = delay;
    store.dispatch("settings/asyncTask/set", state.settings);
    return state;
  });
  store.on("settings/delays/setIteration", (state, delay) => {
    state.settings.delays.afterEndIteration = delay;
    store.dispatch("settings/asyncTask/set", state.settings);
    return state;
  });
  store.on("settings/delays/setLikes", (state, delay) => {
    state.settings.delays.afterClickLike = delay;
    store.dispatch("settings/asyncTask/set", state.settings);
    return state;
  });
  store.on("settings/delays/setSubscribes", (state, delay) => {
    state.settings.delays.afterClickSubscribe = delay;
    store.dispatch("settings/asyncTask/set", state.settings);
    return state;
  });
  store.on("settings/browser/setArgs", (state, args) => {
    state.settings.browser.args = args;
    store.dispatch("settings/asyncTask/set", state.settings);
    return state;
  });
  store.on("settings/browser/setHeadless", (state, isHeadless) => {
    state.settings.browser.headless = isHeadless;
    store.dispatch("settings/asyncTask/set", state.settings);
    return state;
  });
  store.on("errorMessage/set", (state, errorMessage) => {
    return { ...state, errorMessage };
  });
  store.on("successMessage/set", (state, successMessage) => {
    return { ...state, successMessage };
  });
  store.on("activeProcesses/bot/set", (state, value) => {
    state.activeProcesses.bot = value;
    return state;
  });
  store.on("activeProcesses/save/set", (state, value) => {
    state.activeProcesses.save = value;
    return state;
  });
};

export const store = createStoreon<StoreState, StoreEvents>([globalStore]);
