import React, { useContext, useState, useEffect } from "react";
import styles from "./PackTicket.module.scss";
import classnames from "classnames/bind";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Nav from "react-bootstrap/Nav";
import { FilterOutlined } from "@ant-design/icons";
import { Input } from "antd";

import { AppContext } from "../context/AppProvider";
import Table_PackTicket from "./Table_PackTicket";
import ModalAdd from "../Modal/ModalAdd/ModalAdd";
// import { useSelector } from "react-redux";
import { Action } from "@remix-run/router";
import TodoSlice, { getPackTicket } from "../reudux/slices/TodoSlice";
// import { useAppDispatch } from "../reudux/store";
import { useAppDispatch, useAppSelector } from "../reudux/hook";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../pagination/Pagination";
import { CSVLink } from "react-csv";
interface TicketsIn {
  id?: string;
  nameTick?: string;
  dataUse?: string;
  dateOutUse?: string;
  price: number;
  priceCombo: number;
  amoutCombo: number;
  state?: boolean;
  nameTickSK?: string;
}
const { Search } = Input;

const cx = classnames.bind(styles);
const PackTicket = () => {
  const { setAdd, reRender } = useContext(AppContext);
  const [packed, setPacked] = useState<Boolean>(true);
  // const [Tickets, setTickets] = useState<TicketsIn[] | null>([]);
  // const dispatch = useAppDispatch();
  const dispatch: any = useDispatch();
  // const Tickets = useAppSelector((state: any) => state.TodoTicket.packedTicket);
  const Tickets = useSelector((state: any) => state.TodoTicket.packedTicket);

  const handleAdd = () => {
    setAdd(true);
  };
  const handleChangePacked = () => {
    setPacked(!packed);
  };
  console.log(reRender);
  console.log(Tickets);
  useEffect(() => {
    dispatch(getPackTicket());
  }, [dispatch, Tickets, reRender]);
  const headers = [
    { label: "STT", key: "index" },
    { label: "Booking Code", key: "id" },
    { label: "Tên gói vé", key: "nameTick" },
    { label: "Ngày áp dụng", key: "dataUse" },
    { label: "Ngày hết hạn", key: "dateOutUse" },
    { label: "Giá vé (VNĐ/Vé)", key: "price" },
    { label: "Giá Combo (VNĐ/Combo)", key: "priceCombo" },
    { label: "Số lượng Combo (VNĐ/Combo)", key: "amoutCombo" },
    { label: "Tình trạng", key: "state" },
  ];
  const data = Tickets.map((item: any, index: string) => {
    return {
      ...item,
      id: item.id.slice(1),
      index: index,
      state: item.state === true ? "Đang Sử Dụng" : "Tắt",
    };
  });

  const csv = {
    data: data,
    headers: headers,
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTickets = Tickets.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <Container fluid className={cx("wrap_ListSK")}>
      <h3 style={{ fontWeight: "bold" }}>Danh Sách Vé</h3>

      <div className={cx("ListSK-filter")}>
        <Search placeholder="Tìm bằng số vé" className={cx("ListSK-search")} />
        <div className={cx("btn")}>
          <CSVLink {...csv} className={cx("btnFile")}>
            <h5 className={cx("btnLoc_txt")}>Xuất File(.csv)</h5>
          </CSVLink>
          <div className={cx("btnAdd")} onClick={handleAdd}>
            <h5 className={cx("btnAdd_txt")}>Thêm gói vé</h5>
          </div>
        </div>
      </div>
      <div className={cx("tblSk")}>
        <Table_PackTicket data={currentTickets} />
      </div>
      <ModalAdd />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 15,
          left: "50%",
        }}
      >
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={Tickets.length}
          paginate={paginate}
        />
      </div>
    </Container>
  );
};

export default PackTicket;
