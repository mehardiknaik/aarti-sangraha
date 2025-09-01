import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { useAartiStore } from "../../stores/aartiStore";
import CurrentAarti from "../../components/CurrentAarti";
import { useCurrentAartiStore } from "../../stores/currentAartiStore";

const Layout = () => {
  const { subscribeAartis, aartis } = useAartiStore();
  const { subscribeCurrent } = useCurrentAartiStore();

  console.log(aartis);

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
