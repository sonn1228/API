openssl rand -hex 32

<!-- npx kill-port 3000 -->
<!-- authentication -->

cookie-based/ session-based: Server side rendering
token-based / : API

header{

<!-- thuat toan ma hoa -->
<!-- the hien kieu: jwt -->

"alg": "HS256",
"typ": "JWT",
}
payload: {

<!-- thong tin muon gui -->

"sub": user_id,
"iat": thoi gian tao 1 token
"exp":
}
signature {
base64encode(header) + "."
base64decode(payload),
secret_key(secret_key- ma nay nam ben phia server)
}

1. access token
2. refresh token

<!-- jwt Không bao giờ bị xóa đến khi hết hạn -> refresh token -->

<!--
1. validate
2. check email
3. get password hash
4. compare(passwordHash == req.password)
5. create token with jwt
6. return response
 -->
