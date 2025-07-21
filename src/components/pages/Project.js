import {useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';

import style from './Project.module.css';


function Project() {
  const { id } = useParams();
  const [project, setProject] = useState([]);

    useEffect(() => {
      fetch(`http://localhost:3001/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProject(data);
        }).catch((error) => {
          console.error('Error fetching project:', error);
        });
    }, [id]);

  return (
    <div>
      <h1>{project.name}</h1>
    </div>
  );
}

export default Project;
