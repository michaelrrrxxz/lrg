import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import FormInput from "@/components/FormInput"
import GeneratedCodePreview from "@/components/GeneratedCodePreview"
import { type Field } from "../types/form"
import generateModel from "@/utils/generators/generateModel"
import generateInertia from "../utils/generators/generateInertia"
import generateApi from "../utils/generators/generateApi"
import generateBlade from "../utils/generators/generateBlade"
import generateRoutes from "../utils/generators/routes/web"
import generateApiRoutes from "../utils/generators/routes/api"
import generateMigration from "../utils/generators/migration"
import generateBashApi from "../utils/generators/bashApi"
import generateBash from "@/utils/generators/bash"
import { toast } from "sonner"

export default function CrudGeneratorPage() {
  const [modelName, setModelName] = useState("")
  const [primaryKey, setPrimaryKey] = useState("id")
  const [fields, setFields] = useState<Field[]>([{ name: "", type: "string" }])
  const [controllerType, setControllerType] = useState<"inertia" | "api" | "blade">("inertia")
  const [modelCode, setModelCode] = useState("")
  const [controllerCode, setControllerCode] = useState("")
  const [routesCode, setRoutesCode] = useState("")
  const [migrationCode, setMigrationCode] = useState("")
  const [bashCode, setBashCode] = useState("")

  const handleChange = (i: number, key: keyof Field, val: string) => {
    const updated = [...fields]
    updated[i][key] = val
    setFields(updated)
  }

  const handleGenerate = () => {
   if (!modelName.trim()) {
  toast.error("Model name is required")
  return
}
 toast.success("Code generated successfully!")
    const cleanFields = fields.filter((f) => f.name.trim() !== "")
    setModelCode(generateModel(modelName, cleanFields))
    setMigrationCode(generateMigration(modelName, cleanFields))

    switch (controllerType) {
      case "inertia":
        setControllerCode(generateInertia(modelName))
        break
      case "api":
        setControllerCode(generateApi(modelName))
        break
      case "blade":
        setControllerCode(generateBlade(modelName))
        break
    }

     switch (controllerType) {
        case "inertia":
        case "blade":
         setRoutesCode(generateRoutes(modelName))
         setBashCode(generateBash(modelName))
        break
      case "api":
         setRoutesCode(generateApiRoutes(modelName))
          setBashCode(generateBashApi(modelName))
        break
     
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto mt-10 p-6 bg-white">
      <CardContent className="space-y-6">
        <div>
          <Label>Model Name</Label>
          <Input
            placeholder="e.g. Post"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Primary Key</Label>
          <Input
            placeholder="e.g. id"
            value={primaryKey}
            onChange={(e) => setPrimaryKey(e.target.value)}
          />
        </div>

        <FormInput
          fields={fields}
          onChange={handleChange}
          onAdd={() => setFields([...fields, { name: "", type: "string" }])}
          onRemove={(i) => setFields(fields.filter((_, idx) => idx !== i))}
        />

        <div className="flex gap-2">
          {["inertia", "api", "blade"].map((type) => (
            <Button
              key={type}
              variant={controllerType === type ? "default" : "outline"}
              onClick={() => setControllerType(type as any)}
            >
              {type.toUpperCase()}
            </Button>
          ))}
        </div>

        <Button className="w-full" onClick={handleGenerate}>
          Generate Code
        </Button>
         <GeneratedCodePreview title="Bash Command" code={bashCode} />
        <GeneratedCodePreview title="Migration Code" code={migrationCode} />
        <GeneratedCodePreview title="Model Code" code={modelCode} />
        <GeneratedCodePreview title="Controller Code" code={controllerCode} />
        <GeneratedCodePreview title="Routes Code" code={routesCode} />
        <h1>wip request</h1>
      </CardContent>
    </Card>
  )
}
