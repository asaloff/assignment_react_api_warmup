import React from 'react';
import UserCard from './elements/UserCard';

const UserList =({users, isFetching, onDelete, onEditClick}) => {
  const userList = users.map((user) =>
    <UserCard
      user={user}
      key={user.id}
      onEditClick={onEditClick}
      onDelete={onDelete}
    />
  );

  return (
    <div className="container">
      <h1>User List</h1>
      <div className="card-group">
        {isFetching ? <p>Loading...</p> : userList}
      </div>
    </div>
  );
};

export default UserList;
