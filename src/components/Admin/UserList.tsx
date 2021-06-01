import React from 'react'

interface IProps {
  users: { uid: string, email: string, username: string }[];
}

const UserList:React.FC<IProps> = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
  );
  
  export default UserList;