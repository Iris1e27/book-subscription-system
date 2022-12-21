import json
from fastapi import FastAPI
from starlette import requests
from starlette.config import Config
from starlette.requests import Request
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import HTMLResponse, RedirectResponse
from authlib.integrations.starlette_client import OAuth, OAuthError
import requests


app = FastAPI()
# GOOGLE_CLIENT_ID = "825199395476-18br125tl2m65lnr54evfuhtlquaj8p5.apps.googleusercontent.com"
# GOOGLE_CLIENT_SECRET = "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"
GOOGLE_CLIENT_ID = "894307833243-qdqojkj9pd25aduconsfns23m9qo51rk.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = "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"
app.add_middleware(SessionMiddleware, secret_key="!secret")

# config = Config('.env')
# oauth = OAuth(config)
oauth = OAuth()

CONF_URL = 'https://accounts.google.com/.well-known/openid-configuration'
oauth.register(
    name='google',
    server_metadata_url=CONF_URL,
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    client_kwargs={
        'scope': 'openid email profile'
    }
)


@app.get('/')
async def homepage(request: Request):
    user = request.session.get('user')
    if user:
        data = json.dumps(user)
        html = (
            f'<pre>{data}</pre>'
            '<a href="/logout">logout</a>'
        )
        return HTMLResponse(html)
    return HTMLResponse('<a href="/login">login</a>')


@app.get('/login')
async def login(request: Request):
    redirect_uri = request.url_for('auth')
    return await oauth.google.authorize_redirect(request, redirect_uri)


#@app.get('/auth')
#async def auth(request: Request):
#    try:
#        token = await oauth.google.authorize_access_token(request)
#    except OAuthError as error:
#        return HTMLResponse(f'<h1>{error.error}</h1>')
#    user = token.get('userinfo')
#    if user:
#        request.session['user'] = dict(user)
#    return RedirectResponse(url='/')

@app.get('/auth')
async def auth(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
    except OAuthError as error:
        return HTMLResponse(f'<h1>{error.error}</h1>')
    user = token.get('userinfo')
    if user:
        request.session['user'] = dict(user) # email = user["email"]
        response = requests.post('http://127.0.0.1:8000' + '/search-by-email', json=json.dumps(user))
        if response.status_code != 200: # not find that person
            newUser = {"email": user["email"], "address": 'aasd'}
            requests.post('http://127.0.0.1:8000' + '/users', json=json.dumps(newUser))
        else:
            return HTMLResponse(f'the user exists')
        return RedirectResponse(url='/')
    return RedirectResponse(url='/')

@app.get('/logout')
async def logout(request: Request):
    request.session.pop('user', None)
    return RedirectResponse(url='/')


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=5000)