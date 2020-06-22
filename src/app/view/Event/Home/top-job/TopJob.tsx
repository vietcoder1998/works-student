import React, { PureComponent } from "react";
import { Col, Row, Pagination } from "antd";
import "./TopJob.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//@ts-ignore
import DefaultImage from "../../../../../assets/image/carouselGroup/carousel2.jpg";
import { REDUX_SAGA } from "../../../../../const/actions";
import { JobType } from "../../../layout/common/Common";

interface IProps {
  getEventHotJob?: Function;
  getInDay?: Function;
  topJob?: any;
  indayJob?: any;
  setLoadinggetEventHotJob?: Function;
  loading_hot_job?: any;
  param?: any
}

class TopJob extends PureComponent<IProps> {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }
  componentDidMount = async () => {
  
  };

  changePage = (event?: number) => {
    this.props.getEventHotJob(event - 1);
    this.setState({
      current: event,
    });
  };
  render() {
    let { topJob, param } = this.props;
    return (
      <Row
        className="home-job"
        style={{ display: topJob.totalItems === 0 ? "none" : "" }}
      >
        <h5 style={{ textAlign: "center" }}>VIỆC LÀM NỔI BẬT TRONG NGÀY HỘI</h5>
        {topJob && topJob.items
          ? topJob.items.map((item, index) => {
            let logoUrl = item.employerLogoUrl;

            if (!logoUrl) {
              logoUrl = DefaultImage;
            }

            return (
              <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={6} key={index}>
                <div key={index} className="h-j-item-top">
                  <div className="img-job">
                    <img
                      src={logoUrl}
                      alt="ảnh công ty"
                      height="130px"
                      width="100px"
                    />
                  </div>
                  <div>

                    <div className="job-content">
                      <ul style={{ marginTop: 8 }}>
                        <li className="j-d">
                          <Link
                            to={`/event-job-detail/${window.btoa(item.id)}${param}`}
                            target="_blank"
                          >
                            <h6
                              className="l_c"
                              style={{
                                color: item.titleHighlight ? "red" : "black",
                              }}
                            >
                              {item.jobTitle}
                            </h6>
                          </Link>
                        </li>
                        <li className="l_c">
                          <Link
                            to={`/employer/${window.btoa(item.employerID)}${param}`}
                            target="_blank"
                            className="name_employer"
                          >
                            {item.employerName}
                          </Link>
                        </li>
                        <li
                          className="time-left"
                          style={{ paddingTop: 0, fontWeight: 550 }}
                        >
                          {item.region && item.region.name
                            ? item.region.name
                            : null}{" "}
                        </li>
                        <JobType>{item.jobType}</JobType>
                      </ul>
                    </div>
                  </div>

                  <div className="c-corner-label">
                    <div className="c-corner-label__text">HOT</div>
                  </div>
                </div>
                {" "}
              </Col>
            );
          })
          : null}
        <Col span={24} style={{ textAlign: "center" }}>
          <Pagination
            current={this.state.current}
            pageSize={topJob.pageSize}
            total={topJob.totalItems}
            style={{ margin: "25px 0px 10px" }}
            onChange={this.changePage}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  topJob: state.EventHotJobResults.data,
  param: state.DetailEvent.param
});

const mapDispatchToProps = (dispatch) => ({
  getEventHotJob: (pageIndex?: number, pageSize?: number) =>
    dispatch({ type: REDUX_SAGA.EVENT.JOB.HOT, pageIndex, pageSize }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopJob);
