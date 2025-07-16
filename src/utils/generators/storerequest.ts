import { type Field } from "@/types/form"

// Converts field type to Laravel validation rules
function fieldToValidation(field: Field): string {
  const name = field.name.trim()
  const type = field.type.trim()

  const rules: Record<string, string> = {
    string: "required|string|max:255",
    text: "required|string",
    integer: "required|integer",
    float: "required|numeric",
    boolean: "required|boolean",
    date: "required|date",
    datetime: "required|date_format:Y-m-d H:i:s",
  }

  return `'${name}' => '${rules[type] || "required|string"}'`
}

export default function generateStoreRequest(modelName: string, fields: Field[]) {
  const className = modelName.charAt(0).toUpperCase() + modelName.slice(1)

  const rules = fields
    .filter((f) => f.name.trim() !== "")
    .map(fieldToValidation)
    .join(",\n            ")

  return `<?php

namespace App\\Http\\Requests\\${className};

use Illuminate\\Foundation\\Http\\FormRequest;

class Store${className}Request extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            ${rules}
        ];
    }
}
`
}
