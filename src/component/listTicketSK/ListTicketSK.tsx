import React from "react";
import styles from "./ListTicketSK.module.scss";
import classnames from "classnames/bind";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Nav from "react-bootstrap/Nav";
import { FilterOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Table_ListSK from "./Table_ListSK";
const { Search } = Input;

const cx = classnames.bind(styles);
const ListTicketSK = () => {
  return (
    <Container fluid className={cx("wrap_ListSK")}>
      <h3 style={{ fontWeight: "bold" }}>Danh Sách Vé</h3>
      <div>
        <Nav variant="tabs" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link href="/">Gói sự kiện</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Gói gia đình</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className={cx("ListSK-filter")}>
        <Search placeholder="Tìm bằng số vé" className={cx("ListSK-search")} />
        <div className={cx("btn")}>
          <div className={cx("btnLoc")}>
            <FilterOutlined
              style={{ fontSize: 18, color: "rgba(255, 153, 60, 1)" }}
            />
            <h5 className={cx("btnLoc_txt")}>Lọc vé</h5>
          </div>
          <div className={cx("btnFile")}>
            <h5 className={cx("btnLoc_txt")}>Xuất File(.csv)</h5>
          </div>
        </div>
      </div>
      <div className={cx("tblSk")}>
        <Table_ListSK></Table_ListSK>
      </div>
    </Container>
  );
};

export default ListTicketSK;
