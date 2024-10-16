import { PaymentType } from "../../types/paymentType";
import PaymentListTable from "../table/paymentListTable";
import Button from "../ui/Button";
import PaymentModal from "../ui/PaymentModal";

type PaymentListPropsType = {
  projectName: string;
  due: number;
  projectId: string;
  paymentList: PaymentType[];
};

function PaymentList({
  projectName,
  due,
  projectId,
  paymentList,
}: PaymentListPropsType) {
  return (
    <div>
      <h1 className="text-2xl font-bold md:text-3xl font-lexend mb-4">
        Payments
      </h1>
      <div className="divider my-0"></div>
      <div className="dark:bg-martinique-200 card text-black shadow-xl border">
        <div className="card-body">
          <div className="overflow-x-auto">
            {/* <table className="table">
       
              <thead>
                <tr>
                  <th></th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Transaction Id</th>
                </tr>
              </thead>
              <tbody>
          
                {paymentList.map((payment, index) => (
                  <tr key={payment._id}>
                    <th>{index + 1}</th>
                    <td>
                      {new Date(payment.paymentDate).toLocaleDateString(
                        "en-GB",
                      )}
                    </td>
                    <td>{payment.paymentAmount}</td>
                    <td>{payment.paymentMethod}</td>
                    <td>{payment.transactionId}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            <PaymentListTable data={paymentList} />
          </div>
        </div>
        <div className="flex justify-end my-2 p-2 gap-2">
          <Button>Edit</Button>
          <PaymentModal
            id="paymentModal"
            projectName={projectName}
            due={due}
            projectId={projectId}
          />
        </div>
      </div>
    </div>
  );
}

export default PaymentList;
