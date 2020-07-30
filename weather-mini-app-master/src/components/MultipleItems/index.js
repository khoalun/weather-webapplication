import React, { Component } from "react";
import Slider from "react-slick";

import Card from "../Card";

export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      accessibility: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    const {
      data = [],
      city = {},
      units = "",
      handelSetIndex = () => {}
    } = this.props;
    return (
      <div>
        <Slider {...settings}>
          {data.map((item, index) => (
            <div key={index}>
              <Card
                index={index}
                item={item}
                city={city}
                units={units}
                handelSetIndex={handelSetIndex}
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
