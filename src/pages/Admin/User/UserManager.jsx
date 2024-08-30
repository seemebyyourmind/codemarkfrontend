import { Outlet } from "react-router-dom"
import UserInfo from "../../../components/Admin/User/UserInfo"
const Usermanager=()=>{
  return (<div className="m-3">
  <UserInfo/>
    < Outlet/>
  </div>)
}
export default Usermanager

// import  { useState } from 'react';
// import Navbar from '../../../components/Admin/User/Navbar';
// import UserList from '../../../components/Admin/User/UserList';
// import UserForm from '../../../components/Admin/User/UserForm';
// import GroupForm from '../../../components/Admin/User/GroupForm';

// const role=['admin','guess'];
// const group=["nhom1 ","nhom2"];

// const initialUsers = [
//   { id: '1', name: 'Nguyễn Văn A', role: 'user' },
//   { id: '2', name: 'Trần Thị B', role: 'admin' },
//   { id: '3', name: 'Lê Văn C', role: 'user' },
//   { id: '4', name: 'Phạm Thị D', role: 'admin' },
//   { id: '5', name: 'Hoàng Văn E', role: 'user' },
// ];

// const UserManager = () => {
//   const [users, setUsers] = useState(initialUsers);
//   const [filteredUsers, setFilteredUsers] = useState(initialUsers);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showUserForm, setShowUserForm] = useState(false);
//   const [showGroupForm, setShowGroupForm] = useState(false);

//   const handleSearch = (query) => {
//     setFilteredUsers(users.filter(user => user.name.toLowerCase().includes(query.toLowerCase())));
//   };

//   const handleAddUser = () => {
//     setSelectedUser(null);
//     setShowUserForm(true);
//   };

//   const handleEditUser = (userId) => {
//     const user = users.find((user) => user.id === userId);
//     setSelectedUser(user);
//     setShowUserForm(true);
//   };

//   const handleSaveUser = (user) => {
//     if (selectedUser) {
//       setUsers(users.map(u => (u.id === user.id ? user : u)));
//     } else {
//       setUsers([...users, { ...user, id: Date.now().toString() }]);
//     }
//     setShowUserForm(false);
//     setFilteredUsers(users);
//   };

//   const handleCreateGroup = () => {
//     setShowGroupForm(true);
//   };

//   const handleSaveGroup = (group) => {
//     setShowGroupForm(false);
//   };

//   const handleRoleChange = (userId, role) => {
//     setUsers(users.map(user => user.id === userId ? { ...user, role } : user));
//     setFilteredUsers(users);
//   };

//   return (
//     <div>
//       <Navbar
//         onSearch={handleSearch}
//         onAddUser={handleAddUser}
//         onCreateGroup={handleCreateGroup}
//         roleList={role}
//         groupList={group}
//       />
//       <UserList users={filteredUsers} onSelectUser={handleEditUser} onRoleChange={handleRoleChange} />
//       {showUserForm && (
//         <UserForm onSave={handleSaveUser} selectedUser={selectedUser} />
//       )}
//       {showGroupForm && <GroupForm onSave={handleSaveGroup} />}
//     </div>
//   );
// };

// export default UserManager;