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
