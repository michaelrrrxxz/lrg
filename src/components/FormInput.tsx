import { Input } from "@/components/ui/input"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { type Field } from "@/types/form"
import { useMemo } from "react"

type Props = {
  fields: Field[]
  onChange: (index: number, key: keyof Field, value: string) => void
  onAdd: () => void
  onRemove: (index: number) => void
}

// Convert any string to snake_case (Laravel style)
function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/\s+/g, "_")
    .replace(/-+/g, "_")
    .toLowerCase()
}

// Helper: checks for duplicates
function getDuplicateIndexes(fields: Field[]): number[] {
  const seen = new Map<string, number[]>()

  fields.forEach((field, index) => {
    const name = toSnakeCase(field.name)
    if (!name) return
    if (!seen.has(name)) {
      seen.set(name, [index])
    } else {
      seen.get(name)!.push(index)
    }
  })

  return Array.from(seen.values())
    .filter((indexes) => indexes.length > 1)
    .flat()
}

export default function FormInput({ fields, onChange, onAdd, onRemove }: Props) {
  const duplicateIndexes = useMemo(() => getDuplicateIndexes(fields), [fields])
  const hasDuplicates = duplicateIndexes.length > 0

  return (
 <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Fields</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fields.map((field: any, index: number) => {
            const isDuplicate = duplicateIndexes.includes(index)
            return (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-center">
                  <Input
                    className={`flex-1 ${isDuplicate ? "border-red-500 ring-1 ring-red-500" : ""}`}
                    placeholder="e.g. post_title"
                    value={field.name}
                    onChange={(e) =>
                      onChange(index, "name", toSnakeCase(e.target.value))
                    }
                  />
                  <Select
                    value={field.type}
                    onValueChange={(value) => onChange(index, "type", value)}
                  >
                    <SelectTrigger className="w-full md:w-[140px]">
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
                    onClick={() => onRemove(index)}
                    className="w-full md:w-auto"
                  >
                    Remove
                  </Button>
                </div>
                {isDuplicate && (
                  <span className="text-sm text-red-500 pl-1">
                    Duplicate field name not allowed.
                  </span>
                )}
              </div>
            )
          })}

          <Button type="button" onClick={onAdd}>
            Add Field
          </Button>

          {hasDuplicates && (
            <div className="text-sm text-red-500">
              ⚠ Please fix duplicate field names before generating code.
            </div>
          )}
        </div>
      </CardContent>
    </Card>

  )
}
