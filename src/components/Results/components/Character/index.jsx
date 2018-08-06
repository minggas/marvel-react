import React from "react";

const Character = props => {
  const thumbnail =
    props.data.thumbnail.path + "." + props.data.thumbnail.extension;
  return (
    <div className="card" id={props.data.id} onClick={props.turnCard}>
      {props.data.thumbnail.path.indexOf("image_not_available") === -1 ? (
        <div className="front">
          <img src={thumbnail} alt={props.data.name} />
          <h4>
            <b>{props.data.name}</b>
          </h4>
        </div>
      ) : (
        <div className="front no-image">
          <h4>
            <b>{props.data.name}</b>
          </h4>
        </div>
      )}
      <div className="container back">
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

export default Character;
