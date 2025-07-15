

export default function generateModel(modelName: string,) {
  const className = modelName.charAt(0).toUpperCase() + modelName.slice(1)


  return `php artisan make:model Api/${className} --a`

}
