import React, { Component } from "react";
import forEach from "lodash/forEach";
import findIndex from "lodash/findIndex";
import moment from "moment";

//compoent layout
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import CheckBoxIcon from "@material-ui/icons/CheckBox";
// import Favorite from "@material-ui/icons/Favorite";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
//Compoent
import MultipleItems from "src/components/MultipleItems";
import Loading from "src/components/Loading";
import Chart from "src/components/Chart";

//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getWeatherRequest } from "src/redux/actions/weather";

function mapStateToProps(state) {
  return {
    store: {
      weather: state.weather
    }
  };
}

const mapDispatchToProps = dispatch => {
  return {
    action: bindActionCreators(
      {
        getWeatherRequest
      },
      dispatch
    )
  };
};

class App extends Component {
  state = {
    loading: false,
    units: "metric",
    isMetric: true,
    idx: 0
  };

  componentDidMount() {
    const { units } = this.state;
    this.fetchWeather(units);
  }

  fetchWeather = units => {
    this.setState({ loading: true });
    this.props.action.getWeatherRequest(
      {
        q: "Munich",
        APPID: "75f972b80e26f14fe6c920aa6a85ad57",
        cnt: "40",
        units
      },
      () => this.setState({ loading: false }),
      () => this.setState({ loading: false })
    );
  };

  handelSwitTemperature = bool => {
    const units = bool ? "metric" : "imperial";
    this.setState({ isMetric: bool, units }, () => {
      this.fetchWeather(units);
    });
  };

  filterDay = data => {
    const outPut = [];
    let date = "";
    forEach(data, item => {
      if (date === "") {
        date = moment(item.dt_txt).format("MMM Do YY");
        outPut.push({
          date,
          temlist: [item]
        });
      } else if (date === moment(item.dt_txt).format("MMM Do YY")) {
        const index = findIndex(
          outPut,
          o => o.date === moment(item.dt_txt).format("MMM Do YY")
        );
        if (index > -1) {
          outPut[index].temlist.push(item);
        }
      } else if (date !== moment(item.dt_txt).format("MMM Do YY")) {
        date = moment(item.dt_txt).format("MMM Do YY");
        outPut.push({
          date,
          temlist: [item]
        });
      }
    });
    return outPut;
  };

  handelSetIndex = index => {
    this.setState({ idx: index });
  };

  render() {
    const {
      store: {
        weather: {
          list: { data = [], city = {} }
        }
      }
    } = this.props;
    const { units, isMetric, loading, idx } = this.state;
    const filterData = data.length > 0 ? this.filterDay(data) : [];
    return (
      <div>
        {loading && <Loading />}
        <CssBaseline />
        <Container>
          <h2> Weather app </h2>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isMetric}
                  onChange={() => this.handelSwitTemperature(true)}
                  value="isMetric"
                />
              }
              label="Celsius"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!isMetric}
                  onChange={() => this.handelSwitTemperature(false)}
                  value="isMetric"
                />
              }
              label="Fahrenheit"
            />
          </FormGroup>
          <MultipleItems
            data={filterData}
            city={city}
            units={units}
            handelSetIndex={this.handelSetIndex}
          />
          {filterData.length > 0 && filterData[idx].temlist && (
            <Chart item={filterData[idx]} />
          )}
        </Container>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
