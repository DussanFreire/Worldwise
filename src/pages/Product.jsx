import PageNav from '../components/PageNav';
import styles from './Product.module.css';

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <img
          src='img-1.jpg'
          alt='person with dog overlooking mountain with sunset'
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            WorldWide is an innovative app designed to help you track and
            celebrate your travel experiences. With WorldWide, you can easily
            register and manage the cities you’ve visited around the globe. The
            app provides a user-friendly interface that allows you to add
            cities, view your travel history, and explore the places you’ve
            explored.
          </p>
        </div>
      </section>
    </main>
  );
}
