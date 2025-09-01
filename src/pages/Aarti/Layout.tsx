import { useEffect } from "react";
import { Outlet } from "react-router";
import { useAartiStore } from "../../stores/aartiStore";
import CurrentAarti from "../../components/CurrentAarti";
import { useCurrentAartiStore } from "../../stores/currentAartiStore";

const Layout = () => {
  const { subscribeAartis } = useAartiStore();
  const { subscribeCurrent } = useCurrentAartiStore();


  useEffect(() => {
    const unsub = subscribeAartis();
    const unsubCurrent = subscribeCurrent();
    return () => {
      unsub();
      unsubCurrent();
    };
  }, []);
  return (
    <>
      <Outlet />
      <CurrentAarti/>
    </>
  );
};

export default Layout;
