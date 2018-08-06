import React, { Component } from "react";
import axios from "axios";
import "./scss/main.scss";
import Search from "./components/Search";
import Results from "./components/Results";
import Loading from "./components/Loading";

const statics = {
  apiKey: "apikey=2dbf364b46d22dbe140f169f78769f82",
  limit: "limit=20",
  comicFilter:
    "&format=comic&formatType=comic&noVariants=true&hasDigitalIssue=true&orderBy=onsaleDate"
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      init: false,
      type: "characters",
      input: "",
      searchInput: "",
      searchValue: "",
      data: [],
      error: null,
      lastEnd: "",
      pages: 0,
      actualPage: 0,
      footer:
        '<a href="http://marvel.com">Data provided by Marvel. © 2018 MARVEL</a>'
    };
  }

  handleTypeChange = event => {
    this.setState({ type: event.target.value });
  };

  handleInputChange = event => {
    this.setState({ input: event.target.value });
  };

  handlePageChange = e => {
    const offset = (e.target.value - 1) * 20;
    const end = `${this.state.lastEnd}&offset=${offset}`;
    this.setState({
      loading: true,
      actualPage: e.target.value
    });
    this.fetchData(end);
  };

  handleClick = e => {
    const end = `${e.target.dataset.end.replace("http", "https")}?${
      statics.apiKey
    }${e.target.dataset.type === "comics" ? statics.comicFilter : ""}`;
    this.setState({
      searchValue: e.target.dataset.type,
      lastEnd: end,
      loading: true,
      actualPage: 0
    });
    this.fetchData(end);
  };

  handleSubmit = e => {
    e.preventDefault();
    document
      .querySelectorAll(".search-form input")
      .forEach(item => item.blur());
    const end = `https://gateway.marvel.com/v1/public/${this.state.type}?${
      this.state.type === "series" ? "title" : "name"
    }StartsWith=${this.state.input}&${statics.apiKey}`;
    this.setState({
      searchInput: this.state.input,
      searchValue: this.state.type,
      lastEnd: end,
      loading: true,
      init: true,
      actualPage: 0
    });
    this.fetchData(end);
  };

  fetchData = end => {
    axios
      .get(end)
      .then(response => response.data)
      .then(myJson => {
        this.setState({
          loading: false,
          data: myJson.data.results,
          pages: Math.ceil(myJson.data.total / 20),
          footer: myJson.attributionHTML
        });
      })
      .catch(error => {
        console.dir(error);
        this.setState({
          loading: false,
          error
        });
      });
  };

  turnCard = e => {
    e.currentTarget.classList.toggle("turn");
  };

  render() {
    const {
      loading,
      data,
      error,
      searchValue: type,
      init,
      pages,
      actualPage
    } = this.state;
    const results = {
      type: type,
      onClick: this.handleClick,
      data: data,
      turnCard: this.turnCard,
      init: init,
      pages: pages,
      actualPage: actualPage,
      changePage: this.handlePageChange
    };
    const search = {
      type: type,
      onSubmit: this.handleSubmit,
      typeChange: this.handleTypeChange,
      inputChange: this.handleInputChange
    };
    function createMarkup(text) {
      return { __html: text };
    }

    return (
      <div className="App">
        <Search {...search} />
        {error && <h1>{error.message}</h1>}

        {!loading ? (
          init ? (
            <Results {...results} />
          ) : (
            <div className="empty" />
          )
        ) : (
          <Loading />
        )}

        {!loading && (
          <footer>
            <div className="author">
              <span>Designed and Coded by - </span>
              <a
                target="_blank"
                href="https://minggas.website"
                title="Link to Minggas Website"
                rel="noopener noreferrer"
              >
                Minggas
              </a>
            </div>
            <div dangerouslySetInnerHTML={createMarkup(this.state.footer)} />
          </footer>
        )}
      </div>
    );
  }
}

export default App;
