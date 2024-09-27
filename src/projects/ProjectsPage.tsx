import React, { useState, useEffect } from 'react'
import { MOCK_PROJECTS } from './MockProjects'
import ProjectList from './ProjectList'
import { Project } from './Project'
import { projectAPI } from './projectAPI'

function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  // ใช้ state ใหม่เพื่อเก็บค่าของหน้าปัจจุบัน
  const [currentPage, setCurrentPage] = useState(1);

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  }

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage);
        setError('');
        if (currentPage === 1) {
          setProjects(data);
        } else {
          //  ใช้ spread operator ในการรวมข้อมูล projects กับ data เข้าด้วยกัน แล้วเก็บใน state ใหม่
          setProjects((projects) => [...projects, ...data]);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [currentPage])

  const saveProject = (project: Project) => {
    projectAPI
      .put(project)
      .then((updatedProject) => {
        let updatedProjects = projects.map((p: Project) => {
          return p.id === project.id ? new Project(updatedProject) : p;
        })
        setProjects(updatedProjects);
      })
      .catch((e) => {
        if (e instanceof Error) {
          setError(e.message);
        }
      })
  }

  return (
    <>
      <h1>Project Page</h1>

      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}

      <ProjectList projects={projects} onSave={saveProject} />

      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className='button default' onClick={handleMoreClick}>More...</button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className='center-page'>
          <span className='spinner primary'></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  )
}

export default ProjectPage
