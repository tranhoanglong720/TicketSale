import React, { useState, useEffect, useContext } from "react";
import styles from "./ExamTicket.module.scss";
import classNames from "classnames/bind";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Nav from "react-bootstrap/Nav";
import { FilterOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Table_ExamTicketSK from "./Table_ExamTicketSK";
import Table_ExamTicketGD from "./Table_ExamTicketGD";
import { AppContext } from "../context/AppProvider";
import { dataref } from "../fireBase/FireBase";
import { useAppDispatch, useAppSelector } from "../reudux/hook";
import TodoSlice, { getListTickets } from "../reudux/slices/TodoSlice";
import {
  todoRemainingSelector,
  todoRemainingSelectorSK,
} from "../reudux/selector";

import { useSelector } from "react-redux";
import FilterSlice from "../reudux/slices/FilterSlice";
import Pagination from "../pagination/Pagination";
interface TicketsIn {
  NamePacke?: string;
  dateUsed?: string;
  gateCheck?: string;
  idVe?: string;
  nameSK: string;
  priceVe: number;
  stateUsed: string;
}

const { Search } = Input;
const cx = classNames.bind(styles);
const ExamTicket = () => {
  // const [packed, setPacked] = useState(true);
  const Tickets = useSelector(todoRemainingSelector);
  const TicketSKs = useSelector(todoRemainingSelectorSK);
  const ListTicket = useSelector((state: any) => state.TodoTicket.listTicket);
  // const [Tickets, setTickets] = useState<TicketsIn[]>([]);
  // const [TicketSKs, setTicketSKs] = useState<TicketsIn[]>([]);
  const [search, setSearch] = useState<string>("");
  const { item, status, packed, setPacked, reRender, setRerender } =
    useContext(AppContext);
  const dispatch = useAppDispatch();
  const handleChangePacked = () => {
    setPacked(!packed);
  };
  useEffect(() => {
    dispatch(getListTickets());
  }, [dispatch, ListTicket, reRender]);
  console.log(ListTicket);

  const handleCheck = () => {
    dispatch(TodoSlice.actions.CheckListTicket(item));
    setRerender(reRender);
  };
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    dispatch(FilterSlice.actions.Search(e.target.value));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTickets = Tickets.slice(indexOfFirstPost, indexOfLastPost);
  const currentTicketSks = TicketSKs.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <Container fluid className={cx("wrap_ListSK")}>
      <h3 style={{ fontWeight: "bold" }}>Đối soát vé</h3>
      <div>
        <Nav variant="tabs" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link onClick={handleChangePacked} active={packed}>
              Gói sự kiện
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={handleChangePacked} active={!packed}>
              Gói gia đình
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className={cx("ListSK-filter")}>
        <Search
          placeholder="Tìm bằng số vé"
          className={cx("ListSK-search")}
          value={search}
          onChange={handleSearch}
        />
        {status === "Đã đối soát" ? (
          <div className={cx("btn")}>
            <div className={cx("btnXuat")}>
              <h5 className={cx("btnXuat_txt")}>Xuất File(.csv)</h5>
            </div>
          </div>
        ) : (
          <div className={cx("btn")}>
            <div className={cx("btnChot")}>
              <h5 className={cx("btnChot_txt")} onClick={handleCheck}>
                Chốt Đối soát
              </h5>
            </div>
          </div>
        )}
      </div>
      <div className={cx("tblSk")}>
        {packed ? (
          <Table_ExamTicketSK data={currentTicketSks} />
        ) : (
          <Table_ExamTicketGD data={currentTickets} />
        )}
      </div>
      {packed ? (
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
            totalPosts={TicketSKs.length}
            paginate={paginate}
          />
        </div>
      ) : (
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
      )}
    </Container>
  );
};

export default ExamTicket;
