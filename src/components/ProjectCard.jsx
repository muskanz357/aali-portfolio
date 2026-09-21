function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-thumb" style={{ background: project.color }}>
        {project.image ? (
          <img src={project.image} alt={`${project.name} store preview`} />
        ) : (
          <span>{project.name}</span>
        )}
      </div>

      <div className="project-info">
        <h3>{project.name}</h3>
        <p>{project.type}</p>
        <ul className="tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <a href="#work" className="text-link">View case study</a>
      </div>
    </article>
  )
}

export default ProjectCard