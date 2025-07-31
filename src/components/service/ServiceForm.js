import {useState} from 'react';

import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';
import styles from '../project/ProjectForm.module.css';


function ServiceForm({handleSumit, btnText, projectData}) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault();
        projectData.services.push(service)
        handleSumit(projectData)
    }

    function handleChange(e) {
        setService({...service, [e.target.name]: e.target.value})
    }

  return (
    <form onSubmit={submit}>
        <Input type="text" text="Nome do Serviço" name="name" placeholder="Insira o Nome do Serviço" handleOnChange={handleChange}/>
        <Input type="number" text="Custo do Serviço" name="cost" placeholder="Insira o Custo do Serviço" handleOnChange={handleChange}/>
        <Input type="text" text="Descrição do Serviço" name="description" placeholder="Descrição do Serviço" handleOnChange={handleChange}/>
        <SubmitButton text={btnText} />
    </form>
  );
}

export default ServiceForm;