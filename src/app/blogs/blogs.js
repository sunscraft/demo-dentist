import React from 'react';
import styles from './blogs.module.css';

const blogsData = [
  {
    id: 1,
    category: 'COSMETIC',
    title: 'Top 5 Myths About Teeth Whitening',
    description: 'Learn the facts about professional whitening treatments and how they compare to home kits.',
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    category: 'NUTRITION',
    title: 'Foods That Naturally Clean Your Teeth',
    description: 'Incorporate these crunchy and fiber-rich foods into your diet for better oral hygiene.',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    category: 'ORTHODONTICS',
    title: 'Invisalign vs Braces: Which is for you?',
    description: 'A comprehensive comparison to help you choose the right alignment solution.',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop',
  },
];

const Blogs = () => {
  return (
    <section className={styles.blogsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <span className={styles.topTag}>JOURNAL</span>
            <h2 className={styles.title}>Dental Health Tips</h2>
            <p className={styles.subtitle}>Expert insights to help you maintain a perfect smile every day.</p>
          </div>
          <button className={styles.viewAllBtn}>View All Articles</button>
        </div>

        <div className={styles.grid}>
          {blogsData.map((blog) => (
            <div key={blog.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={blog.image} alt={blog.title} className={styles.image} />
              </div>
              <div className={styles.content}>
                <span className={styles.category}>{blog.category}</span>
                <h3 className={styles.blogTitle}>{blog.title}</h3>
                <p className={styles.description}>{blog.description}</p>
                <a href="#" className={styles.readMore}>
                  READ ARTICLE <span className={styles.arrow}>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;