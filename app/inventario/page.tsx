import ItemForm from "@/components/ItemForm";
import ItemList from "@/components/ItemList";

export default function InventarioPage ()
{
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Inventario</h1>
            <ItemForm />
            <ItemList />
        </div>
    );
}
