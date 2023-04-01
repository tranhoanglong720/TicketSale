import React, { useContext, useState } from "react";
import Table from "react-bootstrap/Table";
import styles from "./ExamTicket.module.scss";
import classnames from "classnames/bind";
import { AppContext } from "../context/AppProvider";
const cx = classnames.bind(styles);
interface TicketsIn {
  NamePacke?: string;
  dateUsed?: string;
  gateCheck?: string;
  idVe?: string;
  nameSK: string;
  priceVe: number;
  stateUsed: string;
}
type Props = { data: TicketsIn[] };
const Table_ExamTicketGD = (props: Props) => {
  const { setItem } = useContext(AppContext);

  const [active, setActive] = useState<number>();

  const setActiveRow = (index: number, item: TicketsIn) => {
    setItem(item);
    setActive(index);
  };
  // console.log(props.data);
  const handleShow = () => {
    console.log(123);
  };
  return (
    <div>
      <Table>
        <thead className={cx("wrap_Table")}>
          <tr>
            <th>STT</th>
            <th>Số vé</th>
            <th>Ngày sử dụng</th>
            <th>Loại vé</th>
            <th>Cổng check-in</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {props.data?.map((item: TicketsIn, index) => (
            <tr
              key={index}
              className={`${styles.rowHover} ${
                active === index ? styles.selected : ""
              }`}
              onClick={() => {
                setActiveRow(index, item);
              }}
            >
              <td>{index}</td>
              <td>{item.idVe}</td>
              <td>{item.dateUsed}</td>
              <td>Vé cổng</td>
              <td>{item.gateCheck}</td>
              {item.stateUsed === "true" ? (
                <td className={cx("wrap_Table_txtD")}>Đã đối soát</td>
              ) : (
                <td className={cx("wrap_Table_txt")}>Chưa đối soát</td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Table_ExamTicketGD;
