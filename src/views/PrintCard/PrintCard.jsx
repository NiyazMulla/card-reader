import React, { Component } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
class PrintCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      columns: [],
    };
  }

  render() {
    return (
      <div>
        {" "}
        <PageTitle title={`Print Card Detail`} />
        <div className="w-100 d-flex flex-row flex-wrap justify-content-end px-4 mb-2">
          <Button variant="contained" className="mx-2">
            Approve
          </Button>
          <Button variant="outlined" color="error">
            Reject
          </Button>
        </div>
        <div className="w-100 d-flex flex-row flex-wrap">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="bg-Primary text-white">
                <TableRow>
                  <TableCell>Select All</TableCell>
                  <TableCell>Remarks</TableCell>
                  <TableCell>Ration Card Number</TableCell>
                  <TableCell>Add Date Time</TableCell>
                  <TableCell>Support Function</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  // key={}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Checkbox />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Remarks if any
                  </TableCell>
                  <TableCell component="th" scope="row">
                    040111001270
                  </TableCell>
                  <TableCell component="th" scope="row">
                    08 Nov 2022
                  </TableCell>
                  <TableCell component="th" scope="row">
                    New card print
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default PrintCard;
