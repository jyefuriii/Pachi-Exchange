import React, { useEffect, useState, useContext } from "react";
import "../styles/CollectionPagination.css";
import CallMadeIcon from "@material-ui/icons/CallMade";
import PremiumCollection from "../components/PremiumCollection";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const renderCollectionData = (collection) => {
  return collection.map((item) => {
    return (
      <PremiumCollection
        key={item._id}
        _id={item._id}
        image={item.image}
        price={item.price}
        name={item.name}
        description={item.description}
        description1={item.description1}
        description2={item.description2}
        description3={item.description3}
        description4={item.description4}
        description5={item.description5}
        emailVerification={item.emailVerification}
        type={item.type}
        count={item.count}
        shortName={item.shortName}
        productTicket={item.productTicket}
      />
    );
  });
};

function CollectionPagination() {
  const { getLoggedIn } = useContext(AuthContext);
  const [collection, setCollection] = useState([]);
  getLoggedIn();
  async function getCollection() {
    const collectionRes = await axios.get("http://localhost:8001/collection");
    setCollection(collectionRes.data);
  }

  //useEffect
  useEffect(() => {
    getCollection();
  }, []);

  const [currentPage, setcurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(collection.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = collection.slice(indexOfFirstItem, indexOfLastItem);
  const maxPageNumberLimit = Math.ceil(collection.length / itemsPerPage);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > 0) {
      return (
        <div
          key={number}
          id={number}
          onClick={handleClick}
          className={
            currentPage === number ? "round-effect active" : "round-effect"
          }
        >
          {number}
        </div>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    if (currentPage < maxPageNumberLimit) {
      setcurrentPage(currentPage + 1);
    }
  };

  const handlePrevbtn = () => {
    if (currentPage > 1) {
      setcurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex-container">
      <div className="shopPrize_row">{renderCollectionData(currentItems)}</div>
      <div className="paginate-ctn">
        <div
          className="round-effect"
          onClick={handlePrevbtn}
          disabled={currentPage === pages[0] ? true : false}
        >
          {" "}
          <CallMadeIcon className="lArrow" />
          {" Previous"}
        </div>
        {renderPageNumbers}

        <div
          className="round-effect"
          onClick={handleNextbtn}
          disabled={currentPage === pages[pages.length - 1] ? true : false}
        >
          {"Next "}
          <CallMadeIcon className="rArrow" />{" "}
        </div>
      </div>
    </div>
  );
}

export default CollectionPagination;
