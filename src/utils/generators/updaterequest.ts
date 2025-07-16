import { type Field } from "@/types/form"

// Converts field type to Laravel update validation rules
function fieldToUpdateValidation(field: Field): string {
  const name = field.name.trim()
  const type = field.type.trim()

  const rules: Record<string, string> = {
    string: "sometimes|required|string|max:255",
    text: "sometimes|required|string",
    integer: "sometimes|required|integer",
    float: "sometimes|required|numeric",
    boolean: "sometimes|required|boolean",
    date: "sometimes|required|date",
    datetime: "sometimes|required|date_format:Y-m-d H:i:s",
  }

  return `'${name}' => '${rules[type] || "sometimes|required|string"}'`
}

export default function generateUpdateRequest(modelName: string, fields: Field[]) {
  const className = modelName.charAt(0).toUpperCase() + modelName.slice(1)

  const rules = fields
    .filter((f) => f.name.trim() !== "")
    .map(fieldToUpdateValidation)
    .join(",\n            ")

  return `<?php

namespace App\\Http\\Requests\\${className};

use Illuminate\\Foundation\\Http\\FormRequest;

class Update${className}Request extends FormRequest
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
