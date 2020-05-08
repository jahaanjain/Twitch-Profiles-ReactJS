import React from "react";

const Profile = ({username, type}) => {
    return (
        <div>
            <h1>{username}</h1>
            <h2>{type}</h2>
        </div>
    );
}

export default Profile;