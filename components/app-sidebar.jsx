"use client"
import { useEffect, useState } from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronUp, Plus, User2 } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const items = [
  {
    title: "Memory Cards",
    url: "memorycards",
    icon: ""
  },
  {
    title: "Reminders",
    url: "reminder",
    icon: ""
  },
  {
    title: "Mood Tracker",
    url: "mood",
    icon: ""
  },
  {
    title: "Memory Playlists",
    url: "memoryplaylists",
    icon: ""
  },
  {
    title: "Caregiver Access",
    url: "caregiveraccess",
    icon: ""
  }
];

export function AppSidebar({ username }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote]);
      setNewNote("");
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarMenuItem key="Home">
          <SidebarMenuButton>
            <Link href="/">
              <span>Home</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                items.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton>
                      <Link href={item.url}>
                          <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Notes</SidebarGroupLabel>
          <SidebarGroupAction title="Add Note" onClick={handleAddNote}>
              <Plus/> <span className="sr-only">Add Note</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <div className="p-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Write a note..."
                className="w-full p-2 border rounded mb-2"
              />
              <button
                onClick={handleAddNote}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Add Note
              </button>
            </div>
            <div className="p-2">
              {notes.map((note, index) => (
                <div key={index} className="p-2 border-b">
                  {note}
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2/> {username ? username : "username"}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <Link href={username ? "/signout" : "/signin"}>
                    <DropdownMenuItem>
                      {
                        username ? 
                        (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <span>Sign Out</span>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => {

                                    }}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => {

                                    }}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ) 
                        : (
                          <span>Sign in</span>
                        )
                      }
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}