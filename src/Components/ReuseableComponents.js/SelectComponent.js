import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@com/ui/select";

const SelectComponent = ({ onSelectRole }) => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    onSelectRole(role);
  };
  useEffect(() => {
    console.log(selectedRole);
  }, [selectedRole]);

  return (
    <Select value={selectedRole} onValueChange={handleRoleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>{selectedRole || "Select Role"}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="user">user</SelectItem>
          <SelectItem value="admin">admin</SelectItem>
          <SelectItem value="coadmin">co-admin</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
