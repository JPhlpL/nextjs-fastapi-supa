import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { putData } from "@/utils/helpers"; // Import putData
import { Role } from "@/types/index"

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role;
  onSave: (updatedRole:  Role) => void;
}

export function EditRoleModal({ isOpen, onClose, role, onSave }: EditRoleModalProps) {
  const [editedRole , setEditedRole ] = useState(role);

  useEffect(() => {
    setEditedRole (role); // Update state when role prop changes
  }, [role]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedRole ((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await putData<Role>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/role/update/${editedRole .id}`,
        data: editedRole ,
      });
      onSave(editedRole ); // Call onSave with the updated role
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Role for User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-right">
                ID
              </Label>
              <Input id="id" name="id" value={editedRole .id} onChange={handleInputChange} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" name="title" value={editedRole .title} onChange={handleInputChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}