export const ChangePasswordModal = () => {
    return (
        <dialog id="passwordModal" className="modal">
            <div className="modal-box flex flex-col items-center">
                <h3 className="font-bold text-lg mb-6">Change password</h3>
                <div className="flex flex-col gap-4 w-[60%]">
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder='Old password' />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder='New password' />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder='Confirm new password' />
                    </label>
                    <button className="btn">Save</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}