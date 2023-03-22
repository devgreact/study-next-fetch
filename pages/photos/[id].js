import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import HeadInfo from "../../components/HeadInfo";
import photosListStyle from "../../styles/PhotosList.module.css";
import Link from "next/link";
const Detail = ({ cats }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(cats);
  return (
    <div className={photosListStyle.photos}>
      <HeadInfo title="My Blog Photo" />
      <h1>
        My Photos : {id}{" "}
        <Link href="/photos">
          <a>이전</a>
        </Link>
      </h1>
      <ul>
        {cats.map((cat) => (
          <li key={cat.id}>
            <Image src={cat.url} width={100} height={100} alt={cat.title} />
            <span>{cat.breeds[0].name} </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const res = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${id}&api_key=live_Z9dx0VtiK2f0qbMsh1fhE7Z3Sw21vaP79MAhtKChl3XFPpWKvoBDSa6OSqZHYNSJ`
  );
  const cats = await res.json();
  return {
    props: {
      cats: cats,
    },
  };
};

export async function getStaticPaths() {
  const res = await fetch(
    "https://api.thecatapi.com/v1/breeds?api_key=live_Z9dx0VtiK2f0qbMsh1fhE7Z3Sw21vaP79MAhtKChl3XFPpWKvoBDSa6OSqZHYNSJ&limit=10"
  );
  const cats = await res.json();
  const paths = cats.map(({ id }) => ({ params: { id: `${id}` } }));

  return {
    //   paths: [{ params: { id: "abob" } }],
    paths: paths,
    fallback: false,
  };
}
//https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_Z9dx0VtiK2f0qbMsh1fhE7Z3Sw21vaP79MAhtKChl3XFPpWKvoBDSa6OSqZHYNSJ

export default Detail;
