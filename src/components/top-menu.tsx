import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.tsx";
import { Link } from "react-router-dom";
import { FilePlus2, ListOrderedIcon, SettingsIcon } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const TopNavigation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('topMenu.templates')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuItem>
              <ul>
                <li>
                  <Link to="/templates">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <ListOrderedIcon className="w-5 h-5 mr-2" />
                      {t('topMenu.list')}
                    </NavigationMenuLink>
                  </Link>
                </li>
                <li>
                  <Link to="/create-template">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <FilePlus2 className="w-5 h-5 mr-2" />
                      {t('topMenu.new')}
                    </NavigationMenuLink>
                  </Link>
                </li>
              </ul>
            </NavigationMenuItem>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/settings">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <SettingsIcon className="w-5 h-5 mr-2" />
              {t('topMenu.settings')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default TopNavigation
