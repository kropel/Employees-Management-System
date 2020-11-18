import React, { FC } from 'react';
import { IEmployee } from '../../models/IEmployee';
import { ISkills } from '../../models/ISkills';
import style from './CMatrixRequires.module.scss';

const CMatrixRequires: FC<{
  skills: ISkills[];
  skillsSorted: string[];
  employees: IEmployee[];
}> = ({ skills, skillsSorted, employees }) => {
  const skillsData = skillsSorted?.map((skill) => {
    return employees.reduce(
      (result, employee) => {
        const employeeSkill = employee.skills!.find(
          (empSkill) => empSkill.skill?.name === skill && empSkill.level > 0
        );
        if (employeeSkill) {
          result.trainedEmployees += 1;
          result.skillLevel += employeeSkill.level;
        }
        return result;
      },
      {
        trainedEmployees: 0,
        skillLevel: 0,
      }
    );
  });

  return (
    <div className={style.Row}>
      <div className={style.Column}>
        <div className={style.Title}>Trained</div>
        <div className={style.Title}>Skill Level</div>
      </div>
      <div className={style.Content}>
        <div className={style.ContentRow}>
          {skillsData?.map((skillData, index) => (
            <div className={style.Cell} key={`${index}trainedEmployees`}>
              {skillData.trainedEmployees}
            </div>
          ))}
        </div>
        <div className={style.ContentRow}>
          {skillsData?.map((skillData, index) => (
            <div className={style.Cell} key={`${index}skillLevel`}>
              {skillData.skillLevel}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CMatrixRequires;
