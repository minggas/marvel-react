import React from "react";

const getId = e => e.resourceURI.substr(e.resourceURI.lastIndexOf("/") + 1);

const Comic = props => {
  const {
    title,
    description,
    pageCount,
    thumbnail,
    characters,
    creators,
    series
  } = props.data;
  return (
    <div className="comic" onClick={props.turnCard}>
      <div className="info">
        <span className="inf-title">{title}</span>
        <span className="comic-link">
          {props.data.dates &&
            new Date(
              props.data.dates.filter(det => det.type === "onsaleDate")[0].date
            ).toDateString()}
        </span>
        <p className="descr info-cont">
          {description ? description : "No Description"}
        </p>
        {characters && (
          <div className="chars info-cont">
            <strong
              onClick={props.onClick}
              data-end={characters.collectionURI}
              data-type="characters"
            >
              Characters:
            </strong>

            {characters.items.map(item => (
              <p
                key={getId(item)}
                onClick={props.onClick}
                data-end={item.resourceURI + "/comics"}
                data-type="comics"
              >
                {item.name}
              </p>
            ))}
          </div>
        )}
        {creators && (
          <div className="pg info-cont">
            <strong
              onClick={props.onClick}
              data-end={creators.collectionURI}
              data-type="creators"
            >
              Creators:
            </strong>

            {creators.items.map(item => (
              <p
                key={getId(item)}
                onClick={props.onClick}
                data-end={item.resourceURI + "/comics"}
                data-type="comics"
              >
                {item.name} - {item.role}
              </p>
            ))}
            <span>
              <strong>Pages:</strong>
              {pageCount ? pageCount : "No Page Numbers"}
            </span>
          </div>
        )}
        <span
          className="comic-link"
          onClick={props.onClick}
          data-end={series.resourceURI}
          data-type="series"
        >
          {series.name}
        </span>
        <a
          className="comic-link"
          target="_blank"
          href={props.data.urls.filter(det => det.type === "reader")[0].url}
        >
          Read on Marvel Digital Comics
        </a>
      </div>
      <div className="cover">
        <img src={thumbnail.path + "." + thumbnail.extension} alt="cover" />
      </div>
    </div>
  );
};

export default Comic;
