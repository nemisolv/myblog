import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toggle from '@/components/Toggle';
import UserService from '@/services/user.service';
import { toggleEnableTFA } from '@/store/slices/authSlice';

export default function Security() {
    const { currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleUpdateTFA = async () => {
        dispatch(toggleEnableTFA( !currentUser.mfaEnabled))
    };
    return (
        <div className=" my-10  page-container">
            <div className="shadow-lg max-w-[600px] mx-auto  p-6">
                <div className="flex justify-between items-start    ">
                    <div>
                        <h2 className="text-lg">Enable two-factor authentication</h2>
                        <p className="text-gray-500 text-[13px] mt-1">
                            Two-factor authentication adds an extra layer of security to your account by requiring a
                            secondary form of verification in addition to your password.
                        </p>
                    </div>
                    <div>
                        <Toggle on={currentUser.mfaEnabled} onClick={handleUpdateTFA}></Toggle>
                    </div>
                </div>
            </div>
        </div>
    );
}
