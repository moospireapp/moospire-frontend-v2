import React from "react";
import Image from "next/image";
import "./UserProfileFormGroup.scss";

const UserProfileFormGroup = () => {
  return (
    <div className="user-profile-group">
      {/* PROFILE TOP ROW */}
      <div className="profile-top-row">
        <div className="profile-img-wrapper">
          <div className="profile-img">
            <Image
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="profile-img"
              width={90}
              height={90}
            />
          </div>

          <div className="upload-img">
            <div className="icon icon-gallery"></div>
          </div>
        </div>

        <button className="btn btn-md btn-primary">Save changes</button>
      </div>

      {/* PROFILE FORM */}
      <div className="profile-form">
        <div className="form-group !mb-8">
          <label className="form-label-basic">Full name</label>
          <input
            type="text"
            className="form-control"
            placeholder="User full name here..."
          />
        </div>

        <div className="form-group !mb-8">
          <label className="form-label-basic">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password goes here..."
          />
        </div>

        <div className="form-group !mb-0">
          <label className="form-label-basic">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="john.doe@example.com"
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfileFormGroup;
