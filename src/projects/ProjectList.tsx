import React, { useState } from 'react'
import { Project } from './Project'
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

// Interface ใช้สำหรับกำหนดโครงสร้างของ Object ที่จะใช้ใน Component นั้นๆ
interface ProjectListProps {
  projects: Project[];
  onSave: (project: Project) => void;
}

function ProjectList({ projects, onSave }: ProjectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project: Project) => {
    console.log(project);
    setProjectBeingEdited(project);
  }

  const cancelEdit = () => {
    setProjectBeingEdited({});
  }

  const items = projects.map((project) => (
    <div key={project.id} className='cols-sm'>
      {/* ส่งฟังก์ชั่น handleEdit ไปกับ prop onEdit */}
      {project === projectBeingEdited ? (
        <ProjectForm project={project} onCancel={cancelEdit} onSave={onSave} />
      ) : (
        <ProjectCard project={project} onEdit={handleEdit} />
      )}
    </div>
  ))
  return <div className='row'>{items}</div>
}

export default ProjectList
