import Head from "next/head";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import Link from "next/link";
import { base_url } from "../utils/fetch";

export async function getStaticProps() {
  const res = await fetch(`${base_url}/launches`);
  const launches = await res.json();
  return {
    props: {
      launches,
    },
  };
}

export default function Home({ launches }) {
  return (
    <div>
      <Head>
        <title>Let's get to the moon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Launches</h1>
        <div className={styles.container}>
          {launches.map((item) => (
            <Link key={item.id} href={`/flights/${item.id}`}>
              <div className={styles.flightCard}>
                <h2>{item.name}</h2>
                <img
                  className={styles.patchImage}
                  src={item.links.patch.small}
                />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
