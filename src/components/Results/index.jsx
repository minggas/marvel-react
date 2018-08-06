import React, { Component } from "react";
import PropTypes from "prop-types";
import Serie from "./components/Serie";
import Comic from "./components/Comic";
import Creator from "./components/Creator";
import Character from "./components/Character";
import Event from "./components/Event";
import Pagination from "../Pagination";

class Results extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      document.querySelector("html").scrollTop = 0;
    }
  }

  render() {
    let page;
    if (this.props.data === null) {
      page = null;
    } else if (this.props.data.length === 0 && this.props.init) {
      page = <h1>No Match Found</h1>;
    } else {
      switch (this.props.type) {
        case "characters":
          page = this.props.data.map(char => (
            <Character
              key={char.id}
              data={char}
              onClick={this.props.onClick}
              turnCard={this.props.turnCard}
            />
          ));
          break;
        case "comics":
          page = this.props.data.map(comic => (
            <Comic
              key={comic.id}
              data={comic}
              onClick={this.props.onClick}
              turnCard={this.props.turnCard}
            />
          ));
          break;
        case "events":
          page = this.props.data.map(event => (
            <Event
              key={event.id}
              data={event}
              onClick={this.props.onClick}
              turnCard={this.props.turnCard}
            />
          ));
          break;
        case "series":
          page = this.props.data.map(serie => (
            <Serie
              key={serie.id}
              data={serie}
              onClick={this.props.onClick}
              turnCard={this.props.turnCard}
            />
          ));
          break;
        case "creators":
          page = this.props.data.map(creator => (
            <Creator
              key={creator.id}
              data={creator}
              onClick={this.props.onClick}
            />
          ));
          break;
        default:
          return null;
      }
    }
    return (
      <div>
        {this.props.pages > 1 && (
          <Pagination
            actual={this.props.actualPage}
            pages={this.props.pages}
            changePage={this.props.changePage}
          />
        )}
        <div className={this.props.type} id="content">
          {page}
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default Results;
