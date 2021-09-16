export interface JwtPayload {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  iat: number;
  exp: number;
}
