"use client";



import {
  Card,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@heroui/react";

const PaymentsTable = () => {
  const payments = [
    {
      _id: "p1",
      transactionId: "ch_mock_stripe_transaction_12345",
      amount: 298,
      paidAt: "2026-06-03T10:00:00Z",
      paymentStatus: "paid",
    },
    {
      _id: "p2",
      transactionId: "ch_mock_stripe_transaction_67890",
      amount: 45,
      paidAt: "2026-05-15T14:30:00Z",
      paymentStatus: "paid",
    },
  ];

  return (
    <Card className="rounded-2xl border border-white/10 bg-slate-900/50 shadow-xl p-6">
      <div className="overflow-x-auto">
        <Table
          aria-label="Payment History"
          removeWrapper
          classNames={{
            th: "bg-slate-950 text-slate-300 text-xs font-bold uppercase",
            td: "py-4",
          }}
        >
          <TableHeader>
            <TableColumn>TRANSACTION ID</TableColumn>
            <TableColumn>AMOUNT</TableColumn>
            <TableColumn>DATE</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>

          <TableBody
            items={payments}
            emptyContent="No payment history found."
          >
            {(payment) => (
              <TableRow key={payment._id}>
                <TableCell>
                  <span className="font-mono text-indigo-400">
                    {payment.transactionId}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="font-bold text-green-400">
                    ${payment.amount.toFixed(2)}
                  </span>
                </TableCell>

                <TableCell>
                  {new Date(payment.paidAt).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={
                      payment.paymentStatus === "paid"
                        ? "success"
                        : payment.paymentStatus === "pending"
                        ? "warning"
                        : "danger"
                    }
                    className="capitalize"
                  >
                    {payment.paymentStatus}
                  </Chip>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default PaymentsTable;