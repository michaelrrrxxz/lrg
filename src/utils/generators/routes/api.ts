export default function apiRoute(modelName: string,) {
  const className = modelName.charAt(0).toUpperCase() + modelName.slice(1)
  const routeName = modelName.toLowerCase()

  return `use App\\Http\\Controllers\\Api\\${className}Controller;

Route::apiResource('${routeName}', ${className}Controller::class);
`
}
