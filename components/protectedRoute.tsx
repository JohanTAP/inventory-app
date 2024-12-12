"use client";

import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface Props
{
    children: ReactNode;
}

export default function ProtectedRoute ( { children }: Props )
{
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect( () =>
    {
        if ( !loading && !user )
        {
            router.push( "/login" );
        }
    }, [ user, loading, router ] );

    if ( loading ) return <div>Cargando...</div>;
    return <>{ children }</>;
}
