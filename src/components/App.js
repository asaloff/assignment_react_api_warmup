import React, { Component } from 'react';
import JumbotronFluid from './elements/JumbotronFluid';
import UserList from './UserList';
import UserForm from './UserForm';
import serialize from 'form-serialize';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      isFetching: false,

    };

    this.onAddUser = this.onAddUser.bind(this);
    this.onEditUser = this.onEditUser.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onNewUserClick = this.onNewUserClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({isFetching: true});

    fetch('https://reqres.in/api/users?delay=1')
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          users: json.data,
          isFetching: false,
        });
      });
  }

  onAddUser(e) {
    e.preventDefault();
    const form = e.target;
    const body = serialize(form, {hash: true});

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      headers,
      method: 'POST',
      body: JSON.stringify(body),
    };

    this.setState({isFetching: true});

    fetch('https://reqres.in/api/users', options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        this.setState({
          isFetching: false,
          users: [...this.state.users, json]
        }, () => form.reset());
      })
      .catch(error => {
        console.log(error);
        this.setState({ isFetching: false, error });
      });
  }

  onEditUser(e) {
    e.preventDefault();
    const id = e.target.id;
    const form = e.target;
    const body = serialize(form, {hash: true});

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      headers,
      method: 'PUT',
      body: JSON.stringify(body),
    };

    this.setState({isFetching: true});

    fetch(`https://reqres.in/api/users/${ id }?delay=1`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        return response.json;
      })
      .then(json => {
        let user = this.state.userToEdit;
        Object.keys(json).forEach(attr => user[attr] = json[attr]);

        let users = this.state.users;
        users = users.filter(u => u.id !== user.id);
        users.push(user);

        this.setState({
          users: users.sort((a, b) => a.last_name > b.last_name),
          userToEdit: null,
          isFetching: false
        }, () => form.reset());
      })
      .catch(error => {
        console.log(error);
        this.setState({ isFetching: false, error });
      });
  }

  onDelete(e) {
    e.preventDefault();
    const id = e.target.id;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      headers,
      method: 'DELETE',
    };

    this.setState({isFetching: true});

    fetch(`https://reqres.in/api/users/${ id }?delay=1`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not delete user');
        }

        let users = this.state.users.filter(u => {
          return u.id != id;
        });

        this.setState({
          isFetching: false,
          users: users,
          userToEdit: null
        });

        document.getElementById('Form').reset();
      })
      .catch(error => {
        console.log(error);
        this.setState({ isFetching: false, error });
      });
  }

  onNewUserClick(e) {
    e.preventDefault();

    this.setState({
      userToEdit: null
    });
  }

  onEditClick(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state.users.find(u => u.id == e.target.id));

    this.setState({
      userToEdit: user
    });
  }

  handleInputChange(e) {
    let user = this.state.userToEdit;

    const field = e.target.name;
    const value = e.target.value;

    user[field] = value;

    this.setState({
      userToEdit: user
    });
  }

  render() {
    const { users, isFetching, error, userToEdit } = this.state;
    const submitMethod = userToEdit ? this.onEditUser : this.onAddUser;

    return (
      <div className="App">
        <JumbotronFluid
          heading="User CRUD"
          lead="Using an API for User CRUD operations"
        />

        <UserList
          users={users}
          isFetching={isFetching}
          onDelete={this.onDelete}
          onEditClick={this.onEditClick}
        />

        <UserForm
          onSubmit={submitMethod}
          error={error}
          user={userToEdit}
          onNewUserClick={this.onNewUserClick}
          handleInputChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default App;
