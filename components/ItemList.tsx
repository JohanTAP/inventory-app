// src/components/ItemList.tsx
'use client';

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase.config";
import useConnectionStatus from "../hooks/useConnectionStatus";

interface Item
{
    name: string;
    quantity: number;
}

export default function ItemList ()
{
    const [ items, setItems ] = useState<Item[]>( [] );
    const isConnected = useConnectionStatus();

    useEffect( () =>
    {
        const itemsRef = ref( db, "items/" );
        const unsubscribe = onValue( itemsRef, ( snapshot ) =>
        {
            const data = snapshot.val();
            const itemList: Item[] = data
                ? Object.entries( data ).map( ( [ key, value ] ) => ( {
                    name: key,
                    ...( value as { quantity: number } ),
                } ) )
                : [];
            setItems( itemList );
        } );

        return () => unsubscribe();
    }, [] );

    return (
        <div>
            <h1>Lista de Inventario</h1>
            <p className={ isConnected ? "text-green-500" : "text-red-500" }>
                { isConnected ? "Conectado" : "Sin conexión" }
            </p>
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
