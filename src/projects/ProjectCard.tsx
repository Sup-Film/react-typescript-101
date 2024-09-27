import React from 'react'
import { Project } from './Project'
import { Link } from 'react-router-dom';

function formatDescription(description: string): string {
  return description.substring(0, 60) + '...';
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
}

function ProjectCard(prop: ProjectCardProps) {
  // Destructuring the prop
  // onEdit คือ function ที่จะถูกเรียกเมื่อมีการคลิกที่ปุ่ม Edit เป็นฟังก์ชั่นที่ถูกส่งมาจาก Component ที่เรียกใช้งาน ProjectCard
  const { project, onEdit } = prop;

  // Handle the click event
  const handleEditClick = (projectBeingEdited: Project) => {
    // เรียกใช้งานฟังก์ชั่น onEdit ที่ถูกส่งมาจาก Component ที่เรียกใช้งาน ProjectCard พร้อมส่งค่า projectBeingEdited ไปด้วย
    onEdit(projectBeingEdited);
  }

  return (
    <div className='card'>
      <img src={project.imageUrl} alt={project.name} />
      <Link to={'/projects/' + project.id}>
        <section className='section dark'>
          <h5 className='strong'>
            <strong>{project.name}</strong>
          </h5>
          <p>{formatDescription(project.description)}</p>
          <p>Budget: {project.budget.toLocaleString()}</p>
          <button className='bordered' onClick={() => handleEditClick(project)}>
            <span className='icon-edit'></span>
            Edit
          </button>
        </section>
      </Link>
    </div>
  )
}

export default ProjectCard
