import React from "react";

const Creator = props => {
  return (
    <div className="card creator" id={props.data.id}>
      <div className="container">
        <h4>
          <b>{props.data.fullName}</b>
        </h4>
        {props.data.description ? (
          <p className="desc">{props.data.description}</p>
        ) : null}
        {props.data.comics && props.data.comics.available > 0 ? (
          <div className="item">
            <h4
              onClick={props.onClick}
              data-end={props.data.comics.collectionURI}
              data-type="comics"
            >
              Comics
            </h4>
            <p>Total: {props.data.comics.available}</p>
          </div>
        ) : null}
        {props.data.events && props.data.events.available > 0 ? (
          <div className="item">
            <h4
              onClick={props.onClick}
              data-end={props.data.events.collectionURI}
              data-type="events"
            >
              Events
            </h4>
            <p>Total: {props.data.events.available}</p>
          </div>
        ) : null}
        {props.data.series && props.data.series.available > 0 ? (
          <div className="item">
            <h4
              onClick={props.onClick}
              data-end={props.data.series.collectionURI}
              data-type="series"
            >
              Series
            </h4>
            <p>Total: {props.data.series.available}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Creator;
