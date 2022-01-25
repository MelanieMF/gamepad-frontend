// // Externes
// import React from "react";
// import { useState } from "react";

// // Internes
// // Styles & CSS
// import "./Filters.css";

// const Filters = ({ platforms, setplatformType, setSortBy }) => {
//   return (
//     <div className="filters-container">
//       <section>
//         <select
//           onChange={(event) => setplatformType(event.target.value)}
//           name="Plateform"
//           id="platform-select"
//         >
//           <option value="">Plateform : All</option>

//           {/* {platforms.results.map((platform, index) => {
//             return (
//                 <option key={index} value={platform.id}>
//                 {platform.name}
//                 </option>
//                 );
//             })} */}
//         </select>
//         <select name="Type" id="type-select">
//           <option value="">Type : All</option>
//           Type
//         </select>
//       </section>
//       <section>
//         <select
//           onChange={(event) => setSortBy(event.target.value)}
//           name="Sort by"
//           id="sort-select"
//         >
//           <option value="">Sort by : Default </option>
//           <option value="name">Name</option>
//           <option value="type">Type</option>
//           <option value="released">Released</option>
//           <option value="rating">Rating</option>
//         </select>
//         <button className="filter-button">Go filters !</button>
//       </section>
//     </div>
//   );
// };

// export default Filters;
