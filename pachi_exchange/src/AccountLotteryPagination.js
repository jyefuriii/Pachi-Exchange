import React, { useEffect, useState } from "react";
import "./AccountLotteryPagination.css";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import AccountDrawEntry from "./AccountDrawEntry";
import axios from "axios";

const renderAccountLotteryData = (lotteryEntry) => {
  return lotteryEntry.map((item) => {
    return (
      <AccountDrawEntry
        key={item._id}
        _id={item._id}
        entryId={item.entryId}
        lotteryType={item.lotteryType}
        drawDate={item.drawDate}
      />
    );
  });
};

function AccountLotteryPagination() {
  const [drawEntry, setDrawEntry] = useState([]);
  async function getLottery() {
    const lotteryEntryRes = await axios.get(
      "http://localhost:8001/lotteryEntry/entries"
    );
    setDrawEntry(lotteryEntryRes.data);
  }

  //useEffect
  useEffect(() => {
    getLottery();
  }, [drawEntry]);

  const [currentPage, setcurrentPage] = useState(1);
  const itemsPerPage = 10;

  const pages = [];
  for (let i = 1; i <= Math.ceil(drawEntry.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = drawEntry.slice(indexOfFirstItem, indexOfLastItem);
  const maxPageNumberLimit = Math.ceil(drawEntry.length / itemsPerPage);

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
    <div>
      <div className="flex-container">
        <div className="drawEntry_column">
          {renderAccountLotteryData(currentItems)}
        </div>
      </div>
      <div className="paginate-ctnDraw">
        <div
          className="round-effectsDraw"
          onClick={handlePrevbtn}
          disabled={currentPage === pages[0] ? true : false}
        >
          <ArrowLeftIcon
            className="lArrows"
            style={{ width: "60px", height: "50px" }}
          />
        </div>
        <div className="paginate_drawPages">
          {currentPage}/{maxPageNumberLimit}
        </div>
        <div
          className="round-effectsDraw"
          onClick={handleNextbtn}
          disabled={currentPage === pages[pages.length - 1] ? true : false}
        >
          <ArrowRightIcon
            className="rArrows"
            style={{ width: "60px", height: "50px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default AccountLotteryPagination;
