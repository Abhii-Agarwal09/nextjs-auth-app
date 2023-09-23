import React from "react";

export type ProfilePageParams = {
  params: {
    id: string;
  };
  searchParams?: object;
};
const Profile = ({ params }: ProfilePageParams) => {
  return (
    <div className="container">
      <h1 className="heading">
        Profile id ---- <span className="text-white">{params.id}</span>
      </h1>
    </div>
  );
};

export default Profile;
