import { useEffect } from "react";
import { getToken } from "../../services/token";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import PropagateLoader from "react-spinners/PropagateLoader"
import "./Success.css"

export const Success = () => {
    
    const navigate = useNavigate()
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code')!;
        const tokenAsync = async () => {
            try {
                const response = await getToken(code, localStorage.getItem("code_verifier")!)
                if (response) {
                    localStorage.setItem("access_token", response.access_token)
                    localStorage.setItem("refresh_token", response.refresh_token)

                    const token = await login(response.access_token)
                    
                    if (token.error) {
                        navigate("/account/create")
                    } else {
                        localStorage.setItem("platform_token", token)
                        navigate("/account")
                    }

                }
            } catch (err) {
                console.error(err)
            }
        }
        tokenAsync()
    }, [])

    return (
        <div className="success-redirect">
            <h1>Welcome to the social music app!</h1>
          
            <p>Loading</p>

            <PropagateLoader color="lightgreen" style={{ display: "inherit", position: "relative", left: "-4px"}} />
           
        </div>
    )
}