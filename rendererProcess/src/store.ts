import { createStoreon, StoreonModule } from "storeon";
import { InstBotSettings, StoreEvents, StoreState } from "../../types";
import { notification } from "antd";
import { ArgsProps } from "antd/es/notification";

const { ipcRenderer } = window.require("electron");

const globalStore: StoreonModule<StoreState, StoreEvents> = store => {
  // Save store data on change
  const saveState = async () => await ipcRenderer.invoke("setBotSettings", store.get());

  // Set empty default struct
  store.on("@init", () => ({
    auth: {
      username: "",
      password: "",
    },

    bot: {
      isRemovePopular: true,
      isClickLike: true,
      isClickSubscribe: true,
      isWriteComment: true,
    },

    delays: {
      afterWriteComment: 5,
      afterClickLike: 5,
      afterClickSubscribe: 5,
      afterEndIteration: 5,
      afterChangeSource: 5,
    },

    dayLimits: {
      likes: 180,
      comments: 180,
      subscribes: 180,
    },

    browser: {
      headless: true,
      args: [],
      defaultViewport: null,
    },

    sourcesList: [],
    commentsList: [],
  }));

  // Get bot settings on init
  store.on("fetchBotSettings", async () => {
    const settings: InstBotSettings = await ipcRenderer.invoke("getBotSettings");
    store.dispatch("set", settings);
  });

  // Replace all state data
  store.on("set", (state, event) => event);

  // Set auth username
  store.on("setUsername", async (state, event) => {
    const newState = { ...state, auth: { ...state.auth, username: event } };
    await saveState();
    store.dispatch("set", newState);
  });

  // Set auth password
  store.on("setPassword", async (state, event) => {
    const newState = { ...state, auth: { ...state.auth, password: event } };
    await saveState();
    store.dispatch("set", newState);
  });

  // Set sources list
  store.on("setSources", async (state, event) => {
    const newState = { ...state, sourcesList: event };
    await saveState();
    store.dispatch("set", newState);
  });

  // Set comments list
  store.on("setComments", async (state, event) => {
    const newState = { ...state, commentsList: event };
    await saveState();
    store.dispatch("set", newState);
  });

  // Set limit for comments
  store.on("setLimitComments", async (state, event) => {
    const newState = { ...state, dayLimits: { ...state.dayLimits, comments: event } };
    await saveState();
    store.dispatch("set", newState);
  });

  // Set limit for likes
  store.on("setLimitLikes", async (state, event) => {
    const newState = { ...state, dayLimits: { ...state.dayLimits, likes: event } };
    await saveState();
    store.dispatch("set", newState);
  });

  // Set limit for subscribes
  store.on("setLimitSubscribes", async (state, event) => {
    const newState = { ...state, dayLimits: { ...state.dayLimits, subscribes: event } };
    await saveState();
    store.dispatch("set", newState);
  });

  // Set delay for comments
  store.on("setCommentsDelay", async (state, event) => {
    const newState = { ...state, delays: { ...state.delays, afterWriteComment: event } };
    await saveState();
    store.dispatch("set", newState);
  });

  // Set delay for likes
  store.on("setLikeDelay", async (state, event) => {
    const newState = { ...state, delays: { ...state.delays, afterClickLike: event } };
    await saveState();
    store.dispatch("set", newState);
  });

  // Set delay for subscribes
  store.on("setSubscribeDelay", async (state, event) => {
    const newState = { ...state, delays: { ...state.delays, afterClickSubscribe: event } };
    await saveState();
    store.dispatch("set", newState);
  });

  // Set delay between iterations
  store.on("setIterationDelay", async (state, event) => {
    const newState = { ...state, delays: { ...state.delays, afterEndIteration: event } };
    await saveState();
    store.dispatch("set", newState);
  });

  // Set delay for change source process
  store.on("setChangeSourceDelay", async (state, event) => {
    const newState = { ...state, delays: { ...state.delays, afterChangeSource: event } };
    await saveState();
    store.dispatch("set", newState);
  });

  // Set browser arguments
  store.on("setBrowserArgs", async (state, event) => {
    const newState = { ...state, browser: { ...state.browser, args: event } };
    await saveState();
    store.dispatch("set", newState);
  });

  // Set browser mode (headless - off/on)
  store.on("setBrowserHeadless", async (state, event) => {
    const newState = { ...state, browser: { ...state.browser, headless: event } };
    await saveState();
    store.dispatch("set", newState);
  });
};

export const store = createStoreon<StoreState, StoreEvents>([globalStore]);
