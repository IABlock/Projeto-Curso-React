import { useLocation } from 'react-router-dom';

import styles from './Projects.module.css';
import Message from '../layout/Message';
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';

function Projects() {
    const location = useLocation();
    console.log('Location:', location);
    console.log('Location state:', location.state);
    let message = '';
    if (location.state) {
        message = location.state.message;
        console.log('Message from location state:', message);
    }

  return (
    <div className={styles.projects_container}>
      <div className={styles.title_container}>
        <h1>Welcome to the Projects Page</h1>
        <LinkButton to="/newproject" text="Criar Novo Projeto" />
      </div>
      {message &&<Message type="success" msg={message} />}
      <Container customClass="start">
        <p>My Projects</p>
      </Container>
    </div>
  );
}

export default Projects;