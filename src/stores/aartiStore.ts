import { db } from "../util/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc
} from "firebase/firestore";
import { create } from "zustand";

export interface Aarti {
  id: string;
  title: string;
  description: string;
  order: number;
}

interface AartiStore {
  aartis: Aarti[];
  loading: boolean;
  fetchAartis: () => Promise<void>;
  subscribeAartis: () => () => void;
  updateOrder: (id: string, order: number) => Promise<void>;
  addAarti: (title: string, description: string) => Promise<void>;
  getAarti: (id: string) => Aarti | undefined;
}

export const useAartiStore = create<AartiStore>((set, get) => ({
  aartis: [],
  loading: false,
  fetchAartis: async () => {
    set({ loading: true });
    const q = query(collection(db, "aartis"), orderBy("order"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Aarti[];
    set({ aartis: data, loading: false });
  },

  // 🔹 subscribe to live updates
  subscribeAartis: () => {
    set({ loading: true });
    const q = query(collection(db, "aartis"), orderBy("order"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Aarti[];
      set({ aartis: data, loading: false });
    });
    return unsubscribe;
  },

  updateOrder: async (id, order) => {
    const ref = doc(db, "aartis", id);
    await updateDoc(ref, { order });
  },
  addAarti: async (title: string, description: string) => {
    const size = get().aartis.length ?? 0;
    await addDoc(collection(db, "aartis"), {
      title,
      description,
      createdAt: new Date().toISOString(),
      order: size + 1,
    });
  },
  getAarti: (id: string) => {
    return get().aartis.find((aarti) => aarti.id === id);
  }
}));
