import { useLocation } from 'react-router-dom';

import Message from '../layout/Message';

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
    <div className="projects">
      <h1>Welcome to the Projects Page</h1>
      <p>This is the main content of the projects page.</p>
      <Message type="success" msg={message} />
    </div>
  );
}

export default Projects;