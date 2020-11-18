import React, { FC } from "react";
import { IHeader } from "../CMatrix/CMatrix";
import styles from "./CMatrixHeader.module.scss";

export interface IMatrixSkills {
  header: IHeader;
  categories: string[];
}
export interface ISkillsByCategory {
  [key: string]: number;
}
const CMatrixHeader: FC<IMatrixSkills> = ({ header, categories }) => {
  const skillsByCategory: ISkillsByCategory = {};

  for (const category in header) {
    skillsByCategory[category] = header[category].length;
  }

  return (
    <div className={styles.wrapper}>
      {categories.map((category, index) => {
        const isLong =
          skillsByCategory[category] <= 1 && category.length > 3
            ? `${styles.category}`
            : "";

        return (
          <div key={`${category}${index}`} className={styles.columnWrapper}>
            <div
              className={`${styles.skillsColumnHeader} ${
                isLong ? styles.longCategory : ""
              }`}
            >
              {category}
            </div>
            <div className={styles.skillsListWrapper}>
              <ul className={styles.skillsList}>
                {header[category].map((skill, index) => (
                  <li key={`${skill}${index}`} className={styles.skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CMatrixHeader;
