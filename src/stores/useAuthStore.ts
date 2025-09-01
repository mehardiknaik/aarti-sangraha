// useAuthStore.ts
import { create } from "zustand";
import { signOut, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, authProvider, db } from "../util/firebaseConfig";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any | null;
  role: "admin" | "user" | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      loading: true,

      login: async () => {
        try {
          // 🔹 Prompt Google Sign In
          const { user } = await signInWithPopup(auth, authProvider);

          // 🔹 Create Firebase credential with token

          const docRef = doc(db, "users", user.uid);
          const snap = await getDoc(docRef);

          let role: "admin" | "user" = "user";

          if (!snap.exists()) {
            // First time login → create Firestore doc
            await setDoc(docRef, {
              email: user.email,
              name: user.displayName,
              role,
              createdAt: new Date(),
            });
          } else {
            role = snap.data().role || "user";
          }

          set({ user, role, loading: false });
        } catch (e) {
          console.error("Login error", e);
          set({ user: null, role: null, loading: false });
        }
      },

      logout: async () => {
        await signOut(auth);
        set({ user: null, role: null, loading: false });
      },
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
    }
  )
);
