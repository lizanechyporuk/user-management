import React, { useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, filterUsers } from "../../store/userSlice";
import { RootState, AppDispatch } from "../../store";
import Container from "../Container/Container";
import styles from "./UserTable.module.scss";

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredUsers, status } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(filterUsers({ [name]: value }));
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to fetch users.</p>;
  }

  return (
    <Container>
      <table className={styles.table}>
        <thead className={styles["table--header"]}>
          <tr className={styles["header--row"]}>
            <th>
              <p>Name</p>
              <input
                type="text"
                name="name"
                onChange={handleFilterChange}
                placeholder="Find name"
              />
            </th>
            <th>
              <p>Username</p>
              <input
                type="text"
                name="username"
                onChange={handleFilterChange}
                placeholder="Find username"
              />
            </th>
            <th>
              <p>Email</p>
              <input
                type="text"
                name="email"
                onChange={handleFilterChange}
                placeholder="Find email"
              />
            </th>
            <th>
              <p>Phone</p>
              <input
                type="text"
                name="phone"
                onChange={handleFilterChange}
                placeholder="Find phone"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user: any) => (
            <tr key={user.id} className={styles["table--row"]}>
              <td data-label="Name" className={styles.col}>
                {user.name}
              </td>
              <td data-label="Username" className={styles.col}>
                {user.username}
              </td>
              <td data-label="Email" className={styles.col}>
                {user.email}
              </td>
              <td data-label="Phone" className={styles.col}>
                {user.phone}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default UserTable;
