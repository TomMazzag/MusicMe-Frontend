export const ChangePasswordModal = () => {
    return (
        <dialog id="passwordModal" className="modal">
            <div className="modal-box flex flex-col items-center">
                <h3 className="font-bold text-lg mb-6">Change password</h3>
                <p>
                    Our platform is currently setup to link to your spotify account, to change your password you will
                    need to change your spotify password{' '}
                    <a href="https://www.spotify.com/uk/account/change-password/" target="_blank" className="link link-accent">
                        here
                    </a>
                </p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};
