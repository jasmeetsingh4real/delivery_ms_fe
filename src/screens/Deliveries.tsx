import { useEffect, useState } from "react";
import { staffAxios } from "../axios/staffAxios";
import styles from "./deliveries.module.css";
import {
  EnumDeliveryStatus,
  IDelivery,
  IOrderItems,
} from "../types/deliveriesType";
import { toast } from "react-toastify";
import moment from "moment";
export const Deliveries = () => {
  const [alllDeliveries, setAllDeliveries] = useState<IDelivery[]>([]);
  const [loading, setLoading] = useState(false);
  const getAllDeliveries = async () => {
    setLoading(true);
    const apiRes = await staffAxios.post("/delivery/getAlldeliveries", {});
    if (apiRes?.data?.success) {
      setAllDeliveries(apiRes.data.result);
    }
    setLoading(false);
  };

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
      getAllDeliveries();
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

  useEffect(() => {
    getAllDeliveries();
  }, []);
  return (
    <div className="w-100">
      <div className={styles.restauratImage}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/R%C3%B6e_g%C3%A5rd_caf%C3%A9_2.jpg/1200px-R%C3%B6e_g%C3%A5rd_caf%C3%A9_2.jpg"
          alt=""
        />
        <div className={styles.restaurantName}>
          <h3>Restasurant's Management</h3>
        </div>
      </div>
      <div className="container">
        <div className="row mt-4">
          <div className="col-3">
            <div className="p-3 border rounded shadow-sm">Filters</div>
          </div>
          <div className="col-9">
            {" "}
            <div className="d-flex ">
              <h4 className="mb-4">Orders </h4>{" "}
              <div
                className={styles.refreshBtn}
                role="button"
                onClick={getAllDeliveries}
              >
                <div className={loading ? styles.loading : ""}>
                  <i className={` fa-solid fa-rotate-right `}></i>
                </div>
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
