import { JSONArray } from "../interfaces/JSONArray";
import { JSONPrimitive } from "./JSONPrimitive";
import { JSONObject } from "./JSONObject";

export type JSONType = JSONPrimitive | JSONObject | JSONArray;