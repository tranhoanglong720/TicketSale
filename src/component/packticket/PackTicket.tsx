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
import { getDatabase, get, child, ref, push } from "firebase/database";
interface TicketsIn {
  id?: string;
  nameTick?: string;
  dataUse?: string;
  dateOutUse?: string;
  price: number;
  priceCombo: number;
  AmoutCombo: number;
  State?: boolean;
}
const { Search } = Input;

const cx = classnames.bind(styles);
const PackTicket = () => {
  const { setAdd } = useContext(AppContext);
  const [packed, setPacked] = useState<Boolean>(true);
  const [Tickets, setTickets] = useState<TicketsIn[] | null>([]);
  const handleAdd = () => {
    setAdd(true);
  };
  const handleChangePacked = () => {
    setPacked(!packed);
  };

  useEffect(() => {
    const dbRef = ref(getDatabase());
    // const starCountRef = dataref.ref("ListTicket/1").get();

    get(child(dbRef, `ListTicket`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let temp: any = [];
          snapshot.forEach((item: any) => {
            // console.log(item.val());
            // console.log(item.key);
            temp.push(item.val());
          });

          setTickets(temp);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container fluid className={cx("wrap_ListSK")}>
      <h3 style={{ fontWeight: "bold" }}>Danh Sách Vé</h3>

      <div className={cx("ListSK-filter")}>
        <Search placeholder="Tìm bằng số vé" className={cx("ListSK-search")} />
        <div className={cx("btn")}>
          <div className={cx("btnFile")}>
            <h5 className={cx("btnLoc_txt")}>Xuất File(.csv)</h5>
          </div>
          <div className={cx("btnAdd")} onClick={handleAdd}>
            <h5 className={cx("btnAdd_txt")}>Thêm gói vé</h5>
          </div>
        </div>
      </div>
      <div className={cx("tblSk")}>
        <Table_PackTicket data={Tickets} />
      </div>
      <ModalAdd />
    </Container>
  );
};

export default PackTicket;
