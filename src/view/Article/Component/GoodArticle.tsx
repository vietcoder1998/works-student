import React, { PureComponent } from "react";
import { _requestToServer } from "../../../services/exec";
// import { POST } from '../../../const/method';
import { ANNOUNCEMENTS } from "../../../services/api/public.api";
import { PUBLIC_HOST } from "../../../environment/development";

import Title from "./Title";
import Card3 from "./Card3";
import Card2 from "./Card2";
import { POST } from './../../../const/method';
interface IProps {
  idType?: any;
  cardType?: number;
}
interface IState {
  listArticleData?: any;
  body?: any;
  loading?: boolean;
  pageIndex?: any;
  pageSize?: any;
}

class GoodArticle extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      listArticleData: [],
      pageIndex: 0,
      pageSize: 10,
      loading: true,
    };
  }

  public static defaultProps = {
    cardType: 2,
  };
  componentDidMount() {
    this.getListArticle(0, 5);
  }

  async getListArticle(pageIndex = 0, pageSize = 5) {
    let body = {
      adminID: null,
      hidden: null,
      createdDate: null,
      announcementTypeID: null,
    };
    this.props.idType === "all"
      ? (body.announcementTypeID = null)
      : (body.announcementTypeID = this.props.idType);

   await _requestToServer(
      POST,
      body,
      ANNOUNCEMENTS.LIST +
      `?sortBy=a.viewNumber&sortType=desc&pageIndex=${0}&pageSize=${pageSize}`,
      PUBLIC_HOST,
      {
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
      false,

    ).then((res?: any) => {
      if (res) {
        this.setState({
          listArticleData: res.data.items,
          loading: false,
        });
      }
    });
  }

  render() {
    let { listArticleData } = this.state;
    // const props = {
    //   dots: true,
    //   infinite: true,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    // };
    if (this.state.loading) return <div>loading .....</div>;
    else {
      return (
        <div className="good-article">
          <Title title={"Nhiều người đọc"} />
          {listArticleData.map((item, index) => (
            <div
              key={index}
              style={{ display: index === 0 ? "none" : "", marginTop: 20 }}
            >
              {this.props.cardType === 2 && (
                <Card2
                  id={item.id}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  summary={item.previewContent}
                  rating={item.averageRating}
                  date={item.createdDate}
                />
              )}
              {this.props.cardType === 3 && (
                <Card3
                  id={item.id}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  summary={item.previewContent}
                  rating={item.averageRating}
                  date={item.createdDate}
                />
              )}
            </div>
          ))}
        </div>
      );
    }
  }
}

export default GoodArticle;
