export interface Order {
  id: string;
  totalAmount: number;
  tax: number;
  address: string;
  restaurantId: string;
  userId: string;
  status: EnumOrderStatus;
  createdAt: Date;
  updatedAt: Date;
  order_items: IOrderItems[];
}
export interface IDelivery {
  id: number;
  orderId: string;
  assignedToStaff: string;
  pickupTime: Date | null;
  deliveryTime: Date | null;
  deliveryNotes: string;
  status: EnumDeliveryStatus;
  createdAt: Date;
  updatedAt: Date;
  order: Order;
}
export interface IOrderItems {
  id: string;
  itemId: string;
  quantity: number;
  orderId: string;
  name: string;
  totalAmount: number;
  itemType: string;
  createdAt: Date;
  updatedAt: Date;
}
export enum EnumDeliveryStatus {
  PENDING = "pending",
  BEING_PREPARED = "being_prepared",
  IN_TRANSIT = "in_transit",
  DELIVERED = "delivered",
  FAILED = "failed",
}
export enum EnumOrderStatus {
  PENDING = "pending",
  FAILED = "failed",
  SUCCESSFUL = "successful",
}

export enum EnumStaffRoles {
  DELIVERY = "delivery",
  ADMIN = "admin",
  EMPLOYEE = "employee",
  CHEF = "chef",
}

export interface IStaff {
  id: number;
  staffName: string;
  restaurantId: string;
  role: EnumStaffRoles;
  age: number;
  phoneNo: string;
  email: string;
  isActive: boolean;
  salary: number;
}

export interface IApiResponse<T> {
  data: {
    success: boolean;
    errorMessage?: any;
    result?: T;
  };
}

export interface IRestaurant {
  id: string;
  restaurantName: string;
  ownerId: string;
  openingTime: Date;
  closingTime: Date;
  restaurantEmail: string;
  restaurantContact: string;
  stateId: number;
  countryId: number;
  cityId: number;
  streetAddress: string;
  status: string;
}
