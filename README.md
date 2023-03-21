# Data Fetching 프로젝트 생성

## 샘플 node api 서버 구축(Express)

### SSG(Static-Site-Generation) 테스트 : getStaticProps

index.js
```js

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
  // const res = await fetch(
  //   "https://api.thecatapi.com/v1/breeds?api_key=live_Z9dx0VtiK2f0qbMsh1fhE7Z3Sw21vaP79MAhtKChl3XFPpWKvoBDSa6OSqZHYNSJ&limit=10"
  // );
  const res = await fetch(`http://localhost:8080/api/cats`)
  const cats = await res.json();
  return {
    props: {
      cats: cats,
    },
  };
};

```

```txt
npm run build
npm start
```
콘솔 확인

```txt
Ctrl + C

data.js 수정 후 다시 서버 실행하여 즉시 데이터가 바뀌는 지 확인하기

node app.js
```

```txt
http://localhost:8080/api/cats
```

### 변경이 일어나지 않음
- .next > server > page > index.html 을 보면 이미 정적으로 고정이 되었다.
- 미리 만들어진 html 을 생성해서 보여지는 방식이다.

### 의문점
- 데이터가 바뀌어도 적용이 안되는 문제가 있다. 
- 해결책 : revalidate: 20 초 셋팅

```js
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
  // const res = await fetch(
  //   "https://api.thecatapi.com/v1/breeds?api_key=live_Z9dx0VtiK2f0qbMsh1fhE7Z3Sw21vaP79MAhtKChl3XFPpWKvoBDSa6OSqZHYNSJ&limit=10"
  // );
  const res = await fetch(`http://localhost:8080/api/cats`)
  const cats = await res.json();
  return {
    props: {
      cats: cats,
    },
    revalidate: 20
  };
};
```