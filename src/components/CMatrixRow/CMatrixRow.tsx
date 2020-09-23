import React, { FC } from 'react';
import style from './CMatrixRow.module.scss';

import CCircle, { levelRange } from '../CCircle/CCircle';
import CUserSignature from '../CUserSignature/CUserSignature';
import { IEmployee } from '../../models/IEmployee';
import { ISkills, ESkillLevel } from '../../models/ISkills';
import { Dropdown, Menu } from 'antd';
import { updateEmployeeSkill } from '../../services/employeesSvc';

const CMatrixRow: FC<{
  employee: IEmployee;
  skills: ISkills[];
  skillsSorted: string[];
  getMatrixData: Function;
}> = ({ employee, skills, skillsSorted, getMatrixData }) => {
  //Cell

  const skillsCell = skillsSorted.map((skill) => {
    let employeeSkill = employee.skills!.find(
      (empSkill) => empSkill.skill.name === skill
    );

    let currentSkill = skills.find((currSkill) => currSkill.name === skill);
    const skillsToNumbers = Object.values(ESkillLevel).filter((elem) =>
      Number.isInteger(Number(elem))
    );

    const menu = (
      <Menu>
        {skillsToNumbers.map((skill) => (
          <Menu.Item
            onClick={async () => {
              if (employeeSkill) {
                await updateEmployeeSkill(
                  employee._id,
                  currentSkill!,
                  +skill,
                  employeeSkill
                );
              } else {
                await updateEmployeeSkill(employee._id, currentSkill!, +skill);
              }
              getMatrixData();
            }}
          >
            {skill == 0 ? (
              <div className={style.None}>{`\u2717`}</div>
            ) : (
              <CCircle level={+skill as levelRange} />
            )}
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <div className={style.Cell}>
          {!!employeeSkill && (
            <CCircle level={employeeSkill.level as levelRange} />
          )}
        </div>
      </Dropdown>
    );
  });

  //Row

  return (
    <div className={style.Row}>
      <div className={style.Signature_Cell}>
        <CUserSignature {...employee} />
      </div>
      {skillsCell}
    </div>
  );
};

export default CMatrixRow;
