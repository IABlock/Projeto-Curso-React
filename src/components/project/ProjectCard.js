import styles from './ProjectCard.module.css';

function ProjectCard({ id, name, budget, category, handleRemove }) {
    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R$ {budget}
            </p>
            <p>
                <span>Categoria:</span> {category.name}
            </p>
            <div className={styles.project_card_actions}>
                <p>Excluir</p>
                <p>Editar</p>
            </div>
        </div>
    );
}

export default ProjectCard;