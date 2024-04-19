import ProductCard from "@/components/products/ProductCard";

const Index = ({ products }) => {
    return (
        <div className="grid grid-cols-4 gap-8 my-12">
            {products.map((product) =>
                product.active ? (
                    <ProductCard key={product._id} product={product} />
                ) : null
            )}
        </div>
    );
};

export default Index;
