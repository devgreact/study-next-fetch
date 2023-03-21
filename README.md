# Data Fetching 프로젝트 생성

## 샘플 node api 서버 구축(Express)

### SSR(Sever-Side-Rendering) 테스트 : getServerSideProps

index.js
```js
// SSR(Sever-Side-Rendering)
// - SSR은 유저가 페이지를 요청할 때마다 
// - 그에 맞는 HTML 문서를 생성해서 반환합니다.
// - 이러한 특징이 사용되는 경우는 
// - 항상 최신 상태를 유지해야하는 웹 페이지나, 분석 차트, 게시판 등, 
// - 사용자의 요청마다 동적으로 페이지를 생성해 다른 내용을 보여주어야 하는 경우에 사용됩니다.
// - 그때 그때 보여주는 방식
export const getServerSideProps = async () => {
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