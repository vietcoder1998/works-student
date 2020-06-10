import React, { PureComponent } from "react";
import { Skeleton, Icon, Row, Col, Rate } from "antd";

import DefaultImage from "../../../../assets/image/base-image.jpg";
import { Link } from "react-router-dom";
import "./Card.scss";
import { timeConverter } from "../../../../utils/convertTime";

interface IProps {
  id?: string;
  summary?: string;
  title?: string;
  imageUrl?: string;
  rating?: any;
  date?: any;
}
interface IState {
  loading?: boolean;
  title?: string;
  content?: string;
  id?: string;
  imageUrl?: string;
  rating?: any;
  date?: any;
}
export default class Card2 extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      title: "",
      content: "",
      imageUrl: "",
      id: null,
      rating: 0,
      date: 0,
    };
  }

  async componentDidMount() {
    await this.setState({
      title: this.props.title,
      content: this.props.summary,
      id: this.props.id,
      rating: this.props.rating,
      date: timeConverter(this.props.date),
      imageUrl:
        this.props.imageUrl === null ? DefaultImage : this.props.imageUrl,
      loading: false,
    });
  }

  render() {
    return (
      <Link to={`/articleDetail/${this.state.id}`}>
        <Skeleton
          avatar
          paragraph={{ rows: 2 }}
          active
          loading={this.state.loading}
        >
          <div className="card2">
            <Row>
              <Col sm={8} md={8} lg={8} xl={8} xxl={8}>
                <img
                  className="img-card"
                  src={this.state.imageUrl}
                  alt="article"
                />
              </Col>
              <Col sm={16} md={16} lg={16} xl={16} xxl={16}>
                <div className='info'>
                  <div className='title-article'>
                    {this.state.title}
                  </div>
                  <div className="summary">{this.state.content}</div>
                </div>
                <div className="info">
                  <div>
                    <Icon type="calendar" /> {this.state.date}
                  </div>
                  <div>
                    <Rate allowHalf disabled value={this.state.rating} />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Skeleton>
      </Link>
    );
  }
}
