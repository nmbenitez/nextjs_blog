import Link from 'next/link'
import styles from '../styles/BlogCard.module.css'

export default function BlogPost({title, author, datePublished, coverPhoto, slug}){
    return(
        <div className={styles.card}>
            <Link href={"/posts/"+ slug}>
                <div className={styles.imgContainer}>
                    <img src={coverPhoto.url} alt=""></img>
                </div>
            </Link>
            <h2>{title}</h2>
            <div className={styles.text}>
            
                <div className={styles.details}>
                    <div className={styles.author}>
                        <img src={author.avatar.url} />
                        <h3>{author.name}</h3>
                    </div>
                    <div className={styles.date}>
                        <h3>{datePublished}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}