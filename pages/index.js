import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";
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
    </div>
  );
}
