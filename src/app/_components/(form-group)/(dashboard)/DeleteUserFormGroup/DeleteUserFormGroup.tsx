import React from "react";
import "./DeleteUserFormGroup.scss";

const DeleteUserFormGroup = () => {
  return (
    <div className="delete-user-group">
      <div className="title-text">Delete my account</div>
      <div className="secondary-text">{`We're Sorry to See You Go!`}</div>
      <div className="secondary-text">
        All your saved moodboards and data will be permanently deleted.
      </div>

      <button className="delete-btn btn btn-md mt-8 ml-auto">
        Delete my account
      </button>
    </div>
  );
};

export default DeleteUserFormGroup;
