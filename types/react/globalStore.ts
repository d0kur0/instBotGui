import { InstBotSettings } from "..";

export type StoreEvents = {
  set: InstBotSettings;

  setUsername: string;
  setPassword: string;

  setLimitLikes: number;
  setLimitComments: number;
  setLimitSubscribes: number;

  setSources: string[];
  setComments: string[];

  setCommentsDelay: number;
  setLikeDelay: number;
  setSubscribeDelay: number;
  setIterationDelay: number;
  setChangeSourceDelay: number;

  setBrowserArgs: string[];
  setBrowserHeadless: boolean;

  fetchBotSettings: void;
};

export type StoreState = InstBotSettings;
