// import React, { useState } from "react";
// import { useNavigate, NavLink } from "react-router-dom";

// const SearchPopup = ({ onClose }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState([]);
//   const navigate = useNavigate();

//   const handleSearchChange = async (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);

//     if (term) {
//       try {
//         const res = await fetch(
//           `${
//             import.meta.env.VITE_APP_API_BASE_URL
//           }/class/classrooms/search?term=${encodeURIComponent(term)}`
//         );

//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const data = await res.json();
//         console.log(data);
//         setResults(data.data);
//       } catch (error) {
//         console.error("Search failed:", error);
//         setResults([]); // Clear results or handle as needed
//       }
//     } else {
//       setResults([]);
//     }
//   };

//   const handleItemClick = (id) => {
//     navigate(`/classes/${id}`);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
//       <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-5 h-5"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>

//         {/* Search Input with relative positioning */}
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search Classrooms..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 text-gray-700 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />

//           {/* Search Icon inside Input */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-5 h-5 text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
//             />
//           </svg>
//         </div>
//       </div>
//         <ul className="search-results">
//           {results.length > 0 ? (
//             results.map((result) => (
//               <li key={result._id} onClick={() => handleItemClick(result._id)}>
//                 <span>{result.name}</span>
//               </li>
//             ))
//           ) : (
//             <li>No results found</li>
//           )}
//         </ul>
//     </div>
//   );
// };

// export default SearchPopup;
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const SearchPopup = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_APP_API_BASE_URL
          }/class/classrooms/search?term=${encodeURIComponent(term)}`
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        console.log(data);
        setResults(data.data);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]); // Clear results or handle as needed
      }
    } else {
      setResults([]);
    }
  };

  const handleItemClick = (id) => {
    navigate(`/classes/${id}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg gap-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 border rounded-full hover:bg-gray-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Search Input with relative positioning */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search Classrooms..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 text-gray-700 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Search Icon inside Input */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>

        {/* Search Results */}
        <ul className="absolute w-full mt-2 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg left-0">
          {results.length > 0 ? (
            results.map((result) => (
              <li
                key={result._id}
                onClick={() => handleItemClick(result._id)}
                className="p-2 hover:bg-gray-100 cursor-pointer text-black"
              >
                <span>{result.name}</span>
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchPopup;

