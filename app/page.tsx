export default function HomePage ()
{
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Bienvenido al Inventario</h1>
      <a href="/login" className="mt-4 text-blue-500 underline">Iniciar Sesión</a>
    </div>
  );
}
