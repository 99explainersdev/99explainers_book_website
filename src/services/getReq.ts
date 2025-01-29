// Purpose: Service to make a get request to the server.

interface TestData {
  _id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

export const getTestData = async (): Promise<TestData[]> => {
  const res = await fetch("http://localhost:3000/testData/api/test-data");
  const data = await res.json();
  return data;
};
