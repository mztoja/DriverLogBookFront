import React, {Dispatch, SetStateAction} from "react";
import {Route, Routes} from "react-router-dom";
import {BlockedUserView as BlockedUserComponent} from "../BlockedUserView";
import {UserInterface} from "types";

export const BlockedUserView = (userData: UserInterface, setUserData: Dispatch<SetStateAction<UserInterface | null>>) => (
    <Routes>
        <Route path="*"
               element={<BlockedUserComponent page="blockedUser" userData={userData} setUserData={setUserData}/>}/>
    </Routes>
);
