// import React from "react";
// import StepsChart2023 from "./StepsChart2023";
// import StepsChart2024 from "./StepsChart2024";
// import MilesChart2023 from "./MilesChart2023";
// import MilesChart2024 from "./MilesChart2024";

// const FitnessDataVisualizer: React.FC = () => {
//   return (
//     <div>
//       <h1>Fitness Data Visualizer</h1>
//       <StepsChart2023 />
//       <StepsChart2024 />
//       <MilesChart2023 />
//       <MilesChart2024 />
//     </div>
//   );
// };

// export default FitnessDataVisualizer;
import React from "react";
import StepsChart from "./StepsChart";
import MilesChart from "./MilesChart";

const FitnessDataVisualizer: React.FC = () => {
  return (
    <div>
      <StepsChart year="2023" />
      <StepsChart year="2024" />
      <MilesChart year="2023" />
      <MilesChart year="2024" />
    </div>
  );
};

export default FitnessDataVisualizer;
