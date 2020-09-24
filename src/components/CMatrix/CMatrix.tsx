import React, { useEffect, useState, FC } from 'react';
import { getAllSkills } from '../../services/skillsSvc';
import { ISkills } from '../../models/ISkills';
import { IEmployee } from '../../models/IEmployee';
import { getAllEmployees } from '../../services/employeesSvc';
import style from './CMatrix.module.scss';

import CMatrixHeader from '../CMatrixHeader/CMatrixHeader';

import CMatrixRow from '../CMatrixRow/CMatrixRow';
import CMatrixRequires from '../CMatrixRequires/CMatrixRequires';
import CDrawer, { IFilterConfigData } from '../CDrawer/CDrawer';
import Employees from '../../pages/Employees/Employees';
import { forEachChild } from 'typescript';

export interface IHeader {
  [key: string]: string[];
}

export interface IMatrixData {
  skills?: ISkills[];
  employees?: IEmployee[];
  header?: IHeader;
  skillsNumber?: number;
}

const CMatrixRowList: FC<{
  employees: IEmployee[];
  skills: ISkills[];
  skillsSorted: string[];
  getMatrixData: Function;
}> = ({ employees, skills, skillsSorted, getMatrixData }) => {
  const rowList = employees.map((employee) => {
    return (
      <CMatrixRow
        employee={employee}
        skills={skills}
        skillsSorted={skillsSorted}
        getMatrixData={getMatrixData}
      />
    );
  });
  return <>{rowList}</>;
};

const CMatrix = () => {
  interface IMatrixConfig {
    skills?: ISkills[];
    employees?: IEmployee[];
    header?: IHeader;
    skillsNumber?: number;
    categories?: string[];
    skillsSorted?: string[];
    filterConfigData?: IFilterConfigData;
  }

  const [matrixData, setMatrixData] = useState<IMatrixConfig>({});

  const getMatrixData = async () => {
    try {
      const {
        skills,
        count,
      }: { skills: ISkills[]; count: number } = await getAllSkills();
      const { employees }: { employees: IEmployee[] } = await getAllEmployees(
        1
      ); // Remember this get only first page of employees!!!!
      const header = skills.reduce<IHeader>((previous, current) => {
        !!previous[current.category]
          ? previous[current.category].push(current.name)
          : (previous[current.category] = [current.name]);
        return previous;
      }, {});

      const categories: string[] = [];
      for (const category in header) {
        if (categories.indexOf(category) === -1) {
          categories.push(category);
        }
      }
      let skillsSorted: string[] = [];
      let tags = employees.reduce<string[]>((previous, current) => {
        previous = previous.concat(current?.tags || []);
        return previous;
      }, []);
      categories.forEach((category) => {
        skillsSorted = skillsSorted.concat(header[category]);
      });

      const filterConfigData: IFilterConfigData = {
        skills: skillsSorted,
        tags,
        filter,
      };
      setMatrixData({
        skills,
        employees,
        header,
        skillsNumber: count,
        categories,
        skillsSorted,
        filterConfigData,
      });
    } catch (e) {
      console.log(e);
    }
  };
  function filter(data: { [key: string]: string[] | number[] }[]) {
    console.log('filter(data):', data);
    const filteredEmployees = matrixData.employees?.filter((employee) =>
      data.every((filterRecord) => {
        const [fieldName, filterArray] = Object.entries(filterRecord)[0];
        return filterArray.every((filterPropArray: string | number) => {
          if (Array.isArray(employee[fieldName as keyof typeof IEmployee])) {
            return employee[fieldName].find(filterPropArray);
          } else {
            return employee[fieldName] == filterPropArray;
          }
        });
      })
    );

    console.log('filteredEmployees', filteredEmployees);
  }

  useEffect(() => {
    (async () => {
      try {
        getMatrixData();
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div className={style.Table}>
      <div className={style.Drawer}>
        {!!matrixData.employees && (
          <CDrawer {...matrixData.filterConfigData!} />
        )}
      </div>
      <div className={style.Header}>
        <div className={style.Piechart}></div>
        {!!matrixData.categories && (
          <CMatrixHeader
            categories={matrixData.categories!}
            header={matrixData.header!}
          />
        )}
      </div>

      <CMatrixRequires
        skills={matrixData.skills!}
        skillsSorted={matrixData.skillsSorted!}
        employees={matrixData.employees!}
      />
      {!!matrixData.employees && (
        <CMatrixRowList
          employees={matrixData.employees!}
          skills={matrixData.skills!}
          skillsSorted={matrixData.skillsSorted!}
          getMatrixData={getMatrixData}
        />
      )}
    </div>
  );
};

export default CMatrix;
