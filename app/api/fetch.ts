export async function fetchWrapper<T = unknown>(
  input: RequestInfo, 
  init?: RequestInit | undefined
) {

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${input}`, 
    init
  );


    const result = await data.json();

   return result as T;

}
