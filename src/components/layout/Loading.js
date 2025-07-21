import loadsvg from '../../img/loading.svg';

import styles from './Loading.module.css';

function Loading() {
  return (
    <div className={styles.loading_container}>
      <img className={styles.loader} src={loadsvg} alt="Loading" /> 
      <p>Carregando...</p>
    </div>
  );
}

export default Loading;
