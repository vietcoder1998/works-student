import React, { PureComponent } from "react";
import { Carousel, Icon, Row, Col, Avatar, Typography } from "antd";
import { connect } from "react-redux";
import defaultImage from "../../../../../assets/image/base-image.jpg";
import { REDUX_SAGA } from "../../../../../const/actions";
import { Link } from "react-router-dom";
import "./Banner.scss";

interface IProps {
  getTopEmpoyer?: Function;
  listEmployer?: any;
}
interface IState {
  list_job_top: Array<any>;
  pageIndex: number;
  pageSize: number;
  is_loading: boolean;
}

class Banner extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      list_job_top: [],
      pageIndex: 0,
      pageSize: 9,
      is_loading: true,
    };
    this.carousel = React.createRef();
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.carousel.next();
  }
  previous() {
    this.carousel.prev();
  }
  componentDidMount = async () => {
    await this.setState({ is_loading: false });
    await this.props.getTopEmpoyer(0);
  };

  render() {
    const props = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const { Title } = Typography;
    let { listEmployer } = this.props;
    return (
      <div
        className="employer-banner"
        style={{ display: listEmployer.totalItems === 0 ? "none" : "" }}
      >
        <Carousel dots={true} ref={(node) => (this.carousel = node)} {...props}>
          {listEmployer && listEmployer.items
            ? listEmployer.items.map((item, index) => (
                <div className="banner">
                  <div className="info-in-banner">
                    <Link
                      to={`/employer/${window.btoa(item.employer.id)}`}
                      target="_blank"
                      style={{ width: "100px" }}
                    >
                      <img
                        className="banner-logo"
                        src={
                          item.employer.logoUrl === null
                            ? defaultImage
                            : item.employer.logoUrl
                        }
                        alt="logo"
                      />
                    </Link>
                    <a href={`/employer/${window.btoa(item.employer.id)}`}>
                      <div className="text-banner">
                        {item.employer.employerName}{" "}
                      </div>
                    </a>
                  </div>
                  <img
                    src={
                      item.bannerUrl === null ? defaultImage : item.bannerUrl
                    }
                    key={index}
                    alt="banner"
                    className="image-banner"
                  />
                </div>
              ))
            : null}
        </Carousel>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listEmployer: state.BannerEmployer.data,
});

const mapDispatchToProps = (dispatch) => ({
  getTopEmpoyer: (pageIndex?: number, pageSize?: number) =>
    dispatch({ type: REDUX_SAGA.EVENT.EMPLOYER.BANNER, pageIndex, pageSize }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Banner);