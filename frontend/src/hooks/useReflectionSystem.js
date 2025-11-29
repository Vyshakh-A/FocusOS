import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useReflectionSystem() {
  const [showModal, setShowModal] = useState(false);
  const [yesterdayMode, setYesterdayMode] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // 🔥 Check missed reflections on login
  useEffect(() => {
    const checkHistory = async () => {
      try {
        const res = await axiosInstance.get("/reflection/check");
        if (res.data?.missingYesterday) {
          setShowToast(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkHistory();
  }, []);

  // 🔥 10 PM trigger
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 22 && now.getMinutes() === 0) {
        setYesterdayMode(false);
        setShowModal(true);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const openYesterdayModal = () => {
    setYesterdayMode(true);
    setShowToast(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setYesterdayMode(false);
  };

  return {
    showModal,
    yesterdayMode,
    showToast,
    openYesterdayModal,
    closeModal,
  };
}
