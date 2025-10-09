import {
	collection,
	getDocs,
	addDoc,
	setDoc,
	doc,
	getDoc,
	updateDoc,
	deleteDoc,
	query,
	where,
	orderBy,
	limit,
    WithFieldValue,
    DocumentData,
} from "firebase/firestore";
import { db } from "./config";
import {time } from "../index"

export const addData = async <T extends WithFieldValue<DocumentData>>(collectionName: string, data: T) => {
	try {
		const docRef = await addDoc(collection(db, collectionName), data);
		return docRef;
	} catch (error) {
		console.error("Error adding data:", error);
		return null;
	}
};

export const setData = async <T extends WithFieldValue<DocumentData> >(
	collectionName: string,
	id: string,
	data: T
) => {
	try {
		await setDoc(doc(db, collectionName, id), data);
		return true;
	} catch (error) {
		console.error("Error setting data:", error);
		return false;
	}
};

export const getAllDocs = async (collectionName: string) => {
	try {
		const querySnapshot = await getDocs(collection(db, collectionName));
		return querySnapshot.docs.map((doc) => ({
			uid: doc.id,
			data: doc.data(),
		}));
	} catch (error) {
		console.error("Error fetching all documents:", error);
		return [];
	}
};

export const getSingleDoc = async (collectionName: string, docId: string) => {
	try {
		const docRef = doc(db, collectionName, docId);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return docSnap.data();
		} else {
			console.warn("No such document!");
			return null;
		}
	} catch (error) {
		console.error("Error fetching single document:", error);
		return null;
	}
};

export const updateData = async <T extends WithFieldValue<DocumentData> >(
	collectionName: string,
	docId: string,
	data: T
) => {
	try {
		await updateDoc(doc(db, collectionName, docId), data);
		return true;
	} catch (error) {
		console.error("Error updating data:", error);
		return false;
	}
};

export const deleteData = async (collectionName: string, docId: string) => {
	try {
		await deleteDoc(doc(db, collectionName, docId));
		return true;
	} catch (error) {
		console.error("Error deleting data:", error);
		return false;
	}
};

export const queryData = async (
	collectionName: string,
	searchBy: string,
	searchValue: any
) => {
	try {
		const q = query(
			collection(db, collectionName),
			where(searchBy, "==", searchValue)
		);
		const querySnapshot = await getDocs(q);
		return querySnapshot.docs.map((doc) => ({
			uid: doc.id,
			data: doc.data(),
		}));
	} catch (error) {
		console.error("Error querying data:", error);
		return [];
	}
};

export const getDate = (ts: time): Date => {
	if (typeof (ts as any)?.toDate === "function") {
		return (ts as { toDate: () => Date }).toDate();
	} else {
		return new Date((ts as { seconds: number }).seconds * 1000);
	}
};


export const getSortedData = async (
	collectionName: string,
	order: string,
	limitTo: number
) => {
	try {
		const q = query(
			collection(db, collectionName),
			orderBy(order, "desc"),
			limit(limitTo)
		);
		const querySnapshot = await getDocs(q);
		return querySnapshot.docs.map((doc) => ({
			uid: doc.id,
			data: doc.data(),
		}));
	} catch (error) {
		console.error("Error fetching sorted data:", error);
		return [];
	}
};
