import Head from "next/head";
import Link from "next/link";
import HeadInfo from "../components/HeadInfo";

export default function Home({ cats }) {
  console.log(cats);
  return (
    <div>
      <h1>Welcome to Blog</h1>
      <ul>
        {cats.map((cat) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}

// SSR(Sever-Side-Rendering)
// export const getServerSideProps = async () => {
//   const res = await fetch(
//     "https://api.thecatapi.com/v1/breeds?api_key=live_Z9dx0VtiK2f0qbMsh1fhE7Z3Sw21vaP79MAhtKChl3XFPpWKvoBDSa6OSqZHYNSJ&limit=10"
//   );
//   const cats = await res.json();
//   return {
//     props: {
//       cats: cats,
//     },
//   };
// };

// SSG(Static-Site-Generation)
export const getStaticProps = async () => {
  const res = await fetch(
    "https://api.thecatapi.com/v1/breeds?api_key=live_Z9dx0VtiK2f0qbMsh1fhE7Z3Sw21vaP79MAhtKChl3XFPpWKvoBDSa6OSqZHYNSJ&limit=10"
  );
  const cats = await res.json();
  return {
    props: {
      cats: cats,
    },
  };
};
