import getDomain from "../lib/getDomain";

async function getData() {
  // 1 endpoint - API?
  const domain = getDomain();
  console.log("This is the domain: ", domain);
  const endpoint = `${domain}/api/posts`; // -> third party api request??
  console.log("This is the endpoint: ", endpoint);
  const res = await fetch(endpoint, { next: { revalidate: 10 } }); // HTTP GET
  //const res = await fetch(endpoint, { cache: "no-store" }); // HTTP GET

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  if (res.headers.get("content-type") !== "application/json") {
    return { items: [] };
  }
  return res.json();
}

export default async function BlogPage() {
  const data = await getData();
  const items = data && data.items ? [...data.items] : [];
  console.log(items);
  console.log(process.env.NEXT_PUBLIC_VERCEL_URL);
  return (
    <main>
      <h1>Hello from blogpage</h1>
      <p>Posts:</p>
      {items &&
        items.map((item, idx) => {
          return <li key={`post-${idx}`}>{item.title}</li>;
        })}
    </main>
  );
}
