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
import { cookies } from "next/headers";

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

export async function AppSidebar() {
  const cookie = await cookies();
  let username = cookie.get('username');
  if (username)
      username = username.value;
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
          <SidebarGroupAction title="Add Note">
              <Plus/> <span className="sr-only">Add Note</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
                {
                  //database stuff goes brr
                }
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