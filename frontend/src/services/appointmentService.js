import api from "../api/api";

export const getAvailability = async (date) => {
    const response = await api.get("/appointments/availability", { params: { date } });
    return response.data;
};

export const createAppointment = async (appointment) => {
    const response = await api.post("/appointments", appointment);
    return response.data;
};

export const getAppointments = async (status) => {
    const response = await api.get("/appointments", {
        params: status ? { status } : undefined
    });
    return response.data;
};

export const getAppointmentStats = async () => {
    const response = await api.get("/appointments/stats");
    return response.data;
};

export const rescheduleAppointment = async (id, schedule) => {
    const response = await api.put(`/appointments/${id}/reschedule`, schedule);
    return response.data;
};

export const cancelAppointment = async (id, reason = "") => {
    const response = await api.put(`/appointments/${id}/cancel`, { reason });
    return response.data;
};
