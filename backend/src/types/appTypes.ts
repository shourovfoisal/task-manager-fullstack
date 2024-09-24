export type ParsedJwtValue = {
  userSignInfo: { name: string; email: string };
  iat: number;
  exp: number;
};
