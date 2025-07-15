export default function generateBlade(modelName: string) {
  const raw = modelName.trim().toLowerCase();
  const model = raw.charAt(0).toUpperCase() + raw.slice(1);
  const modelVar = raw;

  return `<?php
namespace App\\Http\\Controllers;

use App\\Models\\${model};
use Illuminate\\Http\\Request;

class ${model}Controller extends Controller
{
    public function index()
    {
        $${modelVar}s = ${model}::all();
        return view('${modelVar}.index', compact('${modelVar}s'));
    }

    public function store(Request $request)
    {
        ${model}::create($request->all());
        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $${modelVar} = ${model}::findOrFail($id);
        $${modelVar}->update($request->all());
        return redirect()->back();
    }

    public function destroy($id)
    {
        ${model}::destroy($id);
        return redirect()->back();
    }
}
`;
}
