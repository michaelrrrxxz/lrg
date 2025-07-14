export function generateControllerCode(modelName: string): string {
  const className = `${modelName}Controller`
  const modelVar = modelName.toLowerCase()
  const modelClass = `App\\Models\\${modelName}`

  return ` App\\Http\\Controllers\\${modelClass}\\Controller.php;
  
<?php
//created by michaelangelo-dev.site
namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use Inertia\\Inertia;
use ${modelClass};
use App\\Http\\Requests\\${modelName}\\Store${modelName}Request;
use App\\Http\\Requests\\${modelName}\\Update${modelName}Request;

class ${className} extends Controller
{
    public function index() {
        return Inertia::render('admin/${modelName}s', [
            '${modelVar}s' => ${modelName}::all()
        ]);
    }

    public function create() {}

    public function store(Store${modelName}Request $request) {
        ${modelName}::create($request->validated());
        return redirect()->route('${modelVar}s.index')->with('success', '${modelName} created successfully.');
    }

    public function show(string $id) {}

    public function edit(string $id) {}

    public function update(Update${modelName}Request $request, string $id) {
        $${modelVar} = ${modelName}::findOrFail($id);
        $${modelVar}->update($request->validated());
        return redirect()->route('${modelVar}s.index')->with('success', '${modelName} updated successfully.');
    }

    public function destroy(string $id) {
        $${modelVar} = ${modelName}::findOrFail($id);
        $${modelVar}->delete();
        return redirect()->route('${modelVar}s.index')->with('success', '${modelName} deleted successfully.');
    }
}
`
}



export function generateModelCode(modelName: string, fields: { name: string, type: string }[]) {
  const className = capitalize(modelName)
  const tableName = pluralSnakeCase(modelName)
  const fillables = fields.map(f => `'${f.name}'`).join(',\n        ')

  return `// app/Models/${className}.php
<?php
//created by michaelangelo-dev.site
namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

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
  return name
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toLowerCase() + 's'
}
