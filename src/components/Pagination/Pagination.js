import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Page = ({ skip, setSkip, limit, count }) => {
  let nbPageTotal = Math.ceil(count / limit);
  let tabPage = [];
  const [currentPage, setCurrentPage] = useState(1);
  for (let i = 1; i <= nbPageTotal; i++) {
    tabPage.push(i);
  }
  const [pageMin, setPageMin] = useState(0);
  let pageMax = 8;

  const handlePrecedent = () => {
    setCurrentPage(currentPage - 1);
    setSkip(skip - 100);
    setPageMin(pageMin - 1);
  };
  const handleSuivant = () => {
    setSkip(skip + 100);
    setCurrentPage(currentPage + 1);
    setPageMin(pageMin + 1);
    if (pageMin >= nbPageTotal - 8) {
      setPageMin(7);
    }
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <div className="previous" onClick={handlePrecedent}>
          <FontAwesomeIcon icon="angle-double-left" />
        </div>
      )}

      <ul>
        {/* Numéro des pages disponibles */}
        {tabPage.splice(pageMin, pageMax).map((numeroDePage, i) => {
          return (
            <li
              key={i}
              style={{
                color: numeroDePage === currentPage && "white",
                backgroundColor: numeroDePage === currentPage && "#d8141c",
              }}
              onClick={() => {
                let newSkip = numeroDePage * 100 - 100;
                setCurrentPage(numeroDePage);
                setSkip(newSkip);
              }}
            >
              {numeroDePage}
            </li>
          );
        })}
      </ul>

      {currentPage !== nbPageTotal && (
        <div className="next" onClick={handleSuivant}>
          <FontAwesomeIcon icon="angle-double-right" />
        </div>
      )}
    </div>
  );
};

export default Page;
