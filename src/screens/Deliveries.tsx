import { useEffect, useState } from "react";
import { staffAxios } from "../axios/staffAxios";
import styles from "./deliveries.module.css";
import {
  EnumDeliveryStatus,
  IDelivery,
  IOrderItems,
  IRestaurant,
  IStaff,
} from "../types/deliveriesType";
import { toast } from "react-toastify";
import moment from "moment";
import img from "../assets/shawnanggg-nmpW_WwwVSc-unsplash.jpg";
import { useDispatch, useSelector } from "react-redux";
import { CustomDateRange } from "../commonUi/CustomDatePicker";
import { staffActions } from "../slices/staffSlice";
import { useParams, useSearchParams } from "react-router-dom";

export const Deliveries = () => {
  const [alllDeliveries, setAllDeliveries] = useState<IDelivery[]>([]);
  const [loading, setLoading] = useState(false);
  const [deliveriesCount, setDeliveriesCount] = useState<{
    [key in EnumDeliveryStatus]: number;
  }>();

  const [dateFilter, setDateFilter] = useState<{
    fromDate: Date;
    toDate: Date;
  }>({
    fromDate: moment().startOf("day").toDate(),
    toDate: moment().endOf("day").add(2, "day").toDate(),
  });

  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState<
    EnumDeliveryStatus | ""
  >(EnumDeliveryStatus.PENDING);

  const dispatch = useDispatch();

  const getAllDeliveries = async (staffId: number) => {
    if (loading || !staffId) {
      return;
    }
    setLoading(true);
    const apiRes = await staffAxios.post("/delivery/getAlldeliveries", {
      staffId,
      dateFilter,
      deliveryStatusFilter,
    });
    if (apiRes?.data?.success) {
      setAllDeliveries(apiRes.data.result?.deliveries);
    } else {
      toast.error(apiRes?.data?.errorMessage);
    }
    setLoading(false);
  };

  const staffData: IStaff = useSelector((state: any) => state.staff.data);
  const restaurantData: IRestaurant = useSelector(
    (state: any) => state.staff.restaurantdetails
  );

  const updateDeliveryStatus = async (
    status: EnumDeliveryStatus,
    restaurantId: string,
    deliveryId: number
  ) => {
    const apiRes = await staffAxios.post("/delivery/updateDeliveryStatus", {
      status,
      deliveryId,
      restaurantId,
    });
    if (apiRes?.data?.success) {
      toast.success("Status updated");
      getDeliveriesCount();
      getAllDeliveries(staffData?.id);
    } else {
      toast.error("Something went wrong");
    }
  };

  const _getOrderCreatedTime = (createdAt: Date) => {
    let minutes = Math.abs(moment().diff(moment(createdAt), "minutes"));
    const days = Math.floor(minutes / 1440);
    minutes %= 1440;

    // Calculate hours
    const hours = Math.floor(minutes / 60);
    minutes %= 60;

    // Remaining minutes
    const remainingMinutes = minutes;

    // Construct the string
    let timeString = "";
    if (days > 0) {
      timeString += `${days} day${days > 1 ? "s" : ""}, `;
    }
    if (hours > 0 || days > 0) {
      timeString += `${hours} hour${hours > 1 ? "s" : ""}, `;
    }
    timeString += `${remainingMinutes} minute${
      remainingMinutes > 1 ? "s" : ""
    }`;

    return timeString;
    // return Math.floor(diffInMinutes / 60 / 24);
  };

  const getDeliveriesCount = async () => {
    if (staffData) {
      const apiRes = await staffAxios.post("/delivery/getDeliveriesCount", {
        restaurantId: staffData.restaurantId,
        dateFilter,
      });
      if (apiRes?.data?.success) {
        setDeliveriesCount(apiRes?.data?.result);
      } else {
        toast.error(apiRes?.data?.errorMessage);
      }
    }
  };

  const getRestaurantInfo = async () => {
    const apiRes = await staffAxios.post("/delivery/getRestaurantInfo", {
      staffId: staffData.id,
    });
    if (apiRes.data.success) {
      if (apiRes?.data?.result) {
        dispatch(staffActions.setRestaurantDetails(apiRes?.data?.result));
      }
    }
  };

  const handleDateChange = (dateObj: {}) => {
    setDateFilter((old) => {
      return {
        ...old,
        ...dateObj,
      };
    });
  };

  useEffect(() => {
    if (staffData) {
      getAllDeliveries(staffData?.id);
      getDeliveriesCount();
    }
  }, [staffData, dateFilter, deliveryStatusFilter]);

  useEffect(() => {
    if (staffData.id) {
      getRestaurantInfo();
    }
  }, [staffData]);

  return (
    <div className="w-100">
      <div className={styles.restauratImage}>
        <img src={img} alt="" />
        <div className={styles.restaurantName}>
          <h3>{restaurantData?.restaurantName}'s Management</h3>
        </div>
        <div className={styles.staffName}>
          <i className="me-2 fa-solid fa-user text-success"></i>
          {staffData?.staffName} ({staffData.role})
        </div>
      </div>
      <div className="container">
        <div className="row mt-4">
          <div className="col-3">
            <div className="p-3 border rounded shadow-sm">
              <div className="d-flex flex-column mb-2">
                <label htmlFor="" className="small">
                  From Date
                </label>{" "}
                <CustomDateRange
                  defaultValue={moment(dateFilter.fromDate).format(
                    "DD/MM/YYYY"
                  )}
                  onChange={(date) => handleDateChange(date)}
                  name="fromDate"
                />
              </div>
              <div className="d-flex flex-column mb-2">
                <label htmlFor="" className="small">
                  to Date
                </label>{" "}
                <CustomDateRange
                  defaultValue={moment(dateFilter.toDate).format("DD/MM/YYYY")}
                  onChange={(date) => handleDateChange(date)}
                  name="toDate"
                />
              </div>
              <div>
                <label htmlFor="" className="small">
                  Status
                </label>
                <select
                  value={deliveryStatusFilter}
                  onChange={(e) =>
                    setDeliveryStatusFilter(
                      e.target.value as EnumDeliveryStatus
                    )
                  }
                  className="form-control"
                >
                  <option value={""}>All</option>
                  <option value={EnumDeliveryStatus.PENDING}>Pending</option>
                  <option value={EnumDeliveryStatus.BEING_PREPARED}>
                    Being Prepeared
                  </option>
                  <option value={EnumDeliveryStatus.IN_TRANSIT}>
                    In Transit
                  </option>
                  <option value={EnumDeliveryStatus.DELIVERED}>Deliverd</option>
                  <option value={EnumDeliveryStatus.FAILED}>Failed</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-9">
            {" "}
            <div className="d-flex ">
              <h4 className="mb-4">Orders </h4>{" "}
              <div
                className={styles.refreshBtn}
                role="button"
                onClick={() => getAllDeliveries(staffData?.id)}
              >
                <div className={loading ? styles.loading : ""}>
                  <i className={` fa-solid fa-rotate-right `}></i>
                </div>
              </div>
            </div>
            <div className={`${styles.quickFilters} `}>
              <div
                className={`${styles.quickFiltersItem} ${
                  deliveryStatusFilter === "" ? styles.active : ""
                }`}
                onClick={() => setDeliveryStatusFilter("")}
                role="button"
              >
                All (
                {deliveriesCount
                  ? deliveriesCount?.being_prepared +
                    deliveriesCount?.delivered +
                    deliveriesCount?.failed +
                    deliveriesCount?.in_transit +
                    deliveriesCount?.pending
                  : 0}
                )
              </div>
              <div
                className={`${styles.quickFiltersItem} ${
                  deliveryStatusFilter === EnumDeliveryStatus.PENDING
                    ? styles.active
                    : ""
                }`}
                onClick={() =>
                  setDeliveryStatusFilter(EnumDeliveryStatus.PENDING)
                }
                role="button"
              >
                Pending ({deliveriesCount?.pending})
              </div>
              <div
                className={`${styles.quickFiltersItem} ${
                  deliveryStatusFilter === EnumDeliveryStatus.BEING_PREPARED
                    ? styles.active
                    : ""
                }`}
                onClick={() =>
                  setDeliveryStatusFilter(EnumDeliveryStatus.BEING_PREPARED)
                }
                role="button"
              >
                Being-Prepared ({deliveriesCount?.being_prepared})
              </div>
              <div
                className={`${styles.quickFiltersItem} ${
                  deliveryStatusFilter === EnumDeliveryStatus.IN_TRANSIT
                    ? styles.active
                    : ""
                }`}
                onClick={() =>
                  setDeliveryStatusFilter(EnumDeliveryStatus.IN_TRANSIT)
                }
                role="button"
              >
                In-Transit ({deliveriesCount?.in_transit})
              </div>
              <div
                className={`${styles.quickFiltersItem} ${
                  deliveryStatusFilter === EnumDeliveryStatus.DELIVERED
                    ? styles.active
                    : ""
                }`}
                onClick={() =>
                  setDeliveryStatusFilter(EnumDeliveryStatus.DELIVERED)
                }
                role="button"
              >
                Delivered ({deliveriesCount?.delivered})
              </div>
              <div
                className={`${styles.quickFiltersItem} ${
                  deliveryStatusFilter === EnumDeliveryStatus.FAILED
                    ? styles.active
                    : ""
                }`}
                onClick={() =>
                  setDeliveryStatusFilter(EnumDeliveryStatus.FAILED)
                }
                role="button"
              >
                Failed ({deliveriesCount?.failed})
              </div>
            </div>
            {alllDeliveries.length > 0
              ? alllDeliveries.map((item) => {
                  return (
                    <div className="row mb-4  " key={item.id}>
                      <div
                        className={`${styles.orderDetails} bg-light py-3 shadow-sm col-9 d-flex justify-content-between border rounded align-items-center`}
                      >
                        <div className="">
                          {item.order.order_items.map((OrderItem, index) => {
                            return `${OrderItem.name}(${OrderItem.quantity})${
                              index !== item.order.order_items.length - 1
                                ? ", "
                                : ""
                            } `;
                          })}
                        </div>
                        <div className="small text-secondary">
                          Created {_getOrderCreatedTime(item.createdAt)} ago
                        </div>
                        <div
                          className={`${styles.paymentStatus} badge bg-success`}
                        >
                          pre-payed
                        </div>
                      </div>
                      <div className="col-3">
                        <select
                          name=""
                          id=""
                          className="form-control "
                          value={item.status}
                          onChange={(e) => {
                            updateDeliveryStatus(
                              e.target.value as EnumDeliveryStatus,
                              item.order.restaurantId,
                              item.id
                            );
                          }}
                        >
                          <option value={EnumDeliveryStatus.PENDING}>
                            Pending
                          </option>
                          <option value={EnumDeliveryStatus.BEING_PREPARED}>
                            Being Prepared
                          </option>
                          <option value={EnumDeliveryStatus.IN_TRANSIT}>
                            In-Transit
                          </option>
                          <option value={EnumDeliveryStatus.DELIVERED}>
                            Delivered
                          </option>
                          <option value={EnumDeliveryStatus.FAILED}>
                            Failed
                          </option>
                        </select>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};
