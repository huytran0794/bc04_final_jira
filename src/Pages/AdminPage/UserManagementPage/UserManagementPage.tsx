import React from "react";
import { useState } from "react";
import { UserInterface } from "./../../../core/models/User/User.interface";
import { useEffect } from "react";
import USER_SERVICE from "./../../../core/services/userServ";
import UserTable from "./UserTable";
import UserAction from "./UserAction";

export default function UserManagementPage() {
  const [userList, setUserList] = useState<UserInterface[]>([]);

  useEffect(() => {
    let fetchUserList = () => {
      USER_SERVICE.getAllUser()
        .then((res) => {
          let data = res.content.map((user: UserInterface) => {
            return {
              ...user,
              action: <UserAction onSuccess={fetchUserList} user={user} />,
            };
          });
          setUserList(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchUserList();
  }, []);

  return (
    <div className="container mx-auto pt-16">
      <h1 className="text-center text-3xl">User Management</h1>

      <UserTable userList={userList} />
    </div>
  );
}
