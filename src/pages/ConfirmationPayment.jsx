import { useNavigate, useParams } from "react-router-dom";
import { db } from "../Firebase";
import { doc, updateDoc } from "firebase/firestore";

export const ConfirmationPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const handleConfirmPayment = async () => {
    try {
      const docRef = doc(db, "order", id);
      await updateDoc(docRef, { status: "Sukses" });
      alert("Payment confirmed successfully!");
      navigate(`/waiting-payment/${id}`)
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  return (
    <div className="flex py-32 h-dvh justify-center items-center text-white">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold">Konfirmasi Pembayaran</h1>
        <p className="text-lg">Apakah kamu sudah melakukan pembayaran?</p>
        <button
          onClick={handleConfirmPayment}
          className="px-8 py-4 bg-green-600 text-white rounded-md"
        >
          Konfirmasi Pembayaran
        </button>
      </div>
    </div>
  );
};
