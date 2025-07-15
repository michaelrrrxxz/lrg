import { type Field } from "@/types/form"

export default function generateModel(modelName: string, fields: Field[]) {
  const className = modelName.charAt(0).toUpperCase() + modelName.slice(1)
  const fillables = fields.map(f => `'${f.name}'`).join(',\n        ')

  return `<?php
namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class ${className} extends Model
{
    protected $fillable = [
        ${fillables}
    ];
}
`
}
