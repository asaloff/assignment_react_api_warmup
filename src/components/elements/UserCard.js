import React from 'react';

const UserCard = ({user, onDelete, onEditClick}) => {
  const {id, first_name, last_name, avatar} = user;

  return (
    <div
      className="UserCard card"
      style={{maxWidth: `128px`}}
    >
      <img
        className="card-img-top img-fluid"
        src={avatar}
        alt="user avatar"
      />
      <div className="card-block">
        <h4>{first_name} {last_name}</h4>

        <a href="/users/edit" id={id} onClick={onEditClick} className="edit-link">Edit</a>
        <a href="/users?_method=delete" id={id} onClick={onDelete}>Delete</a>
      </div>
    </div>
  );
};

export default UserCard;
