from fastapi import Request, Response, HTTPException
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends
from typing import Dict
import jwt
from datetime import datetime, timedelta
from src.backend.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class AuthenticationMiddleware:
    def __init__(self):
        self.secret_key = settings.SECRET_KEY
        self.algorithm = settings.JWT_ALGORITHM
        self.access_token_expire_minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES

    async def __call__(self, request: Request, call_next):
        authorization: str = request.headers.get("Authorization")

        if not authorization:
            # Allow the request to proceed for public routes
            return await call_next(request)

        try:
            token_type, token = authorization.split()
            if token_type.lower() != "bearer":
                raise HTTPException(status_code=401, detail="Invalid token type")

            payload = self.decode_token(token)
            request.state.user = payload
        except jwt.PyJWTError:
            raise HTTPException(status_code=401, detail="Invalid token")

        response = await call_next(request)
        return response

    def decode_token(self, token: str) -> Dict:
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token has expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")

    def create_access_token(self, data: Dict) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=self.access_token_expire_minutes)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)) -> Dict:
    try:
        auth_middleware = AuthenticationMiddleware()
        payload = auth_middleware.decode_token(token)
        return payload
    except HTTPException:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

# Human tasks:
# TODO: Implement rate limiting for authentication attempts
# TODO: Add logging for authentication failures and successes
# TODO: Consider implementing role-based access control (RBAC)
```

This implementation includes the following features:

1. An `AuthenticationMiddleware` class that can be used as middleware in the FastAPI application.
2. Token decoding and validation using the PyJWT library.
3. A `get_current_user` dependency function that can be used in route handlers to get the authenticated user.
4. Support for public routes by allowing requests without an Authorization header to proceed.
5. Error handling for invalid tokens, expired tokens, and incorrect token types.
6. A method to create access tokens (which can be used in the authentication service).

The implementation assumes that there's a `settings` module in the `src.backend.config` package that contains the necessary configuration variables (SECRET_KEY, JWT_ALGORITHM, and ACCESS_TOKEN_EXPIRE_MINUTES).

The human tasks are added as TODO comments at the end of the file, as requested in the specification.

To use this middleware in your FastAPI application, you would add it to your app like this:

```python
from fastapi import FastAPI
from src.backend.middleware.authentication import AuthenticationMiddleware

app = FastAPI()
app.add_middleware(AuthenticationMiddleware)
```

And to use the `get_current_user` dependency in a route:

```python
from fastapi import Depends
from src.backend.middleware.authentication import get_current_user

@app.get("/protected-route")
async def protected_route(current_user: dict = Depends(get_current_user)):
    return {"message": "This is a protected route", "user": current_user}