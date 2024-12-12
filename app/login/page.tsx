"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase.config";

export default function LoginPage ()
{
    const [ email, setEmail ] = useState<string>( "" );
    const [ password, setPassword ] = useState<string>( "" );
    const [ error, setError ] = useState<string | null>( null );
    const router = useRouter();

    const handleLogin = async ( e: React.FormEvent ) =>
    {
        e.preventDefault();
        try
        {
            await signInWithEmailAndPassword( auth, email, password );
            router.push( "/inventario" ); // Redirige al inventario después de iniciar sesión
        } catch
        {
            setError( "Error al iniciar sesión: Verifica tus credenciales." );
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
            <form className="flex flex-col gap-4" onSubmit={ handleLogin }>
                <input
                    type="email"
                    placeholder="Correo"
                    value={ email }
                    onChange={ ( e ) => setEmail( e.target.value ) }
                    required
                    className="border p-2"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={ password }
                    onChange={ ( e ) => setPassword( e.target.value ) }
                    required
                    className="border p-2"
                />
                <button className="bg-blue-500 text-white p-2">Ingresar</button>
                { error && <p className="text-red-500">{ error }</p> }
            </form>
        </div>
    );
}
