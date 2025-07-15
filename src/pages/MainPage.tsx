import CrudGeneratorPage from "./CrudGeneratorPage"
import Navbar from "@/components/Navbar"
// import Footer from "@/components/Footer"

export default function Main() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <CrudGeneratorPage />
      </div>
      {/* <Footer /> */}
    </>
  )
}
