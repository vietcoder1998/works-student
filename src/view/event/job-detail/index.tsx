import React, { Component } from "react";
import { Tabs, Row, Col, Icon, Button, Modal, Checkbox, Avatar, Affix } from "antd";
import { connect } from "react-redux";
import { _requestToServer } from "../../../services/exec";
import { POST } from "../../../const/method";
import { APPLY_JOB, SAVED_JOB } from "../../../services/api/private.api";
import { STUDENT_HOST } from "../../../environment/development";
import { authHeaders } from "../../../services/auth";
//@ts-ignore
import _ from "lodash";
import { moveScroll } from "../../../utils/moveScroll";
import { testImage } from "../../../utils/CheckImage";
import { Input } from "antd";
import Layout from "../../layout/Layout";
import { NotUpdate, JobType } from "../../layout/common/Common";
import { REDUX_SAGA } from "../../../const/actions";
import JobProperties from "./job-properties/JobProperties";
import { Link } from "react-router-dom";
import { TYPE } from "../../../const/type";
import qs from "query-string";
import { goBackWhenLogined } from '../../../utils/goBackWhenLogined'
import swal from 'sweetalert';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const { TabPane } = Tabs;
const { TextArea } = Input;

interface IJobDetailState {
  is_loading?: boolean;
  visible?: boolean;
  confirmLoading?: boolean;
  message?: string;
  genderRequired: Array<any>;
  shiftIDs?: Array<string | number>;
  list_shiftIDs?: Array<any>;
  check_box_state?: Array<any>;
  jobState?: string;
  is_loading_more?: boolean;
  isSaved?: boolean;
  jobID?: string;
  employerID?: string;
  can_send?: boolean;
}

// @ts-ignore
interface IJobDetailProps extends StateProps, DispatchProps {
  match?: any;
  getEmployerMoreJob?: (
    pageIndex?: number,
    pageSize?: number,
    id?: string,
  ) => any;
  getJobDetail?: (jobID?: string, eventAndSchoolID?: string) => any;
  getEmployerDetail?: (id?: string) => any;
  getSimilarJob?: (pageIndex?: number, pageSize?: number) => any;
  param?: any
}

export const _checkGender = (data) => {
  if (data.gender) {
    switch (data.gender) {
      case "BOTH":
        return (
          <div>
            <p>
              <label style={{ marginBottom: 0, marginRight: 3 }}>
                <Icon type="man" style={{ color: "rgb(21, 148, 255)" }} />
                Nam{" "}
              </label>
              <label style={{ marginBottom: 0, marginRight: 5 }}>
                <Icon type="woman" style={{ color: "#ff395c" }} />
                Nữ{" "}
              </label>
            </p>
            <p>
              Số lượt đã ứng tuyển: {data.applied}/{data.quantity}
            </p>
            {/* <p>Số lượng nhận: {data.quantity}</p> */}
          </div>
        );
      case "MALE":
        return (
          <div>
            <p>
              <label style={{ marginBottom: 0 }}>
                <Icon type="man" style={{ color: "#168ECD" }} />
              </label>{" "}
              Nam -
              <label style={{ marginLeft: 5, marginBottom: 0 }}>
                Số lượt đã ứng tuyển: {data.applied}/{data.quantity}
              </label>
            </p>

            {/* <p>Số lượng nhận: {data.quantity}</p> */}
          </div>
        );
      case "FEMALE":
        return (
          <div>
            <p>
              <label style={{ marginBottom: 0 }}>
                <Icon type="woman" style={{ color: "#ff395c" }} />
              </label>{" "}
              Nữ -
              <label style={{ marginLeft: 5, marginBottom: 0 }}>
                Số lượt đã ứng tuyển: {data.applied}/{data.quantity}
              </label>
            </p>
          </div>
        );
      default:
        return <NotUpdate />;
    }
  }
};

class EventJobDetail extends Component<IJobDetailProps, IJobDetailState> {
  constructor(props) {
    super(props);
    this.state = {
      is_loading: true,
      visible: false,
      confirmLoading: false,
      message: "",
      genderRequired: [],
      shiftIDs: [],
      list_shiftIDs: [],
      check_box_state: [],
      jobState: "PENDING",
      is_loading_more: false,
      isSaved: true,
      jobID: null,
      employerID: null,

      can_send: false,
    };
  }

