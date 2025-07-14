
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function ModelGenerator({ code }: { code: string }) {
  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardContent>
        <Label className="text-lg">Generated Code</Label>
        <pre className="bg-gray-900 text-green-200 text-sm p-4 rounded-lg overflow-auto mt-2">
          {code}
        </pre>
      </CardContent>
    </Card>
  )
}


// src/utils/generators.ts
export function generateModelCode(
  modelName: string,
  fields: { name: string; type: string }[]
): string {
  const className = capitalize(modelName)
  const tableName = pluralSnakeCase(modelName)
  const fillables = fields.map((f) => `'${f.name}'`).join(',\n        ')

  return `// app/Models/${className}.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ${className} extends Model
{
    // protected $table = '${tableName}';

    protected $fillable = [
        ${fillables}
    ];
}
`
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function pluralSnakeCase(name: string) {
  return (
    name
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .toLowerCase() + 's'
  )
}
