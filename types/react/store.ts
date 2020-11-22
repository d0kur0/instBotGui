import { InstBotSettings } from "../..";

export const EmptySettings: InstBotSettings = {
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
};

export type SettingsEvents = {
  "settings/set": InstBotSettings;
  "settings/auth/setUserName": string;
  "settings/auth/setPassword": string;
  "settings/dayLimits/setLikes": number;
  "settings/dayLimits/setComments": number;
  "settings/dayLimits/setSubscribes": number;
  "settings/sourcesList/set": string[];
  "settings/commentsList/set": string[];
  "settings/delays/setComments": number;
  "settings/delays/setLikes": number;
  "settings/delays/setSubscribes": number;
  "settings/delays/setIteration": number;
  "settings/delays/setChangeSource": number;
  "settings/browser/setArgs": string[];
  "settings/browser/setHeadless": boolean;
  "settings/asyncTask/fetch": void;
};

export type StoreEvents = SettingsEvents;

export type StoreState = {
  settings: InstBotSettings;
  errors: string[];
};
