import styles from "../../styles/Home.module.css";

export const getServerSideProps = async ({ params }) => {
  const result = await fetch(
    `https://api.spacexdata.com/v4/launches/${params.id}`
  );
  const launch = await result.json();
  return {
    props: { launch },
  };
};

// export async function getStaticProps({ params }) {
//   const res = await fetch(
//     `https://api.spacexdata.com/v4/launches/${params.id}`
//   );
//   const launch = await res.json();
//   return {
//     props: {
//       launch,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const res = await fetch("https://api.spacexdata.com/v4/launches");
//   const launches = await res.json();

//   const paths = launches.map((launch) => ({
//     params: { id: String(launch.id) },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

export default function Flight({ launch }) {
  return (
    <div key={launch.id} className={styles.flightCard}>
      <h2>{launch.name}</h2>
      <img className={styles.patchImage} src={launch.links.patch.small} />
    </div>
  );
}

// Flight.getInitialProps = async (router) => {
//   const res = await fetch(
//     `https://api.spacexdata.com/v4/launches/${router.query.id}`
//   );
//   const json = await res.json();
//   return { launch: json };
// };
