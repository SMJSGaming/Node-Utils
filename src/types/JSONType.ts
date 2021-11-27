import { JSONArray } from "../interfaces/JSONArray";
import { JSONObject } from "./JSONObject";
import { JSONPrimitive } from "./JSONPrimitive";

export type JSONType = JSONPrimitive | JSONObject | JSONArray;