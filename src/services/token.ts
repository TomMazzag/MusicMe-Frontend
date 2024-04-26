export const getToken = async (code: string, codeVerifier: string) => {
    var redirectUri = import.meta.env.VITE_REDIRECT_URI;
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',

        },
        body: new URLSearchParams({
            client_id: import.meta.env.VITE_CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        }),
    }


    const url = "https://accounts.spotify.com/api/token"
    try {
        const body = await fetch(url, payload);
        const response =await body.json();
        console.log(response)
        if (response.access_token !== undefined) {
            //console.log(response)
            return {
                "access_token" : response.access_token,
                "refresh_token" : response.refresh_token
            }
        }
    } catch(err) {
        console.error(err)
    }
}

export const refreshToken = async (refresh_token: string) => {
    const url = "https://accounts.spotify.com/api/token";
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: import.meta.env.VITE_CLIENT_ID
      }),
    }

    try{
        const body = await fetch(url, payload);
        const response = await body.json();
        console.log(response)
        return {
            "access_token" : response.access_token,
            "refresh_token" : response.refresh_token
        }
    } catch(err) {
        console.error(err)
    }
}