import React from "react";

function PageTitle(props) {
  const { title } = props;
  return (
    <div className="fw-bold fs-2 border-bottom border-3 border-secondary rounded-bottom mb-4">
      {title}
    </div>
  );
}

export default PageTitle;
