

export const StepThree = ({ setActiveStep, logUserDetails}: any) => {
    return (
        <div className="create-account-form">
            <h2>Final Step</h2>

            <p>Account details completed</p>

            <div className="step-movement">
                    <button className="btn" onClick={() => {setActiveStep(1)}}>Previous</button>
                    <button className="btn" onClick={() => {logUserDetails()}}>Finish</button>
                </div>
        </div>
    )
}