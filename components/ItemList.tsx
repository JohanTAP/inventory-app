'use client';

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase.config";

interface Item
{
    name: string;
    quantity: number;
}

export default function ItemList ()
{
    const [ items, setItems ] = useState<Item[]>( [] );

    useEffect( () =>
    {
        const itemsRef = ref( db, "items/" );
        onValue( itemsRef, ( snapshot ) =>
        {
            const data = snapshot.val();
            const itemList: Item[] = data
                ? Object.entries( data ).map( ( [ key, value ] ) => ( {
                    name: key, // Usa la clave como nombre
                    ...( value as { quantity: number } ),
                } ) )
                : [];
            setItems( itemList );
        } );
    }, [] );

    return (
        <div>
            <h1>Lista de Inventario</h1>
            <ul className="list-disc pl-6">
                { items.map( ( item ) => (
                    <li key={ item.name }>
                        { item.name }: { item.quantity }
                    </li>
                ) ) }
            </ul>
        </div>
    );
}
