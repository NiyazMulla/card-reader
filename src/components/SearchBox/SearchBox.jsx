import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
function SearchBox(props) {
  return (
    <div className="search-box">
      <div>
        <DocumentScannerIcon />
      </div>
      <input className="border border-0 " />
      <span className="search-icon">
        <SearchIcon />
      </span>
    </div>
  );
}

export default SearchBox;
