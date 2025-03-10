import { useState, useEffect, useCallback } from "react";

export interface User {
  id: number;
  username: string;
  address: string;
}

const serviceApi = {
  async getUsers(): Promise<User[]> {
    const response = await fetch(`http://localhost:3000/user`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data;
  },
  async postUser(username: string, address: string): Promise<User> {
    const response = await fetch(`http://localhost:3000/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, address }),
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    const data = await response.json();
    return data;
  },
};

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      const fetchedUsers = await serviceApi.getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error in fetchUsers", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = useCallback(
    async (username: string, address: string) => {
      try {
        await serviceApi.postUser(username, address);
        await fetchUsers();
      } catch (error) {
        console.error("Error in addUser", error);
      }
    },
    [fetchUsers]
  );

  return { users, addUser };
}
