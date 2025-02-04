//Step : 2 (Client side fetch is 1, api/v1/whatever route is 3 for business logic)

// Get All the Books Route
export const getAllBooks = async () => {
  // The URL constructor creates a structured URL object from a string, allowing easy manipulation of different parts of a URL.
  const url = new URL(
    `${process.env.NEXT_PUBLIC_BASE_URL}/books/api/v1/get-all`
  );
  const response = await fetch(url.toString());
  const allBooks = await response.json(); // Automatically parses the JSON body

  return allBooks;
};

// Get Single Book Route

export const getSpecificBook = async (id: string) => {
  console.log("This is from getReq", id);
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/books/api/v1/${id}`);
  const response = await fetch(url.toString());
  const book = await response.json();
  return book;
};
