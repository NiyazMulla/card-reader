import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import axios from "axios";
import React, { Component } from "react";
import {
  enrollCardDetail,
  getMembersDetails,
  redirectToOdishaOneFromUpdateCard,
} from "../../api/rationcard";
import AccordinoCustom from "../../components/AccordinoCustom/AccordinoCustom";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import DialogCustom from "../../components/DialogCustom/DialogCustom";
import PageTitle from "../../components/PageTitle/PageTitle";
import SkeltonCustom from "../../components/SkeltonCustom/SkeltonCustom";
import CircularProgress from "@mui/material/CircularProgress";
class NewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptionToVerify: "",
      loading: true,
      memberList: [],
      isErrorInOTP: false,
      selectedAdharNo: "",
      otp: "",
      newCard: {
        initial: true,
        loader: false,
        success: false,
      },
      cardDetail: {},
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
          });
        });
    }
  };

  getNewCard = () => {
    this.setState({
      newCard: {
        ...this.state.newCard,
        initial: false,
        loader: true,
      },
    });
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
        newCard: {
          ...this.state.newCard,
          loader: false,
          success: true,
        },
      });
    })

    
  };

  renderMembers = () => {
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
      <>No Members Found</>
    ) : (
      <></>
    );
  };

  renderNewCard = () => {
    const { newCard, cardDetail } = this.state;
    let keys = Object.keys(cardDetail);
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
    redirectToOdishaOneFromUpdateCard(requestId)
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
