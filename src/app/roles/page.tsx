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
import { EditRoleModal } from "@/app/components/modal/edit-role-modal";
import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import { getData, deleteData } from "@/utils/helpers";
import { Role } from "@/types/index"

export default function RolesPage() {
  const { isAdmin, loading } = useAuth()
  // const { user, loading } = useAuth()
  const [roles, setRoles] = useState<Role[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  useEffect(() => {
    if (!loading) {
      fetchUserWithRoles()
    }
  }, [loading])

  const fetchUserWithRoles = async () => {
    try {
      const response = await getData<Role[]>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/role/get-all-roles`,
      })
      setRoles(response)
    } catch (error) {
      console.error("Error fetching roles:", error)
    }
  }

  const handleEdit = (role: Role) => {
    setSelectedRole(role)
    setIsEditModalOpen(true)
  }

  const handleDelete = (role: Role) => {
    setSelectedRole(role)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (selectedRole) {
      try {
        await deleteData({
          url: `${process.env.NEXT_PUBLIC_API_URL}/role/delete/${selectedRole.id}`,
        });
        // Remove the deleted user from the state
        setRoles((prevUsersWithRoles) =>
          prevUsersWithRoles.filter((u) => u.id !== selectedRole.id)
        );
        setIsDeleteModalOpen(false);
        setSelectedRole(null);
      } catch (error) {
        console.error("Error deleting role:", error);
      }
    }
  };

  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "user_id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            User ID
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
        const role = row.original;
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
              <DropdownMenuItem onClick={() => handleEdit(role)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDelete(role)}>
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
      <DataTable columns={columns} data={roles} />
      {selectedRole && (
        <>
          <EditRoleModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            role={selectedRole }
            onSave={(updatedRole ) => {
              setRoles((prevUsersWithRoles) =>
                prevUsersWithRoles.map((role) => (role.id === updatedRole .id ? updatedRole  : role))
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
