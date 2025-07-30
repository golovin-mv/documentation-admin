import { useTranslation } from "react-i18next";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Link } from "react-router-dom";
import { FilesIcon, SettingsIcon } from "lucide-react";

const SideNav: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Sidebar variant="sidebar" collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Template Editor</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key={t('topMenu.templates')}>
                <SidebarMenuButton asChild>
                  <Link to="/templates">
                    <FilesIcon />
                    <span>{t('topMenu.templates')}</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link to="/settings">
                    <SettingsIcon />
                    <span>{t('topMenu.settings')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default SideNav;
