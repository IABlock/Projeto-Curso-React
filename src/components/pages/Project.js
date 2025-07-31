import {parse, v4 as uuidv4} from 'uuid'
import {useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';

import style from './Project.module.css';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';


function Project() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [showServiceForm, setShowServiceForm] = useState(false);

    useEffect(() => {
      setTimeout(() => {
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
              }, 2000);
      }, [id]);

  function createService(project){
      // last service
      const lastService = project.services[project.services.length -1]

      lastService.id = uuidv4()

      const lastServiceCost = lastService.cost
      const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

      if (newCost > parseFloat(project.budget)) {
        setMessage('Orçamento ultrapassado')
        setType('error')
        project.services.pop()
        return false
      }

      project.cost = newCost

      fetch(`http://localhost:3001/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage('Projeto atualizado com sucesso!');
        setType('success');
      })
      .catch((error) => {
        console.error('Error updating project:', error);
      });
      
  }

  function toggleProjectForm() {
    // Logic to toggle the project form visibility
    setShowProjectForm(!showProjectForm);
    console.log('Toggle project form visibility:', showProjectForm);
  }

  function toggleServiceForm() {
    // Logic to toggle the service form visibility
    setShowServiceForm(!showServiceForm);
    console.log('Toggle service form visibility:', showServiceForm);
  }

  function editPost(project) {
    setMessage('');

    if (project.budget < project.cost) {
      setMessage('O orçamento não pode ser menor que o custo do projeto.');
      setType('error');

      return false;
    }
    fetch(`http://localhost:3001/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage('Projeto atualizado com sucesso!');
        setType('success');
      })
      .catch((error) => {
        console.error('Error updating project:', error);
      });
  }

  return (
    <>
      {project.name ? (
        <div className={style.project_details}>
          <Container customClass="column">
            {message && <Message msg={message} type={type} />}

            {/* Projeto para Alterar ou Exibir */}
            <div className={style.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button onClick={toggleProjectForm} className={style.btn}>{!showProjectForm ? 'Editar Projeto' : 'Fechar'}</button>
              {!showProjectForm ? (
                <div className={style.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento:</span> R$ {project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> R$ {project.cost}
                  </p>
                </div>
              ) : (
                <div className={style.project_info}>
                  <ProjectForm handleSubmit={editPost} btnText='Concluir Projeto' projectData={project} />
                </div>
              )}              
            </div>

            {/* Formulário de Serviços */}
            <div className={style.details_container_column }>
              <h2>Adicione um Serviço</h2>              
              <button onClick={toggleServiceForm} className={style.btn}>{!showServiceForm ? 'Adicionar Serviços' : 'Fechar'}</button>
              <div className={style.project_info}>
                {showServiceForm && (<ServiceForm 
                handleSumit={createService}
                btnText = "Adicionar Serviço"
                projectData = {project}
                />
              )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              <p>Itens do Serviço</p>
            </Container>                    
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
