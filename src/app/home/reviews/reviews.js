import React from 'react';
import styles from './reviews.module.css';

const reviewsData = [
    {
        id: 1,
        name: "Rajesh Khanna",
        location: "Greater Noida",
        rating: 5,
        comment: "Had an implant done here. The process was painless and the result looks incredibly natural. Dr. Priya is a perfectionist.",
        image: "https://i.pravatar.cc/150?u=rajesh" // Placeholder image
    },
    {
        id: 2,
        name: "Anjali Singh",
        location: "New Delhi",
        rating: 5,
        comment: "The best dental experience I've ever had. The staff is very polite and the clinic is super clean. Highly recommended!",
        image: "https://i.pravatar.cc/150?u=anjali"
    },
    {
        id: 3,
        name: "Vikram Mehta",
        location: "Gurugram",
        rating: 4,
        comment: "Very professional doctors. They explained everything clearly before starting the treatment. Great results.",
        image: "https://i.pravatar.cc/150?u=vikram"
    },
    {
        id: 4,
        name: "Sanya Iyer",
        location: "Noida",
        rating: 5,
        comment: "My kids love coming here. The pediatric care is amazing. Thank you for making dental visits fun!",
        image: "https://i.pravatar.cc/150?u=sanya"
    }
];

const Reviews = () => {
    return (
        <section className={styles.reviewsSection}>
            <h2 className={styles.title}>Patient Experiences</h2>
            
            <div className={styles.sliderContainer}>
                <div className={styles.track}>
                    {/* Double the array to create a seamless infinite loop */}
                    {[...reviewsData, ...reviewsData].map((review, index) => (
                        <div key={index} className={styles.reviewCard}>
                            <div className={styles.stars}>
                                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                            </div>
                            <p className={styles.comment}>"{review.comment}"</p>
                            <div className={styles.userInfo}>
                                <img src={review.image} alt={review.name} className={styles.avatar} />
                                <div>
                                    <h4 className={styles.userName}>{review.name}</h4>
                                    <p className={styles.userLocation}>{review.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;