import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { Component } from "react";
import { printCardDetail, printSmartCard } from "../../api/rationcard";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import DialogCustom from "../../components/DialogCustom/DialogCustom";
import ErrorCard from "../../components/ErrorCard/ErrorCard";
import PageTitle from "../../components/PageTitle/PageTitle";
class PrintCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      rows: [],
      tableErrorMessage: '',
      openDialog: false,
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
          label: 'Action'
        }
      ],
      errorMessage: '',
      errorMessageInPrint: '',
      printStatusMessage: '',
      printBtnLoader: false
    };
  }

  componentDidMount() {
    this.getCardDetail();
  }

  getCardDetail = () => {

    if (this.props.location.state?.rationCardNo) {
      let payload = {
        rationCardNum: this.props.location.state?.rationCardNo
      }
      printCardDetail(payload).then(res => {
        console.log(res);
        this.setState({
          loader: false,
          rows: res.data
        })
      }).catch(err => {
        console.log(err);
        this.setState({
          tableErrorMessage: err.message,
          loader: false,
        })
      })

    } else {
      this.setState({
        loader: false,
        errorMessage: "Invalid Request, Please contact admin",
      });
    }
  }

  onPrintClick = () => {
    let payload = {
      rationCardNum: this.props.location.state?.rationCardNo
    }
    this.setState({
      printBtnLoader: true
    }, () => {
      printSmartCard(payload).then(res => {
        console.log(res);
        if (res.data.StatusCode === '00') {
          this.setState({
            openDialog: true,
            printBtnLoader: false,
          })
        } else {
          this.setState({
            openDialog: true,
            printBtnLoader: false,
            printStatusMessage: res.data.Message
          })
        }


      }).catch(err => {
        console.log(err);
        this.setState({
          openDialog: true,
          printBtnLoader: false,
          errorMessageInPrint: err.message
        })
      })
    })

  }


  renderMembers = () => {
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
    const { columns, tableErrorMessage } = this.state;
    if (tableErrorMessage) {
      return (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <div className="w-50">
            <ErrorCard heading={tableErrorMessage} />
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
                      <ButtonCustom onClick={this.onPrintClick} showLoader={this.state.printBtnLoader} label='Print' />
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
    const { errorMessage } = this.state;
    if (errorMessage) {
      return (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <div className="w-50">
            <ErrorCard heading={errorMessage} />
          </div>
        </div>
      )
    }
    return (
      <div>
        <>
          <DialogCustom open={this.state.openDialog} hideHeader>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center">
              {
                this.state.errorMessageInPrint ?
                  <div className="w-100 d-flex justify-content-center align-items-center">
                    <div className="w-50">
                      <ErrorCard heading={this.state.errorMessageInPrint} />
                    </div>
                  </div>
                  : <> <p>{
                    this.state.printStatusMessage ? this.state.printStatusMessage : 'Smart Card has been printed successfully'}
                  </p>
                    <ButtonCustom
                      label={"Click"}
                      onClick={() => {
                        if (this.state.printStatusMessage) {
                          this.setState({
                            openDialog: false
                          })
                        } else {
                          this.onPrintClick()
                        }

                      }}
                    />

                  </>
              }

            </div>
          </DialogCustom>
        </>
        <PageTitle title={`Print Card Detail`} />
        <div className="w-100 d-flex flex-row flex-wrap">
          {this.renderMembers()}
        </div>
      </div>
    );
  }
}

export default PrintCard;
