import { useEffect, useState } from 'react';
import './CreateAccount.css';
import { Step, Stepper, StepLabel } from '@mui/material';
import { StepOne } from '../../components/AccountCreation/FirstStep';
import { StepTwo } from '../../components/AccountCreation/SecondStep';
import { StepThree } from '../../components/AccountCreation/ThirdStep';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../../services/auth';
import { getSpotifyToken } from '@MusicMe/utils';

export const CreateAccount = () => {
    // Get spotify details

    const access_token = getSpotifyToken();
    const [profile, setProfile] = useState();
    const [errorMessage, setErrorMessage] = useState<string>();

    useEffect(() => {
        const getProfile = async () => {
            const result = await fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: { Authorization: `Bearer ${access_token}` },
            });
            const data = await result.json();
            setProfile(data);
            updateAccountDetails({ access_token });
            //console.log(data)
        };
        getProfile();
    }, []);

    // Spotify details close

    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();
    const [accountDetails, setAccountDetails] = useState();

    const updateAccountDetails = (data: any) => {
        // console.log(data)
        setAccountDetails((prevAccountDetails: any) => ({ ...prevAccountDetails, ...data }));
    };

    const logUserDetails = () => {
        // console.log(accountDetails)
        createAccount(accountDetails).then((response) => {
            if (response.error) {
                setErrorMessage('Error when creating your account, try again!');
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            } else {
                navigate('/account');
            }
        });
    };

    const showStep = (step: number) => {
        switch (step) {
            case 1:
                return (
                    <StepOne
                        spotifyAccountDetails={profile}
                        setActiveStep={setActiveStep}
                        updateAccountDetails={updateAccountDetails}
                    />
                );
            case 2:
                return (
                    <StepTwo
                        spotifyAccountDetails={profile}
                        setActiveStep={setActiveStep}
                        updateAccountDetails={updateAccountDetails}
                    />
                );
            case 3:
                return (
                    <StepThree
                        setActiveStep={setActiveStep}
                        updateAccountDetails={updateAccountDetails}
                        logUserDetails={logUserDetails}
                    />
                );
        }
    };

    return (
        <div className="create-account-page text-center mt-10">
            <h1 className="mb-5 text-2xl font-bold">Create your account</h1>

            <h2 className="mb-5">Steps</h2>
            <div className="account-creation-steps">
                <Stepper className="w-full md:w-[50%]" alternativeLabel activeStep={activeStep}>
                    <Step>
                        <StepLabel className="step-text">Spotify Settings</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel className="step-text">User Settings</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel className="step-text">Final Step</StepLabel>
                    </Step>
                </Stepper>
            </div>
            {errorMessage && (
                <>
                    <p className="text-red-500 mt-5">{errorMessage}</p>
                </>
            )}
            <div className="step-details-container mt-10">{showStep(activeStep + 1)}</div>
        </div>
    );
};
