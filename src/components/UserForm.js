import React from 'react';
import Button from './elements/Button';
import Input from './elements/Input';
import InputGroup from './elements/InputGroup';
import Alert from './elements/Alert';

const UserForm = ({onSubmit, error, user, onNewUserClick, handleInputChange}) => {
  if (error) {
    error =  (
      <Alert type="danger">
        {error}
      </Alert>
    );
  }

  const method = user ? 'Edit' : 'Add New';
  const newLink = user ? <a className="new-user-link" href="/users/new" onClick={onNewUserClick}>+ New User</a> : '';

  return (
    <form className="container" onSubmit={onSubmit} id="Form">
      <h1>{method} User {newLink}</h1>

      {error}
      <InputGroup name="first_name" labelText="First Name">
        <Input name="first_name" user={user} handleInputChange={handleInputChange} />
      </InputGroup>
      <InputGroup name="last_name" labelText="Last Name">
        <Input name="last_name" user={user} handleInputChange={handleInputChange} />
      </InputGroup>
      <InputGroup name="avatar" labelText="Photo Link">
        <Input name="avatar" user={user} handleInputChange={handleInputChange} />
      </InputGroup>
      <Button type="submit" color="primary">
        Save User
      </Button>
    </form>
  );
};

export default UserForm;
