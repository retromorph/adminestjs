import { registerAs } from "@nestjs/config";

import { JwtSecretConfigInterface } from "./interfaces/jwtSecretConfig.interface";

export default registerAs("jwtSecretConfig", (): JwtSecretConfigInterface => {
  const secret = process.env["JWT_SECRET"];
  if (!secret) {
    throw new Error();
  }
  return {
    secret,
  };
});
