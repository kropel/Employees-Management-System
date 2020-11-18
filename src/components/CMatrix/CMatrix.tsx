import React, { useEffect, useState, useMemo } from 'react';
import { getAllSkills } from '../../services/skillsSvc';
import { ISkills } from '../../models/ISkills';
import { IEmployee } from '../../models/IEmployee';
import { getAllEmployees } from '../../services/employeesSvc';
import style from './CMatrix.module.scss';

import CMatrixHeader from '../CMatrixHeader/CMatrixHeader';
import CMatrixRow from '../CMatrixRow/CMatrixRow';
import CMatrixRequires from '../CMatrixRequires/CMatrixRequires';
import CMatrixPieChart from '../CMatrixPieChart/CMatrixPieChart';
import CDrawer, { IFilterConfigData } from '../CDrawer/CDrawer';
import { Divider } from 'antd';

export interface IHeader {
  [key: string]: string[];
}

export interface IMatrixData {
  skills?: ISkills[];
  employees?: IEmployee[];
  disabledEmployees?: IEmployee[];
  header?: IHeader;
  skillsNumber?: number;
}

interface IMatrixConfig {
  skills?: ISkills[];
  employees?: IEmployee[];
  disabledEmployees: IEmployee[];
  header?: IHeader;
  skillsNumber?: number;
  categories?: string[];
  skillsSorted?: string[];
  filterConfigData?: IFilterConfigData;
}

interface IMakeEmployeesRows {
  (employees?: IEmployee[], disabled?: boolean): JSX.Element[] | undefined;
}

const CMatrix = () => {
  const [matrixData, setMatrixData] = useState<IMatrixConfig>({
    disabledEmployees: [],
  });
  const [filterData, setFilterData] = useState<any>();

  const getMatrixData = async () => {
    try {
      const {
        skills,
        count,
      }: { skills: ISkills[]; count: number } = await getAllSkills();
      const employees: IEmployee[] = await getAllEmployees();
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
      let tags = Array.from(
        new Set(
          employees.reduce<string[]>((previous, current) => {
            previous = previous.concat(current?.tags || []);
            return previous;
          }, [])
        )
      );
      categories.forEach((category) => {
        skillsSorted = skillsSorted.concat(header[category]);
      });

      const filterConfigData: IFilterConfigData = {
        skills: skillsSorted,
        tags,
        filterCallback: setFilterData,
      };
      setMatrixData({
        skills,
        employees,
        header,
        skillsNumber: count,
        categories,
        skillsSorted,
        filterConfigData,
        disabledEmployees: matrixData.disabledEmployees,
      });
    } catch (e) {
      console.log(e);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => filter(filterData), [filterData]);

  async function filter(
    data: { [key: string]: (string | number)[] }[] | undefined
  ) {
    if (!data || data.length === 0) {
      await getMatrixData();
      return;
    }
    let employees: IEmployee[] = await getAllEmployees();
    if (!employees) {
      return;
    }
    employees = employees!
      .filter(
        (employee) =>
          !matrixData.disabledEmployees.some(
            (disabledEmp) => disabledEmp._id === employee._id
          )
      )
      .filter((employee) => {
        return data.every((filterRecord) => {
          const [fieldName, filterArray] = Object.entries(filterRecord)[0];
          return filterArray.every((filterProp: string | number) => {
            if (fieldName === 'skills') {
              return employee.skills?.some((skill) => {
                return skill.skill?.name === String(filterProp);
              });
            }
            if (fieldName === 'startWorkDate') {
              const givenLevel = filterProp;

              const experience =
                new Date().getFullYear() -
                new Date(employee.startWorkDate).getFullYear();

              return (
                givenLevel === experience ||
                (givenLevel === 10 && experience > givenLevel)
              );
            }
            if (fieldName === 'level') {
              return String(employee[fieldName]) === String(filterProp);
            }
            if (fieldName === 'tags') {
              return employee[fieldName]?.includes(String(filterProp));
            }
            return false;
          });
        });
      });
    setMatrixData({ ...matrixData, employees });
  }

  useEffect(() => {
    (async () => {
      try {
        getMatrixData();
      } catch (e) {
        console.log(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerDisabledEmployee = (
    emp: IEmployee,
    disabled?: boolean
  ): void => {
    let employees: IEmployee[] | undefined;
    let disabledEmployees: IEmployee[] | undefined;
    if (disabled) {
      employees = matrixData.employees!.concat([emp]);
      disabledEmployees = matrixData.disabledEmployees!.filter(
        (employee) => employee._id !== emp._id
      );
    } else {
      employees = matrixData.employees!.filter(
        (employee) => employee._id !== emp._id
      );
      disabledEmployees = matrixData.disabledEmployees!.concat([emp]);
    }

    setMatrixData({ ...matrixData, employees, disabledEmployees });
  };

  const makeEmployeesRows: IMakeEmployeesRows = (employees, disabled) => {
    if (!employees) return undefined;

    return employees?.map<JSX.Element>((employee, index) => {
      return (
        <CMatrixRow
          key={`${employee._id}${index}`}
          employee={employee}
          skills={matrixData.skills!}
          skillsSorted={matrixData.skillsSorted!}
          getMatrixData={getMatrixData}
          disabledEmployee={disabled}
          disabledCallback={() => {
            triggerDisabledEmployee(employee, disabled);
          }}
        />
      );
    });
  };

  const employeesList = makeEmployeesRows(matrixData.employees);
  const disabledEmployeesList = makeEmployeesRows(
    matrixData.disabledEmployees,
    true
  );
  return (
    <>
      <div className={style.Drawer}>
        {!!matrixData.employees && (
          <CDrawer {...matrixData.filterConfigData!} />
        )}
      </div>
      {!!matrixData.employees && (
        <div className={style.TableScroll}>
          <div className={style.Table}>
            <div className={style.Header}>
              <div className={style.HeadersContainer}>
                <div className={style.HeaderOne}>
                  <CMatrixPieChart
                    skills={matrixData.skills!}
                    skillsSorted={matrixData.skillsSorted!}
                    employees={matrixData.employees!}
                  />
                </div>
                <div className={style.HeaderTwo}>
                  {!!matrixData.categories && (
                    <CMatrixHeader
                      categories={matrixData.categories!}
                      header={matrixData.header!}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className={style.Body}>
              <div className={style.RowsContainer}>
                <CMatrixRequires
                  skills={matrixData.skills!}
                  skillsSorted={matrixData.skillsSorted!}
                  employees={matrixData.employees!}
                />
                {!!matrixData.employees && employeesList}
                {!!matrixData.disabledEmployees?.length && (
                  <Divider>Disabled employees</Divider>
                )}
                {!!matrixData.disabledEmployees && disabledEmployeesList}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CMatrix;
