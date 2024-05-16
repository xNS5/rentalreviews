import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";


export function converter<T extends DocumentData>() {
    return {
      toFirestore(data: T): DocumentData {
        return data;
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData>
      ): T {
        return snapshot.data() as T;
      },
    };
  }