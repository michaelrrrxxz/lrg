import React from "react"
import ModelInputForm, { type FormData } from "@/components/ModelInputForm"
import ModelGenerator from "@/components/ModelGenerator"
import { generateControllerCode } from "@/utils/generators"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

function App() {
  const [modelCode, setModelCode] = React.useState("")
  const [controllerCode, setControllerCode] = React.useState("")

  const handleModelSubmit = (data: FormData) => {
    setModelCode(data.generatedCode)
    const controller = generateControllerCode(data.modelName)
    setControllerCode(controller)
  }

  return (<>
          <Navbar />
    <main className="min-h-screen bg-gray-50 p-6">
  
      <h1 className="text-3xl font-bold text-center mb-6">
        Laravel CRUD Generator
      </h1>

      <ModelInputForm onSubmit={handleModelSubmit} />

      {modelCode && (
        <>
        
          <ModelGenerator code={modelCode} />
        </>
      )}

      {controllerCode && (
        <>
        
          <ModelGenerator code={controllerCode} />
        </>
      )}
    </main>
    <Footer></Footer>
  </>
  )
}

export default App
