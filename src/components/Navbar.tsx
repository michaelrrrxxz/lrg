import React from "react"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="text-xl font-bold text-primary">Laravel CRUD Generator</div>

        <NavigationMenu>
          {/* <NavigationMenuList className="space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="/" className={linkStyle}>Home</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="#models" className={linkStyle}>Models</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="#controllers" className={linkStyle}>Controllers</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="#about" className={linkStyle}>About</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList> */}
        </NavigationMenu>
      </div>
    </header>
  )
}

const linkStyle =
  "text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
