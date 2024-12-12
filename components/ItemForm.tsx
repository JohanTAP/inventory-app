'use client';

import { useState } from "react";
import { ref, set, get } from "firebase/database";
import { db } from "@/lib/firebase.config";

export default function ItemForm ()
{
    const [ name, setName ] = useState<string>( "" );
    const [ quantity, setQuantity ] = useState<number>( 1 );
    const [ error, setError ] = useState<string | null>( null );

    const handleSubmit = async ( e: React.FormEvent ) =>
    {
        e.preventDefault();

        // Convierte el nombre del item en una clave única
        const itemKey = name.toLowerCase().replace( /\s+/g, "_" ); // Reemplaza espacios por "_"
        const itemRef = ref( db, `items/${ itemKey }` );

        try
        {
            // Verificar si ya existe
            const snapshot = await get( itemRef );
            if ( snapshot.exists() )
            {
                setError( "El item ya existe en el inventario." );
                return;
            }

            // Guardar el item en Firebase
            await set( itemRef, { quantity } );
            setName( "" );
            setQuantity( 1 );
            setError( null ); // Limpia cualquier error previo
        } catch ( err )
        {
            console.error( err );
            setError( "Ocurrió un error al guardar el item." );
        }
    };

    return (
        <form onSubmit={ handleSubmit } className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="Nombre del item"
                value={ name }
                onChange={ ( e ) => setName( e.target.value ) }
                required
                className="border p-2"
            />
            <input
                type="number"
                placeholder="Cantidad"
                value={ quantity }
                onChange={ ( e ) => setQuantity( Number( e.target.value ) ) }
                required
                className="border p-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2">Agregar</button>
            { error && <p className="text-red-500">{ error }</p> }
        </form>
    );
}
