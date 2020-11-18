import React, { useState, useEffect } from "react";

import CEmployeesList from "../../components/CEmployeesList/CEmployeesList";

import { getPaginatedEmployees } from "../../services/employeesSvc";
import { IEmployee, IGetEmployees } from "../../models/IEmployee";
import { Button, PageHeader } from "antd";

import { useHistory } from "react-router-dom";

export const Employees = () => {
  const history = useHistory();

  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [employeesAmount, setEmployeesAmount] = useState(0);

  const [page, setPage] = useState(1);

  const getEmployeesData = async (currentPage?: number) => {
    try {
      if (currentPage) {
        setPage(currentPage);
      } else {
        const employeesData: IGetEmployees = await getPaginatedEmployees(page);
        setEmployees(employeesData.employees);
        setEmployeesAmount(employeesData.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    (async () => {
      try {
        await getEmployeesData();
      } catch (error) {
        console.log(error);
      }
    })();
  }, [page]);

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Employees"
        extra={
          <Button
            type="primary"
            shape="round"
            onClick={() => {
              history.push("employees/add");
            }}
          >
            Add employee
          </Button>
        }
      />
      <CEmployeesList
        getEmployeesData={getEmployeesData}
        employees={employees}
        employeesAmount={employeesAmount}
      />
    </>
  );
};

export default Employees;
