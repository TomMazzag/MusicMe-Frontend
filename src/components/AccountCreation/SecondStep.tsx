import { useRef, useState } from 'react';
import './steps.css';
import { uploadNewProfilePic } from 'src/services/account';

export const StepTwo = ({ spotifyAccountDetails, setActiveStep, updateAccountDetails }: any) => {
    const [activeProfilePictureUrl, setActiveProfilePictureUrl] = useState(spotifyAccountDetails.images[1].url);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        const fileUploadRequest = await uploadNewProfilePic(file);
        console.log(fileUploadRequest)
        if (fileUploadRequest.success) {
            setActiveProfilePictureUrl(fileUploadRequest.url);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            handleFile(file);
            e.target.value = '';
        }
    };
    const handleClick = () => {
        inputRef.current?.click();
    };

    return (
        <div className="create-account-form">
            <div className="step-instructions-container">
                <h2 className="mb-5 text-xl font-semibold">Step two</h2>

                <p className="mb-5">Note: Use profile pic from spotify or choose your own!</p>
                {spotifyAccountDetails && <img src={activeProfilePictureUrl} alt="" />}
                <input
                    type="file"
                    accept={'image/*'}
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={handleChange}
                />
                <button onClick={handleClick} className='btn'>Change Image</button>
            </div>
            <div className="step-movement">
                <button
                    className="btn"
                    onClick={() => {
                        setActiveStep(0);
                    }}
                >
                    Previous
                </button>
                <button
                    className="btn"
                    onClick={() => {
                        updateAccountDetails({ profile_pic_url: activeProfilePictureUrl });
                        setActiveStep(2);
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