  show_btn = false;
  l_e = [];
  l_s = [];
  async componentDidMount() {
    let queryParam = qs.parse(window.location.search);
    let { isAuthen } = this.props;
    if (queryParam.changeHost === '1') {
      if (isAuthen) {
        this.setState({ visible: true })
        // console.log(window.location.pathname)
        // window.location.search = null;
        this.props.history.replace(`${window.location.pathname}?data=${queryParam.data}`)
      } else {
        goBackWhenLogined('login')
      }
    }
    this.setState({ is_loading: false });
    await this._loadData();
    this._loadState();
    moveScroll(0, 0);
    // this.props.getSimilarJob(0,6);
  }

  // static getDerivedStateFromProps(nextProps?: IJobDetailProps, prevState?: IJobDetailState) {
  //     console.log(nextProps)
  //     if (nextProps.jobDetail.employerID && nextProps.jobDetail.employerID !== prevState.employerID) {
  //         nextProps.getEmployerDetail(nextProps.jobDetail.employerID);
  //         // nextProps.getEmployerMoreJob(0, 6, nextProps.jobDetail.employerID);
  //         return {
  //             employerID: nextProps.jobDetail.employerID
  //         }
  //     }

  //     return null;
  // };

  _loadData = () => {
    let { jobDetail } = this.props;
    this.props.getJobDetail(window.atob(this.props.match.params.id), window.location.search);
    this.setState({ isSaved: jobDetail.isSaved });
  };

  async _loadState() {
    let { isAuthen, jobDetail } = this.props;

    if (isAuthen) {
      this.setState({ jobState: jobDetail.appliedState });
    }
  }

  _handleOk = () => {
    this.setState({ visible: true });
  };

  _handleCancel = () => {
    this.setState({ visible: false });
  };

  _handleMessage = (event) => {
    this.setState({ message: event.target.value });
  };

  _handleCheckbox = (event, id) => {
    let { shiftIDs } = this.state;
    if (event.target.checked === true) {
      shiftIDs.push(id);
    } else {
      _.remove(shiftIDs, (item) => {
        return item === id;
      });
    }
    this.setState({
      shiftIDs,
    });
  };

  _toLogin = () => {
    let { isAuthen } = this.props;
    localStorage.setItem("last_access", window.location.pathname);
    let path = window.location.pathname + window.location.search
    if (isAuthen !== true) {
      window.location.assign(`/login?path=${window.btoa(path)}`);
    }
  };

  async _saveJob() {
    let { isAuthen, jobDetail } = this.props;
    if (isAuthen) {
      let res = await _requestToServer(
        POST,
        null,
        SAVED_JOB + `/${jobDetail.id}/saved`,
        STUDENT_HOST,
        authHeaders
      );
      if (res && res.data === null) {
        this.setState({ isSaved: true });
      } else {
      }
      this.props.getJobDetail(window.atob(this.props.match.params.id), window.location.search);
    }
  }

  _createRequest = () => {
    let { message, shiftIDs } = this.state;
    let id = window.atob(this.props.match.params.id);

    this.requestToServer({ message, shiftIDs }, id);
    this.setState({ visible: false });
  };

  async requestToServer(data, id) {
    await _requestToServer(
      POST,
      data,
      APPLY_JOB + `/${id}/apply`,
      STUDENT_HOST,
      authHeaders,
      null,
      false
    ).then((res) => {
      if (res) {
        let { results } = res.data;

        if (res.data.success === true) {
          swal({
            buttons: {
              cancel: "OK",
              catch: {
                text: "Lịch sử ứng tuyển",
                value: "catch",
              },
            },
            title: "Worksvns thông báo",
            text: `Ứng tuyển thành công!
            Hồ sơ của bạn đã được gửi đến nhà tuyển dụng`,
            icon: TYPE.SUCCESS,
            dangerMode: false
          }).then((value) => {
            switch (value) {
              case "catch":
                window.open('/history-apply')
                break;
            }
          })
          this.props.getJobDetail(id, window.location.search);
          this._loadState();
        } else {
          for (let i in results) {
            if (results[i].full === true) {
              swal({
                title: "Worksvns thông báo",
                text: "Số người ứng tuyển đã đầy",
                icon: TYPE.ERROR,
                dangerMode: true,
              });
            } else {
              if (results[i].genderSuitable === false) {
                swal({
                  title: "Worksvns thông báo",
                  text: "Khác giới tính yêu cầu",
                  icon: TYPE.ERROR,
                  dangerMode: true,
                });
              }
            }
          }
        }
      }
    });
  }
  componentWillUnmount() { }

