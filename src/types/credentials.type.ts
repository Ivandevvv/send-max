import type {
  API_TOKEN_INSTANCE,
  INSTANCE_ID,
} from "../utils/credentials-keys";

export type Credentials = {
  [INSTANCE_ID]: string;
  [API_TOKEN_INSTANCE]: string;
};
