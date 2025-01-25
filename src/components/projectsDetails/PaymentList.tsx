import { PaymentType } from '../../types/paymentType';
import PaymentListTable from '../table/PaymentListTable';

import PaymentModal from '../modals/PaymentModal';

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
    <div className="bg-base-200 card  shadow-xl border mb-5">
      <div className="card-body">
        <div className="flex  gap-2 justify-between items-center">
          <h4 className="text-lg md:text-xl font-semibold ">Payments</h4>

          <PaymentModal
            id="paymentModal"
            projectName={projectName}
            due={due}
            projectId={projectId}
          />
        </div>
        <div className="divider my-0"></div>
        <div className="overflow-x-auto">
          {paymentList.length === 0 ? (
            <div className="text-center">No payment found</div>
          ) : (
            <PaymentListTable
              data={paymentList}
              projectName={projectName}
              due={due}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentList;
