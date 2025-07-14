import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { generateModelCode } from "@/utils/generators"

export type Field = {
  name: string
  type: string
}

export type FormData = {
  modelName: string
  primaryKey: string
  fields: Field[]
  generatedCode: string
}

type Props = {
  onSubmit?: (data: FormData) => void
}

export default function ModelInputForm({ onSubmit }: Props) {
  const [modelName, setModelName] = useState("")
  const [primaryKey, setPrimaryKey] = useState("id")
  const [fields, setFields] = useState<Field[]>([{ name: "", type: "string" }])

  const handleFieldChange = (index: number, key: keyof Field, value: string) => {
    const updated = [...fields]
    updated[index][key] = value
    setFields(updated)
  }

  const addField = () => {
    setFields([...fields, { name: "", type: "string" }])
  }

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!modelName.trim()) return alert("Model name is required")

    const cleanedFields = fields.filter((f) => f.name.trim() !== "")
    const code = generateModelCode(modelName, cleanedFields)

    if (onSubmit) {
      onSubmit({ modelName, primaryKey, fields: cleanedFields, generatedCode: code })
    }
  }

  return (
  <Card className="w-full max-w-4xl mx-auto p-6 mt-10 bg-white shadow-md">
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="modelName">Model Name</Label>
          <Input
            id="modelName"
            placeholder="e.g. Post"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="primaryKey">Primary Key</Label>
          <Input
            id="primaryKey"
            placeholder="e.g. id, uuid"
            value={primaryKey}
            onChange={(e) => setPrimaryKey(e.target.value)}
          />
        </div>

        <div>
          <Label>Fields</Label>
          <div className="space-y-4 mt-2">
            {fields.map((field, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center gap-2"
              >
                <Input
                  className="w-full sm:flex-1"
                  placeholder="Field name"
                  value={field.name}
                  onChange={(e) =>
                    handleFieldChange(index, "name", e.target.value)
                  }
                />
                <Select
                  value={field.type}
                  onValueChange={(value) =>
                    handleFieldChange(index, "type", value)
                  }
                >
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="string">string</SelectItem>
                    <SelectItem value="text">text</SelectItem>
                    <SelectItem value="integer">integer</SelectItem>
                    <SelectItem value="boolean">boolean</SelectItem>
                    <SelectItem value="float">float</SelectItem>
                    <SelectItem value="date">date</SelectItem>
                    <SelectItem value="datetime">datetime</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="destructive"
                  type="button"
                  className="w-full sm:w-auto"
                  onClick={() => removeField(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <Button type="button" className="mt-4 text-sm py-2" onClick={addField}>
            Add Field
          </Button>
        </div>

        <Button type="submit" className="w-full text-sm py-2">
          Generate Laravel CRUD
        </Button>
      </form>
    </CardContent>
  </Card>
)
