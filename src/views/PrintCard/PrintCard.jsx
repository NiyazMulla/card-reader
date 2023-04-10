import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import queryString from "query-string";
import React, { Component } from "react";
import { printCardDetail } from "../../api/rationcard";
import PageTitle from "../../components/PageTitle/PageTitle";
class PrintCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      rows: [],
      columns: [
        {
          label: 'Ration Card Number'
        },
        {
          label: 'Application Id'
        },
        {
          label: 'Application Date'
        },
        {
          label: 'MSK USER ID'
        },
        {
          label: 'District ID'
        },
        {
          label: 'Status'
        }
      ],
      errorMessage: ''
    };
  }

  componentDidMount() {
    this.getCardDetail();
  }

  getCardDetail = () => {
  
    if (this.props.location.state?.rationCardNo) {
      let payload = {
        rationCardNum: parsed.rationCardNo
      }
      printCardDetail(payload).then(res => {
        console.log(res);
        this.setState({
          loader: false,
          rows: res.data
        })
      }).catch(err => {
        console.log(err);
      })

    } else {
      this.setState({
        loader: false,
        errorMessage: "Invalid Request, Please contact admin",
      });
    }
  }


  renderMembers = () => {
    if (this.state.loader) {
      return (
        <div className="w-100 d-flex align-items-center justify-content-center">
          <CircularProgress />
        </div>
      );
    }
    if (this.state.errorMessage) {
      return (
        <div className="w-100 d-flex align-items-center justify-content-center  ">
          <h3 className="border p-4" style={{ color: "red" }}>
            <ErrorIcon /> {this.state.errorMessage}
          </h3>
        </div>
      );
    }
    return this.renderTable()
  };

  renderTable = () => {
    const { columns } = this.state;
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-Primary text-white">
            <TableRow>
              {columns.map((column => {
                return (
                  <TableCell key={column.label}>{column.label}</TableCell>
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

        <PageTitle title={`Print Card Detail`} />
        <div className="w-100 d-flex flex-row flex-wrap">
          {this.renderMembers()}
        </div>
      </div>
    );
  }
}

export default PrintCard;
