import { type Field } from "@/types/form"

// Convert model name to snake_case plural (e.g., Post => posts)
function toSnakePlural(name: string): string {
  const snake = name
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/\s+/g, "_")
    .replace(/-+/g, "_")
    .toLowerCase()

  return snake.endsWith("s") ? snake : `${snake}s`
}

// Generate one line per field
function getFieldMigrationLine(field: Field): string {
  const type = field.type || "string"
  const name = field.name
  return `\$table->${type}('${name}');`
}

// Final generator
export default function generateMigration(modelName: string, fields: Field[]) {
  const tableName = toSnakePlural(modelName)
  const className =
    "Create" +
    tableName.charAt(0).toUpperCase() +
    tableName.slice(1) +
    "Table"

  const fieldLines = fields.map(getFieldMigrationLine).join("\n            ")

  return `<?php
use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('${tableName}', function (Blueprint $table) {
            $table->id();
            ${fieldLines}
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('${tableName}');
    }
};
`
}
