export default function generateApi(modelName: string) {
  const raw = modelName.trim().toLowerCase();
  const model = raw.charAt(0).toUpperCase() + raw.slice(1); 
  const modelVar = raw; 

  return `<?php
namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Models\\${model};
use Illuminate\\Http\\Request;

class ${model}Controller extends Controller
{
    public function index()
    {
        return ${model}::all();
    }

    public function store(Request $request)
    {
        return ${model}::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $${modelVar} = ${model}::findOrFail($id);
        $${modelVar}->update($request->all());
        return $${modelVar};
    }

    public function destroy($id)
    {
        return ${model}::destroy($id);
    }
}
`;
}
