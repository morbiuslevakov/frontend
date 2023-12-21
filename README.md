# api
API URL: https://deaslideproperty.com/api

## /auth/signup <button>POST</button>
###### REQUEST:
```json
{
  "username": "username",
  "email": "example@deaslide.com",
  "password": "password"
}
```
###### RESPONSE:
400 — Username is already taken  | |  Email already in use <br />
200 - User registered successfully

## /auth/signin <button>POST</button>
###### REQUEST:
```json
{
  "email": "example@deaslide.com",
  "password": "password",
  "totpCode": "123456"
}
```
###### RESPONSE:
```json
{
  "tokenType": "Bearer",
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzd...",
  "refreshToken": "2160c31f-4a96-4afe-803c-9b4bd0862edd",
  "userId": "65816fcefb882d73e7104e0f",
  "email": "example@deaslide.com",
  "username": "gandalf",
  "name": "Sandy Douglas",
  "roles": ["ROLE_USER", "ROLE_AUTHOR"]
}
```
400 — User not found <br />
401 - Two factor is required  | |  Invalid 2FA code

## /auth/refresh-token <button>POST</button>
###### REQUEST:
```json
{
  "refreshToken": "2160c31f-4a96-4afe-803c-9b4bd0862edd"
}
```
###### RESPONSE:
```json
{
  "tokenType": "Bearer",
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzd...",
  "refreshToken": "2160c31f-4a96-4afe-803c-9b4bd0862edd"
}
```
400 — Invalid refresh token  | |  Refresh token is expired <br />
## /auth/confirm-account/{confirmationToken} <button>GET</button>
###### RESPONSE:
400 — Invalid confirmation token <br />
200 — Account successfully verified

## /auth/enable-2fa <button>GET</button>

###### RESPONSE:
```json
{
  "secret": "2160c31f-4a96-4afe-803c-9b4bd0862edd",
  "qrCodeURI": "qr code uri in Base64 format"
}
```
400 — 2FA already enabled
## /auth/enable-2fa <button>POST</button>
###### REQUEST:
```json
{
  "totpCode": "123456",
  "password": "password"
}
```
400 — 2FA already enabled  | |  Invalid 2FA code <br />
200 — 2FA successfully enabled

## /auth/disable-2fa <button>POST</button>
###### REQUEST:
```json
{
  "totpCode": "123456",
  "password": "password"
}
```
400 — Invalid 2FA code <br />
200 — 2FA successfully disabled

## /auth/change-password <button>POST</button>
###### REQUEST:
```json
{
  "oldPassword": "password",
  "newPassword": "password",
  "totpCode": "123456"
}
```
401 — Two factor is required  | |  Invalid 2FA code <br />
200 — Password changed successfully
