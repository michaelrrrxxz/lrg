export default function apiRoute(modelName: string,) {
  const className = modelName.charAt(0).toUpperCase() + modelName.slice(1)
  const routeName = modelName.toLowerCase()

  return `use App\\Http\\Controllers\\${className}Controller;

Route::resource('${routeName}', ${className}Controller::class);
`
}
