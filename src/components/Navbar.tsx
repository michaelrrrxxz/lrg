import { NavigationMenu } from "@/components/ui/navigation-menu"

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="text-xl font-bold text-primary">
          Laravel CRUD Generator
        </div>
        <NavigationMenu />
      </div>
    </header>
  )
}
