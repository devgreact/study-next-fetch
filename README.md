# Data Fetching 프로젝트 생성

https://narup.tistory.com/235

```js
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
// - SSR은 유저가 페이지를 요청할 때마다 
// - 그에 맞는 HTML 문서를 생성해서 반환합니다.
// - 이러한 특징이 사용되는 경우는 
// - 항상 최신 상태를 유지해야하는 웹 페이지나, 분석 차트, 게시판 등, 
// - 사용자의 요청마다 동적으로 페이지를 생성해 다른 내용을 보여주어야 하는 경우에 사용됩니다.
// - 그때 그때 보여주는 방식
export const getServerSideProps = async () => {
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

// SSG(Static-Site-Generation)

// - SSG는 빌드를 진행할 때 pages 폴더에서 작성한 각 페이지들에 대해 각각의 문서를 생성해서 static한 파일로 생성합니다.
// - 만약 해당 페이지에 대한 요청이 발생하게 되면, 
//-  이 페이지들을 재생성하는 것이 아니라 이미 생성이 된 페이지를 반환하는 형태로 동작합니다.
// - 따라서 React의 CSR보다 응답속도가 빠르다는 장점이 있고 
// -  Next.js에서도 SSG형태로 사용하는 것을 지향하고 있습니다.
// - 마케팅 페이지, 블로그 게시물, 제품의 목록과 같이 정적 생성된 정보를 각 요청에 동일한 정보로 반환하는 경우에 위 SSG를 사용합니다.

// getStaticProps

// - Next.js에서 SSG를 사용하려면 getStaticProps를 사용하면 됩니다.
// - getStaticProps는 서버 측에서만 실행되는 함수입니다.
// - getStaticProps는 클라이언트 측에서 실행되지 않습니다.
// - 빌드 시에 딱 한 번만 호출 되며, 
//-  static file로 빌드 되는데, 
//- 이 함수는 API와 같은 외부 데이터(SQL, ...)를 받아 
//- Static Generation 하기 위한 용도입니다.

// export const getStaticProps = async () => {
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
```