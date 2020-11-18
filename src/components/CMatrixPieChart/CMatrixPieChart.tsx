import React, { FC, useMemo } from "react";
import { ResponsivePie } from "@nivo/pie";
import { IEmployee, ISkills } from "../../models/IEmployee";

import styles from "./CMatrixPieChart.module.scss";

const CMatrixPieChart: FC<{
  skills: ISkills[];
  skillsSorted: string[];
  employees: IEmployee[];
}> = ({ skills, skillsSorted, employees }) => {
  const skillLevelData = useMemo(() => {
    const numberOfSkills: number = skillsSorted?.length;
    const numberOfEmployees: number = employees?.length;

    const skillLevel = skillsSorted?.reduce((result, skill) => {
      const employeeSkillLevel = employees.reduce((result, employee) => {
        const employeeSkill = employee.skills!.find(
          (empSkill) => empSkill.skill?.name === skill && empSkill.level > 0
        );

        if (employeeSkill) {
          result += employeeSkill.level;
        }
        return result;
      }, 0);

      result += employeeSkillLevel;
      return result;
    }, 0);

    const coverage =
      (skillLevel * 100) / (numberOfEmployees * numberOfSkills * 5);
    return coverage;
  }, [skillsSorted, employees]);

  const data = [
    {
      id: "Coverage",
      label: "Coverage",
      value: skillLevelData,
      color: "hsl(5, 70%, 50%)",
    },
    {
      id: "Not Coverage",
      label: "Not Coverage",
      value: 100 - skillLevelData,
      color: "hsl(82, 70%, 50%)",
    },
  ];

  return (
    <div className={styles.Piechart}>
      <ResponsivePie
        data={data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        innerRadius={0.6}
        padAngle={0.75}
        fit={false}
        enableRadialLabels={false}
        enableSlicesLabels={false}
        cornerRadius={3}
        colors={{ scheme: "pastel1" }}
        borderWidth={4}
        borderColor={{ from: "color", modifiers: [["opacity", 0.2]] }}
        animate={true}
        isInteractive={false}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "Coverage",
            },
            id: "dots",
          },
        ]}
      />
      <div className={styles.PiechartCoverage}>
        <p>Coverage:</p>
        <p>{skillLevelData.toFixed()}%</p>
      </div>
    </div>
  );
};

export default CMatrixPieChart;
