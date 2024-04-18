import "./steps.css"

export const StepTwo = ({spotifyAccountDetails, setActiveStep, updateAccountDetails}: any) => {

    return (
        <div className="create-account-form">
            <div className="step-instructions-container">
                <h2>Step two</h2>

                <p>Note: Use profile pic from spotify or choose your own!</p>
                {spotifyAccountDetails && 
                <img src={spotifyAccountDetails.images[1].url} alt="" />
                }
                <button>Change Image</button>

            </div>
            <div className="step-movement">
                    <button className="btn" onClick={() => {setActiveStep(0)}}>Previous</button>
                    <button className="btn" onClick={() => {updateAccountDetails({profile_pic_url: spotifyAccountDetails.images[1].url}); setActiveStep(2)}}>Next</button>
            </div>
        </div>
    )
}