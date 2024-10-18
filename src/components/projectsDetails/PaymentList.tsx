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
      <div className="dark:bg-martinique-200 card text-black shadow-xl border">
        <div className="card-body">
          <div className="flex  gap-2 justify-between items-center">
            <h4 className="text-lg md:text-xl font-semibold ">Payments</h4>
            <div className="flex gap-2">
              <Button>Edit</Button>
              <PaymentModal
                id="paymentModal"
                projectName={projectName}
                due={due}
                projectId={projectId}
              />
            </div>
          </div>
          <div className="divider  before:bg-martinique-300 after:bg-martinique-300 my-0"></div>
          <div className="overflow-x-auto">
            <PaymentListTable data={paymentList} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentList;
