import React from "react";
import Table from "react-bootstrap/Table";
import styles from "./ListTicket.module.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);

const Table_ListGD = () => {
  const handleShow = () => {
    console.log(123);
  };
  return (
    <div>
      <Table>
        <thead className={cx("wrap_Table")}>
          <tr>
            <th>STT</th>
            <th>Booking Code</th>
            <th>Số vé</th>

            <th>Tình trạng sủ dụng</th>
            <th>Ngày sử dụng</th>
            <th>Ngày xuất vé</th>
            <th>Cổng check-in</th>
          </tr>
        </thead>
        <tbody className={cx("wrap_Table_body")}>
          <tr onClick={handleShow}>
            <td>1</td>
            <td>ALT20210501</td>
            <td>123456789034</td>

            <td>
              <div className={cx("wrap_state")}>
                <img src={require("../../assentce/Ellipse 1.png")} />
                <h6 className={cx("state_txt")}>Đã sử dụng</h6>
              </div>
            </td>
            <td>14/04/2021</td>
            <td>14/04/2021</td>
            <td>Cổng 1</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Table_ListGD;