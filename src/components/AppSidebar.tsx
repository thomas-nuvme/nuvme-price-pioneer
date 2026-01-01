import { Calculator, FileText, Layers, Target, Home, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import logo from "./images/nuvme-logo.png";

const items = [
  { title: "Início", url: "/", icon: Home },
  { title: "Dashboard CS", url: "/dashboard-cs", icon: Users },
  { title: "Missões & Módulos", url: "/missoes-modulos", icon: Layers },
  { title: "Planos", url: "/planos", icon: Target },
  { title: "Diagnósticos", url: "/diagnosticos", icon: FileText },
  { title: "Calculadora de Valores", url: "/calculadora", icon: Calculator },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent>
        <div className="p-4 flex items-center justify-center border-b">
          {open && <img src={logo} alt="Nuvme Logo" className="w-32" />}
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        isActive ? "bg-accent text-accent-foreground font-medium" : ""
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
