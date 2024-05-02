import React from "react";
import { Button } from "@com/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@com/ui/avatar";
import { Badge } from "@com/ui/badge";
import { Card } from "@com/ui/card";
import { Input } from "@com/ui/input";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@com/ui/table";

const Userlist = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="flex items-center gap-2">
          <Input
            className="max-w-xs"
            placeholder="Search users..."
            type="search"
          />
          <Button size="sm">Create User</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>jdoe</TableCell>
              <TableCell>jdoe@example.com</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    Deactivate
                  </Button>
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>janedoe</TableCell>
              <TableCell>janedoe@example.com</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    Deactivate
                  </Button>
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>johndoe</TableCell>
              <TableCell>johndoe@example.com</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    Deactivate
                  </Button>
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>sarahjones</TableCell>
              <TableCell>sarahjones@example.com</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    Deactivate
                  </Button>
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>mikesmith</TableCell>
              <TableCell>mikesmith@example.com</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    Deactivate
                  </Button>
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Userlist;
