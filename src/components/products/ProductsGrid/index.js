// import ProductCard from "@/components/products/ProductCard";

// const Index = ({products}) => {
//   console.log(products);
//   return (
//     <div className="grid grid-cols-4 gap-8 my-12">
//       {
//         products.map(product => (
//           <ProductCard key={product.id} product={product} />
//         ))
//       }
//     </div>
//   );
// }

// export default Index;


import ProductCard from "@/components/products/ProductCard";

const Index = ({ products }) => {

  const productList = Array.isArray(products.products) ? products.products : [];

  return (
    <div className="grid grid-cols-4 gap-8 my-12">
      {productList.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Index;
