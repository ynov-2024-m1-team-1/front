import React from "react";

const UserDetailPage = ({ user }) => {
    console.log(user)
    return (
        <div>
            <h1>User Details</h1>
            <p>User ID: {user}</p>
        </div>
    );
};

export default UserDetailPage;
