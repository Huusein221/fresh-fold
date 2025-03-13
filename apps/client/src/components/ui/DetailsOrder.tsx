import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/ui/table";
import { Link, useParams } from "react-router";
import logo from "../../../images/FreshFoldNoBg.png";

interface UserWithOrders {
  user: {
    id: number;
    username: string;
    address: string;
    orders: Service[];
  };
}
interface Service {
  id: number;
  status: string;
  serviceType: string;
  pickUpDateTime: string;
  deliveryDateTime: string;
}
const ServiceApi = {
  async getServices(userId: number): Promise<UserWithOrders> {
    const response = await fetch(
      `http://localhost:3000/service?userId=${userId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }
    const data = (await response.json()) as UserWithOrders;
    return data;
  },
};
export function DetailedPage() {
  const { userId } = useParams();
  const [services, setServices] = useState<Service[]>([]);

  async function fetchServices() {
    if (!userId) return;
    try {
      const fetchedServices = await ServiceApi.getServices(Number(userId));
      console.log("Fetched services:", fetchedServices);
      setServices(fetchedServices.user.orders);
    } catch (error) {
      console.error("Error in fetchServices", error);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchServices();
    }
  }, [userId]);
  return (
    <>
      <header className="flex items-center mt-1.5 ml-1.5 font-bold text-xl">
        <Link to="/">
          <img src={logo} alt="FreshFold Logo" className="h-30 w-auto" />
        </Link>
      </header>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <Table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <TableCaption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            A list of your recent orders.
          </TableCaption>
          <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <TableRow>
              <TableHead className="py-3 px-6">Order id</TableHead>
              <TableHead className="py-3 px-6">Status</TableHead>
              <TableHead className="py-3 px-6">Services</TableHead>
              <TableHead className="py-3 px-6">Delivery</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow
                key={service.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <TableCell className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {service.id}
                </TableCell>
                <TableCell className="font-medium">{service.status}</TableCell>
                <TableCell className="py-4 px-6">
                  {service.serviceType}
                </TableCell>

                <TableCell className="py-4 px-6">
                  {service.deliveryDateTime}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