  render() {
    let { jobDetail, isAuthen, param } = this.props;
    let {
      is_loading,
      visible,
      confirmLoading,
      jobState,
      shiftIDs,
    } = this.state;

    // let isSaved = jobDetail.saved;

    if (is_loading) {
      return (
        <Layout>
          <div className="loading">
            <Icon type="loading-3-quarters" spin />
          </div>
        </Layout>
      );
    }

    let content = "Ứng tuyển";
    let applyState = jobDetail.applyState;

    // let color = "rgba(255, 238, 224, 0.38)";
    // switch (jobDetail.jobType) {
    //   case "PARTTIME":
    //     color = "rgb(239, 253, 239)";
    //     break;

    //   case "FULLTIME":
    //     color = "rgb(229, 239, 255)";
    //     break;
    //   default:
    //     break;
    // }

    if (isAuthen === false) {
      content = "Ứng tuyển";
    } else {
      if (jobState === "PENDING") {
        content = "Đang chờ";
        applyState = true;
      } else if (jobState === "ACCEPTED") {
        content = "Đã chấp nhận";
        applyState = true;
      }
    }

    let coverUrl = jobDetail.employerCoverUrl;
    let logoUrl = jobDetail.employerLogoUrl;

    return (
      <>
        {/* Info Requirement */}
        <Modal
          title="Thông tin ứng tuyển"
          visible={visible}
          onOk={this._handleOk}
          footer={[
            <Button key="cancel" onClick={this._handleCancel} type="danger">
              Huỷ
            </Button>,

            <Button
              key="ok"
              disabled={shiftIDs.length === 0}
              type="primary"
              onClick={isAuthen ? this._createRequest : this._toLogin}
            >
              {content}
            </Button>,
          ]}
          confirmLoading={confirmLoading}
          onCancel={this._handleCancel}
        >
          <div className="body-requirement">
            {isAuthen ? (
              <div className="content-requirement">
                <TextArea
                  className="body-requirement__text"
                  placeholder="Viết tin nhắn đến nhà tuyển dụng trong đơn ứng tuyển(nếu muốn)"
                  onChange={(event) => this._handleMessage(event)}
                  rows={4}
                  maxLength={160}
                ></TextArea>
                <div className="chose-shift-rq">
                  {jobDetail.shifts &&
                    jobDetail.shifts.map((item, index) => {
                      return (
                        <p
                          key={index}
                          className="require__p"
                          style={{ margin: "10px 0px" }}
                        >
                          <Checkbox
                            id={item.id}
                            onChange={(event) => {
                              this._handleCheckbox(event, event.target.id);
                            }}
                          >
                            Ca số {index + 1}
                          </Checkbox>
                        </p>
                      );
                    })}
                </div>
                <div style={{ fontStyle: 'italic' }}><span className="asterisk">*</span> Hồ sơ của bạn sẽ được gửi đến Nhà tuyển dụng! <a href="/profile" target="_blank">Hoàn thiện hồ sơ</a></div>
              </div>
            ) : (
                <div>
                  <p>Bạn cần đăng nhập trước khi đăng tuyển</p>
                </div>
              )}
          </div>
        </Modal>
        <Layout>
          <div className="content">
            <Row>
              <Col xs={0} sm={0} md={0} lg={1} xl={2} xxl={3}></Col>
              <Col xs={24} sm={24} md={24} lg={22} xl={20} xxl={18}>
                <div id="requirement-job" className="job-detail-content">
                  {/* Button recruitment */}
                  <div className="btn-candidate show-mobile">
                    <Button
                      onClick={() => {
                        this.setState({ visible: true });
                      }}
                    >
                      <i className="fa fa-paper-plane-o" aria-hidden="true" />
                    </Button>
                  </div>

                  {/* Cover Image */}
                  <div className="cover-image-job ">
                    <LazyLoadImage alt={jobDetail.employerName} src={testImage(coverUrl)} className="company-image" />
                  </div>
                  {/* Header */}
                  <Affix offsetTop={0} >
                    <div className="job-header">
                      <div className="company-header">
                        <Row>
                          <Col xs={4} sm={8} md={4} lg={3} xl={4} className="a_c">
                            <Avatar
                              size={70}
                              shape={"square"}
                              src={testImage(logoUrl, "logo")}
                              alt="logo-company"
                            />
                            <JobType>{jobDetail && jobDetail.jobType}</JobType>
                          </Col>
                          <Col xs={20} sm={12} md={16} lg={17} xl={14}>
                            <h4>{jobDetail && jobDetail.jobTitle}</h4>
                            <div className="d_j_t">
                              <Icon type="home" style={{ color: "#168ECD" }} />
                              <Link
                                to={`/employer/${window.btoa(
                                  jobDetail.employerID
                                )}${param}`}
                                target="_blank"
                                style={{ fontSize: "1.05em", fontWeight: 450 }}
                              >
                                {jobDetail && jobDetail.employerName}
                              </Link>
                            </div>
                            <div className="d_j_t">
                              <Icon
                                type="environment-o"
                                style={{ color: "#168ECD" }}
                              />
                              {/* <IptLetter value={"Nơi đăng: "} /> */}
                              <span>{jobDetail && jobDetail.address}</span>
                            </div>
                          </Col>
                          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                            <Row className="btn-s-c">
                              {/* <Col
                              xs={8}
                              sm={8}
                              md={24}
                              lg={24}
                              xl={24}
                              style={{ marginTop: 10 }}
                            >
                              <Button
                                size="large"
                                type={
                                  isAuthen && !isSaved ? "primary" : "ghost"
                                }
                                onClick={() => this._saveJob()}
                                disabled={isSaved}
                                style={{
                                  marginRight: 5,
                                }}
                                children={
                                  isAuthen && !isSaved ? "Lưu" : "Đã lưu"
                                }
                                block
                              />
                            </Col> */}
                              <Col
                                xs={4}
                                sm={4}
                                md={4}
                                lg={0}
                                xl={0}
                                className="a_c"
                              ></Col>
                              <Col
                                xs={12}
                                sm={12}
                                md={24}
                                lg={24}
                                xl={24}
                                style={{ marginTop: 30 }}
                              >
                                <Button
                                  type={applyState ? "ghost" : "default"}
                                  size="large"
                                  style={{
                                    padding: "5px 0px",
                                    backgroundColor: applyState ? "" : "#31a3f9",
                                    borderColor: applyState ? "" : "white",
                                    color: applyState ? "" : "white",
                                  }}
                                  onClick={() => {
                                    isAuthen
                                      ? this.setState({ visible: true })
                                      : this._toLogin();
                                  }}
                                  disabled={applyState}
                                  children={content}
                                  block
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Affix>

                  <div className="job-content ">
                    <Tabs defaultActiveKey="1" className="">
                      <TabPane tab="Chi tiết công việc" key="1">
                        <JobProperties jobDetail={jobDetail} />
                      </TabPane>
                      {/* <TabPane tab="Thông tin Công ty" key="2">
                                                <EmployerDetail
                                                    employerDetail={employerDetail}
                                                    employerMoreJob={employerMoreJob}
                                                    _getMoreJob={this._getMoreJob}
                                                    paging={totalMoreJob}
                                                    is_loading_more={is_loading_more}
                                                />
                                            </TabPane> */}
                    </Tabs>
                  </div>
                </div>
              </Col>
              <Col xs={0} sm={0} md={0} lg={1} xl={2} xxl={3}></Col>
            </Row>
          </div>
        </Layout>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  jobDetail: state.GetEventJobDetail,
  employerDetail: state.EmployerDetail,
  // employerMoreJob: state.EmployerMoreJob.data,
  // similarJob: state.SimilarJob.data,
  // is_loading_more: state.EmployerMoreJob.loading,
  // is_loading_similar: state.SimilarJob.loading,
  // totalMoreJob: state.EmployerMoreJob.data.totalItems,
  // totalSimilarJob: state.SimilarJob.totalItems,
  isAuthen: state.AuthState.isAuthen,
  param: state.DetailEvent.param

});

const mapDispatchToprops = (dispatch) => ({
  getJobDetail: (jobID?: string, eventAndSchoolID?: string) =>
    dispatch({ type: REDUX_SAGA.EVENT.JOB.DETAIL, jobID, eventAndSchoolID }),
  // getEmployerMoreJob: (pageIndex?: number, pageSize?: number, employerID?: string) =>
  //     dispatch({ type: REDUX_SAGA.EMPLOYER_MORE_JOB.GET_EMPLOYER_MORE_JOB, pageIndex, pageSize, employerID }),
  // getSimilarJob: (pageIndex?: number, pageSize?: number) =>
  //     dispatch({ type: REDUX_SAGA.SIMILAR_JOB.GET_SIMILAR_JOB, pageIndex, pageSize }),
  getEmployerDetail: (id?: string) =>
    dispatch({ type: REDUX_SAGA.EMPLOYER_DETAIL.GET_EMPLOYER_DETAIL, id }),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToprops>;

export default connect(mapStateToProps, mapDispatchToprops)(EventJobDetail);
