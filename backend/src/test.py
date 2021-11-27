from cryptography.hazmat.primitives import serialization
import jwt

payload_data = {"title": "Try by token curl","description": "Auth."}

my_secret = 'SECRET'

token = jwt.encode(
    payload=payload_data,
    key=my_secret,
    algorithm='RS256'
)

print(token)

decoded=jwt.decode(token, key=my_secret, algorithms=['HS256', ])

print(decoded)