import React, { FC } from 'react';
import style from './CMatrixRow.module.scss';

import CCircle, { levelRange } from '../CCircle/CCircle';
import CUserSignature from '../CUserSignature/CUserSignature';
import { IEmployee } from '../../models/IEmployee';
import { ISkills, ESkillLevel } from '../../models/ISkills';
import { Dropdown, Menu, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { updateEmployeeSkill } from '../../services/employeesSvc';

export interface ICMatrixRow {
  employee: IEmployee;
  skills: ISkills[];
  skillsSorted: string[];
  getMatrixData: Function;
  disabledCallback: () => void;
  disabledEmployee?: boolean;
}

const CMatrixRow: FC<ICMatrixRow> = ({
  employee,
  skills,
  skillsSorted,
  getMatrixData,
  disabledCallback,
  disabledEmployee,
}) => {
  //Cell
  const skillsCell = skillsSorted.map((skill, index) => {
    const employeeSkill = employee.skills!.find(
      (empSkill) => empSkill.skill?.name === skill && empSkill.level > 0
    );

    const currentSkill = skills.find((currSkill) => currSkill.name === skill);
    const skillsToNumbers = Object.values(ESkillLevel).filter((elem) =>
      Number.isInteger(Number(elem))
    );

    const menu = (
      <div className={style.Dropdown}>
        <Menu>
          {skillsToNumbers.map((skill, index) => (
            <Menu.Item
              key={`${skill}${index}`}
              onClick={async () => {
                if (employeeSkill) {
                  await updateEmployeeSkill(
                    employee._id,
                    currentSkill!,
                    +skill,
                    employeeSkill
                  );
                } else {
                  await updateEmployeeSkill(
                    employee._id,
                    currentSkill!,
                    +skill
                  );
                }
                getMatrixData();
              }}
            >
              {Number(skill) === 0 ? (
                <div className={style.None}>{`\u2717`}</div>
              ) : (
                <CCircle level={+skill as levelRange} />
              )}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    );

    return (
      <Dropdown
        key={`${employee._id}${index}`}
        overlay={menu}
        trigger={['click']}
        disabled={disabledEmployee}
      >
        <div
          className={`${style.Content} ${
            disabledEmployee ? style.DisabledCell : ''
          }`}
        >
          {!!employeeSkill && (
            <CCircle level={employeeSkill.level as levelRange} />
          )}
        </div>
      </Dropdown>
    );
  });

  //Row

  return (
    <div className={`${style.Row} ${disabledEmployee ? style.Disabled : ''}`}>
      <Popconfirm
        title={`Are you sure ${disabledEmployee ? 'enable' : 'disable'} ${
          employee.name
        } ${employee.surname}？`}
        icon={
          <QuestionCircleOutlined
            style={disabledEmployee ? { color: 'green' } : { color: 'red' }}
          />
        }
        okText="Yes"
        cancelText="No"
        onConfirm={disabledCallback}
      >
        <div className={style.Column}>
          <CUserSignature {...employee} />
        </div>
      </Popconfirm>
      {skillsCell}
    </div>
  );
};

export default CMatrixRow;
