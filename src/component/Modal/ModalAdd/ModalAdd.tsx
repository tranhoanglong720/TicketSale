import React, { useState, useContext } from "react";
import { Button, Checkbox, Modal } from "antd";
import { Input, Typography, Radio, Select, Tag, Space } from "antd";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { AppContext } from "../../context/AppProvider";
import styles from "./ModalAdd.module.scss";
import classNames from "classnames/bind";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../../fireBase/FireBase";
import { dataref } from "../../fireBase/FireBase";
import { v4 as uuidv4 } from "uuid";
import { child, getDatabase, ref, get, push } from "firebase/database";

interface TicketsIn {
  // id?: string | null;
  nameTick?: string;
  dataUse?: string;
  dateOutUse?: string;
  price?: number;
  priceCombo?: number;
  AmoutCombo?: number;
  State?: boolean;
}
const cx = classNames.bind(styles);

const ModalAdd: React.FC = () => {
  const dbRef = ref(getDatabase());
  // const starCountRef = dataref.ref("ListTicket/1").get();

  // get(child(dbRef, `ListTicket`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  const { add, setAdd } = useContext(AppContext);

  const [Tickets, setTickets] = useState<TicketsIn | undefined>({
    // id: idK,
    nameTick: "",
    dataUse: "",
    dateOutUse: "",
    price: 0,
    priceCombo: 0,
    AmoutCombo: 1,
    State: true,
  });
  const showModal = () => {
    setAdd(true);
  };

  const handleAdd = () => {
    const db = getDatabase();
    const idK = push(ref(db, "ListTicket")).key;
    // setTickets({ ...Tickets, id: idK });
    const data = dataref.ref(`ListTicket`).push();

    data.set({ ...Tickets, id: data.key }).catch(alert);
    // console.log(Tickets);
  };

  const handleCancel = () => {
    setAdd(false);
  };

  return (
    <>
      <Modal
        open={add}
        onCancel={handleCancel}
        centered
        className={cx("WrapFilterTitle")}
        footer={[
          <Button
            key="back"
            onClick={handleCancel}
            className={cx("WrapFilterModal")}
          >
            Hủy
          </Button>,
          <Button
            key="add"
            onClick={handleAdd}
            className={cx("WrapFilterModal_Luu")}
          >
            Lưu
          </Button>,
        ]}
      >
        <div className={cx("wrap_ModalAdd")}>
          <h4
            style={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: 24,
            }}
          >
            Thêm gói vé
          </h4>
          <div className={cx("contentFilter")}>
            <div>
              <label className={cx("txtTen")}>Tên gói vé</label>
              <label className={cx("txtSao")}>*</label>
              <div>
                <input
                  type="text"
                  className={cx("inp_Ten")}
                  placeholder="Nhập tên gói vé"
                  onChange={(e) =>
                    setTickets({ ...Tickets, nameTick: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Row>
                <Col>
                  <p className={cx("txtNgay")}>Ngày áp dụng</p>
                  <input
                    type="date"
                    className={cx("inp_Ngay")}
                    onChange={(e) =>
                      setTickets({
                        ...Tickets,
                        dataUse: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col>
                  <p className={cx("txtNgay")}>Ngày hết hạn</p>
                  <input
                    type="date"
                    className={cx("inp_Ngay")}
                    onChange={(e) =>
                      setTickets({
                        ...Tickets,
                        dateOutUse: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </div>
            <div>
              <h5 className={cx("txtNgay")}>Giá vé áp dụng </h5>
            </div>
            <div className={cx("Vele")}>
              <Checkbox />
              <p className={cx("txtVe")}>Vé lẻ (vnđ/vé) với giá</p>
              <input
                type="number"
                className={cx("inp_ve")}
                placeholder="Giá vé"
                onChange={(e) =>
                  setTickets({ ...Tickets, price: parseInt(e.target.value) })
                }
              />
              /vé
            </div>
            <div className={cx("Vele")}>
              <Checkbox />
              <p className={cx("txtVe")}>Combo vé với giá</p>
              <input
                type="text"
                className={cx("inp_ve")}
                placeholder="Giá vé"
                onChange={(e) => {
                  console.log(124);
                  setTickets({
                    ...Tickets,
                    priceCombo: parseInt(e.target.value),
                  });
                }}
              />
              /
              <input
                type="text"
                className={cx("inp_songuoi")}
                placeholder="Giá vé"
                onChange={(e) =>
                  setTickets({
                    ...Tickets,
                    AmoutCombo: parseInt(e.target.value),
                  })
                }
              />
              vé
            </div>
            <div>
              <h5>Tình trạng</h5>
              <div>
                <Space.Compact style={{ display: "flex" }}>
                  <Select
                    defaultValue={true}
                    onChange={(value: boolean) => {
                      console.log(value);
                      setTickets({ ...Tickets, State: value });
                    }}
                  >
                    <Select.Option value={true} label="Đang áp dụng">
                      Đang áp dụng
                    </Select.Option>
                    <Select.Option value={false} label="Tắt">
                      Tắt
                    </Select.Option>
                  </Select>
                </Space.Compact>
              </div>
            </div>
            <div>
              <label className={cx("txtSao")}>*</label> là thông tin bắt buộc
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalAdd;
