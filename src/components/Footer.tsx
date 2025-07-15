export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t z-30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Laravel CRUD Generator. All rights reserved.</p>
        <p className="mt-2 sm:mt-0 italic text-yellow-700">🚧 This project is still in progress.</p>
      </div>
    </footer>
  )
}
