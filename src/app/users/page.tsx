"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth"
import { DataTable } from "@/app/components/table/table";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditUserModal } from "@/app/components/modal/edit-user-modal";
import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import { getData, deleteData } from "@/utils/helpers";
import { User } from "@/types/index"

export default function UsersPage() {
  const { isAdmin, loading } = useAuth()
  // const { user, loading } = useAuth()
  const [users, setUsers] = useState<User[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (!loading) {
      fetchUsers()
    }
  }, [loading])

  const fetchUsers = async () => {
    try {
      const response = await getData<User[]>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/user/get-all-users`,
      })
      setUsers(response)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const handleDelete = (user: User) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (selectedUser) {
      try {
        await deleteData({
          url: `${process.env.NEXT_PUBLIC_API_URL}/user/delete/${selectedUser.id}`,
        });
        // Remove the deleted user from the state
        setUsers((prevUsers) =>
          prevUsers.filter((u) => u.id !== selectedUser.id)
        );
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Username
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "updatedAt", // Fixed typo here
      header: "Updated At",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleEdit(user)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDelete(user)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAdmin) {
    return <div>You do not have permission to view this page.</div>
  }
  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={users} />
      {selectedUser && (
        <>
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            user={selectedUser }
            onSave={(updatedUser ) => {
              setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === updatedUser .id ? updatedUser  : user))
              );
              setIsEditModalOpen(false);
            }}
          />
          <ConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete} // Call confirmDelete here
            action="delete"
          />
        </>
      )}
    </div>
  );
}
