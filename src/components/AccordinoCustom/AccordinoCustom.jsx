import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
function AccordinoCustom(props) {
  const { name, gender, age, adharNo, mobileNumber, relationShip, memberId } =
    props;
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="fw-bold fs-5">
            {" "}
            <AccountCircleIcon
              style={{ fontSize: "50px", color: "#00B16A" }}
            />{" "}
            {name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {" "}
          <div className="w-100 d-flex flex-column px-2 border-top">
            {memberId ? (
              <div className="w-100 d-flex flex-row justify-content-start mb-2">
                <div className="w-50 fs-6">Member Id: {memberId ?? "N/A"}</div>
              </div>
            ) : (
              <></>
            )}
            <div className="w-100 d-flex flex-row justify-content-start mb-2">
              <div className="w-50 fs-6">Gender: {gender ?? "N/A"}</div>
              <div className="w-50 fs-6">Age: {age ?? "N/A"}</div>
            </div>
            <div className="d-flex flex-row justify-content-start mb-2">
              <div className="w-50 fs-6">Adhar Number: {adharNo ?? "N/A"}</div>
              <div className="w-50 fs-6">
                Mobile Number: {mobileNumber ?? "N/A"}
              </div>
            </div>
            <div className="d-flex flex-row justify-content-start mb-2">
              <div className="w-50 fs-6">R/F: {relationShip ?? "N/A"}</div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AccordinoCustom;
