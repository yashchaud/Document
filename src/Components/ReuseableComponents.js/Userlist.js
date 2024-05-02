import React from "react";
import { Button } from "@com/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@com/ui/avatar";
import { Badge } from "@com/ui/badge";
import { Card } from "@com/ui/card";

const Userlist = () => {
  return (
    <section className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button variant="primary">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-medium">John Doe</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  john@example.com
                </p>
              </div>
            </div>
            <Badge variant="secondary">Admin</Badge>
          </div>
          <div className="flex-1" />
          <div className="flex gap-2 mt-4">
            <Button size="icon" variant="outline">
              <ServerOffIcon className="h-4 w-4" />
              <span className="sr-only">Deactivate</span>
            </Button>
            <Button size="icon" variant="outline">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </Card>
        <Card className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-medium">Jane Doe</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  jane@example.com
                </p>
              </div>
            </div>
            <Badge variant="primary">User</Badge>
          </div>
          <div className="flex-1" />
          <div className="flex gap-2 mt-4">
            <Button size="icon" variant="outline">
              <ServerOffIcon className="h-4 w-4" />
              <span className="sr-only">Deactivate</span>
            </Button>
            <Button size="icon" variant="outline">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </Card>
        <Card className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-medium">Bob Smith</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  bob@example.com
                </p>
              </div>
            </div>
            <Badge variant="secondary">Admin</Badge>
          </div>
          <div className="flex-1" />
          <div className="flex gap-2 mt-4">
            <Button size="icon" variant="outline">
              <ServerOffIcon className="h-4 w-4" />
              <span className="sr-only">Deactivate</span>
            </Button>
            <Button size="icon" variant="outline">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </Card>
        <Card className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-medium">Sarah Johnson</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  sarah@example.com
                </p>
              </div>
            </div>
            <Badge variant="primary">User</Badge>
          </div>
          <div className="flex-1" />
          <div className="flex gap-2 mt-4">
            <Button size="icon" variant="outline">
              <ServerOffIcon className="h-4 w-4" />
              <span className="sr-only">Deactivate</span>
            </Button>
            <Button size="icon" variant="outline">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Userlist;
