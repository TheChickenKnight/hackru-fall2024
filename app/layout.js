import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Alzaid",
  description: "Tools for Alzheimer's disease patients",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <SidebarProvider>
        <AppSidebar/>
        <SidebarTrigger/>
          <div className='flex-1 p-4 bg-lavender'>{children}</div>
        <Toaster/>
      </SidebarProvider>
      </body>
    </html>
  );
}
