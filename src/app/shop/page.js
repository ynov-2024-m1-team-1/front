import Link from "next/link";
import { getProducts } from "@/services/api/product.api.js";
import Alert from "@/components/UI/Alert";
import ProductsGrid from "@/components/products/ProductsGrid";
import TitlePage from "@/components/UI/TitlePage";

export default async function Page({
    searchParams,
}) {

    const { take = 8 } = searchParams || {};

    const response = await getProducts(take);

    if (!response.data || response.success === false) return <Alert message={response.message} type="error" />;

    return (
        <div className="container mx-auto">
            <TitlePage title="Shop" />
            <ProductsGrid products={response.data.products} />
            <div className="flex justify-center mb-24">
                {
                    Number(take) <= response.data.length && (
                        <Link
                            className="transition ease-in-out delay-150 mt-4 inline-flex items-center px-4 py-3 text-sm border border-slate-500 font-medium text-center text-slate-500 bg-white hover:bg-slate-500 hover:text-white"
                            href={`/shop?take=${(Number(take) + 8)}`}
                        >
                            See more
                        </Link>
                    )
                }
            </div>
        </div>
    )
}
