import {
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  WindmillContext,
} from "@windmill/react-ui";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck, FiHome, FiUsers, FiCheckSquare } from "react-icons/fi";
import { ImCreditCard, ImStack } from "react-icons/im";

//internal import
import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import LineChart from "@/components/chart/LineChart/LineChart";
import PieChart from "@/components/chart/Pie/PieChart";
import CardItem from "@/components/dashboard/CardItem";
import CardItemTwo from "@/components/dashboard/CardItemTwo";
import ChartCard from "@/components/chart/ChartCard";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
// import OrderServices from "@/services/OrderServices";

const Dashboard = () => {
  const { t } = useTranslation();
  const { mode } = useContext(WindmillContext);

  dayjs.extend(isBetween);
  dayjs.extend(isToday);
  dayjs.extend(isYesterday);

  const { currentPage, handleChangePage } = useContext(SidebarContext);

  // react hook
  const [todayOrderAmount, setTodayOrderAmount] = useState(0);
  const [yesterdayOrderAmount, setYesterdayOrderAmount] = useState(0);
  const [salesReport, setSalesReport] = useState([]);
  const [todayCashPayment, setTodayCashPayment] = useState(0);
  const [todayCardPayment, setTodayCardPayment] = useState(0);
  const [todayCreditPayment, setTodayCreditPayment] = useState(0);
  const [yesterdayCashPayment, setYesterdayCashPayment] = useState(0);
  const [yesterdayCardPayment, setYesterdayCardPayment] = useState(0);
  const [yesterdayCreditPayment, setYesterdayCreditPayment] = useState(0);

  // const {
  //   data: bestSellerProductChart,
  //   loading: loadingBestSellerProduct,
  //   error,
  // } = useAsync(OrderServices.getBestSellerProductChart);

  // const { data: dashboardRecentOrder, loading: loadingRecentOrder } = useAsync(
  //   () => OrderServices.getDashboardRecentOrder({ page: currentPage, limit: 8 })
  // );

  // const { data: dashboardOrderCount, loading: loadingOrderCount } = useAsync(
  //   OrderServices.getDashboardCount
  // );

  // const { data: dashboardOrderAmount, loading: loadingOrderAmount } = useAsync(
  //   OrderServices.getDashboardAmount
  // );

  // console.log("dashboardOrderCount", dashboardOrderCount);

  return (
    <>
      <PageTitle>{t("DashboardOverview")}</PageTitle>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CardItem
          title="Total Listings"
          Icon={FiHome}
          // loading={loadingOrderCount}
          // quantity={dashboardOrderCount?.totalOrder || 0}
          className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
        />
        <CardItem
          title={t("Total Users")}
          Icon={FiUsers}
          // loading={loadingOrderCount}
          // quantity={dashboardOrderCount?.totalPendingOrder?.count || 0}
          // amount={dashboardOrderCount?.totalPendingOrder?.total || 0}
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />
        <CardItem
          title={t("Total requests")}
          Icon={FiCheckSquare}
          // loading={loadingOrderCount}
          // quantity={dashboardOrderCount?.totalProcessingOrder || 0}
          className="text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 my-8">
        <ChartCard
          mode={mode}
          // loading={loadingOrderAmount}
          title={t("Listings")}
        ></ChartCard>

        <ChartCard mode={mode} title={t("Best Listings")}>
          {/* <PieChart data={bestSellerProductChart} /> */}
        </ChartCard>
      </div>

      <PageTitle>{t("RecentOrder")}</PageTitle>

      {/* <Loading loading={loading} /> */}

      {false ? (
        <TableLoading row={5} col={4} />
      ) : false ? (
        <span className="text-center mx-auto text-red-500">{"error"}</span>
      ) : true ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t("First Name")}</TableCell>
                <TableCell>{t("Lastname")}</TableCell>
                <TableCell>{t("Email")}</TableCell>
                <TableCell>{t("Status")}</TableCell>
                <TableCell>{t("Active/Deactive")}</TableCell>
                <TableCell>{t("Action")}</TableCell>
             
              </tr>
            </TableHeader>
          </Table>
          <TableFooter>
            <Pagination totalResults={100} resultsPerPage={8} onChange={handleChangePage} label="Table navigation" />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no orders right now." />
      )}
    </>
  );
};

export default Dashboard;
