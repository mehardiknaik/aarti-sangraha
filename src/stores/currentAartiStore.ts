import { db } from "../util/firebaseConfig";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { useAartiStore, type Aarti } from "./aartiStore";

interface CurrentAarti {
  userName: string;
  currentAartiId: string;
  updatedAt: string;
}

interface CurrentAartiStore {
  current: CurrentAarti | null;
  loading: boolean;
  currentAarti: Aarti | null;
  fetchCurrent: () => Promise<void>;
  subscribeCurrent: () => () => void;
  updateCurrent: (currentAartiId: string) => Promise<void>;
}

export const useCurrentAartiStore = create<CurrentAartiStore>((set, get) => ({
  current: null,
  loading: false,
  currentAarti: null,

  fetchCurrent: async () => {
    set({ loading: true });
    const ref = doc(db, "currentAarti", "global");
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const currentAarti = useAartiStore.getState().getAarti(snap.data().currentAartiId);
      set({ current: snap.data() as CurrentAarti, currentAarti });
    }
    set({ loading: false });
  },

  subscribeCurrent: () => {
    set({ loading: true });
    const ref = doc(db, "currentAarti", "global");
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const currentAarti = useAartiStore.getState().getAarti(snap.data().currentAartiId);
        set({ current: snap.data() as CurrentAarti, currentAarti, loading: false });
      }
    });
    return unsubscribe;
  },

  updateCurrent: async (currentAartiId: string) => {
    const ref = doc(db, "currentAarti", "global");
    const updatedAt = new Date().toISOString();
    await setDoc(
      ref,
      {
        userName: useAuthStore.getState().user?.displayName,
        currentAartiId,
        updatedAt,
      },
      { merge: true }
    );
  },
}));
