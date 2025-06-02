import { CircleLoader } from 'react-spinners';
import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles['loader-container']}>
      <CircleLoader color='#bfb2ff' size={70} />
    </div>
  );
}
