import getDomain from "../lib/getDomain";

async function getData() {
  try {
    const domain = getDomain();
    const endpoint = `${domain}/api/posts`;
    const res = await fetch(endpoint);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return res.json();
    } else {
      throw new Error("Invalid content type");
    }
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

export default function BlogPage({ data }) {
  const items = data?.items || [];

  return (
    <main>
      <h1>Hello from blog page</h1>
      <p>Posts:</p>
      <ul>
        {items.map((item, idx) => (
          <li key={`post-${idx}`}>{item.title}</li>
        ))}
      </ul>
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const data = await getData();
    return { props: { data } };
  } catch (error) {
    console.error(error);
    return { props: { data: { items: [] } } };
  }
}
