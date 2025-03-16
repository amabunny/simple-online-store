interface IParams {
  id: string;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<IParams>;
}) {
  const { id } = await params;

  return <div>ProductPage: {id}</div>;
}
