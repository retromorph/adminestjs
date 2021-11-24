import { TokenPayloadInterface } from "./tokenPayload.interface";

export interface TokenInterface {
  accessToken: string;
  payload: TokenPayloadInterface;
  expiresAt: number;
}
