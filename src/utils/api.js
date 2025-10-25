import axios from "axios";

const BASE_URL = import.meta.env.VITE_EXPRESS_BASE_URL || "http://localhost:5050";

export const fetchWPEvidence = async () => {
    const res = await axios.get(`${BASE_URL}/api/wp-evidence`);
    return res.data;
};