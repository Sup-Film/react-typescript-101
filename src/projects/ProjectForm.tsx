import React, { SyntheticEvent, useState } from 'react'
import { Project } from './Project';

interface ProjectFormProps {
  // สร้างฟังก์ชั่น Cancel
  project: Project;
  onCancel: () => void;
  onSave: (project: Project) => void;
}

function ProjectForm({ project: initialProject, onSave, onCancel }: ProjectFormProps) {
  // สร้าง State สำหรับเก็บค่าของ Project
  const [project, setProject] = useState(initialProject);

  // สร้าง State สำหรับเก็บข้อผิดพลาด
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    budget: ''
  });

  // Event สำหรับจัดการ Submit Form
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValid()) return;
    onSave(project);
  }

  // Handle Change Event สำหรับ Input ทุกตัว
  const handleChange = (event: any) => {
    // ดึงค่า type, name, value, และ checked จาก event.target
    const { type, name, value, checked } = event.target;

    // กำหนดค่า updatedValue โดยตรวจสอบว่าเป็น checkbox หรือไม่
    let updatedValue = type === 'checkbox' ? checked : value;

    // ถ้า type เป็น number ให้แปลงค่า updatedValue เป็นตัวเลข
    if (type === 'number') {
      updatedValue = Number(updatedValue);
    }

    // สร้างออบเจ็กต์ change ที่มีคีย์เป็น name และค่าคือ updatedValue
    // การใช้วงเล็บเหลี่ยม [] ครอบชื่อคีย์ในออบเจ็กต์เป็นการใช้คุณสมบัติที่เรียกว่า "Computed Property Names" หรือ "Dynamic Property Names" ซึ่งช่วยให้คุณสามารถกำหนดชื่อคีย์ของออบเจ็กต์โดยใช้ตัวแปรหรือการคำนวณได้
    // เช่น ถ้ากำหนด const name = 'name'; แล้วกำหนด const change = { [name]: 'John' }; จะได้ change = { name: 'John' }
    const change = {
      [name]: updatedValue
    }

    let updatedProject: Project;

    // ใช้ setProject เพื่ออัปเดตสถานะของโปรเจ็กต์
    setProject((p) => {
      // รวมค่าเดิมของโปรเจ็กต์กับค่าใหม่ใน change
      updatedProject = new Project({ ...p, ...change });
      return updatedProject;
    });

    // ใช้ validate เพื่อตรวจสอบค่าที่กรอกเข้ามา
    setErrors(() => validate(updatedProject));
  }

  // Function validate สำหรับตรวจสอบค่าที่กรอกเข้ามา
  const validate = (project: Project) => {
    let errors: any = { name: '', description: '', budget: '' };

    if (project.name.length === 0) {
      errors.name = 'Name is required';
    }

    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }

    if (project.description.length === 0) {
      errors.description = 'Description is required';
    }

    if (project.budget === 0) {
      errors.budget = 'Budget must be greater than 0';
    }

    return errors;
  }

  const isValid = () => {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    )
  }

  return (
    <form className='input-group vertical' onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input type="text" name='name' placeholder='enter name' value={project.name} onChange={handleChange} />
      {errors.name.length > 0 &&
        <div className='card error'>
          <p>{errors.name}</p>
        </div>
      }

      <label htmlFor="description">Project Description</label>
      <textarea name="description" placeholder='enter description' value={project.description} onChange={handleChange} ></textarea>
      {errors.description.length > 0 &&
        <div className='card error'>
          <p>{errors.description}</p>
        </div>
      }

      <label htmlFor="budget">Project Budget</label>
      <input type="number" name='budget' placeholder='enter budget' value={project.budget} onChange={handleChange} />
      {errors.budget.length > 0 &&
        <div className='card error'>
          <p>{errors.budget}</p>
        </div>
      }

      <label htmlFor="isActive">Active</label>
      <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange} />

      <div className="input-group">
        <button className='primary bordered medium'>Save</button>
        <span></span>
        <button type='button' className='bordered meduim' onClick={onCancel}>Cancel</button>
      </div>

    </form>
  )
}

export default ProjectForm
