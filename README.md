# Data Fetching 프로젝트 생성

https://narup.tistory.com/235

## 1. SSR/SSG

- React: CSR(Client-Side-Rendering)

- Next.js: SSR(Sever-Side-Rendering), SSG(Static-Site-Generation)
  브라우저에 렌더링 할때 기본적으로 pre-rendering(사전 렌더링)을 해줍니다.

## 2. Pre Rendering

- 사전 렌더링이란? Server단에서 DOM 요소들을 Build하여 HTML 문서를 렌더링하는 것을 말합니다.
- HTML을 미리 렌더링하고, 그 뒤에 요청이 오면 Chunk 단위로 javascript를 보내주어 이벤트가 작동하게 되는 것이 Hydration이며, Next.js에서 사용되는 방법
- Hydrate란, Server Side단에서 렌더링 된 정적 페이지와 번들링된 js파일(Webpack)을 클라이언트에게 보낸 뒤, 클라이언트 단에서 HTML 코드와 React인 js 코드를 서로 매칭시키는 과정을 말합니다. (https://narup.tistory.com/230)
- 서버에서 pre-rendering하는 것까지가 Next.js의 특징인 것이고, pre-rendering을 동적으로 해서 페이지를 생성하느냐, 정적으로 페이지를 생성하느냐의 차이가 SSR과 SSG의 차이라고 생각하시면 됩니다.

## 3. SSG(Static-Site-Generation)

- SSG는 빌드를 진행할 때 pages 폴더에서 작성한 각 페이지들에 대해 각각의 문서를 생성해서 static한 파일로 생성합니다.
- 만약 해당 페이지에 대한 요청이 발생하게 되면, 이 페이지들을 재생성하는 것이 아니라 이미 생성이 된 페이지를 반환하는 형태로 동작합니다.
- 따라서 React의 CSR보다 응답속도가 빠르다는 장점이 있고 Next.js에서도 SSG형태로 사용하는 것을 지향하고 있습니다.
- 마케팅 페이지, 블로그 게시물, 제품의 목록과 같이 정적 생성된 정보를 각 요청에 동일한 정보로 반환하는 경우에 위 SSG를 사용합니다.

### 3.1. getStaticProps

- Next.js에서 SSG를 사용하려면 getStaticProps를 사용하면 됩니다.
- getStaticProps는 서버 측에서만 실행되는 함수입니다.
- getStaticProps는 클라이언트 측에서 실행되지 않습니다.
- 빌드 시에 딱 한 번만 호출 되며, static file로 빌드 되는데, 이 함수는 API와 같은 외부 데이터(SQL, ...)를 받아 Static Generation 하기 위한 용도입니다.

About.tsx

```js
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const getStaticProps = async () => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
  const data = res.data;

  console.log(data[1]);

  return {
    props: {
      list: data,
    },
  };
};

const About = ({ list }: any) => {
  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   const getList = async () => {
  //     const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
  //     const data = res.data;
  //     setList(data);
  //   };
  //   getList();
  // }, []);

  return (
    <div className="About">
      <h1>About 페이지</h1>
      {list.length &&
        list
          .slice(0, 10)
          .map((item: any) => <li key={item.id}>{item.title}</li>)}
    </div>
  );
};

export default About;
```

- About 페이지가 호출되면 getStaticProps()가 먼저 실행됩니다.
- fetch를 통해(혹은 axios) 게시물 리스트를 가져오고 그 이후에 props에 리턴값을 담아서 About에 전달합니다.

- 위와 같이 getStaticProps()를 사용해서 코드를 작성한 후 build를 하면, 사전에 서버에서 API를 호출을 해서 데이터를 담고, 그 데이터가 담긴 HTML을 생성하게 됩니다.

### 3.2. getStaticPaths

- getStaticPaths는 동적 라우팅으로 페이지를 동적으로 생성할 때, 특정 페이지는 정적으로 생성하고 싶을 때 사용합니다.
- 동적 라우팅: "/pages/boards/[id].js" 과 같이 게시글 같은 것들을 외부에서 가져와서 동적으로 페이지를 생성해서 연결하는 것을 말합니다.
- getStaticPaths는 예를 들어, 웹 페이지에 공지사항과 같은 특정 게시물만 정적으로 생성하고 싶을 때 사용합니다.
- pages/detail-static/[id].tsx (pages/detail-static/[id].js js쓰시면 :any는 빼주시면 됩니다)

```js
import React from "react";
import axios from "axios";

const DetailStatic = ({ item }: any) => {
  return (
    <div>
      {item && (
        <div className="Detail">
          <h1 style={{ color: "#fff" }}>with Static Generation</h1>
          <h1>{item.title}</h1>
          <p>{item.body}</p>
          <p>{item.id}번째 게시글</p>
        </div>
      )}
    </div>
  );
};

export default DetailStatic;

export const getStaticPaths = async () => {
  console.log("path");
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (ctx: any) => {
  console.log("props");
  const id = ctx.params.id;
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const data = res.data;

  return {
    props: {
      item: data,
    },
  };
};
```

```
path
props
4. WrappedApp crate enw store with withRedux(MyApp) {initionState:undefined, initialStateFromGSPorGSSR: undefined}
```

- 호출되는 순서는 getStaticPaths -> getStaticProps -> DetailStatic 페이지 입니다.

- 위 getStaticPaths를 보면 리턴값으로 paths에 params로 1,2,3 페이지 번호를 지정했습니다.

- 그 후에 getStaticProps가 호출되어 ctx.params.id를 읽어 해당 게시글에 대한 데이터를 가져와 페이지를 생성합니다.

- getStaticPaths에서 정적으로 지정했기 때문에 이 1,2,3 페이지는 static file로 생성됩니다.

```
.next / server / chunks / pages / detail-static / 1.html 1.json 2.html 2.json 3.html 3.json
```

http://localhost:3000/detail-static/1

http://localhost:3000/detail-static/5

- 1번과 5번으로 테스트해보면 1번 페이지는 로딩되지마자 내용이 채워진 페이지가 로딩되고, 5번 페이지는 페이지가 먼저 로딩되며 그 이후에 내용이 채워지는 차이가 있습니다.

## 4. SSR(Sever-Side-Rendering)

- SSR은 유저가 페이지를 요청할 때마다 그에 맞는 HTML 문서를 생성해서 반환합니다.

- 이러한 특징이 사용되는 경우는 항상 최신 상태를 유지해야하는 웹 페이지나, 분석 차트, 게시판 등, 사용자의 요청마다 동적으로 페이지를 생성해 다른 내용을 보여주어야 하는 경우에 사용됩니다.

### 4.1. getServerSideProps

About.tsx

```js
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const getStaticProps = async () => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
  const data = res.data;

  console.log(data[1]);

  return {
    props: {
      list: data,
    },
  };
};

const About = ({ list }: any) => {
  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   const getList = async () => {
  //     const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
  //     const data = res.data;
  //     setList(data);
  //   };
  //   getList();
  // }, []);

  return (
    <div className="About">
      <h1>About 페이지</h1>
      {list.length &&
        list
          .slice(0, 10)
          .map((item: any) => <li key={item.id}>{item.title}</li>)}
    </div>
  );
};

export default About;
```

- About 컴포넌트에서 생성된 게시글 리스트의 세부 게시글 정보를 보고 싶을 때는 아래와 같이 코드를 작성해서 사용합니다.
- detail이라는 폴더를 만들고 [id].js 파일을 만들어서 아래 코드를 작성합니다.
  detail/[id].js

```js
import React from "react";
import axios from "axios";

const Detail = ({ item }) => {
  return (
    <div className="Detail">
      <h1>{item.title}</h1>
      <p>{item.body}</p>
      <p>{item.id}번째 게시글</p>
    </div>
  );
};

export default Detail;

export const getServerSideProps = async (ctx) => {
  const id = ctx.params.id;
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const data = res.data;

  console.log(data); // 해당 콘솔은 어디에서 출력이 되나요?

  return {
    props: {
      item: data,
    },
  };
};
```

- getServerSideProps에서 인자인 ctx는 context로

```
[params] contains the route parameters for pages using dynamic routes. For example, if the page name is [id].js , then params will look like { id: ... }. To learn more, take a look at the Dynamic Routing documentation. You should use this together with getStaticPaths, which we’ll explain later.
[preview] is true if the page is in the preview mode and undefined otherwise. See the Preview Mode documentation.
[previewData] contains the preview data set by setPreviewData. See the Preview Mode documentation.
[locale] contains the active locale (if enabled).
[locales] contains all supported locales (if enabled).
[defaultLocale] contains the configured default locale (if enabled).
```

위와 같은 정보에 접근이 가능합니다.
