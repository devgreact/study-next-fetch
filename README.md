# Data Fetching 프로젝트 생성

## photos List 구현

### SSG(Static-Site-Generation) 테스트 : getStaticPaths

photos/index.js

```js
import PhotosStyles from "../../styles/Photos.module.css";
import Image from "next/image";
import React from "react";
import HeadInfo from "../../components/HeadInfo";
import Link from "next/link";
const photos = ({ cats }) => {
  console.log(cats);
  return (
    <div>
      <HeadInfo title="My Blog Photo" />
      <h1>My Photos</h1>
      <ul className={PhotosStyles.photos}>
        {cats.map((cat) => (
          <li key={cat.id}>
            <Link href={`/photos/${cat.id}`}>
              <a>
                <Image
                  src={cat.image.url}
                  width={100}
                  height={100}
                  alt={cat.title}
                />
                <span>{cat.name} </span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
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

export const getStaticProps = async () => {
  const res = await fetch(
    "https://api.thecatapi.com/v1/breeds?api_key=live_Z9dx0VtiK2f0qbMsh1fhE7Z3Sw21vaP79MAhtKChl3XFPpWKvoBDSa6OSqZHYNSJ&limit=10"
  );
  const cats = await res.json();
  return {
    props: {
      cats: cats,
    },
    revalidate: 20,
  };
};

export default photos;
```

photos/[id].js

```js
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
```

PhotosList.module.css

```css
.photos {
  display: block;
  width: 95%;
  margin: 0 auto;
}

.photos h1 {
  display: flex;
  justify-content: space-between;
}

.photos ul {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.photos li {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.photos li span {
  width: 100%;
  text-align: center;
}
```
