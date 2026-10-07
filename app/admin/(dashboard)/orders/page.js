import { prisma } from "@/lib/prisma";
import {
  updateOrderStatus,
  deleteOrder,
} from "./actions";

export default async function AdminOrdersPage() {

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING"
  ).length;

  const preparingOrders = orders.filter(
    (order) => order.status === "PREPARING"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "COMPLETED"
  ).length;

  return (
    <div className="dashboard">

      {/* HEADER */}

      <div className="dashboard-header">
        <div>
          <h1>Order Dashboard</h1>

          <p>
            Manage and monitor your cake orders.
          </p>
        </div>
      </div>

      {/* STATISTICS */}

      <div className="dashboard-stats">

        <div className="stat-card">
          <span className="stat-icon">
            📦
          </span>

          <div>
            <p>Total Orders</p>
            <h2>{totalOrders}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">
            ⏳
          </span>

          <div>
            <p>Pending</p>
            <h2>{pendingOrders}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">
            👩‍🍳
          </span>

          <div>
            <p>Preparing</p>
            <h2>{preparingOrders}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">
            ✅
          </span>

          <div>
            <p>Completed</p>
            <h2>{completedOrders}</h2>
          </div>
        </div>

      </div>

      {/* ORDERS */}

      <section className="orders-section">

        <div className="section-header">
          <div>
            <h2>Recent Orders</h2>
            <p>
              View and manage customer orders.
            </p>
          </div>
        </div>

        {orders.length === 0 ? (

          <div className="empty-orders">
            <div>🍰</div>
            <h3>No orders yet</h3>
            <p>
              Customer orders will appear here.
            </p>
          </div>

        ) : (

          <div className="orders-table-wrapper">

            <table className="orders-table">

              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Cake</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr key={order.id}>

                    <td>
                      <strong>
                        #{String(order.id).padStart(3, "0")}
                      </strong>
                    </td>

                    <td>
                      <strong>
                        {order.customerName}
                      </strong>

                      <small>
                        {order.phone}
                      </small>
                    </td>

                    <td>
                      <strong>
                        {order.flavor}
                      </strong>

                      <small>
                        {order.size} • {order.frosting}
                      </small>
                    </td>

                    <td>
                      <strong>
                        RM {order.totalPrice.toFixed(2)}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`status status-${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>

                      <div className="order-actions">

                        <form action={updateOrderStatus}>

                          <input
                            type="hidden"
                            name="id"
                            value={order.id}
                          />

                          <select
                            name="status"
                            defaultValue={order.status}
                          >

                            <option value="PENDING">
                              Pending
                            </option>

                            <option value="PREPARING">
                              Preparing
                            </option>

                            <option value="READY">
                              Ready
                            </option>

                            <option value="COMPLETED">
                              Completed
                            </option>

                          </select>

                          <button type="submit">
                            Update
                          </button>

                        </form>

                        <form action={deleteOrder}>

                          <input
                            type="hidden"
                            name="id"
                            value={order.id}
                          />

                          <button
                            type="submit"
                            className="delete-button"
                          >
                            Delete
                          </button>

                        </form>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </section>

    </div>
  );
}