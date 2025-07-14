

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Laravel CRUD Generator. All rights reserved.</p>
        <p className="mt-2 sm:mt-0 italic text-yellow-700">🚧 This project is still in progress.</p>
      </div>
    </footer>
  )
}
