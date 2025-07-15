export default function generateInertia(modelName: string) {
  const raw = modelName.trim().toLowerCase();        
  const model = raw.charAt(0).toUpperCase() + raw.slice(1); 
  const modelVar = raw;                              
  return `<?php
namespace App\\Http\\Controllers;

use App\\Models\\${model};
use Illuminate\\Http\\Request;
use Inertia\\Inertia;

class ${model}Controller extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/${model}s', [
            '${modelVar}s' => ${model}::all()
        ]);
    }

    public function store(Request $request)
    {
        ${model}::create($request->all());
    }

    public function update(Request $request, $id)
    {
        ${model}::findOrFail($id)->update($request->all());
    }

    public function destroy($id)
    {
        ${model}::destroy($id);
    }
}
`;
}
