import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import CSkillsList from "../../components/CSkillsList/CSkillsList";
import { getAllSkills } from "../../services/skillsSvc";
import { IGetSkills, ISkills } from "../../models/ISkills";

import { PageHeader, Button } from "antd";

export const Skillsets = () => {
  const history = useHistory();

  interface ISkillListConfig {
    skills: ISkills[];
    skillsAmount: number;
    page: number;
    order: string;
    columnKey: string;
  }

  interface IGetSkillsData {
    (data: { current?: number; order?: string; columnKey?: string }): Promise<
      void
    >;
  }

  const [skillListConfig, setSkillListConfig] = useState<ISkillListConfig>({
    skills: [],
    skillsAmount: 0,
    page: 0,
    order: "ascend",
    columnKey: "name",
  });

  const getSkillsData: IGetSkillsData = async ({
    current = 1,
    order = "ascend",
    columnKey = "name",
  }) => {
    let currentPage = current;
    if (
      order !== skillListConfig.order ||
      columnKey !== skillListConfig.columnKey
    ) {
      currentPage = 1;
    }

    try {
      const skillsData: IGetSkills = await getAllSkills(currentPage, {
        order,
        columnKey,
      });

      setSkillListConfig({
        page: currentPage,
        skillsAmount: skillsData.count,
        skills: skillsData.skills,
        order,
        columnKey,
      });
    } catch (e) {
      console.log(e);
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    (async () => {
      try {
        getSkillsData({});
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Skills"
        extra={
          <Button
            type="primary"
            shape="round"
            onClick={() => {
              history.push("skills/add");
            }}
          >
            Add skill
          </Button>
        }
      />

      <CSkillsList getSkillsData={getSkillsData} {...skillListConfig} />
    </>
  );
};

export default Skillsets;
