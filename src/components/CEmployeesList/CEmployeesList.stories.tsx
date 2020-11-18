import React from "react";
// // // also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// // import { Story, Meta } from "@storybook/react/types-6-0";

// // import { CEmployeesList } from "./CEmployeesList";
// import { ELevels, IEmployee, EPositions } from "../../models/IEmployee";

// // export default {
// //   title: "Storybook/CEmployeesList",
// //   component: CEmployeesList,
// // } as Meta;

// export const employees: IEmployee[] = [
//   {
//     name: "Stefan",
//     surname: "Kolorowy",
//     startWorkDate: "2019-09-08T12:44:31.181Z",
//     evaluationDate: "2020-10-08T12:44:31.181Z",
//     tags: ["jsGuru", "microsoftMvp"],
//     level: ELevels.JUNIOR,
//     position: EPositions.PROJECT_MANAGER,
//     project: "",
//     photo:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chuck_Norris_May_2015.jpg/176px-Chuck_Norris_May_2015.jpg",
//   },
//   {
//     name: "Roman",
//     surname: "Kresowy",
//     startWorkDate: "2007-09-08T12:44:31.181Z",
//     evaluationDate: "2000-09-08T12:44:31.181Z",
//     tags: ["jsGuru", "microsoftMvp"],
//     level: ELevels.JUNIOR,
//     position: EPositions.QA,
//     project: "WoW cool",
//     photo:
//       "https://vignette.wikia.nocookie.net/banialukipl/images/d/dd/C74461ae2a9917a2482ac7b53f195b3c6e2fdd59e778c673256fb29d1b07f181.jpg/revision/latest/scale-to-width-down/310?cb=20180122200051&path-prefix=pl",
//   },
//   {
//     name: "Tomek",
//     surname: "Bawełniany",
//     startWorkDate: "1999-09-28T12:44:31.181Z",
//     evaluationDate: "1967-02-08T12:44:31.181Z",
//     tags: ["jsGuru", "microsoftMvp"],
//     level: ELevels.JUNIOR,
//     position: EPositions.SOFTWARE_DEVELOPER,
//     project: "Other",
//     photo:
//       "https://ocdn.eu/pulscms-transforms/1/oO6k9kpTURBXy8zMDg5N2Q0NDUzZjgzMmI2ZWYyMjQxNjM3Njk3YTFhOC5qcGeTlQMAzQEEzQfQzQRlkwXNAxTNAbyTCaZjMWM1MWEGgaEwBQ/chuck-norris.webp",
//   },
//   {
//     name: "Stefan",
//     surname: "Kolorowy",
//     startWorkDate: "2019-10-18T12:44:31.181Z",
//     evaluationDate: "2018-11-18T12:44:31.181Z",
//     tags: ["jsGuru", "microsoftMvp"],
//     level: ELevels.JUNIOR,
//     position: EPositions.SOFTWARE_DEVELOPER,
//     project: "Other",
//     photo:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chuck_Norris_May_2015.jpg/176px-Chuck_Norris_May_2015.jpg",
//   },
//   {
//     name: "Roman",
//     surname: "Kresowy",
//     startWorkDate: "2015-01-18T12:44:31.181Z",
//     evaluationDate: "2010-10-18T12:44:31.181Z",
//     tags: ["jsGuru", "microsoftMvp"],
//     level: ELevels.JUNIOR,
//     position: EPositions.SOFTWARE_DEVELOPER,
//     project: "Other",
//     photo:
//       "https://vignette.wikia.nocookie.net/banialukipl/images/d/dd/C74461ae2a9917a2482ac7b53f195b3c6e2fdd59e778c673256fb29d1b07f181.jpg/revision/latest/scale-to-width-down/310?cb=20180122200051&path-prefix=pl",
//   },
//   {
//     name: "Tomek",
//     surname: "Bawełniany",
//     startWorkDate: "2012-10-11T12:44:31.181Z",
//     evaluationDate: "2003-10-18T12:44:31.181Z",
//     tags: ["jsGuru", "microsoftMvp"],
//     level: ELevels.JUNIOR,
//     position: EPositions.SOFTWARE_DEVELOPER,
//     project: "Other",
//     photo:
//       "https://ocdn.eu/pulscms-transforms/1/oO6k9kpTURBXy8zMDg5N2Q0NDUzZjgzMmI2ZWYyMjQxNjM3Njk3YTFhOC5qcGeTlQMAzQEEzQfQzQRlkwXNAxTNAbyTCaZjMWM1MWEGgaEwBQ/chuck-norris.webp",
//   },
//   {
//     name: "Stefan",
//     surname: "Kolorowy",
//     startWorkDate: "2006-10-18T12:44:31.181Z",
//     evaluationDate: "2001-05-18T12:44:31.181Z",
//     tags: ["jsGuru", "microsoftMvp"],
//     level: ELevels.JUNIOR,
//     position: EPositions.SOFTWARE_DEVELOPER,
//     project: "Other",
//     photo:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chuck_Norris_May_2015.jpg/176px-Chuck_Norris_May_2015.jpg",
//   },
//   {
//     name: "Roman",
//     surname: "Kresowy",
//     startWorkDate: "2017-01-18T12:44:31.181Z",
//     evaluationDate: "2019-05-11T12:44:31.181Z",
//     tags: ["jsGuru", "microsoftMvp"],
//     level: ELevels.JUNIOR,
//     position: EPositions.SOFTWARE_DEVELOPER,
//     project: "Other",
//     photo:
//       "https://vignette.wikia.nocookie.net/banialukipl/images/d/dd/C74461ae2a9917a2482ac7b53f195b3c6e2fdd59e778c673256fb29d1b07f181.jpg/revision/latest/scale-to-width-down/310?cb=20180122200051&path-prefix=pl",
//   },
//   {
//     name: "Tomek",
//     surname: "Bawełniany",
//     startWorkDate: "2017-02-18T12:44:31.181Z",
//     evaluationDate: "2013-02-18T12:44:31.181Z",
//     tags: ["jsGuru", "microsoftMvp"],
//     level: ELevels.JUNIOR,
//     position: EPositions.SOFTWARE_DEVELOPER,
//     project: "Other",
//     photo:
//       "https://ocdn.eu/pulscms-transforms/1/oO6k9kpTURBXy8zMDg5N2Q0NDUzZjgzMmI2ZWYyMjQxNjM3Njk3YTFhOC5qcGeTlQMAzQEEzQfQzQRlkwXNAxTNAbyTCaZjMWM1MWEGgaEwBQ/chuck-norris.webp",
//   },
// ];

// // export const TableOfEmployees: Story<IEmployee[]> = () => (
// //   <CEmployeesList employees={employees} />
// // );
