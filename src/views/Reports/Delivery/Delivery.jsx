
import PageTitle from '../../../components/PageTitle/PageTitle';
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ButtonCustom from "../../../components/ButtonCustom/ButtonCustom";
import ErrorCard from "../../../components/ErrorCard/ErrorCard";
import React, { Component } from 'react';

class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: 'Request Id'
        },
        {
          label: 'Ration Card Number'
        },
        {
          label: 'Primary Card Holder Name'
        },
        {
          label: 'Mobile Number'
        },
        {
          label: 'Adhar Card Number'
        },
        {
          label: 'Branch Code'
        },
        {
          label: 'Requested Code ON'
        },
        {
          label: 'Delivered ON'
        },
        {
          label: 'Delivered By'
        },
        {
          label: 'Delivered Status'
        }
      ],
      loader: true,
      rows: [],
    }
  }
  renderReports = () => {
    if (this.state.loader) {
      return (
        <div className="w-100 d-flex align-items-center justify-content-center">
          <CircularProgress />
        </div>
      );
    }
    return this.renderTable()
  };

  renderTable = () => {
    const { columns,tableErrorMessage } = this.state;
    if(tableErrorMessage){
      return (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <div className="w-50">
            <ErrorCard heading={tableErrorMessage}  />
          </div>
        </div>
      )
    }
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-Primary text-white">
            <TableRow>
              {columns.map((column => {
                return (
                  <TableCell key={column.label}>
                    <b>{column.label}</b>
                  </TableCell>
                )
              }))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.rows.map((row, index) => {
                return (
                  <TableRow
                    key={row.RationCardNo}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.RationCardNo}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.ApplicationID}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.ApplicationDate}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.MSK}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.District}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <ButtonCustom onClick={this.onPrintClick} label='Print' />
                    </TableCell>
                  </TableRow>
                )
              })
            }

          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  render() {
    return (
      <div>
        <PageTitle
          title={`Delivery Report`}
        />
        <div className="w-100 d-flex flex-row flex-wrap">
          {this.renderReports()}
        </div>
      </div>
    );
  }
}

export default Delivery;