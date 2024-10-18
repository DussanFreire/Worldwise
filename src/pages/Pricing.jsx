import PageNav from '../components/PageNav';
import styles from './Product.module.css';

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <div>
          <h2>Is free.</h2>
        </div>
        <img src='img-2.jpg' alt='overview of a large city with skyscrapers' />
      </section>
    </main>
  );
}
