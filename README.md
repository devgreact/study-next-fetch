# Data Fetching 프로젝트 생성 1

## 1. Header props

/\_app.js

```js
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
```

components/Laout.js

```js
import Head from "next/head";
import React from "react";
import HeadInfo from "./HeadInfo";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div>{children}</div>
    </>
  );
};

export default Layout;
```

components/Nav.js

```js
import Link from "next/link";
import React from "react";
import navStyles from "../styles/Nav.module.css";

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/photos">
            <a>Photos</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
```

Nav.module.css

```css
.nav {
  padding: 0.5rem 1rem;
  background: #2c82c9;
}
.nav ul {
  display: flex;
}
.nav li {
  margin-right: 1rem;
  color: #fff;
}
```

globals.css

```css
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

ul {
  list-style: none;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
  body {
    color: white;
    background: black;
  }
}
```

components/HeaderInfo.js

```js
import Head from "next/head";
import React from "react";

const HeadInfo = ({ title, keyword, contents }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta keyword={keyword} />
      <meta contents={contents} />
    </Head>
  );
};

HeadInfo.defaultProps = {
  title: "My Blog",
  keyword: "BLog porewed by NExt.js",
  contents: "BLog porewed by NExt.js",
};

export default HeadInfo;
```

index.js

```js
import Head from "next/head";
import Link from "next/link";
import HeadInfo from "../components/HeadInfo";

export default function Home() {
  return (
    <div>
      <HeadInfo />
      <h1>Welcome to Blog</h1>
    </div>
  );
}
```

photos.js

```js
import React from "react";
import HeadInfo from "../components/HeadInfo";

const photos = () => {
  return (
    <div>
      <HeadInfo title="My Blog Photo" />
      <h1>My Photos</h1>
    </div>
  );
};

export default photos;
```
