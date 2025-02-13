export default async function Home() {
  const result = await fetch(
    "https://script.google.com/macros/s/AKfycbwIkXIzvj3x1kHjIuL8BSorPQPYivK8T5bhQyfB-ic/dev"
  );
  const data = await result.json();

  console.log(data);

  return <div></div>;
}
