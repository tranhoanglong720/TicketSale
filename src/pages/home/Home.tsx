import React, { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Menubar from "../../component/menubar/MenuBar";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import styles from "./Home.module.scss";
import classnames from "classnames/bind";
import AreaChart from "../../component/Pie/AreaChart";
import PieChart from "../../component/Pie/PieChart";
import { DatePicker, Space } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDispatch, useSelector } from "react-redux";
import FilterSlice from "../../component/reudux/slices/FilterSlice";
import { StatiscalGD, StatiscalSK } from "../../component/reudux/selector";
import { getListTickets } from "../../component/reudux/slices/TodoSlice";
import { useAppDispatch } from "../../component/reudux/hook";
const cx = classnames.bind(styles);
const Home = () => {
  // const dispatch: any = useDispatch();
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();
  const weekFormat = "DD/MM/YYYY";

  const customWeekStartEndFormat: DatePickerProps["format"] = (value) =>
    `${dayjs(value).startOf("week").format(weekFormat)} ~ ${dayjs(value)
      .endOf("week")
      .format(weekFormat)}`;

  const Gd = useSelector(StatiscalGD);
  const SK = useSelector(StatiscalSK);

  const totalGD = Gd[0] + Gd[1];
  const totalSK = SK[0] + SK[1];
  const totalTong = totalGD + totalSK;

  useEffect(() => {
    dispatch(getListTickets());
  }, [dispatch]);

  useEffect(() => {
    const totalGD = Gd[0] + Gd[1];
    const totalSK = SK[0] + SK[1];
    const totalTong = totalGD + totalSK;
    setTotal(totalTong);
  }, [Gd, SK]);

  const handleDateWeek = (date: any, dateString: string) => {
    const dateFrom = dateString.slice(0, 10);

    const dateFromStatistical = handleFormatDate(dateFrom);
    const dateTo = dateString.slice(13, 23);
    const dateToStatistical = handleFormatDate(dateTo);

    dispatch(FilterSlice.actions.DateFromStatistical(dateFromStatistical));
    dispatch(FilterSlice.actions.DateToStatistical(dateToStatistical));
  };

  const handleFormatDate = (date: string) => {
    if (date !== "") {
      // Tách chuỗi thành các phần: ngày, tháng, năm
      let dateArr = date.split("/");
      let day = dateArr[0];
      let month = dateArr[1];
      let year = dateArr[2];

      // Nối các phần lại với dấu '-'
      let formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }
    return "";
  };
  return (
    <Container fluid className={cx("wrap_Home")}>
      <Header />
      <Row>
        <Col lg={2}>
          <Menubar />
        </Col>
        <Col lg={10}>
          <Container fluid className={cx("HomeRight")}>
            <h3 style={{ fontWeight: "bold" }}>Thống kê</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <h6 style={{ fontWeight: 600, marginTop: 30 }}>Doanh thu</h6>
              <DatePicker
                defaultValue={dayjs()}
                format={customWeekStartEndFormat}
                style={{ height: 30 }}
                picker="week"
                onChange={handleDateWeek}
              />
            </div>

            <AreaChart />

            <div className={cx("wrap_label_sum")}>Tổng doanh thu theo tuần</div>
            <div className={cx("wrap_sum")}>
              {total ? (
                <div className={cx("wrap_money")}>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND",
                  }).format(total)}
                </div>
              ) : (
                <div className={cx("wrap_money")}>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalTong)}
                </div>
              )}
            </div>

            <PieChart />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
