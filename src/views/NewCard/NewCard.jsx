import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { Component } from "react";
import {
  enrollCardDetail,
  getMembersDetails,
  redirectToOdishaOne
} from "../../api/rationcard";
import AccordinoCustom from "../../components/AccordinoCustom/AccordinoCustom";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import DialogCustom from "../../components/DialogCustom/DialogCustom";
import ErrorCard from "../../components/ErrorCard/ErrorCard";
import PageTitle from "../../components/PageTitle/PageTitle";
import SkeltonCustom from "../../components/SkeltonCustom/SkeltonCustom";
class NewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      selectedOptionToVerify: "",
      loading: true,
      memberList: [],
      memberListErrorMessage: '',
      isErrorInOTP: false,
      selectedAdharNo: "",
      otp: "",
      newCard: {
        initial: true,
        loader: false,
        success: false,
      },
      cardDetail: {},
      newCardErrorMessage: '',
    };
  }

  componentDidMount() {
    this.init();
  }
  init = () => {
    if (this.props.location.state?.rationCardNo) {
      getMembersDetails(this.props.location.state?.rationCardNo)
        .then((res) => {
          if (res.status) {
            this.setState({
              loading: false,
              memberList: res.data,
              rationCardNo: this.props.location.state?.rationCardNo,
              requestId: this.props.location.state["REQUESTID"],
              requestType: this.props.location.state["REQUESTTYPE"],
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            loading: false,
            memberListErrorMessage: err.message
          });
        });
    }else {
      this.setState({
        loading: false,
        errorMessage: "Invalid Request, Please contact admin",
      })
    }
  };

  getNewCard = () => {
    this.setState({
      newCard: {
        ...this.state.newCard,
        initial: false,
        loader: true,
      },
    },() => {
      let payload = {
        rationCardNum: this.state.rationCardNo,
      }
      enrollCardDetail(payload).then(res => {
        this.setState({
          newCard: {
            ...this.state.newCard,
            loader: false,
            success: true,
          },
          cardDetail: res.data
        });
      }).catch(err => {
        console.log(err);
        this.setState({
          newCardErrorMessage: err.message,
          newCard: {
            ...this.state.newCard,
            loader: false,
            success: true,
          },
        });
      })
    });
  };

  renderMembers = () => {
    const { memberListErrorMessage }  = this.state;
    if (this.state.loading) {
      return (
        <div className="w-100 mb-4">
          <SkeltonCustom variant="rectangular" height={60} />
          <SkeltonCustom variant="rectangular" height={60} />
          <SkeltonCustom variant="rectangular" height={60} />
          <SkeltonCustom variant="rectangular" height={60} />
          <SkeltonCustom variant="rectangular" height={60} />
          <SkeltonCustom variant="rectangular" height={60} />
          <SkeltonCustom variant="rectangular" height={60} />
        </div>
      );
    }
    if(memberListErrorMessage){
      return (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <div className="w-50">
            <ErrorCard heading={memberListErrorMessage}  />
          </div>
        </div>
      )
    }
    return this.state.memberList.length > 0 ? (
      this.state.memberList.map((member, index) => {
        return (
          <div className="w-100 mb-4" key={index}>
            <AccordinoCustom
              name={member["MemberName"]}
              age={parseInt(member["Age"])}
              gender={member["Gender"].toUpperCase()}
              handleChangeForVerify={(option) => {
                this.chooseOptionToVerify(index, option);
              }}
              adharNo={member["AadharNumber"]}
              relationShip={member["RelationWithFamilyHead"]}
              mobileNumber={member["Mobilenumber"]}
              // verified
            />
          </div>
        );
      })
    ) : this.state.memberList.length === 0 ? (
      <div className="w-100 d-flex justify-content-center align-items-center">
        <div className="w-50"> 
          <p style={{fontSize:'32px',color: '#E5F8FF'}}> No Members Found </p>
        </div>
      </div>
    ) : (
      <></>
    );
  };

  renderNewCard = () => {
    const { newCard, cardDetail, newCardErrorMessage } = this.state;
    let keys = Object.keys(cardDetail);

    if(newCardErrorMessage){
      return (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <div className="w-50">
            <ErrorCard heading={newCardErrorMessage}  />
          </div>
        </div>
      )
    }
    if (newCard.initial) {
      return (
        <div className="w-75 d-flex flex-column border justify-content-center align-items-center rounded-pill p-4 bg-Primary">
          <div>
            <HourglassEmptyIcon />
          </div>
          <div className="fw-bold fs-5 ">Click here to print new card</div>
          <div>
            <ButtonCustom
              label="Click"
              color="white"
              onClick={this.getNewCard}
            />
          </div>
        </div>
      );
    } else if (newCard.loader) {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <CircularProgress />
          <div>Generating Card, Please wait</div>
        </div>
      );
    } else if (newCard.success) {
      return (
        <div className="w-75 d-flex flex-column border justify-content-start align-items-start p-4 bg-Primary">         
         {
          keys.map((key) => {
            return(
              <div className="d-flex flex-row justify-content-between w-100">
                <div className="">{key}: </div>
                <div>{cardDetail[key]}</div>
              </div>
            )
          })
         }
        </div>
      );
    }
  };

  redirectToOdishaOne = () => {
    let requestId = sessionStorage.getItem("REQUESTID");
     let requestType = sessionStorage.getItem("REQUESTTYPE");
    let payload = {
      requestID: requestId,
      actionType: requestType
    }
    redirectToOdishaOne(payload)
      .then((res) => {
        console.log(res);
        if (res.data) {
          let url = `${res.data.ENDPOINT_URL}`;
          const formData = new FormData();
          formData.append("encData", res.data.encData);
          axios
            .post(url, formData)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { errorMessage } = this.state;
    if(errorMessage){
      return (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <div className="w-50">
            <ErrorCard heading={errorMessage}  />
          </div>
        </div>
      )
    }
    return (
      <div className="d-flex flex-column">
        <>
          <DialogCustom open={this.state.openDialog} hideHeader>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center">
              <p>Smart Card has been Updated Successfully</p>
              <b>Click Here to Re Direct Odishone</b>
              <ButtonCustom
                label={"Click"}
                onClick={this.redirectToOdishaOne}
              />
            </div>
          </DialogCustom>
        </>
        <PageTitle title={"Card Detail "} />
        <div className="w-100 d-flex  ">
          <div className="w-50 d-flex flex-column border-end p-1">
            <div
              className="mb-2 w-100 bg-Primary p-1"
              style={{ height: "32px" }}
            >
              Ration Card Details from NFSA/SFSS
            </div>
            <div className="w-100 d-flex flex-column">
              {this.renderMembers()}
            </div>
          </div>
          <div className="w-50 d-flex flex-column  p-1">
            <div
              className="mb-2 w-100 bg-Primary p-1"
              style={{ height: "32px" }}
            >
              Card Detail
            </div>
            <div className="w-100 d-flex flex-column justify-content-center align-items-center h-100">
              {this.renderNewCard()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewCard;
