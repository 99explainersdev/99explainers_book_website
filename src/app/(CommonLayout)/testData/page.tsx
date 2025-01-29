
import { getTestData } from '../../../services/getReq';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

export default async function TestPageData() {
  try {
    const response = await getTestData();
    const allData = response.testData;

    return (
      <>
        <h1 className="bg-red-200 p-4 text-lg font-bold">Navbar</h1>
        <ul className="p-4">
          {allData.map((product: Product) => (
            <li key={product._id} className="border-b p-2">
              {product.name} -{" "}
              <span className="font-semibold">${product.price}</span>
            </li>
          ))}
        </ul>
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div className="text-red-500">Error: Failed to load data</div>;
  }
}
