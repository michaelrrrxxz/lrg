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
