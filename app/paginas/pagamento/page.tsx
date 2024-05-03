import { Payment, columns } from "./columns"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount:300,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function PagamentoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  )
}
